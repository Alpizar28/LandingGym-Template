'use client';

import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { motion } from 'framer-motion';

interface HeroProps {
    content?: {
        headline?: string;
        subheadline?: string;
        backgroundImage?: any;
        ctaText?: string;
        ctaLink?: string;
    }
}

export default function Hero({ content }: HeroProps) {
    const {
        headline: rawHeadline,
        subheadline: rawSubheadline,
        backgroundImage,
        ctaText: rawCtaText,
        ctaLink: rawCtaLink
    } = content || {};

    const headline = rawHeadline ?? "TRANSFORMA TU CUERPO, TRANSFORMA TU VIDA";
    const subheadline = rawSubheadline ?? "Entrenamiento profesional, equipamiento de última generación y una comunidad que apoya tus objetivos.";
    const ctaText = rawCtaText ?? "EMPIEZA GRATIS";
    const ctaLink = rawCtaLink ?? "#contact";

    // Generate image URL if exists, else fallback or null
    // Safety check: ensure backgroundImage has 'asset' property
    const bgImage = (backgroundImage && backgroundImage.asset) ? urlFor(backgroundImage).url() : null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring" as const, stiffness: 50 }
        }
    };

    return (
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Image */}
            {bgImage && (
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1.0 }}
                        transition={{ duration: 10, ease: "easeOut" }}
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                </div>
            )}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

            {/* Content */}
            <motion.div
                className="relative z-10 container mx-auto px-4 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="inline-block mb-4 overflow-hidden">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-primary/20 backdrop-blur-sm border border-primary/30 py-1 px-4 rounded-full"
                    >
                        <span className="text-primary font-bold tracking-widest text-xs md:text-sm uppercase">Bienvenido al Club</span>
                    </motion.div>
                </div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase font-heading drop-shadow-2xl"
                >
                    {headline.split('\n').map((line, i) => (
                        <span key={i} className="block">{line}</span>
                    ))}
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="w-24 h-2 bg-primary mx-auto mb-10 rounded-full"
                />

                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-300 leading-relaxed font-light"
                >
                    {subheadline}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link
                        href={ctaLink || "#contact"}
                        target={ctaLink?.startsWith('http') ? '_blank' : undefined}
                        rel={ctaLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group relative px-10 py-5 bg-primary overflow-hidden rounded-full font-black text-white shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.5)] hover:shadow-[0_0_40px_rgba(var(--brand-primary-rgb),0.7)] transition-all transform hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {ctaText}
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </span>
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"></div>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
