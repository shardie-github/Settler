export function TrustBadges() {
  const badges = [
    { name: 'SOC 2 Type II', icon: '🔒' },
    { name: 'GDPR Compliant', icon: '🛡️' },
    { name: 'PCI-DSS Ready', icon: '💳' },
    { name: '99.99% Uptime', icon: '⚡' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-8">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <span className="text-2xl">{badge.icon}</span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {badge.name}
          </span>
        </div>
      ))}
    </div>
  );
}
