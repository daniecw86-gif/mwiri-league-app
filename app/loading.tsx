export default function Loading() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow">
                {/* Hero Skeleton */}
                <div className="relative bg-gradient-to-r from-mwiri-blue-deep to-mwiri-blue overflow-hidden rounded-3xl shadow-2xl mb-12 border border-white/10 h-64 animate-pulse">
                    <div className="absolute inset-0 bg-white/5"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Left Sidebar Skeleton */}
                    <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-4 animate-pulse h-20"></div>
                        ))}
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="flex-1 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-48"></div>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar Skeleton */}
                    <div className="w-full lg:w-80 flex-shrink-0 space-y-8">
                        <div className="bg-white rounded-2xl p-6 animate-pulse h-96"></div>
                        <div className="bg-white rounded-2xl p-6 animate-pulse h-48"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
