import { createClient } from 'next-sanity';

const client = createClient({
    projectId: 'qnwii86u',
    dataset: 'production',
    apiVersion: '2024-01-29',
    token: 'skdM2BMIP9cxvLMEFLkGfvpuWLCkKCUw4T1xQhuNyV4dllN7BbQuS0j43Zffsi4p9cwMWx5nNfJFOCnqO3V80CYNZn2ekX1gazbEknMAWgOzVQQJfgkeJ0jD3Ge8oXVfusqGeR27yuQvqHHZXOxQRSuqk9pZdVhgOtGJv3xbexeFJi34wRe9',
    useCdn: false,
});

async function seed() {
    console.log('🌱 Seeding data...');

    // 1. Create Brand
    const brand = await client.create({
        _type: 'brand',
        name: 'FitLife Pro',
        slug: { _type: 'slug', current: 'fitlifepro-brand' },
        colors: {
            primary: '#FF4500',
            secondary: '#1A1A1A',
            accent: '#FFD700',
            background: '#FFFFFF',
            text: '#111111',
            muted: '#6B7280'
        },
        typography: { heading: 'Inter', body: 'Roboto' }
    });
    console.log('Brand created:', brand._id);

    // 2. Create Hero
    const hero = await client.create({
        _type: 'heroSection',
        headline: 'Transform Your Body',
        subheadline: 'Join the best gym in town.',
        ctaText: 'Join Now',
        ctaLink: '/join'
    });
    console.log('Hero created:', hero._id);

    // 3. Create Generic Sections
    const services = await client.create({
        _type: 'genericSection',
        title: 'Our Services',
        subtitle: 'What we offer',
        body: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'We offer personal training, group classes, and more.' }],
                markDefs: [],
                style: 'normal'
            }
        ],
        ctaText: 'View Services',
        ctaLink: '/services'
    });
    console.log('Services created:', services._id);

    const about = await client.create({
        _type: 'genericSection',
        title: 'About Us',
        subtitle: 'Our Story',
        body: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Founded in 2010, we have been helping people stay fit.' }],
                markDefs: [],
                style: 'normal'
            }
        ],
        ctaText: 'Learn More',
        ctaLink: '/about'
    });
    console.log('About created:', about._id);

    const contact = await client.create({
        _type: 'genericSection',
        title: 'Get in Touch',
        subtitle: 'Contact Us',
        body: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Email us at contact@fitlifepro.com' }],
                markDefs: [],
                style: 'normal'
            }
        ],
        ctaText: 'Email Us',
        ctaLink: 'mailto:contact@fitlifepro.com'
    });
    console.log('Contact created:', contact._id);

    // 4. Create Landing Page
    const landing = await client.create({
        _type: 'landing',
        title: 'FitLife Pro Landing',
        slug: { _type: 'slug', current: 'fitlifepro' },
        isActive: true,
        brand: { _type: 'reference', _ref: brand._id },
        sections: [
            {
                _key: 'h1',
                key: 'home',
                enabled: true,
                contentRef: { _type: 'reference', _ref: hero._id }
            },
            {
                _key: 's1',
                key: 'generic',
                variant: 'services',
                enabled: true,
                contentRef: { _type: 'reference', _ref: services._id }
            },
            {
                _key: 'a1',
                key: 'generic',
                variant: 'about',
                enabled: true,
                contentRef: { _type: 'reference', _ref: about._id }
            },
            {
                _key: 'c1',
                key: 'generic',
                variant: 'contact',
                enabled: true,
                contentRef: { _type: 'reference', _ref: contact._id }
            }
        ]
    });
    console.log('Landing created:', landing._id);
    console.log('✅ Seeding complete!');
}

seed().catch((err) => {
    console.error('Seed failed:', err.message);
    if (err.details) {
        console.error('Error details:', JSON.stringify(err.details, null, 2));
    }
    process.exit(1);
});
