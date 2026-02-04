'use client';

import { useState } from 'react';
import { Loader2, ArrowRight, Check } from 'lucide-react';

export default function BrandExtractorPage() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleExtract = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/extract-brand', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to extract');
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Brand Identity Extractor</h2>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm mb-8">
                <form onSubmit={handleExtract} className="flex gap-4">
                    <input
                        type="url"
                        placeholder="https://example-gym.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                        Extract Brand
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Extracted Colors</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {Object.entries(result.colors).map(([name, hex]) => (
                                <div key={name} className="space-y-2">
                                    <div
                                        className="h-20 w-full rounded-lg shadow-inner border border-black/10"
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        style={{ backgroundColor: hex as string }}
                                    />
                                    <div className="text-sm">
                                        <p className="font-medium capitalize">{name}</p>
                                        <p className="text-gray-500 font-mono text-xs">{hex as string}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Typography</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 border border-gray-100 dark:border-zinc-700 rounded-lg">
                                <span className="text-sm text-gray-500 uppercase tracking-wide">Headings</span>
                                <p className="text-3xl font-bold mt-2" style={{ fontFamily: result.typography.heading }}>
                                    {result.typography.heading}
                                </p>
                                <p className="text-gray-400 text-sm mt-1">Used for titles and headers</p>
                            </div>
                            <div className="p-4 border border-gray-100 dark:border-zinc-700 rounded-lg">
                                <span className="text-sm text-gray-500 uppercase tracking-wide">Body Text</span>
                                <p className="text-lg mt-2" style={{ fontFamily: result.typography.body }}>
                                    {result.typography.body}
                                </p>
                                <p className="text-gray-400 text-sm mt-1">Used for paragraphs and general content</p>
                            </div>
                        </div>
                        {result.typography.googleFonts.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-700">
                                <p className="text-sm text-gray-500 mb-2">Detected Google Fonts:</p>
                                <ul className="text-sm text-blue-500 space-y-1">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {result.typography.googleFonts.map((font: string, i: number) => (
                                        <li key={i}>{font}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700">
                            <Check />
                            Save Configuration
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
