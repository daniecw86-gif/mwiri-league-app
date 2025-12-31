export default function ResultsLoading() {
    return (
        <main className="min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="h-10 bg-white rounded-lg w-48 animate-pulse mb-4"></div>
                    <div className="h-6 bg-white/70 rounded-lg w-80 animate-pulse"></div>
                </div>

                {/* Results Skeleton */}
                <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-56 mb-6"></div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((j) => (
                                    <div key={j} className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="h-6 bg-gray-200 rounded w-8"></div>
                                                <div className="h-4 bg-gray-200 rounded w-4"></div>
                                                <div className="h-6 bg-gray-200 rounded w-8"></div>
                                            </div>
                                            <div className="flex items-center gap-3 flex-1 justify-end">
                                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
