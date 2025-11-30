export function CustomerLogos() {
  // Placeholder logos - in production, these would be actual customer logos
  const logos = [
    { name: 'TechCorp', logo: '🏢' },
    { name: 'StartupXYZ', logo: '🚀' },
    { name: 'EcomPlus', logo: '🛒' },
    { name: 'FinanceApp', logo: '💰' },
    { name: 'RetailPro', logo: '🏪' },
    { name: 'SaaSCo', logo: '☁️' },
  ];

  return (
    <div className="py-12">
      <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-8">
        Trusted by leading companies
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
        {logos.map((company, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-24 h-24 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
            title={company.name}
          >
            <span className="text-4xl">{company.logo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
