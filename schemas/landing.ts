import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'landing',
    title: 'Landing Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'brand',
            title: 'Brand',
            type: 'reference',
            to: [{ type: 'brand' }],
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Section',
                    fields: [
                        defineField({
                            name: 'key',
                            title: 'Section Key',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Home / Hero', value: 'home' },
                                    { title: 'Pricing / Plans', value: 'pricing' },
                                    { title: 'Photo Gallery', value: 'gallery' },
                                    { title: 'Generic Section', value: 'generic' },
                                ],
                            },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'enabled',
                            title: 'Enabled',
                            type: 'boolean',
                            initialValue: true,
                        }),
                        defineField({
                            name: 'variant',
                            title: 'Variant',
                            type: 'string',
                            description: 'Required for generic sections (e.g., services, about, classes)',
                            hidden: ({ parent }) => parent?.key === 'home' || parent?.key === 'gallery',
                            validation: (Rule) =>
                                Rule.custom((value, context) => {
                                    const parent = context.parent as any;
                                    if (parent?.key === 'generic' && !value) {
                                        return 'Variant is required for generic sections';
                                    }
                                    return true;
                                }),
                            options: {
                                list: [
                                    { title: 'Services', value: 'services' },
                                    { title: 'About', value: 'about' },
                                    { title: 'Classes', value: 'classes' },
                                    { title: 'Testimonials', value: 'testimonials' },
                                    { title: 'Contact', value: 'contact' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'contentRef',
                            title: 'Content Reference',
                            type: 'reference',
                            to: [{ type: 'heroSection' }, { type: 'genericSection' }, { type: 'gallery' }],
                            hidden: ({ parent }) => parent?.key === 'pricing',
                            options: {
                                filter: ({ parent }: any) => {
                                    if (parent?.key === 'home') {
                                        return {
                                            filter: '_type == "heroSection"',
                                        };
                                    }
                                    if (parent?.key === 'gallery') {
                                        return {
                                            filter: '_type == "gallery"',
                                        };
                                    }
                                    if (parent?.key === 'generic') {
                                        return {
                                            filter: '_type == "genericSection"',
                                        };
                                    }
                                    return {};
                                },
                            },
                        }),
                    ],
                    preview: {
                        select: {
                            key: 'key',
                            variant: 'variant',
                        },
                        prepare(selection) {
                            const { key, variant } = selection;
                            let subtitle = '';
                            if (key === 'pricing') subtitle = 'Pricing / Plans (Auto)';
                            else if (key === 'gallery') subtitle = 'Photo Gallery';
                            else if (key === 'generic') subtitle = `Generic (${variant})`;
                            else subtitle = 'Home / Hero';

                            return {
                                title: subtitle,
                            };
                        },
                    },
                },
            ],
        }),
    ],
});
