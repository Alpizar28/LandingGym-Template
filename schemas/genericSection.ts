import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'genericSection',
    title: 'Generic Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'ctaLink',
            title: 'CTA Link',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
        },
    },
});
