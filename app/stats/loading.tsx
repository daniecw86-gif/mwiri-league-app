export default function StatsLoading() {
    return (
        <main className="min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="h-10 bg-white rounded-lg w-64 animate-pulse mb-4"></div>
                    <div className="h-6 bg-white/70 rounded-lg w-96 animate-pulse"></div>
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Scorers Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="h-5 bg-gray-200 rounded w-6"></div>
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                            <div className="h-3 bg-gray-100 rounded w-24"></div>
                                        </div>
                                    </div>
                                    <div className="h-6 bg-gray-200 rounded w-8"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Assists Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="h-5 bg-gray-200 rounded w-6"></div>
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                            <div className="h-3 bg-gray-100 rounded w-24"></div>
                                        </div>
                                    </div>
                                    <div className="h-6 bg-gray-200 rounded w-8"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Clean Sheets Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="h-5 bg-gray-200 rounded w-6"></div>
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                            <div className="h-3 bg-gray-100 rounded w-24"></div>
                                        </div>
                                    </div>
                                    <div className="h-6 bg-gray-200 rounded w-8"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Club Stats Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="h-5 bg-gray-200 rounded w-6"></div>
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                            <div className="h-3 bg-gray-100 rounded w-24"></div>
                                        </div>
                                    </div>
                                    <div className="h-6 bg-gray-200 rounded w-8"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
