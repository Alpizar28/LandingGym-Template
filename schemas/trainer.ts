import { defineField, defineType } from 'sanity';
import { Users } from 'lucide-react';

export default defineType({
    name: 'trainer',
    title: 'Trainers',
    type: 'document',
    icon: Users as any,
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'role',
            title: 'Role / Specialty',
            type: 'string',
            description: 'e.g. Head Coach, Yoga Instructor, Personal Trainer'
        }),
        defineField({
            name: 'bio',
            title: 'Biography',
            type: 'text',
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram Handle',
            type: 'string',
            description: 'without @ (e.g. johndoe_fitness)'
        })
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'photo'
        }
    }
});
