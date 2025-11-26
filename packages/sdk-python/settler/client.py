"""
Settler Python SDK Client
Production-grade client with retry, deduplication, and error handling
"""

import time
import hashlib
import json
from typing import Optional, Dict, Any, List
from urllib.parse import urljoin
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from .exceptions import (
    SettlerError,
    NetworkError,
    AuthenticationError,
    ValidationError,
    NotFoundError,
    RateLimitError,
    ServerError,
)


class SettlerClient:
    """
    Production-grade Python SDK client for Settler API
    
    Example:
        >>> client = SettlerClient(api_key="sk_your_api_key")
        >>> job = client.jobs.create(
        ...     name="Shopify-Stripe Reconciliation",
        ...     source={"adapter": "shopify", "config": {...}},
        ...     target={"adapter": "stripe", "config": {...}},
        ...     rules={"matching": [...]}
        ... )
    """
    
    def __init__(
        self,
        api_key: str,
        base_url: str = "https://api.settler.io",
        timeout: int = 30,
        max_retries: int = 3,
        retry_backoff: float = 1.0,
    ):
        """
        Initialize Settler client
        
        Args:
            api_key: Your Settler API key
            base_url: Base URL for API (default: https://api.settler.io)
            timeout: Request timeout in seconds (default: 30)
            max_retries: Maximum number of retries (default: 3)
            retry_backoff: Backoff multiplier for retries (default: 1.0)
        """
        if not api_key:
            raise ValueError("API key is required")
        
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        
        # Setup session with retry strategy
        self.session = requests.Session()
        retry_strategy = Retry(
            total=max_retries,
            backoff_factor=retry_backoff,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        self.session.mount("http://", adapter)
        self.session.mount("https://", adapter)
        
        # Request deduplication cache (in-memory, simple implementation)
        self._dedupe_cache: Dict[str, float] = {}
        self._dedupe_ttl = 60  # 60 seconds
        
        # Initialize sub-clients
        self.jobs = JobsClient(self)
        self.reports = ReportsClient(self)
        self.webhooks = WebhooksClient(self)
        self.adapters = AdaptersClient(self)
    
    def _request(
        self,
        method: str,
        path: str,
        data: Optional[Dict[str, Any]] = None,
        params: Optional[Dict[str, Any]] = None,
        deduplicate: bool = True,
    ) -> Dict[str, Any]:
        """
        Make authenticated request to API
        
        Args:
            method: HTTP method
            path: API path
            data: Request body data
            params: Query parameters
            deduplicate: Enable request deduplication
            
        Returns:
            Response data dictionary
            
        Raises:
            SettlerError: Base exception for all Settler errors
        """
        url = urljoin(self.base_url, path.lstrip("/"))
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "User-Agent": f"settler-python-sdk/{__import__('settler').__version__}",
        }
        
        # Request deduplication
        if deduplicate and method in ["POST", "PUT", "PATCH"]:
            cache_key = self._generate_dedup_key(method, url, data)
            if cache_key in self._dedupe_cache:
                # Return cached response (in production, would cache actual response)
                raise SettlerError("Duplicate request detected")
            self._dedupe_cache[cache_key] = time.time()
            self._cleanup_dedup_cache()
        
        try:
            response = self.session.request(
                method=method,
                url=url,
                json=data,
                params=params,
                headers=headers,
                timeout=self.timeout,
            )
            
            # Handle errors
            if response.status_code >= 400:
                self._handle_error_response(response)
            
            return response.json()
        
        except requests.exceptions.Timeout:
            raise NetworkError("Request timeout", status_code=408)
        except requests.exceptions.ConnectionError:
            raise NetworkError("Connection error", status_code=0)
        except requests.exceptions.RequestException as e:
            raise NetworkError(f"Request failed: {str(e)}", status_code=0)
    
    def _generate_dedup_key(self, method: str, url: str, data: Optional[Dict]) -> str:
        """Generate deduplication key for request"""
        key_data = f"{method}:{url}:{json.dumps(data or {}, sort_keys=True)}"
        return hashlib.sha256(key_data.encode()).hexdigest()
    
    def _cleanup_dedup_cache(self):
        """Remove expired entries from deduplication cache"""
        now = time.time()
        expired_keys = [
            k for k, v in self._dedupe_cache.items()
            if now - v > self._dedupe_ttl
        ]
        for key in expired_keys:
            del self._dedupe_cache[key]
    
    def _handle_error_response(self, response: requests.Response):
        """Handle error responses and raise appropriate exceptions"""
        status_code = response.status_code
        
        try:
            error_data = response.json()
            message = error_data.get("message", "Unknown error")
            error_type = error_data.get("error", "Error")
        except:
            message = response.text or "Unknown error"
            error_type = "Error"
        
        if status_code == 401:
            raise AuthenticationError(message)
        elif status_code == 403:
            raise AuthenticationError(message)
        elif status_code == 404:
            raise NotFoundError(message)
        elif status_code == 422:
            raise ValidationError(message)
        elif status_code == 429:
            raise RateLimitError(message)
        elif status_code >= 500:
            raise ServerError(message, status_code=status_code)
        else:
            raise SettlerError(message, status_code=status_code)


