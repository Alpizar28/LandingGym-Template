import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
    name: 'default',
    title: 'Gym Landing System',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

    basePath: '/studio',

    plugins: [
        deskTool(),      // 👈 ESTO ES LO QUE FALTABA
        visionTool(),    // opcional pero útil
    ],

    schema: {
        types: schemaTypes,
    },
})
