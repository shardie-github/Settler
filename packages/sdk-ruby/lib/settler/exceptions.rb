# frozen_string_literal: true

module Settler
  # Base exception for all Settler errors
  class SettlerError < StandardError
    attr_reader :status_code

    def initialize(message, status_code: 0)
      @status_code = status_code
      super(message)
    end
  end

  # Network-related errors
  class NetworkError < SettlerError; end

  # Authentication errors
  class AuthenticationError < SettlerError; end

  # Validation errors
  class ValidationError < SettlerError; end

  # Resource not found errors
  class NotFoundError < SettlerError; end

  # Rate limit exceeded errors
  class RateLimitError < SettlerError; end

  # Server errors
  class ServerError < SettlerError; end
end
