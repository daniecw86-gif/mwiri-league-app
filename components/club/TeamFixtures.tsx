import React from 'react';
import { MatchData } from '../../types';
import Link from 'next/link';

interface TeamFixturesProps {
    fixtures: MatchData[];
    teamName: string;
}

const TeamFixtures: React.FC<TeamFixturesProps> = ({ fixtures, teamName }) => {
    if (fixtures.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="text-5xl mb-3">📅</div>
                <h3 className="font-bold text-gray-900 mb-2">No Upcoming Fixtures</h3>
                <p className="text-gray-500">Season schedule to be announced</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden">
            <div className="gradient-blue px-6 py-4">
                <h3 className="font-black text-white flex items-center gap-2">
                    <span>📅</span>
                    Upcoming Fixtures
                </h3>
            </div>
            <div className="divide-y divide-gray-100">
                {fixtures.map((match) => {
                    const isHome = match.homeTeam === teamName;
                    const opponent = isHome ? match.awayTeam : match.homeTeam;
                    const venue = match.venue || 'TBA';

                    return (
                        <Link
                            key={match.id}
                            href={`/matches/${match.id}`}
                            className="block p-4 hover:bg-gray-50 transition-colors group"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${isHome
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {isHome ? 'HOME' : 'AWAY'}
                                        </span>
                                        {match.time && (
                                            <span className="text-xs text-gray-500 font-medium">
                                                {match.time}
                                            </span>
                                        )}
                                    </div>
                                    <div className="font-bold text-gray-900 group-hover:text-mwiri-blue transition-colors">
                                        vs {opponent}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        📍 {venue}
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-mwiri-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default TeamFixtures;
