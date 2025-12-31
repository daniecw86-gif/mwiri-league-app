export default function TableLoading() {
    return (
        <main className="min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="h-10 bg-white rounded-lg w-56 animate-pulse mb-4"></div>
                    <div className="h-6 bg-white/70 rounded-lg w-96 animate-pulse"></div>
                </div>

                {/* Filter Tabs Skeleton */}
                <div className="flex bg-gray-100 p-1 rounded-lg w-fit mb-6 animate-pulse">
                    <div className="h-8 w-20 bg-white rounded-md mr-1"></div>
                    <div className="h-8 w-20 bg-gray-100 rounded-md mr-1"></div>
                    <div className="h-8 w-20 bg-gray-100 rounded-md"></div>
                </div>

                {/* Table Skeleton */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                    {/* Table Header */}
                    <div className="bg-mwiri-blue p-4">
                        <div className="flex items-center gap-4">
                            <div className="h-4 bg-white/20 rounded w-12"></div>
                            <div className="h-4 bg-white/20 rounded w-32"></div>
                            <div className="h-4 bg-white/20 rounded w-12 ml-auto"></div>
                            <div className="h-4 bg-white/20 rounded w-12"></div>
                            <div className="h-4 bg-white/20 rounded w-12"></div>
                            <div className="h-4 bg-white/20 rounded w-12"></div>
                            <div className="h-4 bg-white/20 rounded w-12"></div>
                            <div className="h-4 bg-white/20 rounded w-12"></div>
                        </div>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <div key={i} className="p-4 hover:bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                                    <div className="h-4 bg-gray-200 rounded w-8 ml-auto"></div>
                                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
