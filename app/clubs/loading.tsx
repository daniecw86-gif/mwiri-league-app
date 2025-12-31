export default function ClubsLoading() {
    return (
        <main className="min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="h-10 bg-white rounded-lg w-48 animate-pulse mb-4"></div>
                    <div className="h-6 bg-white/70 rounded-lg w-80 animate-pulse"></div>
                </div>

                {/* Clubs Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-100 rounded"></div>
                                <div className="h-4 bg-gray-100 rounded"></div>
                                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
