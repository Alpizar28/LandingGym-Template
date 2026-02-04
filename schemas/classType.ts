import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'classType',
    title: 'Classes',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Class Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'duration',
            title: 'Duration (min)',
            type: 'number',
        }),
        defineField({
            name: 'intensity',
            title: 'Intensity Level',
            type: 'string',
            options: {
                list: ['Low', 'Medium', 'High', 'Extreme']
            }
        }),
        defineField({
            name: 'image',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true }
        })
    ]
});