class JobsClient:
    """Client for job operations"""
    
    def __init__(self, client: SettlerClient):
        self._client = client
    
    def create(
        self,
        name: str,
        source: Dict[str, Any],
        target: Dict[str, Any],
        rules: Dict[str, Any],
        schedule: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Create a reconciliation job
        
        Args:
            name: Job name
            source: Source adapter configuration
            target: Target adapter configuration
            rules: Matching rules
            schedule: Optional cron schedule
            
        Returns:
            Created job data
        """
        data = {
            "name": name,
            "source": source,
            "target": target,
            "rules": rules,
        }
        if schedule:
            data["schedule"] = schedule
        
        response = self._client._request("POST", "/api/v1/jobs", data=data)
        return response.get("data", {})
    
    def get(self, job_id: str) -> Dict[str, Any]:
        """Get job by ID"""
        response = self._client._request("GET", f"/api/v1/jobs/{job_id}")
        return response.get("data", {})
    
    def list(self, page: int = 1, limit: int = 100) -> Dict[str, Any]:
        """List jobs with pagination"""
        params = {"page": page, "limit": limit}
        response = self._client._request("GET", "/api/v1/jobs", params=params)
        return response
    
    def run(self, job_id: str) -> Dict[str, Any]:
        """Run a reconciliation job"""
        response = self._client._request("POST", f"/api/v1/jobs/{job_id}/run")
        return response.get("data", {})
    
    def delete(self, job_id: str) -> None:
        """Delete a job"""
        self._client._request("DELETE", f"/api/v1/jobs/{job_id}")


class ReportsClient:
    """Client for report operations"""
    
    def __init__(self, client: SettlerClient):
        self._client = client
    
    def get(self, job_id: str, execution_id: Optional[str] = None) -> Dict[str, Any]:
        """Get reconciliation report"""
        path = f"/api/v1/reports/{job_id}"
        if execution_id:
            path += f"/{execution_id}"
        response = self._client._request("GET", path)
        return response.get("data", {})
    
    def get_unmatched(self, job_id: str, execution_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get unmatched records"""
        path = f"/api/v1/reports/{job_id}/unmatched"
        if execution_id:
            path += f"?execution_id={execution_id}"
        response = self._client._request("GET", path)
        return response.get("data", [])


class WebhooksClient:
    """Client for webhook operations"""
    
    def __init__(self, client: SettlerClient):
        self._client = client
    
    def create(
        self,
        url: str,
        events: List[str],
        secret: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Create webhook endpoint"""
        data = {"url": url, "events": events}
        if secret:
            data["secret"] = secret
        response = self._client._request("POST", "/api/v1/webhooks", data=data)
        return response.get("data", {})
    
    def list(self) -> List[Dict[str, Any]]:
        """List webhooks"""
        response = self._client._request("GET", "/api/v1/webhooks")
        return response.get("data", [])
    
    def delete(self, webhook_id: str) -> None:
        """Delete webhook"""
        self._client._request("DELETE", f"/api/v1/webhooks/{webhook_id}")


class AdaptersClient:
    """Client for adapter operations"""
    
    def __init__(self, client: SettlerClient):
        self._client = client
    
    def list(self) -> List[Dict[str, Any]]:
        """List available adapters"""
        response = self._client._request("GET", "/api/v1/adapters")
        return response.get("data", [])
    
    def get(self, adapter_name: str) -> Dict[str, Any]:
        """Get adapter details"""
        response = self._client._request("GET", f"/api/v1/adapters/{adapter_name}")
        return response.get("data", {})
