import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading tracking-tight">
                    TRANSFORM YOUR <span className="text-primary">BODY</span>
                    <br />
                    TRANSFORM YOUR <span className="text-primary">LIFE</span>
                </h1>

                <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200">
                    Professional training, state-of-the-art equipment, and a community that supports your goals.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="#contact"
                        className="px-8 py-4 bg-primary text-white font-bold rounded hover:bg-opacity-90 transition-all transform hover:scale-105"
                    >
                        START FREE TRIAL
                    </Link>
                    <Link
                        href="#classes"
                        className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded hover:bg-white hover:text-black transition-all"
                    >
                        VIEW CLASSES
                    </Link>
                </div>
            </div>
        </section>
    );
}
