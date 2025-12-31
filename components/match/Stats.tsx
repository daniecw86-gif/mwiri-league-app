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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 grid grid-cols-3 text-center font-bold text-gray-900">
                <div className="text-left">{homeTeamName}</div>
                <div className="text-gray-500 uppercase text-xs tracking-wider self-center">Team Stats</div>
                <div className="text-right">{awayTeamName}</div>
            </div>

            <div className="p-6 space-y-8">
                {statItems.map((item) => {
                    const homeValue = stats[item.key].home;
                    const awayValue = stats[item.key].away;
                    const total = homeValue + awayValue;
                    const homeWidth = total === 0 ? 50 : (homeValue / total) * 100;
                    const awayWidth = total === 0 ? 50 : (awayValue / total) * 100;

                    return (
                        <div key={item.key}>
                            <div className="flex justify-between mb-2 text-sm font-bold text-gray-700">
                                <span>{homeValue}{item.isPercentage ? '%' : ''}</span>
                                <span className="text-gray-500 font-normal">{item.label}</span>
                                <span>{awayValue}{item.isPercentage ? '%' : ''}</span>
                            </div>
                            <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
                                <div
                                    className="bg-mwiri-blue"
                                    style={{ width: `${homeWidth}%` }}
                                ></div>
                                <div
                                    className="bg-mwiri-yellow"
                                    style={{ width: `${awayWidth}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stats;
