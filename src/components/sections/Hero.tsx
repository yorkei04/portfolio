'use client';

import { useEffect, useState, useRef } from 'react';
import { portfolioData } from '@/data/portfolio';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

// Helper function to render text with links
function renderTextWithLinks(text: string): React.ReactNode {
  const linkText = 'Andrew SZE-TO';
  const linkUrl = 'https://github.com/zkwokleung';
  
  // Use word boundary to match "Andrew" as a whole word, not as part of another word
  const linkPattern = /\bAndrew\b/g;
  
  if (!linkPattern.test(text)) {
    return text;
  }
  
  // Reset regex
  linkPattern.lastIndex = 0;
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  while ((match = linkPattern.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    // Add the link
    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/90 hover:text-foreground underline underline-offset-2 transition-colors"
      >
        {linkText}
      </a>
    );
    
    lastIndex = match.index + linkText.length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
}

// Typing animation component
function TypingText({
  text,
  speed = 50,
  className = '',
  showCursor = true,
  shouldStart = false,
  onComplete,
}: {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  shouldStart?: boolean;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBlinkCursor, setShowBlinkCursor] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);
  const isActiveRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const textRef = useRef(text);

  // Update refs when props change
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // If text changes and we've completed, reset to allow retyping
    if (textRef.current !== text && hasCompletedRef.current) {
      hasCompletedRef.current = false;
      setDisplayedText('');
    }
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    // Clean up any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!shouldStart) {
      // Only reset if we haven't completed typing yet
      if (!hasCompletedRef.current) {
        isActiveRef.current = false;
        currentIndexRef.current = 0;
        setDisplayedText('');
        setIsTyping(false);
      }
      return;
    }

    // Don't restart if already typing or already completed
    if (isActiveRef.current || hasCompletedRef.current) return;

    isActiveRef.current = true;
    currentIndexRef.current = 0;
    hasCompletedRef.current = false;

    setIsTyping(true);
    setDisplayedText('');

    const type = () => {
      if (!isActiveRef.current) return; // Stop if deactivated
      
      const currentText = textRef.current;
      if (currentIndexRef.current < currentText.length) {
        setDisplayedText(currentText.slice(0, currentIndexRef.current + 1));
        currentIndexRef.current++;
        timeoutRef.current = setTimeout(type, speed);
      } else {
        setIsTyping(false);
        isActiveRef.current = false;
        hasCompletedRef.current = true;
        // Keep the full text displayed
        setDisplayedText(currentText);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };

    // Small delay before starting
    timeoutRef.current = setTimeout(type, 200);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      isActiveRef.current = false;
    };
  }, [speed, shouldStart]);

  // Blinking cursor animation - only while typing
  useEffect(() => {
    if (!showCursor || !isTyping) {
      setShowBlinkCursor(false);
      return;
    }

    const interval = setInterval(() => {
      setShowBlinkCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [showCursor, isTyping]);

  return (
    <span className="relative inline-grid w-full" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}>
      {/* Invisible placeholder to reserve space and prevent layout shift */}
      <span 
        aria-hidden="true" 
        className={cn('invisible col-start-1 row-start-1 break-words', className)}
        style={{ 
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
          fontWeight: 'inherit',
          fontStyle: 'inherit',
          textTransform: 'inherit',
          whiteSpace: 'normal',
          margin: 0,
          padding: 0,
          border: 'none',
          outline: 'none'
        }}
      >
        {text}
        {/* Invisible cursor placeholder to match visible cursor width exactly */}
        {showCursor && (
          <span className="inline-block w-0.5 h-[1em] ml-1" aria-hidden="true" style={{ verticalAlign: 'baseline' }}>
            {' '}
          </span>
        )}
      </span>
      {/* Visible typing text in the same grid cell */}
      <span 
        className={cn('col-start-1 row-start-1 break-words', className)}
        style={{ 
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
          fontWeight: 'inherit',
          fontStyle: 'inherit',
          textTransform: 'inherit',
          whiteSpace: 'normal',
          margin: 0,
          padding: 0,
          border: 'none',
          outline: 'none'
        }}
      >
        {renderTextWithLinks(displayedText)}
        {showCursor && isTyping && (
          <span
            className={cn(
              'inline-block w-0.5 h-[1em] bg-foreground ml-1 transition-opacity duration-75',
              showBlinkCursor ? 'opacity-100' : 'opacity-0',
            )}
            style={{ verticalAlign: 'baseline' }}
          >
            |
          </span>
        )}
      </span>
    </span>
  );
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1, then trigger to 0
  const [descriptionParagraphIndex, setDescriptionParagraphIndex] = useState(0);
  const descriptionParagraphs = portfolioData.hero.description.split('\n\n');

  useEffect(() => {
    setIsVisible(true);
    // Trigger the first typing animation
    const timer = setTimeout(() => {
      setCurrentStep(0);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className='min-h-screen flex items-center justify-start relative overflow-hidden pt-16 md:pt-16'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 -z-10'>
        {/* Base gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-slate-700/12 via-slate-600/10 to-slate-800/12'></div>
        {/* Animated gradient orbs */}
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-slate-600/18 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-700/18 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-slate-600/15 via-slate-700/15 to-slate-500/12 rounded-full blur-3xl animate-spin-slow'></div>
        {/* Additional accent gradients */}
        <div className='absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-slate-700/10 to-transparent'></div>
        <div className='absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-slate-800/10 to-transparent'></div>
      </div>

      <Container className='text-left'>
        <div className='max-w-4xl'>
          {/* Greeting */}
          <div className='mb-4'>
            <p className='text-lg md:text-xl text-foreground/70'>
              <TypingText
                key="greeting"
                text={portfolioData.hero.greeting}
                speed={20}
                shouldStart={currentStep === 0}
                onComplete={() => {
                  setTimeout(() => setCurrentStep(1), 300);
                }}
              />
            </p>
          </div>

          {/* Name */}
          <div className='mb-6 min-h-[1.5em]'>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-foreground'>
              <span className="relative inline-grid w-full" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}>
                {/* Invisible placeholder to reserve space - includes cursor space */}
                <span 
                  aria-hidden="true" 
                  className="invisible col-start-1 row-start-1 break-words"
                  style={{ 
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    letterSpacing: 'inherit',
                    fontWeight: 'inherit',
                    fontStyle: 'inherit',
                    textTransform: 'inherit',
                    whiteSpace: 'normal',
                    margin: 0,
                    padding: 0,
                    border: 'none',
                    outline: 'none'
                  }}
                >
                  {portfolioData.name}
                  {/* Invisible cursor placeholder to match visible cursor width exactly */}
                  <span className="inline-block w-0.5 h-[1em] ml-1" aria-hidden="true" style={{ verticalAlign: 'baseline' }}>
                    {' '}
                  </span>
                </span>
                {/* Visible content */}
                <span className="col-start-1 row-start-1 break-words">
                  {currentStep >= 1 && (
                    <TypingText
                      key="name"
                      text={portfolioData.name}
                      speed={25}
                      shouldStart={currentStep === 1}
                      onComplete={() => {
                        setTimeout(() => setCurrentStep(2), 300);
                      }}
                    />
                  )}
                </span>
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <div className='mb-6 min-h-[1.5em]'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-foreground/80'>
              <span className="relative inline-grid w-full" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}>
                {/* Invisible placeholder to reserve space - includes cursor space */}
                <span 
                  aria-hidden="true" 
                  className="invisible col-start-1 row-start-1 break-words"
                  style={{ 
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    letterSpacing: 'inherit',
                    fontWeight: 'inherit',
                    fontStyle: 'inherit',
                    textTransform: 'inherit',
                    whiteSpace: 'normal',
                    margin: 0,
                    padding: 0,
                    border: 'none',
                    outline: 'none'
                  }}
                >
                  {portfolioData.hero.tagline}
                  {/* Invisible cursor placeholder to match visible cursor width exactly */}
                  <span className="inline-block w-0.5 h-[1em] ml-1" aria-hidden="true" style={{ verticalAlign: 'baseline' }}>
                    {' '}
                  </span>
                </span>
                {/* Visible content */}
                <span className="col-start-1 row-start-1 break-words">
                  {currentStep >= 2 && (
                    <TypingText
                      key="tagline"
                      text={portfolioData.hero.tagline}
                      speed={15}
                      shouldStart={currentStep === 2}
                      onComplete={() => {
                        setTimeout(() => setCurrentStep(3), 300);
                      }}
                    />
                  )}
                </span>
              </span>
            </h2>
          </div>

          {/* Description */}
          <div className='mb-8'>
            {descriptionParagraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className='text-base md:text-lg text-foreground/70 max-w-2xl leading-relaxed mb-4 last:mb-0 min-h-[1.5em]'
              >
                <span className="relative inline-grid w-full" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}>
                  {/* Invisible placeholder to reserve space - always rendered */}
                  <span 
                    aria-hidden="true" 
                    className="invisible col-start-1 row-start-1 break-words"
                    style={{ 
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      letterSpacing: 'inherit',
                      fontWeight: 'inherit',
                      fontStyle: 'inherit',
                      textTransform: 'inherit',
                      whiteSpace: 'normal',
                      margin: 0,
                      padding: 0,
                      border: 'none',
                      outline: 'none'
                    }}
                  >
                    {paragraph}
                  </span>
                  {/* Visible typing text */}
                  <span className="col-start-1 row-start-1 break-words">
                    {index <= descriptionParagraphIndex && (
                      <TypingText
                        key={`description-${index}`}
                        text={paragraph}
                        speed={10}
                        shouldStart={currentStep === 3 && index === descriptionParagraphIndex}
                        onComplete={() => {
                          if (index < descriptionParagraphs.length - 1) {
                            setTimeout(() => setDescriptionParagraphIndex(index + 1), 300);
                          } else {
                            setTimeout(() => setCurrentStep(4), 300);
                          }
                        }}
                      />
                    )}
                  </span>
                </span>
              </p>
            ))}
          </div>

          {/* Social Links */}
          <div
            className={cn(
              'transition-all duration-500',
              currentStep >= 4
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4',
            )}
          >
            <div className='flex justify-start space-x-6 mt-12'>
              {portfolioData.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-foreground/60 hover:text-foreground transition-colors duration-200 hover:scale-110 transform'
                  aria-label={social.name}
                >
                  <SocialIcon name={social.icon} className='w-6 h-6' />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={cn(
            'absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1400',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className='flex flex-col items-center space-y-2'>
            <span className='text-sm text-foreground/50'>Scroll down</span>
            <div className='w-0.5 h-8 bg-foreground/30 animate-pulse'></div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Simple social media icons
function SocialIcon({ name, className }: { name: string; className?: string }) {
  const icons = {
    github: (
      <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
      </svg>
    ),
    linkedin: (
      <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
      </svg>
    ),
    instagram: (
      <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
      </svg>
    ),
    email: (
      <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z' />
      </svg>
    ),
  };

  return icons[name as keyof typeof icons] || null;
}

// Add custom animation
const styles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
