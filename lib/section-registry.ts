// lib/section-registry.ts
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Using 'any' for props is practical here as sections have disparate props
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionComponent = ComponentType<any>;

const SECTIONS: Record<string, SectionComponent> = {
    home: dynamic(() => import('@/components/sections/Hero').then(mod => mod.default)),
    generic: dynamic(() => import('@/components/sections/GenericSection').then(mod => mod.default)),
};

export function getSectionComponent(key: string): SectionComponent | null {
    return SECTIONS[key] || null;
}
