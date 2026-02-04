import { getBrandConfig } from '@/lib/config-loader';
import { getSectionComponent } from '@/lib/section-registry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const config = getBrandConfig();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {config.activeSections.map((sectionId) => {
          const Component = getSectionComponent(sectionId);
          // If component is missing, we skip it silently or render nothing in production
          // For dev, registry returns a placeholder
          return Component ? <Component key={sectionId} /> : null;
        })}
      </main>
      <Footer />
    </div>
  );
}
