export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow">
                {/* Hero Skeleton */}
                <div className="text-center mb-8">
                    <div className="crystal-skeleton h-12 w-64 mx-auto mb-3 rounded-xl"></div>
                    <div className="crystal-skeleton h-5 w-80 mx-auto rounded-lg"></div>
                </div>

                {/* Bento Grid Skeleton - mirrors home page layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
                    {/* Next Match Skeleton */}
                    <div className="lg:col-span-7 crystal-glass rounded-3xl p-6 md:p-8">
                        <div className="crystal-skeleton h-6 w-28 rounded-full mb-6"></div>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 text-center">
                                <div className="crystal-skeleton w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-2xl"></div>
                                <div className="crystal-skeleton h-5 w-24 mx-auto rounded-lg"></div>
                            </div>
                            <div className="crystal-skeleton w-12 h-12 rounded-xl"></div>
                            <div className="flex-1 text-center">
                                <div className="crystal-skeleton w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-2xl"></div>
                                <div className="crystal-skeleton h-5 w-24 mx-auto rounded-lg"></div>
                            </div>
                        </div>
                    </div>

                    {/* Golden Boot Skeleton */}
                    <div className="lg:col-span-5 crystal-glass-gold rounded-3xl p-6">
                        <div className="crystal-skeleton h-7 w-36 rounded-lg mb-4"></div>
                        <div className="flex items-center gap-4">
                            <div className="crystal-skeleton w-16 h-16 rounded-2xl"></div>
                            <div className="flex-1">
                                <div className="crystal-skeleton h-5 w-32 rounded-lg mb-2"></div>
                                <div className="crystal-skeleton h-4 w-20 rounded-lg"></div>
                            </div>
                            <div className="crystal-skeleton w-14 h-14 rounded-xl"></div>
                        </div>
                    </div>

                    {/* League Table Skeleton */}
                    <div className="lg:col-span-7 crystal-glass rounded-3xl p-6">
                        <div className="crystal-skeleton h-6 w-32 rounded-lg mb-6"></div>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3 py-3">
                                <div className="crystal-skeleton w-8 h-8 rounded-lg"></div>
                                <div className="crystal-skeleton w-8 h-8 rounded-lg"></div>
                                <div className="crystal-skeleton h-4 w-24 rounded-lg flex-1"></div>
                                <div className="crystal-skeleton h-6 w-10 rounded-lg"></div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Results Skeleton */}
                    <div className="lg:col-span-5 crystal-glass rounded-3xl p-6">
                        <div className="crystal-skeleton h-6 w-36 rounded-lg mb-6"></div>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-3">
                                <div className="crystal-skeleton w-8 h-8 rounded-lg"></div>
                                <div className="crystal-skeleton h-4 w-16 rounded-lg flex-1"></div>
                                <div className="crystal-skeleton h-6 w-14 rounded-lg"></div>
                                <div className="crystal-skeleton h-4 w-16 rounded-lg flex-1"></div>
                                <div className="crystal-skeleton w-8 h-8 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
