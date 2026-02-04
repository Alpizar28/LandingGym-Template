import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'testimonial',
    title: 'Testimonials',
    type: 'document',
    fields: [
        defineField({
            name: 'author',
            title: 'Author Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'role',
            title: 'Role / Detail',
            type: 'string',
            description: 'e.g. Member since 2018 or "Lost 20kg"'
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'gmap_link',
            title: 'Google map link',
            type: 'url',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'photo',
            title: 'Author Photo',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'rating',
            title: 'Rating (1-5)',
            type: 'number',
            validation: Rule => Rule.min(1).max(5),
            initialValue: 5
        })
    ],
    preview: {
        select: {
            title: 'author',
            subtitle: 'role',
            media: 'photo'
        }
    }
});
