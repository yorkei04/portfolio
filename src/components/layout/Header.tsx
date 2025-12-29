'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white dark:bg-slate-900/95 border-b border-gray-200 dark:border-slate-800/50 shadow-sm'
          : 'bg-white dark:bg-slate-900/95',
      )}
    >
      <Container>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link
            href='/'
            className='text-xl font-bold transition-colors hover:text-foreground/80'
          >
            {portfolioData.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {portfolioData.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className='text-sm font-medium transition-colors hover:text-foreground/80 relative group'
              >
                {item.label}
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full'></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden relative w-6 h-6 focus:outline-none'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            <span
              className={cn(
                'absolute top-0 left-0 w-6 h-0.5 bg-foreground transition-all duration-300',
                isMenuOpen ? 'rotate-45 top-3' : '',
              )}
            />
            <span
              className={cn(
                'absolute top-2.5 left-0 w-6 h-0.5 bg-foreground transition-all duration-300',
                isMenuOpen ? 'opacity-0' : '',
              )}
            />
            <span
              className={cn(
                'absolute top-5 left-0 w-6 h-0.5 bg-foreground transition-all duration-300',
                isMenuOpen ? '-rotate-45 top-3' : '',
              )}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden transition-all duration-300 overflow-hidden',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <nav className='py-4 border-t border-gray-200 dark:border-slate-800/50 bg-white dark:bg-slate-900/95'>
            {portfolioData.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className='block py-2 text-sm font-medium transition-colors hover:text-foreground/80'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
