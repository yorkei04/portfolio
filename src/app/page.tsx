'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import { ProjectHoverProvider, useProjectHover } from '@/contexts/ProjectHoverContext';

function LeftColumn() {
  const { hoveredProjectId } = useProjectHover();
  const [isAboutInView, setIsAboutInView] = useState(false);
  const [roboconTop, setRoboconTop] = useState<number>(0);
  const isAboutInViewRef = useRef(false);

  useEffect(() => {
    let aboutObserver: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const updateRoboconPosition = () => {
      const aboutElement = document.getElementById('about');
      const column = document.querySelector('aside');
      if (!aboutElement || !column) return;

      // Get the position and dimensions of the About section
      const aboutRect = aboutElement.getBoundingClientRect();
      const aboutTop = window.scrollY + aboutRect.top;
      const aboutHeight = aboutRect.height;
      
      // Get the position of the column relative to the document
      const columnRect = column.getBoundingClientRect();
      const columnTop = window.scrollY + columnRect.top;
      
      // Get the robocon image container to calculate its height
      const roboconContainer = column.querySelector('.robocon-container');
      let imageHeight = 0;
      
      if (roboconContainer) {
        imageHeight = roboconContainer.getBoundingClientRect().height;
      } else {
        // Fallback: estimate height based on column width (aspect-square + padding + text)
        const columnWidth = columnRect.width;
        const padding = 48; // p-6 = 24px * 2 = 48px
        imageHeight = columnWidth - padding + 100; // aspect-square + text
      }
      
      // Calculate the center position: center of About section minus half of image height
      const aboutCenter = aboutTop + (aboutHeight / 2);
      const imageTopPosition = aboutCenter - (imageHeight / 2);
      
      // Calculate the offset relative to the column
      const offset = imageTopPosition - columnTop;
      setRoboconTop(Math.max(0, offset));
    };


    const setupAboutObserver = () => {
      const aboutElement = document.getElementById('about');
      if (!aboutElement) {
        timeoutId = setTimeout(setupAboutObserver, 100);
        return;
      }

      updateRoboconPosition();

      aboutObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isIntersecting = entry.isIntersecting;
            isAboutInViewRef.current = isIntersecting;
            setIsAboutInView(isIntersecting);
            if (isIntersecting) {
              requestAnimationFrame(updateRoboconPosition);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px',
        },
      );

      aboutObserver.observe(aboutElement);
    };

    const handleScroll = () => {
      if (isAboutInViewRef.current) {
        updateRoboconPosition();
      }
    };

    setupAboutObserver();
    window.addEventListener('resize', updateRoboconPosition);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (aboutObserver) aboutObserver.disconnect();
      window.removeEventListener('resize', updateRoboconPosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <aside className='hidden lg:block lg:col-span-4 xl:col-span-5 relative'>
      {/* Default MTR OCC - Not sticky, normal flow */}
      <div className='p-4 lg:p-6 min-h-screen flex items-center justify-center mtr-occ-container'>
        <div className='w-full space-y-4'>
          <div className='w-full aspect-square bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10 relative'>
            <Image
              src='/image/mtr_occ.jpeg'
              alt='MTR OCC'
              fill
              className='object-cover'
              sizes='(max-width: 1024px) 0vw, (max-width: 1280px) 33vw, 42vw'
              priority
            />
          </div>
          <p className='text-sm text-foreground/70 leading-relaxed text-center'>
            The Operations Control Center features a large, integrated visual display wall that provides operators with real-time system status and control interfaces for SCADA, signaling, and automatic fare collection (AFC) systems, enabling continuous monitoring and rapid response
          </p>
        </div>
      </div>

      {/* Robocon Image - Positioned below MTR OCC, centered when About section is in view */}
      {isAboutInView && (
        <div
          className='p-4 lg:p-6 animate-fade-in absolute w-full robocon-container'
          style={{ top: `${roboconTop}px` }}
        >
          <div className='w-full space-y-4'>
            <div className='w-full aspect-square bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10 relative'>
              <Image
                src='/image/robocon.jpeg'
                alt='Robocon Hong Kong Champion 2021'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 0vw, (max-width: 1280px) 33vw, 42vw'
              />
            </div>
            <p className='text-sm text-foreground/70 leading-relaxed text-center'>
              While studying Computer Engineering, I explored hardware–software integration in robotics and helped my university team win Robocon Hong Kong 2021. I designed the pick‑and‑place mechanism for the arrow‑shooter.
            </p>
          </div>
        </div>
      )}

    </aside>
  );
}

function LightRailOverlay() {
  const { hoveredProjectId } = useProjectHover();
  const isLightRailHovered = hoveredProjectId === '1';
  const [lightRailTop, setLightRailTop] = useState<number>(0);

  // Update Light Rail position to align with Light Rail project card
  useEffect(() => {
    const updateLightRailPosition = () => {
      // Find the Light Rail project card (id='1')
      const lightRailCard = document.querySelector('[data-project-id="1"]');
      const outerContainer = document.querySelector('.min-h-screen.font-sans');
      if (!lightRailCard || !outerContainer) return;

      // Get the position of the Light Rail project card
      const lightRailRect = lightRailCard.getBoundingClientRect();
      const lightRailTop = window.scrollY + lightRailRect.top;
      
      // Get the position of the outer container
      const containerRect = outerContainer.getBoundingClientRect();
      const containerTop = window.scrollY + containerRect.top;
      
      // Calculate the offset relative to the outer container to align with Light Rail card top
      const offset = lightRailTop - containerTop;
      setLightRailTop(Math.max(0, offset));
    };

    // Update position on mount and when Light Rail is hovered
    if (isLightRailHovered) {
      updateLightRailPosition();
      window.addEventListener('resize', updateLightRailPosition);
      window.addEventListener('scroll', updateLightRailPosition, { passive: true });

      return () => {
        window.removeEventListener('resize', updateLightRailPosition);
        window.removeEventListener('scroll', updateLightRailPosition);
      };
    }
  }, [isLightRailHovered]);

  if (!isLightRailHovered) return null;

  return (
    <div
      className='hidden lg:block absolute right-0 pointer-events-none z-10 animate-fade-in'
      style={{ 
        top: `${lightRailTop}px`,
        width: '65vw',
        maxWidth: '1400px',
        padding: '1.5rem'
      }}
    >
      <div className='w-full space-y-4'>
        <div className='w-full min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] bg-foreground/5 rounded-lg overflow-hidden relative'>
          <Image
            src='/image/mtr_light_rail.png'
            alt='Revamp Station Computer to Light Rail'
            fill
            className='object-contain'
            sizes='65vw'
          />
        </div>
        <p className='text-sm text-foreground/70 leading-relaxed text-center'>
          Revamped the legacy station computer system from Unix SunOS to Debian Linux with a modern new UI for station operators
        </p>
      </div>
    </div>
  );
}

function McsOverlay() {
  const { hoveredProjectId } = useProjectHover();
  const isSCADAHovered = hoveredProjectId === '2';
  const [mcsTop, setMcsTop] = useState<number>(0);

  // Update MCS position to align with SCADA project card
  useEffect(() => {
    const updateMcsPosition = () => {
      // Find the SCADA project card (id='2')
      const scadaCard = document.querySelector('[data-project-id="2"]');
      const outerContainer = document.querySelector('.min-h-screen.font-sans');
      if (!scadaCard || !outerContainer) return;

      // Get the position of the SCADA project card
      const scadaRect = scadaCard.getBoundingClientRect();
      const scadaTop = window.scrollY + scadaRect.top;
      
      // Get the position of the outer container
      const containerRect = outerContainer.getBoundingClientRect();
      const containerTop = window.scrollY + containerRect.top;
      
      // Calculate the offset relative to the outer container to align with SCADA card top
      const offset = scadaTop - containerTop;
      setMcsTop(Math.max(0, offset));
    };

    // Update position on mount and when SCADA is hovered
    if (isSCADAHovered) {
      updateMcsPosition();
      window.addEventListener('resize', updateMcsPosition);
      window.addEventListener('scroll', updateMcsPosition, { passive: true });

      return () => {
        window.removeEventListener('resize', updateMcsPosition);
        window.removeEventListener('scroll', updateMcsPosition);
      };
    }
  }, [isSCADAHovered]);

  if (!isSCADAHovered) return null;

  return (
    <div
      className='hidden lg:block absolute right-0 pointer-events-none z-10 animate-fade-in'
      style={{ 
        top: `${mcsTop}px`,
        width: '65vw',
        maxWidth: '1400px',
        padding: '1.5rem'
      }}
    >
      <div className='w-full space-y-4'>
        <div className='w-full min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] bg-foreground/5 rounded-lg overflow-hidden relative'>
          <Image
            src='/image/mcs.png'
            alt='MCS System'
            fill
            className='object-contain'
            sizes='65vw'
          />
        </div>
        <p className='text-sm text-foreground/70 leading-relaxed text-center'>
          The main screen webapp of MTR SCADA Main Control System
        </p>
      </div>
    </div>
  );
}

function SurgicalOverlay() {
  const { hoveredProjectId } = useProjectHover();
  const isSurgicalHovered = hoveredProjectId === '3';
  const [surgicalTop, setSurgicalTop] = useState<number>(0);

  // Update Surgical position to align with Surgical Counting project card
  useEffect(() => {
    const updateSurgicalPosition = () => {
      // Find the Surgical Counting project card (id='3')
      const surgicalCard = document.querySelector('[data-project-id="3"]');
      const outerContainer = document.querySelector('.min-h-screen.font-sans');
      if (!surgicalCard || !outerContainer) return;

      // Get the position of the Surgical Counting project card
      const surgicalRect = surgicalCard.getBoundingClientRect();
      const surgicalTop = window.scrollY + surgicalRect.top;
      
      // Get the position of the outer container
      const containerRect = outerContainer.getBoundingClientRect();
      const containerTop = window.scrollY + containerRect.top;
      
      // Calculate the offset relative to the outer container to align with Surgical card top
      const offset = surgicalTop - containerTop;
      setSurgicalTop(Math.max(0, offset));
    };

    // Update position on mount and when Surgical is hovered
    if (isSurgicalHovered) {
      updateSurgicalPosition();
      window.addEventListener('resize', updateSurgicalPosition);
      window.addEventListener('scroll', updateSurgicalPosition, { passive: true });

      return () => {
        window.removeEventListener('resize', updateSurgicalPosition);
        window.removeEventListener('scroll', updateSurgicalPosition);
      };
    }
  }, [isSurgicalHovered]);

  if (!isSurgicalHovered) return null;

  return (
    <div
      className='hidden lg:block absolute right-0 pointer-events-none z-10 animate-fade-in'
      style={{ 
        top: `${surgicalTop}px`,
        width: '65vw',
        maxWidth: '1400px',
        padding: '1.5rem'
      }}
    >
      <div className='w-full space-y-4'>
        <div className='w-full min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] bg-foreground/5 rounded-lg overflow-hidden relative'>
          <Image
            src='/image/surgical.png'
            alt='Surgical Counting Computer Vision System'
            fill
            className='object-contain'
            sizes='65vw'
          />
        </div>
        <p className='text-sm text-foreground/70 leading-relaxed text-center'>
          High-precision surgical counting computer vision model achieving over 99% accuracy, deployed to a cross-platform mobile application
        </p>
      </div>
    </div>
  );
}

function RoboconOverlay() {
  const { hoveredProjectId } = useProjectHover();
  const isRoboconHovered = hoveredProjectId === '4';
  const [roboconTop, setRoboconTop] = useState<number>(0);

  // Update Robocon position to align with Robocon project card
  useEffect(() => {
    const updateRoboconPosition = () => {
      // Find the Robocon project card (id='4')
      const roboconCard = document.querySelector('[data-project-id="4"]');
      const outerContainer = document.querySelector('.min-h-screen.font-sans');
      if (!roboconCard || !outerContainer) return;

      // Get the position of the Robocon project card
      const roboconRect = roboconCard.getBoundingClientRect();
      const roboconTop = window.scrollY + roboconRect.top;
      
      // Get the position of the outer container
      const containerRect = outerContainer.getBoundingClientRect();
      const containerTop = window.scrollY + containerRect.top;
      
      // Calculate the offset relative to the outer container to align with Robocon card top
      const offset = roboconTop - containerTop;
      setRoboconTop(Math.max(0, offset));
    };

    // Update position on mount and when Robocon is hovered
    if (isRoboconHovered) {
      updateRoboconPosition();
      window.addEventListener('resize', updateRoboconPosition);
      window.addEventListener('scroll', updateRoboconPosition, { passive: true });

      return () => {
        window.removeEventListener('resize', updateRoboconPosition);
        window.removeEventListener('scroll', updateRoboconPosition);
      };
    }
  }, [isRoboconHovered]);

  if (!isRoboconHovered) return null;

  return (
    <div
      className='hidden lg:block absolute right-0 pointer-events-none z-10 animate-fade-in'
      style={{ 
        top: `${roboconTop}px`,
        width: '65vw',
        maxWidth: '1400px',
        padding: '1.5rem'
      }}
    >
      <div className='w-full space-y-4'>
        <div className='w-full min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] bg-foreground/5 rounded-lg overflow-hidden relative'>
          <Image
            src='/image/robocon3.jpg'
            alt='Mechanical Design in Robocon 2021'
            fill
            className='object-contain'
            sizes='65vw'
          />
        </div>
        <p className='text-sm text-foreground/70 leading-relaxed text-center'>
          Won the championship and represent Hong Kong to participate Asia-Pacific Robocon Contest.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ProjectHoverProvider>
      <div className='min-h-screen font-sans relative overflow-x-hidden'>
        <Header />
        <main className='grid grid-cols-12 gap-4 lg:gap-6 xl:gap-8 max-w-[1920px] mx-auto relative'>
          {/* Main Content */}
          <div className='col-span-12 lg:col-span-8 xl:col-span-7'>
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Education />
            <Contact />
          </div>

          {/* Right Column - Shows MTR OCC, Robocon (when About in view) */}
          <LeftColumn />
        </main>
        <Footer />
        {/* Light Rail Image Overlay - Positioned on right side of page, overlaying both columns */}
        <LightRailOverlay />
        {/* MCS Image Overlay - Positioned on right side of page, overlaying both columns */}
        <McsOverlay />
        {/* Surgical Image Overlay - Positioned on right side of page, overlaying both columns */}
        <SurgicalOverlay />
        {/* Robocon Image Overlay - Positioned on right side of page, overlaying both columns */}
        <RoboconOverlay />
      </div>
    </ProjectHoverProvider>
  );
}
