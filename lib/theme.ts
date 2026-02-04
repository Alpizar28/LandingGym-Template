// lib/theme.ts

// Define the shape of the color object coming from Sanity
export interface BrandColors {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    text?: string;
    [key: string]: string | undefined;
}

export interface BrandTypography {
    headingFont?: string;
    bodyFont?: string;
}

export interface BrandTheme {
    colors?: BrandColors;
    typography?: BrandTypography;
}

export function generateThemeStyles(brand: BrandTheme | null | undefined): React.CSSProperties {
    const styles: Record<string, string> = {};

    // Fallbacks for white-label robustness
    const colors = brand?.colors || {};

    styles['--primary'] = colors.primary || '#000000';
    styles['--secondary'] = colors.secondary || '#ffffff';
    styles['--accent'] = colors.accent || colors.primary || '#000000';
    styles['--background'] = colors.background || '#ffffff';
    styles['--foreground'] = colors.text || '#000000';

    if (brand?.typography?.headingFont) styles['--font-heading'] = brand.typography.headingFont;
    if (brand?.typography?.bodyFont) styles['--font-body'] = brand.typography.bodyFont;

    return styles as React.CSSProperties;
}
