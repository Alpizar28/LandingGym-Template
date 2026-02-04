import Link from 'next/link';
import { LayoutDashboard, Palette, Layers, LogOut } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-zinc-800">
                <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin/brand-extractor" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200">
                        <Palette size={20} />
                        Brand Identity
                    </Link>
                    <Link href="/admin/sections" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200">
                        <Layers size={20} />
                        Sections
                    </Link>
                </nav>
                <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 dark:border-zinc-800">
                    <button className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-50 text-red-600">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
