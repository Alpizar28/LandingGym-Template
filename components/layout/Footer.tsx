import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { getBrandConfig } from '@/lib/config-loader';

export default function Footer() {
    const config = getBrandConfig();

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
                            Transforming lives through fitness, community, and expert coaching. Join the movement today.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-heading">QUICK LINKS</h3>
                        <ul className="space-y-3">
                            <li><Link href="#services" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="#classes" className="text-gray-400 hover:text-primary transition-colors">Classes</Link></li>
                            <li><Link href="#coaches" className="text-gray-400 hover:text-primary transition-colors">Our Coaches</Link></li>
                            <li><Link href="#pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-heading">CONTACT US</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="shrink-0 text-primary" size={20} />
                                <span>123 Fitness Blvd, Gym City, GC 12345</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone className="shrink-0 text-primary" size={20} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail className="shrink-0 text-primary" size={20} />
                                <span>hello@fitlifepro.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-heading">NEWSLETTER</h3>
                        <p className="text-gray-400 mb-4">Subscribe to get the latest news and offers.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-white/5 border border-white/10 rounded px-4 py-2 w-full focus:outline-none focus:border-primary text-white"
                            />
                            <button className="bg-primary text-white px-4 py-2 rounded font-bold hover:bg-opacity-90 transition-colors">
                                GO
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {config.brandName}. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
