import { PortableText, PortableTextComponents } from 'next-sanity';
import { urlFor } from '@/lib/sanity';

// Standardized Portable Text Components
const ptComponents: PortableTextComponents = {
    block: {
        normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-8">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-6">{children}</h3>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">{children}</blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
    },
    marks: {
        link: ({ value, children }) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
            return (
                <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined} className="text-primary hover:underline font-medium">
                    {children}
                </a>
            );
        },
    },
};

interface GenericSectionProps {
    content: {
        title: string;
        subtitle?: string;
        body?: any;
        image?: any;
        ctaText?: string;
        ctaLink?: string;
    } | null | undefined;
    variant?: string;
}

export default function GenericSection({ content, variant = 'default' }: GenericSectionProps) {
    if (!content) return null;

    const imageUrl = content.image ? urlFor(content.image) : null;

    switch (variant) {
        case 'about':
            return <SectionShell id="about"><AboutLayout content={content} imageUrl={imageUrl} /></SectionShell>;
        case 'services':
            return <SectionShell id="services"><ServicesLayout content={content} imageUrl={imageUrl} /></SectionShell>;
        case 'classes':
            return <SectionShell id="classes"><ClassesLayout content={content} imageUrl={imageUrl} /></SectionShell>;
        case 'contact':
            return <SectionShell id="contact"><ContactLayout content={content} imageUrl={imageUrl} /></SectionShell>;
        default:
            return <SectionShell id={variant}><DefaultLayout content={content} imageUrl={imageUrl} /></SectionShell>;
    }
}

// --- Reusable Wrapper ---

const SectionShell = ({ id, children }: { id: string, children: React.ReactNode }) => (
    <section id={id} className="scroll-mt-24">
        {children}
    </section>
);

// --- Layout Components ---

const AboutLayout = ({ content, imageUrl }: any) => (
    <div className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                {imageUrl && (
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="absolute -inset-4 bg-primary/10 rounded-2xl -rotate-3 transition-transform group-hover:rotate-0 duration-500"></div>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl bg-muted z-10">
                            <img
                                src={imageUrl.width(1000).height(1250).url()}
                                alt={content.title}
                                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                        </div>
                    </div>
                )}
                <div className={`w-full ${imageUrl ? 'lg:w-1/2' : 'max-w-3xl mx-auto'} relative z-10`}>
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
                        {content.subtitle || 'About Us'}
                    </span>
                    <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter text-foreground">
                        {content.title}
                    </h2>
                    {content.body && (
                        <div className="prose prose-xl prose-invert-0 text-muted-foreground mb-10 leading-relaxed">
                            <PortableText value={content.body} components={ptComponents} />
                        </div>
                    )}
                    {content.ctaText && content.ctaLink && (
                        <a
                            href={content.ctaLink}
                            className="inline-flex items-center justify-center bg-primary text-white font-black py-5 px-10 rounded-xl hover:shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.5)] transition-all duration-300"
                        >
                            {content.ctaText}
                        </a>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const ServicesLayout = ({ content, imageUrl }: any) => (
    <div className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
                {content.subtitle && (
                    <p className="text-primary font-bold tracking-[0.2em] mb-4 uppercase text-sm">{content.subtitle}</p>
                )}
                <h2 className="text-5xl font-black mb-6 tracking-tight text-foreground">{content.title}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>

            {imageUrl && (
                <div className="relative w-full h-[400px] lg:h-[600px] mb-20 rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src={imageUrl.width(1600).height(900).url()}
                        alt={content.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
            )}

            <div className="grid lg:grid-cols-1 gap-12 max-w-4xl mx-auto">
                {content.body && (
                    <div className="prose prose-2xl prose-primary mx-auto text-muted-foreground text-center">
                        <PortableText value={content.body} components={ptComponents} />
                    </div>
                )}
                {content.ctaText && content.ctaLink && (
                    <div className="pt-8 text-center">
                        <a
                            href={content.ctaLink}
                            className="inline-flex items-center justify-center border-4 border-primary text-primary font-black py-4 px-12 rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {content.ctaText}
                        </a>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const ClassesLayout = ({ content, imageUrl }: any) => (
    <div className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-stretch">
                <div className="w-full lg:w-[45%] flex flex-col justify-center">
                    {content.subtitle && (
                        <p className="text-primary font-bold mb-4 tracking-wider uppercase">{content.subtitle}</p>
                    )}
                    <h2 className="text-6xl font-black mb-10 leading-[0.9] tracking-tighter uppercase italic">
                        {content.title}
                    </h2>
                    {content.body && (
                        <div className="prose prose-xl prose-invert text-secondary-foreground/80 mb-12 border-l-8 border-primary pl-8">
                            <PortableText value={content.body} components={ptComponents} />
                        </div>
                    )}
                    {content.ctaText && content.ctaLink && (
                        <a
                            href={content.ctaLink}
                            className="bg-white text-secondary font-black py-6 px-12 text-xl inline-block w-fit hover:bg-primary hover:text-white transition-colors duration-300"
                        >
                            {content.ctaText}
                        </a>
                    )}
                </div>
                {imageUrl && (
                    <div className="w-full lg:w-[55%] relative">
                        <div className="aspect-video lg:aspect-[3/4] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
                            <img
                                src={imageUrl.width(1000).height(1333).url()}
                                alt={content.title}
                                className="object-cover w-full h-full"
                                loading="lazy"
                            />
                        </div>
                        {/* Cut corner effect */}
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-secondary -rotate-45 translate-x-12 translate-y-12"></div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const ContactLayout = ({ content, imageUrl }: any) => (
    <div className="py-24 bg-background border-t border-muted">
        <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
                <div className="mb-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    {content.subtitle && (
                        <p className="text-muted-foreground font-medium mb-2">{content.subtitle}</p>
                    )}
                    <h2 className="text-4xl font-bold mb-6 text-foreground">{content.title}</h2>
                    <div className="h-1 w-12 bg-primary mx-auto rounded-full"></div>
                </div>

                {content.body && (
                    <div className="prose prose-lg text-muted-foreground mb-12">
                        <PortableText value={content.body} components={ptComponents} />
                    </div>
                )}

                {content.ctaText && content.ctaLink && (
                    <a
                        href={content.ctaLink}
                        className="inline-flex items-center justify-center bg-foreground text-background font-bold h-14 px-12 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
                    >
                        {content.ctaText}
                    </a>
                )}
            </div>
        </div>
    </div>
);

const DefaultLayout = ({ content, imageUrl }: any) => (
    <div className="py-20 bg-background border-y border-muted/20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
            {content.subtitle && (
                <p className="text-primary font-bold tracking-widest mb-4 uppercase text-sm">{content.subtitle}</p>
            )}
            <h2 className="text-4xl font-black mb-8 tracking-tight text-foreground">{content.title}</h2>

            {imageUrl && (
                <div className="relative w-full h-80 mb-12 rounded-2xl overflow-hidden shadow-xl">
                    <img
                        src={imageUrl.width(1200).height(600).url()}
                        alt={content.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                    />
                </div>
            )}

            {content.body && (
                <div className="prose prose-xl prose-primary mx-auto text-muted-foreground mb-12">
                    <PortableText value={content.body} components={ptComponents} />
                </div>
            )}

            {content.ctaText && content.ctaLink && (
                <a
                    href={content.ctaLink}
                    className="inline-flex items-center justify-center border-2 border-primary text-primary font-bold py-3 px-10 rounded-full hover:bg-primary hover:text-white transition-all"
                >
                    {content.ctaText}
                </a>
            )}
        </div>
    </div>
);

