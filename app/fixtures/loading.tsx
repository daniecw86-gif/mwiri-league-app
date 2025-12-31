export default function FixturesLoading() {
    return (
        <main className="min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="h-10 bg-white rounded-lg w-64 animate-pulse mb-4"></div>
                    <div className="h-6 bg-white/70 rounded-lg w-96 animate-pulse"></div>
                </div>

                {/* Fixtures Skeleton */}
                <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((j) => (
                                    <div key={j} className="h-16 bg-gray-100 rounded-lg"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
