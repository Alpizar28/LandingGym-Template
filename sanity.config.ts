import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { myStructure } from './sanity/deskStructure'
import { schemaTypes } from './schemas'

export default defineConfig({
    name: 'default',
    title: 'Gym Landing System',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

    basePath: '/studio',

    plugins: [
        structureTool({
            structure: myStructure
        }),
        visionTool(),
        media()
    ],

    schema: {
        types: schemaTypes,
    },
})
