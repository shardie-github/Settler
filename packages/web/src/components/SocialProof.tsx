'use client';

import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

interface SocialProofProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechCorp',
    image: '👩‍💼',
    quote: 'Settler reduced our reconciliation time from 8 hours to 5 minutes. The API is incredibly easy to use and the accuracy is unmatched.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Finance',
    company: 'EcomPlus',
    image: '👨‍💼',
    quote: 'We\'ve reconciled over 2M transactions with Settler. The real-time webhook support eliminated all our manual processes.',
    rating: 5,
  },
  {
    name: 'Emily Johnson',
    role: 'Engineering Lead',
    company: 'SaaSCo',
    image: '👩‍💻',
    quote: 'The developer experience is excellent. We integrated Settler in one afternoon and it\'s been running flawlessly for months.',
    rating: 5,
  },
];

export function SocialProof({ testimonials = defaultTestimonials }: SocialProofProps) {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Loved by Developers & Finance Teams
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Join thousands of companies using Settler for mission-critical reconciliation
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
