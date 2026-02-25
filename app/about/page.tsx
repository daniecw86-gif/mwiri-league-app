import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Us | Mwiri League',
    description: 'Learn about the Mwiri League — the Busoga College Mwiri Old Boys Football Tournament that brings together generations of Mwirians.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-barlow text-4xl md:text-5xl font-black text-white mb-4 text-shadow-lg">
                        About <span className="text-mwiri-gold">Mwiri League</span>
                    </h1>
                    <div className="w-20 h-1 bg-mwiri-gold mx-auto rounded-full"></div>
                </div>

                {/* Content Cards */}
                <div className="space-y-8">
                    {/* Our Story */}
                    <div className="crystal-glass rounded-3xl p-8">
                        <h2 className="font-barlow font-bold text-2xl text-mwiri-gold mb-4 flex items-center gap-2">
                            <span>🏟️</span> Our Story
                        </h2>
                        <p className="text-white/80 leading-relaxed mb-4">
                            The Mwiri League is an annual football tournament organised by the Old Boys of
                            <strong className="text-white"> Busoga College Mwiri</strong>, one of East Africa&apos;s most
                            prestigious secondary schools, located in Jinja, Uganda. Founded in the spirit of camaraderie
                            and healthy competition, the league brings together graduates from different years to
                            reconnect, compete, and celebrate the Mwiri tradition.
                        </p>
                        <p className="text-white/80 leading-relaxed">
                            Each team represents a specific graduating class — from the founding cohorts of the early
                            &apos;90s to the modern generations. The annual tournament has grown from humble beginnings
                            into a premier Old Boys sporting event, with well-organised fixtures, knockout stages,
                            and a passionate community of supporters.
                        </p>
                    </div>

                    {/* The Format */}
                    <div className="crystal-glass rounded-3xl p-8">
                        <h2 className="font-barlow font-bold text-2xl text-mwiri-gold mb-4 flex items-center gap-2">
                            <span>⚽</span> The Format
                        </h2>
                        <p className="text-white/80 leading-relaxed mb-4">
                            Teams are drawn into two groups — the <strong className="text-white">Sir Wilberforce Nadiope Group</strong> and
                            the <strong className="text-white">Dr. Milton Obote Group</strong> — named after distinguished figures
                            in Mwiri&apos;s history. Each group plays a round-robin format, with the top teams advancing
                            to the knockout stage comprising quarter-finals, semi-finals, and a grand final.
                        </p>
                        <p className="text-white/80 leading-relaxed">
                            All matches are played at the IUEA Sports Ground, creating a carnival atmosphere
                            that unites Mwirians from every generation.
                        </p>
                    </div>

                    {/* Our Mission */}
                    <div className="crystal-glass-gold rounded-3xl p-8">
                        <h2 className="font-barlow font-bold text-2xl text-mwiri-gold mb-4 flex items-center gap-2">
                            <span>🏆</span> Our Mission
                        </h2>
                        <ul className="space-y-3 text-white/80">
                            <li className="flex items-start gap-3">
                                <span className="text-mwiri-gold mt-1">•</span>
                                <span>To foster unity and brotherhood among Busoga College Mwiri Old Boys.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mwiri-gold mt-1">•</span>
                                <span>To promote sports, fitness, and healthy competition within the alumni community.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mwiri-gold mt-1">•</span>
                                <span>To give back to Busoga College Mwiri through charitable activities and development projects.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mwiri-gold mt-1">•</span>
                                <span>To build a lasting legacy of excellence both on and off the pitch.</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-4">
                        <Link href="/fixtures" className="crystal-btn text-sm inline-block">
                            View Current Fixtures →
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
