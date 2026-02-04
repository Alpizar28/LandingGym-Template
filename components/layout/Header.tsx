'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { getBrandConfig } from '@/lib/config-loader';

export default function Header({ config: customConfig }: { config?: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Merge provided config with default, normalizing name
    const defaultConfig = getBrandConfig();
    const config = customConfig ? {
        ...defaultConfig,
        ...customConfig,
        brandName: customConfig.name || customConfig.brandName || defaultConfig.brandName
    } : defaultConfig;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formatName = (id: string) => {
        return id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    // Use custom links from Sanity OR fallback to auto-generated links from activeSections
    const navLinks = config.header?.links && config.header.links.length > 0
        ? config.header.links.map((link: any) => ({ name: link.title, href: link.url }))
        : config.activeSections
            .filter((id: string) => id !== 'home')
            .map((id: string) => ({ name: formatName(id), href: `#${id}` }));

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm border-b border-white/10'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold font-heading tracking-tighter hover:opacity-80 transition-opacity">
                        <span className="text-primary">{config.brandName.split(' ')[0]}</span>
                        <span className="text-foreground">{config.brandName.split(' ').slice(1).join(' ')}</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="#signup"
                            className="bg-primary text-white px-6 py-2.5 rounded font-bold text-sm hover:bg-opacity-90 transition-all transform hover:scale-105"
                        >
                            ÚNETE AHORA
                        </Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border animate-in slide-in-from-top-5">
                    <nav className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium p-2 hover:bg-muted/50 rounded transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="#signup"
                            className="mt-2 bg-primary text-white p-3 rounded text-center font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            ÚNETE AHORA
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
