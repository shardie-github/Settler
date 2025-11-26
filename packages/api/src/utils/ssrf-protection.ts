import dns from 'dns/promises';

const PRIVATE_IP_RANGES = [
  /^10\./, // 10.0.0.0/8
  /^172\.(1[6-9]|2[0-9]|3[01])\./, // 172.16.0.0/12
  /^192\.168\./, // 192.168.0.0/16
  /^127\./, // 127.0.0.0/8
  /^169\.254\./, // 169.254.0.0/16 (link-local)
  /^::1$/, // IPv6 localhost
  /^fc00:/, // IPv6 private
  /^fe80:/, // IPv6 link-local
];

const BLOCKED_HOSTS = [
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '169.254.169.254', // AWS metadata service
  'metadata.google.internal', // GCP metadata service
  '169.254.169.254', // Azure metadata service
];

export async function validateWebhookUrl(urlString: string): Promise<void> {
  let url: URL;
  
  try {
    url = new URL(urlString);
  } catch (error) {
    throw new Error('Invalid URL format');
  }

  // Only allow HTTPS (except localhost for development)
  if (url.protocol !== 'https:' && url.hostname !== 'localhost' && process.env.NODE_ENV === 'production') {
    throw new Error('Only HTTPS URLs allowed in production');
  }

  const hostname = url.hostname.toLowerCase();

  // Check blocked hosts
  if (BLOCKED_HOSTS.includes(hostname)) {
    throw new Error('Blocked hostname');
  }

  // Resolve DNS to IP addresses
  try {
    const addresses = await dns.resolve4(hostname);
    
    for (const addr of addresses) {
      // Check private IP ranges
      if (PRIVATE_IP_RANGES.some(range => range.test(addr))) {
        throw new Error('Private IP addresses not allowed');
      }

      // Block AWS metadata service
      if (addr === '169.254.169.254') {
        throw new Error('AWS metadata service not allowed');
      }
    }
  } catch (error: any) {
    // If DNS resolution fails, it might be a valid external domain
    // But we should still block if it's a known blocked host
    if (error.message.includes('Private IP') || error.message.includes('metadata')) {
      throw error;
    }
    // For development, allow unresolved hostnames
    if (process.env.NODE_ENV === 'production') {
      throw new Error('DNS resolution failed');
    }
  }
}
