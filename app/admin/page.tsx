export default function AdminDashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Active Sections</h3>
                    <p className="text-3xl font-bold">5</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Current Brand</h3>
                    <p className="text-3xl font-bold text-primary">FitLife Pro</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">System Status</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="font-medium">Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
