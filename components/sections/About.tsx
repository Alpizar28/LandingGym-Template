'use client';

import { urlFor } from '@/lib/sanity';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AboutProps {
    content?: {
        title?: string;
        subtitle?: string;
        body?: any[];
        image?: any;
    }
}

// Función simple para extraer texto plano del formato "Rich Text" de Sanity
const toPlainText = (blocks: any[] = []) => {
    return blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) return '';
            return block.children.map((child: any) => child.text).join('');
        })
        .join('\n\n');
};

export default function About({ content }: AboutProps) {
    const {
        title = "Nuestra Historia",
        subtitle = "Más que un gimnasio, una familia.",
        body,
        image
    } = content || {};

    const imageUrl = image ? urlFor(image).url() : null;
    const description = body ? toPlainText(body) : "En FitLife Pro, creemos que el fitness no es solo un destino, sino un viaje. Fundado en 2024, nuestro objetivo es proporcionar el mejor equipamiento y el ambiente más motivador para ayudarte a alcanzar tus metas.";

    return (
        <section id="about" className="py-24 bg-zinc-900 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-primary font-bold tracking-widest uppercase mb-2 text-sm">Sobre Nosotros</h2>
                        <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase leading-tight font-heading">
                            {title}
                        </h3>
                        <p className="text-xl text-gray-300 mb-6 font-light">
                            {subtitle}
                        </p>
                        <div className="prose prose-invert text-gray-400">
                            {description.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4">{paragraph}</p>
                            ))}
                        </div>

                        {/* Stats / Features */}
                        <div className="grid grid-cols-3 gap-6 mt-10 border-t border-white/10 pt-8">
                            <div>
                                <h4 className="text-3xl font-black text-white">500+</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Miembros</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-black text-white">20+</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Entrenadores</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-black text-white">15</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Clases</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-square md:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl bg-zinc-800">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={title}
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                                    <span className="text-lg">Imagen no disponible</span>
                                </div>
                            )}

                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary z-10 rounded-full blur-2xl opacity-50"></div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 z-10 rounded-full blur-3xl opacity-20"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
