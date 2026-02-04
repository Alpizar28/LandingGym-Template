'use client';

import { urlFor } from '@/lib/sanity';
import { motion } from 'framer-motion';

// Simple parser for Portable Text basic blocks
const toPlainText = (blocks: any[] = []) => {
    return blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) return '';
            return block.children.map((child: any) => child.text).join('');
        })
        .join('\n\n');
};

interface ServicesProps {
    content?: {
        title?: string;
        subtitle?: string;
        body?: any[];
        image?: any;
        ctaText?: string;
        ctaLink?: string;
    }
}

export default function Services({ content }: ServicesProps) {
    const {
        title = "Nuestros Servicios",
        subtitle = "Entrena a tu ritmo",
        body,
        image,
        ctaText,
        ctaLink
    } = content || {};

    const imageUrl = (image && image.asset) ? urlFor(image).url() : null;
    const bodyText = toPlainText(body);

    return (
        <section id="services" className="py-24 bg-zinc-900 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-primary font-bold tracking-[0.2em] mb-4 uppercase text-sm">{subtitle}</p>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white uppercase">{title}</h2>
                        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                    </motion.div>
                </div>

                {imageUrl && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative w-full h-[300px] md:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </motion.div>
                )}

                <div className="grid lg:grid-cols-1 gap-12 max-w-3xl mx-auto">
                    {bodyText && (
                        <div className="prose prose-xl prose-invert mx-auto text-gray-400 text-center leading-relaxed">
                            {bodyText.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    )}

                    {ctaText && ctaLink && (
                        <div className="text-center pt-8">
                            <a
                                href={ctaLink}
                                target={ctaLink.startsWith('http') ? '_blank' : undefined}
                                rel={ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="inline-flex items-center justify-center border-2 border-primary text-primary font-black py-4 px-12 rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide"
                            >
                                {ctaText}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
