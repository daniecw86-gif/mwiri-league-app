'use client';

import React from 'react';
import Image from 'next/image';
import { KnockoutMatch } from '../types';
import { teams } from '../data/teams';

interface KnockoutMatchCardProps {
    match: KnockoutMatch;
    compact?: boolean;
}

const KnockoutMatchCard: React.FC<KnockoutMatchCardProps> = ({ match, compact = false }) => {
    const homeTeamData = match.homeTeam ? teams.find(t => t.name === match.homeTeam) : null;
    const awayTeamData = match.awayTeam ? teams.find(t => t.name === match.awayTeam) : null;

    const getStatusBadge = () => {
        switch (match.status) {
            case 'live':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        LIVE
                    </span>
                );
            case 'completed':
                return (
                    <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold">
                        FT
                    </span>
                );
            default:
                return (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold">
                        {match.time || 'TBD'}
                    </span>
                );
        }
    };

    const renderTeam = (teamName: string | null, teamData: typeof homeTeamData, score?: number, isWinner?: boolean) => (
        <div className={`flex items-center gap-2 ${compact ? 'py-1.5 px-2' : 'py-2 px-3'} ${isWinner ? 'bg-green-50' : ''}`}>
            <div className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} relative flex-shrink-0 bg-gray-100 rounded-full overflow-hidden`}>
                {teamData?.logo ? (
                    <Image
                        src={teamData.logo}
                        alt={teamName || 'Team'}
                        fill
                        className="object-contain p-0.5"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                        {teamName ? teamName.substring(0, 2) : 'TBD'}
                    </div>
                )}
            </div>
            <span className={`flex-1 ${compact ? 'text-xs' : 'text-sm'} font-semibold text-gray-800 truncate ${isWinner ? 'text-green-700' : ''}`}>
                {teamName || 'TBD'}
            </span>
            {match.status === 'completed' && score !== undefined && (
                <span className={`${compact ? 'text-sm' : 'text-lg'} font-black ${isWinner ? 'text-green-600' : 'text-gray-400'}`}>
                    {score}
                </span>
            )}
        </div>
    );

    const homeWinner = match.status === 'completed' && (match.homeScore ?? 0) > (match.awayScore ?? 0);
    const awayWinner = match.status === 'completed' && (match.awayScore ?? 0) > (match.homeScore ?? 0);

    return (
        <div className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${compact ? 'w-40' : 'w-56'}`}>
            {/* Header */}
            <div className="bg-gray-50 px-2 py-1.5 border-b border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-medium">{match.date || 'TBD'}</span>
                {getStatusBadge()}
            </div>

            {/* Teams */}
            <div className="divide-y divide-gray-100">
                {renderTeam(match.homeTeam, homeTeamData, match.homeScore, homeWinner)}
                {renderTeam(match.awayTeam, awayTeamData, match.awayScore, awayWinner)}
            </div>

            {/* Venue */}
            {!compact && match.venue && (
                <div className="bg-gray-50 px-2 py-1 border-t border-gray-100">
                    <p className="text-[9px] text-gray-400 text-center truncate">{match.venue}</p>
                </div>
            )}
        </div>
    );
};

export default KnockoutMatchCard;
