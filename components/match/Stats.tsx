import React from 'react';
import { Match } from '../../types';

interface StatsProps {
    match: Match;
}

const Stats: React.FC<StatsProps> = ({ match }) => {
    const { stats, homeTeamName, awayTeamName } = match;

    const statItems = [
        { label: 'Possession', key: 'possession', isPercentage: true },
        { label: 'Shots', key: 'shots' },
        { label: 'Shots on Target', key: 'shotsOnTarget' },
        { label: 'Corners', key: 'corners' },
        { label: 'Fouls', key: 'fouls' },
        { label: 'Yellow Cards', key: 'yellowCards' },
        { label: 'Red Cards', key: 'redCards' },
    ];

    return (
        <div className="crystal-glass rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 grid grid-cols-3 text-center font-bold">
                <div className="text-left text-white text-sm">{homeTeamName}</div>
                <div className="text-mwiri-gold uppercase text-xs tracking-wider self-center">Match Stats</div>
                <div className="text-right text-white text-sm">{awayTeamName}</div>
            </div>

            <div className="p-6 space-y-6">
                {statItems.map((item) => {
                    const homeValue = stats[item.key].home;
                    const awayValue = stats[item.key].away;
                    const total = homeValue + awayValue;
                    const homeWidth = total === 0 ? 50 : (homeValue / total) * 100;
                    const awayWidth = total === 0 ? 50 : (awayValue / total) * 100;
                    const homeBigger = homeValue > awayValue;
                    const awayBigger = awayValue > homeValue;

                    return (
                        <div key={item.key}>
                            <div className="flex justify-between mb-2 text-sm">
                                <span className={`font-black tabular-nums ${homeBigger ? 'text-mwiri-gold' : 'text-white/60'}`}>
                                    {homeValue}{item.isPercentage ? '%' : ''}
                                </span>
                                <span className="text-white/50 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                <span className={`font-black tabular-nums ${awayBigger ? 'text-mwiri-gold' : 'text-white/60'}`}>
                                    {awayValue}{item.isPercentage ? '%' : ''}
                                </span>
                            </div>
                            <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                                <div
                                    className={`rounded-l-full transition-all duration-700 ease-out ${homeBigger ? 'bg-mwiri-blue' : 'bg-white/15'}`}
                                    style={{ width: `${homeWidth}%` }}
                                />
                                <div
                                    className={`rounded-r-full transition-all duration-700 ease-out ${awayBigger ? 'bg-mwiri-gold' : 'bg-white/15'}`}
                                    style={{ width: `${awayWidth}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stats;
