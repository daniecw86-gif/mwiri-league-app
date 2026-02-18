import React, { forwardRef } from 'react';
import Image from 'next/image';
import { Match } from '../types';

interface MatchFlierProps {
    match: Match;
}

const MatchFlier = forwardRef<HTMLDivElement, MatchFlierProps>(({ match }, ref) => {
    // Determine gradient based on winner or home team if draw
    const bgColor = match.score.home > match.score.away ? match.homeTeamColor :
        match.score.away > match.score.home ? match.awayTeamColor : '#1e3a8a'; // Default Blue for draw

    return (
        <div ref={ref} className="w-[1080px] h-[1080px] bg-white relative overflow-hidden flex flex-col items-center text-white" style={{ fontFamily: 'sans-serif' }}>
            {/* Background Gradient & Pattern */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(135deg, ${bgColor || '#1e3a8a'} 0%, #0f172a 100%)`
                }}
            >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, white 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>

            {/* Header: League Branding */}
            <div className="relative z-10 w-full p-12 flex justify-center items-center">
                <span className="bg-white/10 backdrop-blur-md px-8 py-2 rounded-full text-2xl font-bold tracking-widest uppercase border border-white/20">
                    Mwiri League
                </span>
            </div>

            {/* Main Content: centered */}
            <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center -mt-20">

                {/* Full Time Badge */}
                <div className="mb-12">
                    <span className="bg-mwiri-yellow text-mwiri-blue font-black text-3xl px-6 py-2 rounded uppercase tracking-wider shadow-lg">
                        Full Time
                    </span>
                </div>

                {/* Score Board Container */}
                <div className="flex items-center justify-center w-full gap-16 px-12">
                    {/* Home Team */}
                    <div className="flex flex-col items-center w-1/3">
                        <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl border-8 border-white/10 p-8">
                            {match.homeTeamLogo ? (
                                <Image src={match.homeTeamLogo} alt={match.homeTeamName} width={256} height={256} className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-9xl font-bold text-gray-300">{match.homeTeamName.charAt(0)}</span>
                            )}
                        </div>
                        <h2 className="text-5xl font-black text-center uppercase tracking-tight text-shadow-lg leading-tight">
                            {match.homeTeamName}
                        </h2>
                    </div>

                    {/* The Score */}
                    <div className="flex items-center gap-8">
                        <span className="text-[200px] font-black leading-none text-shadow-xl font-mono">{match.score.home}</span>
                        <div className="h-40 w-2 bg-white/30 rounded-full"></div>
                        <span className="text-[200px] font-black leading-none text-shadow-xl font-mono">{match.score.away}</span>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center w-1/3">
                        <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl border-8 border-white/10 p-8">
                            {match.awayTeamLogo ? (
                                <Image src={match.awayTeamLogo} alt={match.awayTeamName} width={256} height={256} className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-9xl font-bold text-gray-300">{match.awayTeamName.charAt(0)}</span>
                            )}
                        </div>
                        <h2 className="text-5xl font-black text-center uppercase tracking-tight text-shadow-lg leading-tight">
                            {match.awayTeamName}
                        </h2>
                    </div>
                </div>

                {/* Match Details */}
                <div className="mt-16 flex flex-col items-center gap-4 text-white/80">
                    <div className="flex items-center gap-4 text-3xl font-medium">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {match.date}
                    </div>
                    <div className="flex items-center gap-4 text-3xl font-medium">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {match.venue}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 w-full p-8 bg-black/20 backdrop-blur text-center border-t border-white/10">
                <p className="text-xl font-medium tracking-wide">Mwiri League • The Gentleman's Game</p>
            </div>

        </div>
    );
});

MatchFlier.displayName = 'MatchFlier';
export default MatchFlier;
