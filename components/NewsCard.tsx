import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
    title: string;
    category: string;
    imageUrl?: string;
    date: string;
    link: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, category, imageUrl, date, link }) => {
    return (
        <Link href={link} className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-slate-100 dark:border-slate-700 card-hover">
            <div className="relative h-56 overflow-hidden">
                {imageUrl ? (
                    <div className="h-full overflow-hidden bg-gray-100 dark:bg-slate-700 relative">
                        <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-mwiri-blue to-mwiri-blue-deep flex items-center justify-center relative">
                        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-repeat"></div>
                        <span className="text-white opacity-20 font-black text-5xl tracking-tighter">Mwiri</span>
                    </div>
                )}
                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/90 backdrop-blur-md text-mwiri-blue-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                        {category}
                    </span>
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col relative">
                <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-mwiri-yellow"></span>
                        {date}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight group-hover:text-mwiri-blue transition-colors line-clamp-2">
                        {title}
                    </h3>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-xs font-bold text-mwiri-blue group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                        Read Article
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;
