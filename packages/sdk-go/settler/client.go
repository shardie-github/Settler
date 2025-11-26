package settler

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

// Client is the main Settler API client
type Client struct {
	apiKey     string
	baseURL    string
	httpClient *http.Client
	dedupeCache map[string]time.Time
}

// NewClient creates a new Settler client
func NewClient(apiKey string, options ...ClientOption) (*Client, error) {
	if apiKey == "" {
		return nil, fmt.Errorf("API key is required")
	}

	client := &Client{
		apiKey:      apiKey,
		baseURL:     "https://api.settler.io",
		httpClient:  &http.Client{Timeout: 30 * time.Second},
		dedupeCache: make(map[string]time.Time),
	}

	for _, option := range options {
		option(client)
	}

	return client, nil
}

// ClientOption configures a Client
type ClientOption func(*Client)

// WithBaseURL sets the base URL for the API
func WithBaseURL(baseURL string) ClientOption {
	return func(c *Client) {
		c.baseURL = baseURL
	}
}

// WithTimeout sets the HTTP client timeout
func WithTimeout(timeout time.Duration) ClientOption {
	return func(c *Client) {
		c.httpClient.Timeout = timeout
	}
}

// Jobs returns a JobsClient
func (c *Client) Jobs() *JobsClient {
	return &JobsClient{client: c}
}

// Reports returns a ReportsClient
func (c *Client) Reports() *ReportsClient {
	return &ReportsClient{client: c}
}

// Webhooks returns a WebhooksClient
func (c *Client) Webhooks() *WebhooksClient {
	return &WebhooksClient{client: c}
}

// Adapters returns an AdaptersClient
func (c *Client) Adapters() *AdaptersClient {
	return &AdaptersClient{client: c}
}

func (c *Client) request(method, path string, body interface{}, params map[string]string) (map[string]interface{}, error) {
	uri := c.baseURL + path
	if len(params) > 0 {
		u, _ := url.Parse(uri)
		q := u.Query()
		for k, v := range params {
			q.Set(k, v)
		}
		u.RawQuery = q.Encode()
		uri = u.String()
	}

	var reqBody io.Reader
	if body != nil {
		jsonData, err := json.Marshal(body)
		if err != nil {
			return nil, fmt.Errorf("failed to marshal request body: %w", err)
		}
		reqBody = bytes.NewBuffer(jsonData)
	}

	req, err := http.NewRequest(method, uri, reqBody)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+c.apiKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("User-Agent", "settler-go-sdk/1.0.0")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, &NetworkError{Message: err.Error()}
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	if resp.StatusCode >= 400 {
		return nil, c.handleError(resp.StatusCode, result)
	}

	return result, nil
}

func (c *Client) handleError(statusCode int, data map[string]interface{}) error {
	message := "Unknown error"
	if msg, ok := data["message"].(string); ok {
		message = msg
	} else if err, ok := data["error"].(string); ok {
		message = err
	}

	switch {
	case statusCode == 401 || statusCode == 403:
		return &AuthenticationError{Message: message}
	case statusCode == 404:
		return &NotFoundError{Message: message}
	case statusCode == 422:
		return &ValidationError{Message: message}
	case statusCode == 429:
		return &RateLimitError{Message: message}
	case statusCode >= 500:
		return &ServerError{Message: message, StatusCode: statusCode}
	default:
		return &SettlerError{Message: message, StatusCode: statusCode}
	}
}

func (c *Client) generateDedupKey(method, uri string, body interface{}) string {
	var bodyStr string
	if body != nil {
		jsonData, _ := json.Marshal(body)
		bodyStr = string(jsonData)
	}
	keyData := fmt.Sprintf("%s:%s:%s", method, uri, bodyStr)
	hash := sha256.Sum256([]byte(keyData))
	return hex.EncodeToString(hash[:])
}

// JobsClient handles job operations
type JobsClient struct {
	client *Client
}

// Create creates a new reconciliation job
func (jc *JobsClient) Create(req CreateJobRequest) (map[string]interface{}, error) {
	resp, err := jc.client.request("POST", "/api/v1/jobs", req, nil)
	if err != nil {
		return nil, err
	}
	if data, ok := resp["data"].(map[string]interface{}); ok {
		return data, nil
	}
	return resp, nil
}

// Get retrieves a job by ID
func (jc *JobsClient) Get(jobID string) (map[string]interface{}, error) {
	resp, err := jc.client.request("GET", "/api/v1/jobs/"+jobID, nil, nil)
	if err != nil {
		return nil, err
	}
	if data, ok := resp["data"].(map[string]interface{}); ok {
		return data, nil
	}
	return resp, nil
}

// List lists jobs with pagination
func (jc *JobsClient) List(page, limit int) (map[string]interface{}, error) {
	params := map[string]string{
		"page":  fmt.Sprintf("%d", page),
		"limit": fmt.Sprintf("%d", limit),
	}
	return jc.client.request("GET", "/api/v1/jobs", nil, params)
}

