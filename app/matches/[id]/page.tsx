'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { matchDetails } from '../../../data/matchDetails';
import MatchTabs from '../../../components/MatchTabs';
import Overview from '../../../components/match/Overview';
import { Match } from '../../../types';

import { useRef } from 'react';
import { toPng } from 'html-to-image';

// Dynamic imports — only loaded when their tab is active or flier is generated
const Lineups = dynamic(() => import('../../../components/match/Lineups'));
const Stats = dynamic(() => import('../../../components/match/Stats'));
const HeadToHead = dynamic(() => import('../../../components/match/HeadToHead'));
const MatchFlier = dynamic(() => import('../../../components/MatchFlier'), { ssr: false });

import Link from 'next/link';

export default function MatchPage() {
    const params = useParams();
    const id = params.id as string;
    const [activeTab, setActiveTab] = useState('overview');
    const [isGeneratingFlier, setIsGeneratingFlier] = useState(false);
    const flierRef = useRef<HTMLDivElement>(null);

    // Calculate Navigation
    const matchIds = Object.keys(matchDetails).sort((a, b) => Number(a) - Number(b));
    const currentIndex = matchIds.indexOf(id);
    const prevId = currentIndex > 0 ? matchIds[currentIndex - 1] : null;
    const nextId = currentIndex < matchIds.length - 1 ? matchIds[currentIndex + 1] : null;


    const handleDownloadFlier = async () => {
        if (!flierRef.current) return;
        setIsGeneratingFlier(true);
        try {
            // Using html-to-image for better support of modern CSS (gradients, etc)
            const dataUrl = await toPng(flierRef.current, { cacheBust: true });

            // Create download link
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `Mwiri_League_Result_${match.homeTeamName}_vs_${match.awayTeamName}.png`;
            link.click();
        } catch (error) {
            console.error("Error generating flier:", error);
            alert("Failed to generate flier. Please try again.");
        } finally {
            setIsGeneratingFlier(false);
        }
    };

    // In a real app, we would fetch data based on ID
    // For now, we use the mock data, defaulting to ID "1" if not found
    const match = (matchDetails[id as keyof typeof matchDetails] || matchDetails["1"]) as unknown as Match;

    if (!match) {
        return <div className="p-12 text-center">Match not found</div>;
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview match={match} />;
            case 'lineups':
                return <Lineups match={match} />;
            case 'stats':
                return <Stats match={match} />;
            case 'h2h':
                return <HeadToHead match={match} />;
            default:
                return <Overview match={match} />;
        }
    };

    return (
        <main className="min-h-screen pb-12">
            {/* Match Header */}
            <div
                className="relative text-white pt-12 pb-8 overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${match.homeTeamColor || '#0070C0'} 0%, ${match.awayTeamColor || '#020617'} 100%)`
                }}
            >
                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                {/* Navigation Arrows */}
                {prevId && (
                    <Link href={`/matches/${prevId}`} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                )}
                {nextId && (
                    <Link href={`/matches/${nextId}`} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center justify-center space-y-8">
                        {/* Flier Button */}
                        <div className="absolute top-0 right-4 sm:right-0">
                            <button
                                onClick={handleDownloadFlier}
                                disabled={isGeneratingFlier}
                                className="bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full backdrop-blur-sm transition-all flex items-center gap-2"
                            >
                                {isGeneratingFlier ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        Share Result Flier
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="text-sm font-bold text-white/90 uppercase tracking-widest bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm">
                            {match.date} • {match.venue}
                        </div>

                        <div className="flex items-center justify-center w-full max-w-4xl">
                            {/* Home Team */}
                            <div className="flex-1 text-center group cursor-pointer">
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-2xl transition-transform transform group-hover:scale-110 border-4 border-white/20">
                                    {match.homeTeamLogo ? (
                                        <Image
                                            src={match.homeTeamLogo}
                                            alt={match.homeTeamName}
                                            fill
                                            className="object-cover p-1 rounded-full"
                                        />
                                    ) : (
                                        <span className="text-3xl font-bold text-mwiri-blue">{match.homeTeamName.substring(0, 1)}</span>
                                    )}
                                </div>
                                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-shadow">{match.homeTeamName}</h2>
                            </div>

                            {/* Score */}
                            <div className="px-4 sm:px-12 text-center flex flex-col items-center">
                                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl">
                                    <div className="text-5xl sm:text-7xl font-black text-white leading-none font-mono tracking-tighter">
                                        {match.score.home} : {match.score.away}
                                    </div>
                                    <div className="mt-2 text-xs sm:text-sm font-bold text-mwiri-yellow uppercase tracking-widest">
                                        {match.status}
                                    </div>
                                </div>
                            </div>

                            {/* Away Team */}
                            <div className="flex-1 text-center group cursor-pointer">
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-2xl transition-transform transform group-hover:scale-110 border-4 border-white/20">
                                    {match.awayTeamLogo ? (
                                        <Image
                                            src={match.awayTeamLogo}
                                            alt={match.awayTeamName}
                                            fill
                                            className="object-cover p-1 rounded-full"
                                        />
                                    ) : (
                                        <span className="text-3xl font-bold text-mwiri-blue">{match.awayTeamName.substring(0, 1)}</span>
                                    )}
                                </div>
                                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-shadow">{match.awayTeamName}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <MatchTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderTabContent()}
            </div>
            {/* Hidden Flier Container - Rendered off-screen for capture */}
            <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
                <MatchFlier ref={flierRef} match={match} />
            </div>
        </main>
    );
}
