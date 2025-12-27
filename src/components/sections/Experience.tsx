'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById('experience');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id='experience' className='py-20'>
      <Container>
        <div className='max-w-4xl mx-auto'>
          {/* Section Header */}
          <div
            className={cn(
              'text-center mb-16 transition-all duration-1000',
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8',
            )}
          >
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Experience</h2>
            <p className='text-foreground/70 text-lg max-w-2xl mx-auto'>
              My professional journey and the experiences that have shaped my
              career
            </p>
          </div>

          {/* Timeline */}
          <div className='relative'>
            {/* Timeline Line */}
            <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-foreground/20 hidden md:block'></div>

            {/* Experience Items */}
            <div className='space-y-12'>
              {portfolioData.experience.map((exp, index) => (
                <ExperienceItem
                  key={exp.id}
                  experience={exp}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

interface ExperienceItemProps {
  experience: {
    id: string;
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string;
    achievements: string[];
    technologies: string[];
  };
  index: number;
  isVisible: boolean;
}

function ExperienceItem({ experience, index, isVisible }: ExperienceItemProps) {
  return (
    <div
      data-experience-id={experience.id}
      className={cn(
        'relative transition-all duration-1000',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{
        transitionDelay: `${index * 200}ms`,
      }}
    >
      {/* Timeline Dot */}
      <div className='absolute left-6 w-4 h-4 bg-foreground rounded-full border-4 border-background shadow-lg hidden md:block'></div>

      {/* Content */}
      <div className='md:ml-20'>
        <div className='bg-background border border-foreground/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4'>
            <div>
              <h3 className='text-xl font-bold text-foreground'>
                {experience.position}
              </h3>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 text-foreground/70'>
                <span className='font-medium'>{experience.company}</span>
                <span className='hidden sm:block'>•</span>
                <span>{experience.location}</span>
              </div>
            </div>
            <div className='flex flex-col items-start sm:items-end mt-2 sm:mt-0'>
              <span className='text-sm font-medium text-foreground/80'>
                {experience.duration}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className='text-foreground/80 mb-4 leading-relaxed'>
            {experience.description}
          </p>

          {/* Achievements */}
          <div className='mb-6'>
            <h4 className='font-medium text-foreground mb-3'>
              Key Achievements
            </h4>
            <ul className='space-y-2'>
              {experience.achievements.map((achievement, achievementIndex) => (
                <li key={achievementIndex} className='flex items-start'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                  <span className='text-foreground/80 text-sm'>
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className='font-medium text-foreground mb-3'>
              Technologies Used
            </h4>
            <div className='flex flex-wrap gap-2'>
              {experience.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant='secondary' className='text-xs'>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Photos - Only visible on mobile, hidden on desktop */}
        {experience.id === '1' && (
          <div className='lg:hidden mt-6 px-4'>
            <div className='w-full space-y-4 max-w-md mx-auto'>
              <div className='w-full aspect-[3/2] bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10 relative'>
                <Image
                  src='/image/mtr_gate_chiikawa.jpg'
                  alt='MTR Gate'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 0vw'
                />
              </div>
              <p className='text-sm text-foreground/70 leading-relaxed text-center'>
                First real exposure to payment transaction, where I learned how to ensure data uniqueness by cross‑checking usage data, audit logs, and message queues.
              </p>
            </div>
          </div>
        )}

        {experience.id === '2' && (
          <div className='lg:hidden mt-6 px-4'>
            <div className='w-full space-y-4 max-w-md mx-auto'>
              <div className='w-full aspect-[3/2] bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10 relative'>
                <Image
                  src='/image/mtr_scada.jpg'
                  alt='MTR SCADA'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 0vw'
                />
              </div>
              <p className='text-sm text-foreground/70 leading-relaxed text-center'>
                First real exposure to a wide range of industrial‑grade electrical and mechanical systems, many of them safety‑critical.
              </p>
            </div>
          </div>
        )}

        {experience.id === '4' && (
          <div className='lg:hidden mt-6 px-4'>
            <div className='w-full space-y-4 max-w-md mx-auto'>
              <div className='w-full aspect-[3/2] bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10 relative'>
                <Image
                  src='/image/AECOM_ArcGIS.jpg'
                  alt='AECOM ArcGIS'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 0vw'
                />
              </div>
              <p className='text-sm text-foreground/70 leading-relaxed text-center'>
                First hands‑on experience with the Microsoft stack, using C#, .NET, and MS SQL to turn ArcGIS files into queryable geospatial data.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
