import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Define a type for the section components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionComponent = ComponentType<any>;

// Dynamic imports for all sections
const SECTIONS: Record<string, SectionComponent> = {
    home: dynamic(() => import('@/components/sections/Hero').catch(() => () => <div>Hero Section Missing</div>)),
    services: dynamic(() => import('@/components/sections/Services').catch(() => () => <div>Services Section Missing</div>)),
    about: dynamic(() => import('@/components/sections/About').catch(() => () => <div>About Section Missing</div>)),
    contact: dynamic(() => import('@/components/sections/Contact').catch(() => () => <div>Contact Section Missing</div>)),
    // Add other sections as they are created
};

export function getSectionComponent(sectionId: string): SectionComponent | null {
    return SECTIONS[sectionId] || null;
}
