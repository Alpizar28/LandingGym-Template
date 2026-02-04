import brandConfig from '@/config/brand.config.json';

export type BrandConfig = typeof brandConfig;

export function getBrandConfig(): BrandConfig {
    // In a real scenario, this might fetch from an API or file system based on domain
    return brandConfig;
}
