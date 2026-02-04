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
    ],
});
