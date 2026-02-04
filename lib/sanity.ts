import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-01-29';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We want fresh data for admin interface, maybe true for prod public pages later
});

// Queries
// Queries
export const LANDING_QUERY = `
  *[_type == "landing" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    brand->{
      name,
      colors,
      typography,
      logo,
      contact,
      social,
      header,
      footer
    },
    sections[]{
      key,
      enabled,
      variant,
      // Si la sección tiene contenido específico (Hero, Generic)
      contentRef->{
        title,
        subtitle,
        body,
        image,
        ctaText,
        ctaLink,
        headline,       // Hero/Gallery
        subheadline,    // Hero/Gallery
        backgroundImage, // Hero
        images          // Gallery
      }
    }
  }
`;

// Query para traer entidades globales cuando sea necesario
export const GLOBAL_CONTENT_QUERY = `
{
  "plans": *[_type == "plan"],
  "trainers": *[_type == "trainer"],
  "classes": *[_type == "classType"],
  "services": *[_type == "service"],
  "testimonials": *[_type == "testimonial"]
}
`;

import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  // Safety check: if source or source.asset is missing, return a dummy object that doesn't crash
  if (!source || !source.asset) {
    return {
      url: () => null
    } as any;
  }
  return builder.image(source);
}

// Query para la configuración de la marca (Layout)
export const BRAND_QUERY = `
  *[_type == "brand"][0] {
    name,
    colors,
    typography,
    logo,
    contact,
    social,
    header,
    footer
  }
`;
