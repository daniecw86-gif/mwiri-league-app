import React from 'react';
import { Match } from '../../types';

interface HeadToHeadProps {
    match: Match;
}

import { teams } from '../../data/teams';

const ComparisonRow = ({ label, homeValue, awayValue }: { label: string, homeValue: any, awayValue: any }) => {
    const homeBetter = typeof homeValue === 'number' && typeof awayValue === 'number' && homeValue > awayValue;
    const homeWorse = typeof homeValue === 'number' && typeof awayValue === 'number' && homeValue < awayValue;

    // For some stats (like Lost/GA), lower is better. 
    // But simpler logic: Highlight the bigger number broadly, or just contextually.
    // Let's stick to highlighting the winner (higher number for Points/Goals).
    // For "Lost" or "GA", usually lower is better. Let's customize if needed.
    const isInverse = label === 'Lost' || label === 'Goals Against';

    const homeHighlight = isInverse ? homeWorse : homeBetter;
    const awayHighlight = isInverse ? !homeWorse : !homeBetter;
    // Tie?
    const tie = homeValue === awayValue;

    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-4">
            <div className={`w-1/3 text-center font-black text-lg ${tie ? 'text-gray-900' : homeHighlight ? 'text-mwiri-blue' : 'text-gray-400'}`}>{homeValue}</div>
            <div className="w-1/3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</div>
            <div className={`w-1/3 text-center font-black text-lg ${tie ? 'text-gray-900' : awayHighlight ? 'text-mwiri-blue' : 'text-gray-400'}`}>{awayValue}</div>
        </div>
    );
}

const HeadToHead: React.FC<HeadToHeadProps> = ({ match }) => {
    // Find team stats from the teams data
    // Use loose equality or string matching if needed, but IDs should match
    // We try to find by ID first, if not available in match object (it should be), try name
    // The match object from matchDetails likely has string names.
    // The teams data has Ids. 
    // We need to map match.homeTeamName to team data.

    const homeTeam = teams.find((t: any) => t.name === match.homeTeamName);
    const awayTeam = teams.find((t: any) => t.name === match.awayTeamName);

    if (!homeTeam || !awayTeam) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <p className="text-gray-500">Stats data not available for these teams.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8 px-4">
                <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="w-16 h-16 relative">
                        {homeTeam.logo ? (
                            <img src={homeTeam.logo} alt={homeTeam.name} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">{homeTeam.name.charAt(0)}</div>
                        )}
                    </div>
                    <span className="font-bold text-gray-900 text-center leading-tight">{homeTeam.name}</span>
                </div>
                <div className="font-black text-2xl text-gray-200">VS</div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="w-16 h-16 relative">
                        {awayTeam.logo ? (
                            <img src={awayTeam.logo} alt={awayTeam.name} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">{awayTeam.name.charAt(0)}</div>
                        )}
                    </div>
                    <span className="font-bold text-gray-900 text-center leading-tight">{awayTeam.name}</span>
                </div>
            </div>

            <div className="space-y-1">
                <div className="text-center text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">Season Stats</div>
                <ComparisonRow label="Points" homeValue={homeTeam.points} awayValue={awayTeam.points} />
                <ComparisonRow label="Played" homeValue={homeTeam.played} awayValue={awayTeam.played} />
                <ComparisonRow label="Won" homeValue={homeTeam.won} awayValue={awayTeam.won} />
                <ComparisonRow label="Drawn" homeValue={homeTeam.drawn} awayValue={awayTeam.drawn} />
                <ComparisonRow label="Lost" homeValue={homeTeam.lost} awayValue={awayTeam.lost} />
                <ComparisonRow label="Goals For" homeValue={homeTeam.gf} awayValue={awayTeam.gf} />
                <ComparisonRow label="Goals Against" homeValue={homeTeam.ga} awayValue={awayTeam.ga} />

                <div className="flex items-center justify-between py-6 border-t border-gray-100 mt-6">
                    <div className="w-1/3 flex justify-center gap-1 flex-wrap">
                        {homeTeam.form.map((r: string, i: number) => (
                            <span key={i} className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${r === 'W' ? 'bg-green-500' : r === 'D' ? 'bg-gray-400' : 'bg-red-500'}`}>{r}</span>
                        ))}
                    </div>
                    <div className="w-1/3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Form</div>
                    <div className="w-1/3 flex justify-center gap-1 flex-wrap">
                        {awayTeam.form.map((r: string, i: number) => (
                            <span key={i} className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${r === 'W' ? 'bg-green-500' : r === 'D' ? 'bg-gray-400' : 'bg-red-500'}`}>{r}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadToHead;
