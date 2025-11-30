import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Settler
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Reconciliation-as-a-Service API. Automate financial data reconciliation across all platforms.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Playground
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Community
                </Link>
              </li>
              <li>
                <a href="https://github.com/settler" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/docs" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  API Reference
                </Link>
              </li>
              <li>
                <a href="https://status.settler.dev" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/terms" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/license" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 md:mb-0">
            © 2026 Settler. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-slate-600 dark:text-slate-400">
            <a href="https://twitter.com/settler_io" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Twitter
            </a>
            <a href="https://github.com/settler" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              GitHub
            </a>
            <a href="https://discord.gg/settler" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