// Run runs a reconciliation job
func (jc *JobsClient) Run(jobID string) (map[string]interface{}, error) {
	resp, err := jc.client.request("POST", "/api/v1/jobs/"+jobID+"/run", nil, nil)
	if err != nil {
		return nil, err
	}
	if data, ok := resp["data"].(map[string]interface{}); ok {
		return data, nil
	}
	return resp, nil
}

// Delete deletes a job
func (jc *JobsClient) Delete(jobID string) error {
	_, err := jc.client.request("DELETE", "/api/v1/jobs/"+jobID, nil, nil)
	return err
}

// CreateJobRequest represents a job creation request
type CreateJobRequest struct {
	Name     string                 `json:"name"`
	Source   AdapterConfig          `json:"source"`
	Target   AdapterConfig          `json:"target"`
	Rules    MatchingRules          `json:"rules"`
	Schedule string                 `json:"schedule,omitempty"`
}

// AdapterConfig represents adapter configuration
type AdapterConfig struct {
	Adapter string                 `json:"adapter"`
	Config  map[string]interface{} `json:"config"`
}

// MatchingRules represents matching rules
type MatchingRules struct {
	Matching          []MatchingRule `json:"matching"`
	ConflictResolution string         `json:"conflictResolution,omitempty"`
}

// MatchingRule represents a single matching rule
type MatchingRule struct {
	Field     string  `json:"field"`
	Type      string  `json:"type"`
	Tolerance float64 `json:"tolerance,omitempty"`
	Days      int     `json:"days,omitempty"`
	Threshold float64 `json:"threshold,omitempty"`
}

// ReportsClient handles report operations
type ReportsClient struct {
	client *Client
}

// Get retrieves a reconciliation report
func (rc *ReportsClient) Get(jobID, executionID string) (map[string]interface{}, error) {
	path := "/api/v1/reports/" + jobID
	if executionID != "" {
		path += "/" + executionID
	}
	resp, err := rc.client.request("GET", path, nil, nil)
	if err != nil {
		return nil, err
	}
	if data, ok := resp["data"].(map[string]interface{}); ok {
		return data, nil
	}
	return resp, nil
}

// GetUnmatched retrieves unmatched records
func (rc *ReportsClient) GetUnmatched(jobID, executionID string) ([]interface{}, error) {
	path := "/api/v1/reports/" + jobID + "/unmatched"
	params := make(map[string]string)
	if executionID != "" {
		params["execution_id"] = executionID
	}
	resp, err := rc.client.request("GET", path, nil, params)
	if err != nil {
		return nil, err
	}
	if data, ok := resp["data"].([]interface{}); ok {
		return data, nil
	}
	return []interface{}{}, nil
}

// WebhooksClient handles webhook operations
type WebhooksClient struct {
	client *Client
}

// Create creates a webhook endpoint
func (wc *WebhooksClient) Create(req CreateWebhookRequest) (map[string]interface{}, error) {
	resp, err := wc.client.request("POST", "/api/v1/webhooks", req, nil)
	if err != nil {
		return nil, err
	}
	if data, ok := resp["data"].(map[string]interface{}); ok {
		return data, nil
	}
	return resp, nil
}

// CreateWebhookRequest represents a webhook creation request
type CreateWebhookRequest struct {
	URL     string   `json:"url"`
	Events  []string `json:"events"`
	Secret  string   `json:"secret,omitempty"`
}

// List lists webhooks
func (wc *WebhooksClient) List() ([]interface{}, error) {
	resp, err := wc.client.request("GET", "/api/v1/webhooks", nil, nil)
	if err != nil {
		return nil, err
	}
	if data, ok := resp["data"].([]interface{}); ok {
		return data, nil
	}
	return []interface{}{}, nil
}

// Delete deletes a webhook
func (wc *WebhooksClient) Delete(webhookID string) error {
	_, err := wc.client.request("DELETE", "/api/v1/webhooks/"+webhookID, nil, nil)
	return err
}

// AdaptersClient handles adapter operations
type AdaptersClient struct {
	client *Client
}

// List lists available adapters
func (ac *AdaptersClient) List() ([]interface{}, error) {
	resp, err := ac.client.request("GET", "/api/v1/adapters", nil, nil)
	if err != nil {
		return nil, err
	}
	if data, ok := resp["data"].([]interface{}); ok {
		return data, nil
	}
	return []interface{}{}, nil
}

// Get retrieves adapter details
func (ac *AdaptersClient) Get(adapterName string) (map[string]interface{}, error) {
	resp, err := ac.client.request("GET", "/api/v1/adapters/"+adapterName, nil, nil)
	if err != nil {
		return nil, err
	}
	if data, ok := resp["data"].(map[string]interface{}); ok {
		return data, nil
	}
	return resp, nil
}
