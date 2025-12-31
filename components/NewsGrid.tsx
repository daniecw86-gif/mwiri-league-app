import React from 'react';
import Link from 'next/link';

interface NewsItem {
    id: number;
    title: string;
    summary: string;
    category: string;
    date: string;
    image: string | null | undefined;
    author: string;
}

interface NewsGridProps {
    articles: NewsItem[];
}

const NewsCard: React.FC<{ article: NewsItem }> = ({ article }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col h-full">
        <div className="h-48 bg-gray-200 relative overflow-hidden">
            {/* Placeholder Image */}
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white opacity-10 group-hover:scale-105 transition-transform duration-500">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" /></svg>
            </div>
            <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-mwiri-blue-deep text-xs font-bold uppercase tracking-wider rounded">
                    {article.category}
                </span>
            </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-mwiri-blue transition-colors line-clamp-2">
                {article.title}
            </h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                {article.summary}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400 font-medium pt-4 border-t border-gray-50">
                <span>{article.date}</span>
                <span className="flex items-center gap-1 text-mwiri-blue font-bold group-hover:translate-x-1 transition-transform">
                    Read More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </span>
            </div>
        </div>
    </div>
);

const NewsGrid: React.FC<NewsGridProps> = ({ articles }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
            ))}
        </div>
    );
};

export default NewsGrid;
