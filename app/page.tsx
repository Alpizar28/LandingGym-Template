import { getSectionComponent } from '@/lib/section-registry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { client, LANDING_QUERY } from '@/lib/sanity';
import Link from 'next/link';

// Force dynamic rendering to ensure we get fresh data
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch the "home" landing page
  const landing = await client.fetch(LANDING_QUERY, { slug: 'home' }).catch(() => null);

  if (!landing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Welcome to your Gym Site</h1>
          <p className="mb-8 text-gray-600">
            To see your website, you need to publish a Landing Page with the slug <strong>"home"</strong> in the Studio.
          </p>
          <Link
            href="/studio/structure/landing"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition w-full"
          >
            Go to Studio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header config={landing.brand} />
      <main className="flex-1">
        {landing.sections?.map((section: any) => {
          if (!section.enabled) return null;

          // If the section is generic, use its variant as the component key (e.g., 'about', 'services')
          const componentKey = section.key === 'generic' ? section.variant : section.key;
          const Component = getSectionComponent(componentKey);

          return Component ? (
            <Component
              key={section._key || section.key}
              content={section.contentRef}
              variant={section.variant}
            />
          ) : null;
        })}
      </main>
      <Footer config={landing.brand} />
    </div>
  );
}
