import React from 'react';
import type { Metadata } from 'next';
import NewsHero from '../../components/NewsHero';
import NewsGrid from '../../components/NewsGrid';
import { newsItems } from '../../data/news';

export const metadata: Metadata = {
    title: 'News & Media',
    description: 'Latest match reports, interviews, and updates from the Mwiri League.',
};

const NewsPage = () => {
    const featuredArticle = newsItems[0];
    const latestNews = newsItems.slice(1);

    return (
        <div className="min-h-screen bg-transparent pb-12">
            {/* Header */}
            <div className="bg-mwiri-blue-deep text-white py-12 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">News & Media</h1>
                    <p className="text-blue-200">Latest updates, match reports, and exclusive interviews.</p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Featured Section */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-mwiri-yellow rounded-full"></span>
                        Featured Story
                    </h2>
                    <NewsHero article={featuredArticle as any} />
                </div>

                {/* Latest News Grid */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-2 h-8 bg-mwiri-blue rounded-full"></span>
                            Latest Updates
                        </h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm font-bold text-white bg-mwiri-blue rounded-full hover:bg-mwiri-blue-dark transition-colors">All</button>
                            <button className="px-4 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">Club News</button>
                            <button className="px-4 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">Interviews</button>
                        </div>
                    </div>
                    <NewsGrid articles={latestNews as any[]} />
                </div>
            </main>
        </div>
    );
};

export default NewsPage;
