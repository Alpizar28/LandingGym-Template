import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'plan',
    title: 'Membership Plans',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Plan Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 2
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.min(0)
        }),
        defineField({
            name: 'currency',
            title: 'Currency Symbol',
            type: 'string',
            initialValue: '$',
            options: {
                list: ['$', '€', '£']
            }
        }),
        defineField({
            name: 'frequency',
            title: 'Billing Frequency',
            type: 'string',
            initialValue: '/month',
            options: {
                list: [
                    { title: 'Monthly', value: '/month' },
                    { title: 'Yearly', value: '/year' },
                    { title: 'Weekly', value: '/week' },
                    { title: 'One time', value: '' }
                ]
            }
        }),
        defineField({
            name: 'features',
            title: 'Included Features',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'highlight',
            title: 'Is Featured/Popular?',
            type: 'boolean',
            initialValue: false,
            description: 'Highlight this plan as the recommended option'
        }),
        defineField({
            name: 'ctaText',
            title: 'Button Text',
            type: 'string',
            initialValue: 'Choose Plan'
        }),
        defineField({
            name: 'ctaLink',
            title: 'Button Link',
            type: 'url'
        })
    ],
    preview: {
        select: {
            title: 'name',
            price: 'price',
            currency: 'currency',
            highlight: 'highlight'
        },
        prepare({ title, price, currency, highlight }) {
            return {
                title: `${title} ${highlight ? '⭐' : ''}`,
                subtitle: `${currency}${price}`
            }
        }
    }
});
