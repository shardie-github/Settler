import { NextRequest, NextResponse } from 'next/server';

/**
 * News Feed API
 * 
 * Fetches latest news and generates AI analysis
 * Can be called by newsletter system to get dynamic content
 */

export const dynamic = 'force-dynamic';

interface NewsItem {
  title: string;
  source: string;
  summary: string;
  aiAnalysis: string;
  link?: string;
  publishedAt: string;
}

/**
 * Fetch news from external APIs and generate AI analysis
 * In production, this would integrate with news APIs and AI services
 */
async function fetchNewsWithAnalysis(): Promise<NewsItem[]> {
  // TODO: Integrate with actual news APIs (e.g., NewsAPI, RSS feeds)
  // TODO: Use AI service (OpenAI, Anthropic, etc.) to generate analysis
  
  // Mock data for now
  return [
    {
      title: 'Financial Automation Trends in 2024',
      source: 'TechCrunch',
      summary: 'Companies are increasingly adopting automated reconciliation solutions to reduce manual errors and improve efficiency.',
      aiAnalysis: 'This trend aligns perfectly with Settler\'s value proposition. Companies looking to automate reconciliation should consider API-first solutions that integrate seamlessly with existing tech stacks. The focus on reducing manual errors highlights the importance of high-accuracy matching algorithms.',
      link: 'https://example.com/news/1',
      publishedAt: new Date().toISOString(),
    },
    {
      title: 'E-commerce Platforms See Record Growth',
      source: 'Forbes',
      summary: 'E-commerce platforms are experiencing unprecedented growth, creating demand for better payment reconciliation tools.',
      aiAnalysis: 'As e-commerce grows, the complexity of managing multiple payment providers increases. Settler\'s multi-platform reconciliation capabilities directly address this need. Companies should prioritize solutions that can handle Shopify, Stripe, PayPal, and other providers in a unified workflow.',
      link: 'https://example.com/news/2',
      publishedAt: new Date().toISOString(),
    },
    {
      title: 'API-First Approach Gains Traction',
      source: 'The New Stack',
      summary: 'Developers are increasingly choosing API-first solutions over traditional SaaS platforms for better integration flexibility.',
      aiAnalysis: 'Settler\'s API-first architecture positions it well in this market shift. The ability to integrate reconciliation directly into existing workflows without requiring a separate platform is a key differentiator. This trend favors solutions that offer developer-friendly APIs and comprehensive documentation.',
      link: 'https://example.com/news/3',
      publishedAt: new Date().toISOString(),
    },
  ];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || 'all';

    const newsItems = await fetchNewsWithAnalysis();

    // Filter by category if specified
    const filtered = category === 'all' 
      ? newsItems 
      : newsItems.filter(item => item.source.toLowerCase().includes(category.toLowerCase()));

    // Limit results
    const limited = filtered.slice(0, limit);

    return NextResponse.json(
      {
        success: true,
        data: limited,
        count: limited.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch news',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
