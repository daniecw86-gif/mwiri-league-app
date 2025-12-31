import React from 'react';
import Link from 'next/link';

interface NewsHeroProps {
    article: {
        id: number;
        title: string;
        summary: string;
        category: string;
        date: string;
        image: string | null | undefined;
        author: string;
    };
}

const NewsHero: React.FC<NewsHeroProps> = ({ article }) => {
    return (
        <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer h-[500px]">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-gray-900">
                {/* In a real app, use next/image here */}
                <div className="w-full h-full opacity-60 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-20">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" /></svg>
                </div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="max-w-3xl">
                    <span className="inline-block px-3 py-1 bg-mwiri-yellow text-mwiri-blue-deep text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        {article.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight group-hover:underline decoration-mwiri-yellow decoration-4 underline-offset-8 transition-all">
                        {article.title}
                    </h2>
                    <p className="text-lg text-gray-200 mb-6 line-clamp-2">
                        {article.summary}
                    </p>
                    <div className="flex items-center text-sm text-gray-300 font-medium">
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <span>{article.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsHero;
