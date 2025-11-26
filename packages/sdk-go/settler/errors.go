package settler

import "fmt"

// SettlerError is the base error type
type SettlerError struct {
	Message    string
	StatusCode int
}

func (e *SettlerError) Error() string {
	return e.Message
}

// NetworkError represents network-related errors
type NetworkError struct {
	Message string
}

func (e *NetworkError) Error() string {
	return fmt.Sprintf("Network error: %s", e.Message)
}

// AuthenticationError represents authentication errors
type AuthenticationError struct {
	Message string
}

func (e *AuthenticationError) Error() string {
	return fmt.Sprintf("Authentication error: %s", e.Message)
}

// ValidationError represents validation errors
type ValidationError struct {
	Message string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("Validation error: %s", e.Message)
}

// NotFoundError represents not found errors
type NotFoundError struct {
	Message string
}

func (e *NotFoundError) Error() string {
	return fmt.Sprintf("Not found: %s", e.Message)
}

// RateLimitError represents rate limit errors
type RateLimitError struct {
	Message string
}

func (e *RateLimitError) Error() string {
	return fmt.Sprintf("Rate limit exceeded: %s", e.Message)
}

// ServerError represents server errors
type ServerError struct {
	Message    string
	StatusCode int
}

func (e *ServerError) Error() string {
	return fmt.Sprintf("Server error (%d): %s", e.StatusCode, e.Message)
}
