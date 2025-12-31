import React from 'react';
import { MatchData } from '../../types';
import Link from 'next/link';

interface TeamResultsProps {
    results: MatchData[];
    teamName: string;
}

const TeamResults: React.FC<TeamResultsProps> = ({ results, teamName }) => {
    if (results.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="text-5xl mb-3">⚽</div>
                <h3 className="font-bold text-gray-900 mb-2">No Results Yet</h3>
                <p className="text-gray-500">Season in progress</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-4">
                <h3 className="font-black text-white flex items-center gap-2">
                    <span>✅</span>
                    Recent Results
                </h3>
            </div>
            <div className="divide-y divide-gray-100">
                {results.map((match) => {
                    const isHome = match.homeTeam === teamName;
                    const opponent = isHome ? match.awayTeam : match.homeTeam;
                    const teamScore = isHome ? match.homeScore : match.awayScore;
                    const opponentScore = isHome ? match.awayScore : match.homeScore;

                    // Determine result
                    let result: 'win' | 'draw' | 'loss' = 'draw';
                    if (teamScore !== undefined && opponentScore !== undefined) {
                        if (teamScore > opponentScore) result = 'win';
                        else if (teamScore < opponentScore) result = 'loss';
                    }

                    return (
                        <Link
                            key={match.id}
                            href={`/matches/${match.id}`}
                            className="block p-4 hover:bg-gray-50 transition-colors group"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`w-2 h-2 rounded-full ${result === 'win' ? 'bg-green-500' :
                                                result === 'loss' ? 'bg-red-500' :
                                                    'bg-gray-400'
                                            }`}></span>
                                        <span className="text-xs text-gray-500 font-medium">
                                            {isHome ? 'HOME' : 'AWAY'}
                                        </span>
                                    </div>
                                    <div className="font-bold text-gray-900 group-hover:text-mwiri-blue transition-colors mb-1">
                                        vs {opponent}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`text-2xl font-black ${result === 'win' ? 'text-green-600' :
                                                result === 'loss' ? 'text-red-600' :
                                                    'text-gray-600'
                                            }`}>
                                            {teamScore} - {opponentScore}
                                        </div>
                                        {result === 'win' && <span className="text-green-600">✓</span>}
                                        {result === 'loss' && <span className="text-red-600">✗</span>}
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-lg text-xs font-bold ${result === 'win' ? 'bg-green-100 text-green-700' :
                                        result === 'loss' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-700'
                                    }`}>
                                    {result === 'win' ? 'W' : result === 'loss' ? 'L' : 'D'}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default TeamResults;
