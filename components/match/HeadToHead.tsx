import React from 'react';
import Image from 'next/image';
import { Match } from '../../types';

interface HeadToHeadProps {
    match: Match;
}

import { teams } from '../../data/teams';

const ComparisonRow = ({ label, homeValue, awayValue }: { label: string, homeValue: any, awayValue: any }) => {
    const isNumeric = typeof homeValue === 'number' && typeof awayValue === 'number';
    const total = isNumeric ? homeValue + awayValue : 0;
    const homeWidth = total === 0 ? 50 : (homeValue / total) * 100;
    const awayWidth = total === 0 ? 50 : (awayValue / total) * 100;

    const isInverse = label === 'Lost' || label === 'Goals Against';
    const homeBetter = isNumeric && (isInverse ? homeValue < awayValue : homeValue > awayValue);
    const awayBetter = isNumeric && (isInverse ? awayValue < homeValue : awayValue > homeValue);
    const tie = homeValue === awayValue;

    return (
        <div className="group">
            <div className="flex items-center justify-between mb-2 px-1">
                <span className={`text-lg font-black tabular-nums ${tie ? 'text-white' : homeBetter ? 'text-mwiri-gold' : 'text-white/40'}`}>
                    {homeValue}
                </span>
                <span className="text-xs font-bold text-white/50 uppercase tracking-wider">{label}</span>
                <span className={`text-lg font-black tabular-nums ${tie ? 'text-white' : awayBetter ? 'text-mwiri-gold' : 'text-white/40'}`}>
                    {awayValue}
                </span>
            </div>
            {isNumeric && (
                <div className="flex h-1.5 rounded-full overflow-hidden bg-white/10 gap-0.5">
                    <div
                        className={`rounded-l-full transition-all duration-500 ${homeBetter ? 'bg-mwiri-gold' : 'bg-mwiri-blue/60'}`}
                        style={{ width: `${homeWidth}%` }}
                    />
                    <div
                        className={`rounded-r-full transition-all duration-500 ${awayBetter ? 'bg-mwiri-gold' : 'bg-white/20'}`}
                        style={{ width: `${awayWidth}%` }}
                    />
                </div>
            )}
        </div>
    );
}

const HeadToHead: React.FC<HeadToHeadProps> = ({ match }) => {
    const homeTeam = teams.find((t: any) => t.name === match.homeTeamName);
    const awayTeam = teams.find((t: any) => t.name === match.awayTeamName);

    if (!homeTeam || !awayTeam) {
        return (
            <div className="crystal-glass rounded-2xl p-12 text-center">
                <p className="text-white/50">Stats data not available for these teams.</p>
            </div>
        );
    }

    return (
        <div className="crystal-glass rounded-2xl overflow-hidden">
            {/* Team Headers */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10">
                <div className="flex flex-col items-center gap-3 w-1/3">
                    <div className="w-16 h-16 relative">
                        {homeTeam.logo ? (
                            <Image src={homeTeam.logo} alt={homeTeam.name} width={64} height={64} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center font-bold text-white/60">{homeTeam.name.charAt(0)}</div>
                        )}
                    </div>
                    <span className="font-bold text-white text-center text-sm leading-tight">{homeTeam.name}</span>
                </div>
                <div className="font-black text-2xl text-white/20">VS</div>
                <div className="flex flex-col items-center gap-3 w-1/3">
                    <div className="w-16 h-16 relative">
                        {awayTeam.logo ? (
                            <Image src={awayTeam.logo} alt={awayTeam.name} width={64} height={64} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center font-bold text-white/60">{awayTeam.name.charAt(0)}</div>
                        )}
                    </div>
                    <span className="font-bold text-white text-center text-sm leading-tight">{awayTeam.name}</span>
                </div>
            </div>

            {/* Stats Comparison */}
            <div className="p-6 md:p-8 space-y-5">
                <div className="text-center text-xs font-bold text-mwiri-gold uppercase mb-6 tracking-widest">Season Stats</div>
                <ComparisonRow label="Points" homeValue={homeTeam.points} awayValue={awayTeam.points} />
                <ComparisonRow label="Played" homeValue={homeTeam.played} awayValue={awayTeam.played} />
                <ComparisonRow label="Won" homeValue={homeTeam.won} awayValue={awayTeam.won} />
                <ComparisonRow label="Drawn" homeValue={homeTeam.drawn} awayValue={awayTeam.drawn} />
                <ComparisonRow label="Lost" homeValue={homeTeam.lost} awayValue={awayTeam.lost} />
                <ComparisonRow label="Goals For" homeValue={homeTeam.gf} awayValue={awayTeam.gf} />
                <ComparisonRow label="Goals Against" homeValue={homeTeam.ga} awayValue={awayTeam.ga} />

                {/* Form Row */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                    <div className="w-1/3 flex justify-center gap-1 flex-wrap">
                        {homeTeam.form.map((r: string, i: number) => (
                            <span key={i} className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ${r === 'W' ? 'bg-green-500' : r === 'D' ? 'bg-white/30' : 'bg-red-500'}`}>{r}</span>
                        ))}
                    </div>
                    <div className="w-1/3 text-center text-xs font-bold text-white/50 uppercase tracking-wider">Recent Form</div>
                    <div className="w-1/3 flex justify-center gap-1 flex-wrap">
                        {awayTeam.form.map((r: string, i: number) => (
                            <span key={i} className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ${r === 'W' ? 'bg-green-500' : r === 'D' ? 'bg-white/30' : 'bg-red-500'}`}>{r}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadToHead;
