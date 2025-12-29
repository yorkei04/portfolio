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
  const [isEducationInView, setIsEducationInView] = useState(false);
  const [roboconTop, setRoboconTop] = useState<number>(0);
  const isEducationInViewRef = useRef(false);
  const [isExperienceInView, setIsExperienceInView] = useState(false);
  const [mtrGateTop, setMtrGateTop] = useState<number>(0);
  const isExperienceInViewRef = useRef(false);
  const [isHitachiRailInView, setIsHitachiRailInView] = useState(false);
  const [mtrScadaTop, setMtrScadaTop] = useState<number>(0);
  const isHitachiRailInViewRef = useRef(false);
  const [isAecomInView, setIsAecomInView] = useState(false);
  const [aecomArcGisTop, setAecomArcGisTop] = useState<number>(0);
  const isAecomInViewRef = useRef(false);
  const [isAboutInView, setIsAboutInView] = useState(false);
  const [mtrDepotTop, setMtrDepotTop] = useState<number>(0);
  const isAboutInViewRef = useRef(false);

  useEffect(() => {
    let educationObserver: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const updateRoboconPosition = () => {
      // Find the CUHK education entry (id='2')
      const cuhkEducationItem = document.querySelector('[data-education-id="2"]');
      const column = document.querySelector('aside');
      if (!cuhkEducationItem || !column) return;

      // Find the card frame inside the education item
      const cardFrame = cuhkEducationItem.querySelector('.bg-background.border');
      const targetElement = cardFrame || cuhkEducationItem;
      
      // Get the position of the card frame
      const targetRect = targetElement.getBoundingClientRect();
      const targetTop = window.scrollY + targetRect.top;
      const targetHeight = targetRect.height;
      
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
      
      // Calculate the center position: center of CUHK education item minus half of image height
      const targetCenter = targetTop + (targetHeight / 2);
      const imageTopPosition = targetCenter - (imageHeight / 2);
      
      // Calculate the offset relative to the column
      const offset = imageTopPosition - columnTop;
      setRoboconTop(Math.max(0, offset));
    };


    const setupEducationObserver = () => {
      const educationElement = document.getElementById('education');
      if (!educationElement) {
        timeoutId = setTimeout(setupEducationObserver, 100);
        return;
      }

      updateRoboconPosition();

      educationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isIntersecting = entry.isIntersecting;
            isEducationInViewRef.current = isIntersecting;
            setIsEducationInView(isIntersecting);
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

      educationObserver.observe(educationElement);
    };

    const handleScroll = () => {
      if (isEducationInViewRef.current) {
        updateRoboconPosition();
      }
    };

    setupEducationObserver();
    window.addEventListener('resize', updateRoboconPosition);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (educationObserver) educationObserver.disconnect();
      window.removeEventListener('resize', updateRoboconPosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let experienceObserver: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const updateMtrGatePosition = () => {
      // Find the specific experience item (Operations Engineering Associate with id='1')
      const experienceItem = document.querySelector('[data-experience-id="1"]');
      const column = document.querySelector('aside');
      if (!experienceItem || !column) return;

      // Find the card frame inside the experience item
      const cardFrame = experienceItem.querySelector('.bg-background.border');
      const targetElement = cardFrame || experienceItem;
      
      // Get the position of the card frame
      const targetRect = targetElement.getBoundingClientRect();
      const targetTop = window.scrollY + targetRect.top;
      
      // Get the position of the column relative to the document
      const columnRect = column.getBoundingClientRect();
      const columnTop = window.scrollY + columnRect.top;
      
      // Calculate the offset relative to the column to align with the card frame top
      // Subtract approximately one line height (24px) to move it higher
      const offset = targetTop - columnTop - 24;
      setMtrGateTop(Math.max(0, offset));
    };

    const setupExperienceObserver = () => {
      const experienceElement = document.getElementById('experience');
      if (!experienceElement) {
        timeoutId = setTimeout(setupExperienceObserver, 100);
        return;
      }

      updateMtrGatePosition();

      experienceObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isIntersecting = entry.isIntersecting;
            isExperienceInViewRef.current = isIntersecting;
            setIsExperienceInView(isIntersecting);
            if (isIntersecting) {
              requestAnimationFrame(updateMtrGatePosition);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px',
        },
      );

      experienceObserver.observe(experienceElement);
    };

    const handleScroll = () => {
      if (isExperienceInViewRef.current) {
        updateMtrGatePosition();
      }
    };

    setupExperienceObserver();
    window.addEventListener('resize', updateMtrGatePosition);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (experienceObserver) experienceObserver.disconnect();
      window.removeEventListener('resize', updateMtrGatePosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let experienceObserver: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const updateMtrScadaPosition = () => {
      // Find the specific experience item (Associate Software Engineer at Hitachi Rail with id='2')
      const experienceItem = document.querySelector('[data-experience-id="2"]');
      const column = document.querySelector('aside');
      if (!experienceItem || !column) return;

      // Find the card frame inside the experience item
      const cardFrame = experienceItem.querySelector('.bg-background.border');
      const targetElement = cardFrame || experienceItem;
      
      // Get the position of the card frame
      const targetRect = targetElement.getBoundingClientRect();
      const targetTop = window.scrollY + targetRect.top;
      
      // Get the position of the column relative to the document
      const columnRect = column.getBoundingClientRect();
      const columnTop = window.scrollY + columnRect.top;
      
      // Calculate the offset relative to the column to align with the card frame top
      // Subtract approximately one line height (24px) to move it higher
      const offset = targetTop - columnTop - 24;
      setMtrScadaTop(Math.max(0, offset));
    };

    const setupExperienceObserver = () => {
      const experienceElement = document.getElementById('experience');
      if (!experienceElement) {
        timeoutId = setTimeout(setupExperienceObserver, 100);
        return;
      }

      updateMtrScadaPosition();

      experienceObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isIntersecting = entry.isIntersecting;
            isHitachiRailInViewRef.current = isIntersecting;
            setIsHitachiRailInView(isIntersecting);
            if (isIntersecting) {
              requestAnimationFrame(updateMtrScadaPosition);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px',
        },
      );

      experienceObserver.observe(experienceElement);
    };

    const handleScroll = () => {
      if (isHitachiRailInViewRef.current) {
        updateMtrScadaPosition();
      }
    };

    setupExperienceObserver();
    window.addEventListener('resize', updateMtrScadaPosition);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (experienceObserver) experienceObserver.disconnect();
      window.removeEventListener('resize', updateMtrScadaPosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let experienceObserver: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const updateAecomArcGisPosition = () => {
      // Find the specific experience item (Programmer Trainee at AECOM with id='4')
      const experienceItem = document.querySelector('[data-experience-id="4"]');
      const column = document.querySelector('aside');
      if (!experienceItem || !column) return;

      // Find the card frame inside the experience item
      const cardFrame = experienceItem.querySelector('.bg-background.border');
      const targetElement = cardFrame || experienceItem;
      
      // Get the position of the card frame
      const targetRect = targetElement.getBoundingClientRect();
      const targetTop = window.scrollY + targetRect.top;
      
      // Get the position of the column relative to the document
      const columnRect = column.getBoundingClientRect();
      const columnTop = window.scrollY + columnRect.top;
      
      // Calculate the offset relative to the column to align with the card frame top
      // Subtract approximately one line height (24px) to move it higher
      const offset = targetTop - columnTop - 24;
      setAecomArcGisTop(Math.max(0, offset));
    };

    const setupExperienceObserver = () => {
      const experienceElement = document.getElementById('experience');
      if (!experienceElement) {
        timeoutId = setTimeout(setupExperienceObserver, 100);
        return;
      }

      updateAecomArcGisPosition();

      experienceObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isIntersecting = entry.isIntersecting;
            isAecomInViewRef.current = isIntersecting;
            setIsAecomInView(isIntersecting);
            if (isIntersecting) {
              requestAnimationFrame(updateAecomArcGisPosition);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px',
        },
      );

      experienceObserver.observe(experienceElement);
    };

    const handleScroll = () => {
      if (isAecomInViewRef.current) {
        updateAecomArcGisPosition();
      }
    };

    setupExperienceObserver();
    window.addEventListener('resize', updateAecomArcGisPosition);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (experienceObserver) experienceObserver.disconnect();
      window.removeEventListener('resize', updateAecomArcGisPosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let aboutObserver: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const updateMtrDepotPosition = () => {
      // Find the About section
      const aboutElement = document.getElementById('about');
      const column = document.querySelector('aside');
      if (!aboutElement || !column) return;

      // Get the position of the About section
      const aboutRect = aboutElement.getBoundingClientRect();
      const aboutTop = window.scrollY + aboutRect.top;
      const aboutHeight = aboutRect.height;
      
      // Get the position of the column relative to the document
      const columnRect = column.getBoundingClientRect();
      const columnTop = window.scrollY + columnRect.top;
      
      // Get the mtr depot image container to calculate its height
      const mtrDepotContainer = column.querySelector('.mtr-depot-container');
      let imageHeight = 0;
      
      if (mtrDepotContainer) {
        imageHeight = mtrDepotContainer.getBoundingClientRect().height;
      } else {
        // Fallback: estimate height based on column width (aspect-square + padding)
        const columnWidth = columnRect.width;
        const padding = 48; // p-6 = 24px * 2 = 48px
        imageHeight = (columnWidth * 2 / 3) + padding; // w-2/3 aspect-square + padding
      }
      
      // Calculate the center position: center of About section minus half of image height
      const aboutCenter = aboutTop + (aboutHeight / 2);
      const imageTopPosition = aboutCenter - (imageHeight / 2);
      
      // Calculate the offset relative to the column
      const offset = imageTopPosition - columnTop;
      setMtrDepotTop(Math.max(0, offset));
    };

    const setupAboutObserver = () => {
      const aboutElement = document.getElementById('about');
      if (!aboutElement) {
        timeoutId = setTimeout(setupAboutObserver, 100);
        return;
      }

      updateMtrDepotPosition();

      aboutObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isIntersecting = entry.isIntersecting;
            isAboutInViewRef.current = isIntersecting;
            setIsAboutInView(isIntersecting);
            if (isIntersecting) {
              requestAnimationFrame(updateMtrDepotPosition);
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
        updateMtrDepotPosition();
      }
    };

    setupAboutObserver();
    window.addEventListener('resize', updateMtrDepotPosition);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (aboutObserver) aboutObserver.disconnect();
      window.removeEventListener('resize', updateMtrDepotPosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <aside className='hidden lg:block lg:col-span-4 xl:col-span-5 relative bg-background'>
      {/* Default MTR OCC - Not sticky, normal flow */}
      <div className='p-4 lg:p-6 min-h-screen flex items-center justify-center mtr-occ-container'>
        <div className='w-2/3 space-y-4 mx-auto'>
          <div className='w-full aspect-square bg-foreground/3 rounded-lg overflow-hidden border border-foreground/10 relative'>
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
            The Operations Control Center provides real-time monitoring and control for SCADA, signaling, and AFC systems.
          </p>
        </div>
      </div>

      {/* Robocon Image - Positioned below MTR OCC, left-aligned when Education section is in view */}
      {isEducationInView && (
        <div
          className='p-4 lg:p-6 animate-fade-in absolute w-full robocon-container'
          style={{ top: `${roboconTop}px` }}
        >
          <div className='w-2/3 space-y-4'>
            <div className='w-full aspect-square bg-foreground/3 rounded-lg overflow-hidden border border-foreground/10 relative'>
              <Image
                src='/image/robocon.jpeg'
                alt='Robocon Hong Kong Champion 2021'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 0vw, (max-width: 1280px) 33vw, 42vw'
              />
            </div>
            <p className='text-sm text-foreground/70 leading-relaxed text-left'>
              While studying Computer Engineering, I explored in robotics and helped my university team win Robocon Hong Kong 2021.
            </p>
          </div>
        </div>
      )}

      {/* MTR Gate Image - Positioned next to Operations Engineering Associate experience */}
      {isExperienceInView && (
        <div
          className='p-4 lg:p-6 animate-fade-in absolute w-full mtr-gate-container'
          style={{ top: `${mtrGateTop}px` }}
        >
          <div className='w-2/3 space-y-4'>
            <div className='w-full aspect-[3/2] bg-foreground/3 rounded-lg overflow-hidden border border-foreground/10 relative'>
              <Image
                src='/image/mtr_gate_chiikawa.jpg'
                alt='MTR Gate'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 0vw, (max-width: 1280px) 25vw, 32vw'
              />
            </div>
            <p className='text-sm text-foreground/70 leading-relaxed text-left'>
              First exposure to payment transaction, where I learned how to ensure data uniqueness by checking usage data and audit logs.
            </p>
          </div>
        </div>
      )}

      {/* MTR SCADA Image - Positioned next to Associate Software Engineer at Hitachi Rail experience */}
      {isHitachiRailInView && (
        <div
          className='p-4 lg:p-6 animate-fade-in absolute w-full mtr-scada-container'
          style={{ top: `${mtrScadaTop}px` }}
        >
          <div className='w-2/3 space-y-4'>
            <div className='w-full aspect-[3/2] bg-foreground/3 rounded-lg overflow-hidden border border-foreground/10 relative'>
              <Image
                src='/image/mtr_scada.jpg'
                alt='MTR SCADA'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 0vw, (max-width: 1280px) 25vw, 32vw'
              />
            </div>
            <p className='text-sm text-foreground/70 leading-relaxed text-left'>
              First exposure to a wide range of industrial‑grade electrical and mechanical systems, many of them safety‑critical.
            </p>
          </div>
        </div>
      )}

      {/* AECOM ArcGIS Image - Positioned next to Programmer Trainee at AECOM experience */}
      {isAecomInView && (
        <div
          className='p-4 lg:p-6 animate-fade-in absolute w-full aecom-arcgis-container'
          style={{ top: `${aecomArcGisTop}px` }}
        >
          <div className='w-2/3 space-y-4'>
            <div className='w-full aspect-[3/2] bg-foreground/3 rounded-lg overflow-hidden border border-foreground/10 relative'>
              <Image
                src='/image/AECOM_ArcGIS.jpg'
                alt='AECOM ArcGIS'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 0vw, (max-width: 1280px) 25vw, 32vw'
              />
            </div>
            <p className='text-sm text-foreground/70 leading-relaxed text-left'>
              First experience with the Microsoft stack, using C#, .NET, and MS SQL to convert ArcGIS files into queryable geospatial data.
            </p>
          </div>
        </div>
      )}

      {/* MTR Depot Image - Positioned next to About section */}
      {isAboutInView && (
        <div
          className='p-4 lg:p-6 animate-fade-in absolute w-full mtr-depot-container'
          style={{ top: `${mtrDepotTop}px` }}
        >
          <div className='w-2/3 space-y-4 mx-auto'>
            <div className='w-full aspect-square bg-foreground/3 rounded-lg overflow-hidden border border-foreground/10 relative'>
              <Image
                src='/image/mtr_depot.jpeg'
                alt='MTR Depot'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 0vw, (max-width: 1280px) 33vw, 42vw'
              />
            </div>
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
          The station computer can remotely monitor each entry/exit processor fare transactions, update fare tables, and switch between in‑service and out‑of‑service.
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
        The main-screen web application of the MTR SCADA Main Control System provides a centralized, real‑time overview of railway assets, alarms, and operating status across the network.
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
          The confusion matrix summarizes the performance of the trained model in classifying surgical instruments. On the right, all instruments are arranged in a dedicated washing tray used in the hospital's sterilization area. Bounding boxes indicate the model's detections and label each instrument type within the tray.
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
          Won the championship at Hong Kong Contest and represented Hong Kong in the Asia‑Pacific Robocon Contest as part of a large, multidisciplinary robotics team of over 20 members. 
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
            {/* Mobile MTR OCC Photo - Only visible on mobile, hidden on desktop */}
            <div className='lg:hidden px-4 py-8'>
              <div className='w-full space-y-4 max-w-md mx-auto'>
                <div className='w-full aspect-square bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10 relative'>
                  <Image
                    src='/image/mtr_occ.jpeg'
                    alt='MTR OCC'
                    fill
                    className='object-cover'
                    sizes='(max-width: 1024px) 100vw, 0vw'
                    priority
                  />
                </div>
                <p className='text-sm text-foreground/70 leading-relaxed text-center'>
                  The Operations Control Center provides real-time monitoring and control for SCADA, signaling, and AFC systems.
                </p>
              </div>
            </div>
            <About />
            {/* Mobile MTR Depot Photo - Only visible on mobile, hidden on desktop */}
            <div className='lg:hidden px-4 py-8'>
              <div className='w-full space-y-4 max-w-md mx-auto'>
                <div className='w-full aspect-square bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10 relative'>
                  <Image
                    src='/image/mtr_depot.jpg'
                    alt='MTR Depot'
                    fill
                    className='object-cover'
                    sizes='(max-width: 1024px) 100vw, 0vw'
                  />
                </div>
              </div>
            </div>
            <Projects />
            <Experience />
            <Education />
          </div>

          {/* Right Column - Shows MTR OCC, Robocon (when About in view) */}
          <LeftColumn />
          
          {/* Contact Section - Full width, breaks out of two-column layout */}
          <div className='col-span-12'>
            <Contact />
          </div>
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
