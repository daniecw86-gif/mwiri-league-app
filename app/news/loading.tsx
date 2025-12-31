export default function NewsLoading() {
    return (
        <main className="min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section Skeleton */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg mb-12 animate-pulse">
                    <div className="h-96 bg-gray-200"></div>
                    <div className="p-8">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                    </div>
                </div>

                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="h-8 bg-white rounded-lg w-48 animate-pulse"></div>
                </div>

                {/* News Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    <div className="h-4 bg-gray-100 rounded w-24"></div>
                                </div>
                                <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                                <div className="h-6 bg-gray-200 rounded w-4/5 mb-4"></div>
                                <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
