import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'faq',
    title: 'FAQs',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: ['General', 'Membership', 'Training', 'Amenities']
            }
        })
    ]
});
