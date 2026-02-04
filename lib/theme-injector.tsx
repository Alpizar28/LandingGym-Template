'use client';

import { useEffect } from 'react';
import { BrandConfig } from './config-loader';

interface ThemeInjectorProps {
    config: BrandConfig;
}

export default function ThemeInjector({ config }: ThemeInjectorProps) {
    useEffect(() => {
        const root = document.documentElement;
        const { colors, typography } = config;

        // Inject Colors
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // Font injection would typically handle loading the font file via Next.js Font optimization 
        // or adding a link tag. For simplicity, we assume fonts are loaded or we map to standard ones.
        // This is a placeholder for more advanced font loading logic.
    }, [config]);

    return null;
}
