'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ProjectHoverContextType {
  hoveredProjectId: string | null;
  setHoveredProjectId: (id: string | null) => void;
}

const ProjectHoverContext = createContext<ProjectHoverContextType | undefined>(
  undefined,
);

export function ProjectHoverProvider({ children }: { children: ReactNode }) {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <ProjectHoverContext.Provider value={{ hoveredProjectId, setHoveredProjectId }}>
      {children}
    </ProjectHoverContext.Provider>
  );
}

export function useProjectHover() {
  const context = useContext(ProjectHoverContext);
  if (context === undefined) {
    throw new Error('useProjectHover must be used within a ProjectHoverProvider');
  }
  return context;
}


