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
export const LANDING_BY_SLUG_QUERY = `
  *[_type == "landing" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    "slug": slug.current,
    brand->{
      name,
      "slug": slug.current,
      colors,
      typography,
      logo
    },
    sections[]{
      key,
      enabled,
      variant,
      contentRef->{
        _type,
        title,
        subtitle,
        body,
        image,
        ctaText,
        ctaLink,
        headline,       // Hero specific
        subheadline,    // Hero specific
        backgroundImage // Hero specific
      }
    }
  }
`;

import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
