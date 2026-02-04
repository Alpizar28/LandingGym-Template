import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { getBrandConfig } from '@/lib/config-loader';

interface FooterProps {
    config?: any;
}

export default function Footer({ config: customConfig }: FooterProps) {
    const defaultConfig = getBrandConfig();

    // Merge sanity data with default config
    // Sanity uses 'name', JSON uses 'brandName'. We normalize here.
    const config = customConfig ? {
        ...defaultConfig,
        ...customConfig,
        brandName: customConfig.name || customConfig.brandName || defaultConfig.brandName,
        contact: customConfig.contact || defaultConfig.contact,
        social: customConfig.social || defaultConfig.social
    } : defaultConfig;

    return (
        <footer className="bg-zinc-950 text-white pt-16 pb-8 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold font-heading mb-4 block">
                            <span className="text-primary">{config.brandName}</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-xs">
                            {config.footer?.text || "Transformando vidas a través del fitness, comunidad y entrenamiento experto. Únete al movimiento hoy."}
                        </p>
                        <div className="flex gap-4">
                            {config.social?.instagram && (
                                <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <Instagram size={20} />
                                </a>
                            )}
                            {config.social?.facebook && (
                                <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <Facebook size={20} />
                                </a>
                            )}
                            {config.social?.twitter && (
                                <a href={config.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <Twitter size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links (Dynamic or Static Fallback) */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-heading">ENLACES RÁPIDOS</h3>
                        <ul className="space-y-3">
                            {config.footer?.links && config.footer.links.length > 0 ? (
                                config.footer.links.map((link: any, i: number) => {
                                    if (!link || !link.title) return null;
                                    return (
                                        <li key={i}>
                                            <Link href={link.url || '#'} className="text-gray-400 hover:text-primary transition-colors">
                                                {link.title}
                                            </Link>
                                        </li>
                                    );
                                })
                            ) : (
                                // Fallback static links if none provided in Sanity
                                <>
                                    <li><Link href="#services" className="text-gray-400 hover:text-primary transition-colors">Servicios</Link></li>
                                    <li><Link href="#classes" className="text-gray-400 hover:text-primary transition-colors">Clases</Link></li>
                                    <li><Link href="#coaches" className="text-gray-400 hover:text-primary transition-colors">Entrenadores</Link></li>
                                    <li><Link href="#pricing" className="text-gray-400 hover:text-primary transition-colors">Precios</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Contact (Dynamic) */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-heading">CONTÁCTANOS</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="shrink-0 text-primary" size={20} />
                                <span>{config.contact?.address || "123 Fitness Blvd, Gym City"}</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone className="shrink-0 text-primary" size={20} />
                                <span>{config.contact?.phone || "+1 (555) 123-4567"}</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail className="shrink-0 text-primary" size={20} />
                                <span>{config.contact?.email || "hola@fitlifepro.com"}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {config.brandName}. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
