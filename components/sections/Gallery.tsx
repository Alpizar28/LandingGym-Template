'use client';

import { useState } from 'react';
import { urlFor } from '@/lib/sanity';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryProps {
    content?: {
        headline?: string;
        subheadline?: string;
        images?: any[];
    }
}

export default function Gallery({ content }: GalleryProps) {
    const {
        headline = "Nuestras Instalaciones",
        subheadline = "Un vistazo a donde ocurre la magia",
        images = []
    } = content || {};

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // If no images, don't render anything
    if (!images || images.length === 0) return null;

    return (
        <section id="gallery" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Galería</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
                            {headline}
                        </h3>
                        {subheadline && (
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg">{subheadline}</p>
                        )}
                    </motion.div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                    {images.map((image, index) => {
                        if (!image) return null; // Safety check
                        const imageUrl = urlFor(image).url();
                        // Make some images span 2 columns or rows for a masonry feel
                        const isLarge = index % 5 === 0;
                        const isWide = index % 5 === 3;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className={`relative cursor-pointer group overflow-hidden rounded-xl bg-zinc-900 
                                    ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                                    ${isWide ? 'md:col-span-2' : ''}
                                `}
                                onClick={() => setSelectedImage(imageUrl)}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${imageUrl})` }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={40} />
                        </button>

                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            src={selectedImage}
                            alt="Gallery preview"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
