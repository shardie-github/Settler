'use client';

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/DarkModeToggle";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label="Settler homepage"
          >
            <div
              className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Settler
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6" role="menubar">
            <Link
              href="/docs"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              Pricing
            </Link>
            <Link
              href="/enterprise"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              Enterprise
            </Link>
            <Link
              href="/community"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              Community
            </Link>
            <Link
              href="/support"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              Support
            </Link>
            <Link
              href="/playground"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              Playground
            </Link>
            <DarkModeToggle />
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Link href="/playground" aria-label="Get started with Settler">
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/docs"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/pricing"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/enterprise"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                Enterprise
              </Link>
              <Link
                href="/community"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                href="/support"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                Support
              </Link>
              <Link
                href="/playground"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                Playground
              </Link>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Link href="/playground" aria-label="Get started with Settler">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
