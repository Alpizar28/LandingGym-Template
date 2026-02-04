import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'gallery',
    title: 'Photo Gallery',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Internal title for this gallery',
        }),
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
            description: 'Public title shown above the carousel (e.g. "Our Facilities")',
        }),
        defineField({
            name: 'subheadline',
            title: 'Subheadline',
            type: 'string',
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            options: {
                layout: 'grid',
            },
        }),
    ],
});
