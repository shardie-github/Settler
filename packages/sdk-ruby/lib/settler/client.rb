# frozen_string_literal: true

require "net/http"
require "uri"
require "json"
require "digest"

module Settler
  # Production-grade Ruby SDK client for Settler API
  #
  # @example
  #   client = Settler::Client.new(api_key: "sk_your_api_key")
  #   job = client.jobs.create(
  #     name: "Shopify-Stripe Reconciliation",
  #     source: { adapter: "shopify", config: {...} },
  #     target: { adapter: "stripe", config: {...} },
  #     rules: { matching: [...] }
  #   )
  class Client
    DEFAULT_BASE_URL = "https://api.settler.io"
    DEFAULT_TIMEOUT = 30
    DEFAULT_MAX_RETRIES = 3

    attr_reader :api_key, :base_url, :timeout, :max_retries

    def initialize(api_key:, base_url: DEFAULT_BASE_URL, timeout: DEFAULT_TIMEOUT, max_retries: DEFAULT_MAX_RETRIES)
      raise ArgumentError, "API key is required" if api_key.nil? || api_key.empty?

      @api_key = api_key
      @base_url = base_url.chomp("/")
      @timeout = timeout
      @max_retries = max_retries
      @dedupe_cache = {}
      @dedupe_ttl = 60

      # Initialize sub-clients
      @jobs = JobsClient.new(self)
      @reports = ReportsClient.new(self)
      @webhooks = WebhooksClient.new(self)
      @adapters = AdaptersClient.new(self)
    end

    attr_reader :jobs, :reports, :webhooks, :adapters

    def request(method:, path:, data: nil, params: nil, deduplicate: true)
      uri = URI.join(@base_url, path)
      uri.query = URI.encode_www_form(params) if params && !params.empty?

      # Request deduplication
      if deduplicate && %w[POST PUT PATCH].include?(method)
        cache_key = generate_dedup_key(method, uri.to_s, data)
        if @dedupe_cache.key?(cache_key)
          raise SettlerError, "Duplicate request detected"
        end
        @dedupe_cache[cache_key] = Time.now.to_f
        cleanup_dedup_cache
      end

      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = uri.scheme == "https"
      http.read_timeout = @timeout
      http.open_timeout = @timeout

      request_class = Net::HTTP.const_get(method.capitalize)
      request = request_class.new(uri.request_uri)
      request["Authorization"] = "Bearer #{@api_key}"
      request["Content-Type"] = "application/json"
      request["User-Agent"] = "settler-ruby-sdk/#{Settler::VERSION}"
      request.body = data.to_json if data

      retries = 0
      begin
        response = http.request(request)
        handle_response(response)
      rescue Net::TimeoutError, Errno::ECONNREFUSED, Errno::EHOSTUNREACH => e
        retries += 1
        if retries <= @max_retries
          sleep(2**retries) # Exponential backoff
          retry
        end
        raise NetworkError, "Request failed: #{e.message}"
      end
    end

    private

    def generate_dedup_key(method, url, data)
      key_data = "#{method}:#{url}:#{data.to_json}"
      Digest::SHA256.hexdigest(key_data)
    end

    def cleanup_dedup_cache
      now = Time.now.to_f
      @dedupe_cache.delete_if { |_k, v| now - v > @dedupe_ttl }
    end

    def handle_response(response)
      case response.code.to_i
      when 200..299
        JSON.parse(response.body)
      when 401, 403
        raise AuthenticationError, parse_error_message(response)
      when 404
        raise NotFoundError, parse_error_message(response)
      when 422
        raise ValidationError, parse_error_message(response)
      when 429
        raise RateLimitError, parse_error_message(response)
      when 500..599
        raise ServerError, parse_error_message(response)
      else
        raise SettlerError, parse_error_message(response)
      end
    end

    def parse_error_message(response)
      parsed = JSON.parse(response.body)
      parsed["message"] || parsed["error"] || "Unknown error"
    rescue JSON::ParserError
      response.body || "Unknown error"
    end
  end

  # Jobs client
  class JobsClient
    def initialize(client)
      @client = client
    end

    def create(name:, source:, target:, rules:, schedule: nil)
      data = { name: name, source: source, target: target, rules: rules }
      data[:schedule] = schedule if schedule
      response = @client.request(method: "POST", path: "/api/v1/jobs", data: data)
      response["data"]
    end

    def get(job_id)
      response = @client.request(method: "GET", path: "/api/v1/jobs/#{job_id}")
      response["data"]
    end

    def list(page: 1, limit: 100)
      params = { page: page, limit: limit }
      @client.request(method: "GET", path: "/api/v1/jobs", params: params)
    end

    def run(job_id)
      response = @client.request(method: "POST", path: "/api/v1/jobs/#{job_id}/run")
      response["data"]
    end

    def delete(job_id)
      @client.request(method: "DELETE", path: "/api/v1/jobs/#{job_id}")
    end
  end

  # Reports client
  class ReportsClient
    def initialize(client)
      @client = client
    end

    def get(job_id, execution_id: nil)
      path = "/api/v1/reports/#{job_id}"
      path += "/#{execution_id}" if execution_id
      response = @client.request(method: "GET", path: path)
      response["data"]
    end

    def get_unmatched(job_id, execution_id: nil)
      path = "/api/v1/reports/#{job_id}/unmatched"
      params = execution_id ? { execution_id: execution_id } : nil
      response = @client.request(method: "GET", path: path, params: params)
      response["data"] || []
    end
  end

  # Webhooks client
  class WebhooksClient
    def initialize(client)
      @client = client
    end

    def create(url:, events:, secret: nil)
      data = { url: url, events: events }
      data[:secret] = secret if secret
      response = @client.request(method: "POST", path: "/api/v1/webhooks", data: data)
      response["data"]
    end

    def list
      response = @client.request(method: "GET", path: "/api/v1/webhooks")
      response["data"] || []
    end

    def delete(webhook_id)
      @client.request(method: "DELETE", path: "/api/v1/webhooks/#{webhook_id}")
    end
  end

  # Adapters client
  class AdaptersClient
    def initialize(client)
      @client = client
    end

    def list
      response = @client.request(method: "GET", path: "/api/v1/adapters")
      response["data"] || []
    end

    def get(adapter_name)
      response = @client.request(method: "GET", path: "/api/v1/adapters/#{adapter_name}")
      response["data"]
    end
  end
end
