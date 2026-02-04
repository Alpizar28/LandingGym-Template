import { notFound } from 'next/navigation';
import { client, LANDING_BY_SLUG_QUERY } from '@/lib/sanity';
import { getSectionComponent } from '@/lib/section-registry';
import { generateThemeStyles } from '@/lib/theme';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function LandingPage({ params }: PageProps) {
    const { slug } = await params;

    const landing = await client.fetch(LANDING_BY_SLUG_QUERY, { slug });

    if (!landing) {
        notFound();
    }

    const themeStyles = generateThemeStyles(landing.brand);

    return (
        <div style={themeStyles} className="min-h-screen bg-background text-foreground font-body">
            {/* 
        This div wraps the entire page and injects the CSS variables 
        derived from the Brand's color palette.
      */}

            {landing.sections?.map((section: any, index: number) => {
                // 1. Guard: Check if enabled
                if (!section.enabled) return null;

                // 2. Guard: Check if contentRef exists (Robustness)
                if (!section.contentRef) {
                    if (process.env.NODE_ENV === 'development') {
                        console.warn(`Section ${section.key} enabled but missing contentRef.`);
                    }
                    return null;
                }

                const Component = getSectionComponent(section.key);

                // 3. Guard: Check if component exists in registry
                if (!Component) {
                    if (process.env.NODE_ENV === 'development') {
                        console.warn(`Component not found for key: ${section.key}`);
                    }
                    return null;
                }

                // 4. Safe Render
                return (
                    <Component
                        key={`${section.key}-${index}`}
                        content={section.contentRef}
                        variant={section.variant}
                    />
                );
            })}
        </div>
    );
}
