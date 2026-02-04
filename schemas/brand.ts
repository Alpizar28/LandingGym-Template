import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'brand',
    title: 'Brand',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Brand Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'colors',
            title: 'Colors',
            type: 'object',
            fields: [
                defineField({ name: 'primary', title: 'Primary', type: 'string' }),
                defineField({ name: 'secondary', title: 'Secondary', type: 'string' }),
                defineField({ name: 'accent', title: 'Accent', type: 'string' }),
                defineField({ name: 'background', title: 'Background', type: 'string' }),
                defineField({ name: 'text', title: 'Text', type: 'string' }),
            ],
        }),
        defineField({
            name: 'typography',
            title: 'Typography',
            type: 'object',
            fields: [
                defineField({ name: 'headingFont', title: 'Heading Font', type: 'string' }),
                defineField({ name: 'bodyFont', title: 'Body Font', type: 'string' }),
            ],
        }),
        defineField({
            name: 'contact',
            title: 'Contact Info',
            type: 'object',
            fields: [
                defineField({ name: 'email', title: 'Email', type: 'string' }),
                defineField({ name: 'phone', title: 'Phone', type: 'string' }),
                defineField({ name: 'address', title: 'Address', type: 'string' }),
            ],
        }),
        defineField({
            name: 'social',
            title: 'Social Media',
            type: 'object',
            fields: [
                defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
                defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
                defineField({ name: 'twitter', title: 'Twitter/X URL', type: 'url' }),
            ],
        }),
        defineField({
            name: 'header',
            title: 'Header Settings',
            type: 'object',
            fields: [
                defineField({
                    name: 'links',
                    title: 'Navigation Links',
                    description: 'Links shown in the top navigation bar',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                defineField({ name: 'title', title: 'Title', type: 'string' }),
                                defineField({ name: 'url', title: 'URL (e.g. #services)', type: 'string' }),
                            ]
                        }
                    ]
                })
            ]
        }),
        defineField({
            name: 'footer',
            title: 'Footer Settings',
            type: 'object',
            fields: [
                defineField({
                    name: 'text',
                    title: 'Footer Text',
                    type: 'text',
                    rows: 3,
                    description: 'Brief description shown below the logo'
                }),
                defineField({
                    name: 'links',
                    title: 'Quick Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                defineField({ name: 'title', title: 'Title', type: 'string' }),
                                defineField({ name: 'url', title: 'URL (e.g. #pricing)', type: 'string' }),
                            ]
                        }
                    ]
                })
            ]
        }),
    ],
});
