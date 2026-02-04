'use client';

import { useEffect, useState } from 'react';
import { client, GLOBAL_CONTENT_QUERY } from '@/lib/sanity';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Fetch plans directly inside the component (Client Component style for simplicity in template)
// In a stricter server configuration, we would pass this as props.
const PLANS_QUERY = `
    *[_type == "plan"] | order(price asc) {
        _id,
        name,
        price,
        currency,
        frequency,
        description,
        features,
        highlight,
        ctaText,
        ctaLink
    }
`;

export default function Pricing() {
    const [plans, setPlans] = useState<any[]>([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await client.fetch(GLOBAL_CONTENT_QUERY);
                // Safety check: ensure plans is an array
                setPlans(Array.isArray(data?.plans) ? data.plans : []);
            } catch (error) {
                console.error("Error fetching plans:", error);
                setPlans([]); // Fallback to empty
            }
        };
        fetchPlans();
    }, []);

    if (plans.length === 0) return null;

    return (
        <section id="pricing" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Membresías</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-foreground mb-6 uppercase tracking-tighter">
                            Elige tu Plan
                        </h3>
                        <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group
                                ${plan.highlight
                                    ? 'bg-primary/5 border-primary shadow-[0_0_40px_rgba(var(--brand-primary-rgb),0.2)]'
                                    : 'bg-background border-muted hover:border-primary/50 hover:shadow-xl'
                                }
                            `}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase py-1 px-4 rounded-full shadow-lg">
                                    Más Popular
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h4 className="text-xl font-bold uppercase mb-4 text-foreground/80">{plan.name}</h4>
                                <div className="flex justify-center items-baseline gap-1 text-foreground">
                                    <span className="text-2xl font-bold opacity-60">{plan.currency}</span>
                                    <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                                    <span className="text-muted-foreground font-medium">
                                        {plan.frequency === '/month' ? '/mes' : plan.frequency === '/year' ? '/año' : plan.frequency}
                                    </span>
                                </div>
                            </div>

                            <ul className="mb-10 space-y-4">
                                {plan.features?.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <div className={`p-1 rounded-full ${plan.highlight ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <span className="text-sm font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.ctaLink || "#contact"}
                                className={`block w-full py-4 rounded-xl text-center font-bold uppercase tracking-wider transition-all duration-300
                                    ${plan.highlight
                                        ? 'bg-primary text-white hover:bg-opacity-90 shadow-lg group-hover:shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.6)]'
                                        : 'bg-muted text-foreground hover:bg-foreground hover:text-background'
                                    }
                                `}
                            >
                                {plan.ctaText || "Elegir Plan"}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
