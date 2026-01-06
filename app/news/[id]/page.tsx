import { newsItems } from '../../../data/news';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

interface NewsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateStaticParams() {
    return newsItems.map((item) => ({
        id: String(item.id),
    }));
}

export async function generateMetadata({ params }: NewsPageProps) {
    const resolvedParams = await params;
    const article = newsItems.find(item => item.id === parseInt(resolvedParams.id));

    if (!article) {
        return { title: 'Article Not Found' };
    }

    return {
        title: `${article.title} | Mwiri League`,
        description: article.summary,
    };
}

export default async function NewsArticlePage({ params }: NewsPageProps) {
    const resolvedParams = await params;
    const articleId = parseInt(resolvedParams.id);
    const article = newsItems.find(item => item.id === articleId);

    if (!article) {
        notFound();
    }

    // Get related articles (same category, excluding current)
    const relatedArticles = newsItems
        .filter(item => item.category === article.category && item.id !== article.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen pb-12">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-mwiri-blue-deep via-mwiri-blue to-mwiri-blue-dark py-16">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-cover mix-blend-overlay"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to News
                    </Link>

                    {/* Category Badge */}
                    <span className="inline-block bg-mwiri-yellow text-mwiri-blue-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                        {article.category}
                    </span>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                        {article.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-blue-100 text-sm">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {article.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            {article.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-premium-lg p-8 md:p-12">
                    {/* Lead Paragraph */}
                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium">
                        {article.summary}
                    </p>

                    {/* Content Placeholder - In a real app, this would be rich content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-600 dark:text-gray-400">
                            Full article content coming soon. This page is designed to display detailed
                            match reports, player interviews, and league updates. The content will be
                            enhanced with images, statistics, and embedded media.
                        </p>

                        <div className="my-8 p-6 bg-gradient-to-r from-mwiri-blue/10 to-mwiri-blue/5 dark:from-mwiri-blue/20 dark:to-mwiri-blue/10 rounded-xl border-l-4 border-mwiri-blue">
                            <p className="text-gray-700 dark:text-gray-300 italic mb-0">
                                &ldquo;Excellence on the Hilltop&rdquo; - The spirit of Mwiri League
                                continues to inspire generations of players and fans alike.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            Match Highlights
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Stay tuned for video highlights and key moments from this match.
                            Our coverage includes goal replays, key saves, and post-match analysis.
                        </p>
                    </div>

                    {/* Share Section */}
                    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Share this article</h3>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-colors">
                                Twitter
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-colors">
                                Facebook
                            </button>
                            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold transition-colors">
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map(related => (
                                <Link
                                    key={related.id}
                                    href={`/news/${related.id}`}
                                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow group"
                                >
                                    <span className="text-xs font-bold text-mwiri-blue uppercase tracking-wider">
                                        {related.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 group-hover:text-mwiri-blue transition-colors line-clamp-2">
                                        {related.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{related.date}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Back to News Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-mwiri-blue hover:text-mwiri-blue-dark font-bold transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        View All News
                    </Link>
                </div>
            </div>
        </div>
    );
}
