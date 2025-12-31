import React from 'react';

interface Stats {
    possession: { home: number; away: number };
    shots: { home: number; away: number };
    shotsOnTarget: { home: number; away: number };
    corners: { home: number; away: number };
    fouls: { home: number; away: number };
    yellowCards: { home: number; away: number };
    redCards: { home: number; away: number };
}

interface StatsComparisonProps {
    stats: Stats;
    homeTeamName: string;
    awayTeamName: string;
    homeColor?: string;
    awayColor?: string;
}

const StatRow = ({ label, homeValue, awayValue, homeColor, awayColor }: { label: string, homeValue: number, awayValue: number, homeColor: string, awayColor: string }) => {
    const total = homeValue + awayValue;
    const homePercent = total === 0 ? 50 : (homeValue / total) * 100;
    const awayPercent = total === 0 ? 50 : (awayValue / total) * 100;

    return (
        <div className="mb-6">
            <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                <span>{homeValue}</span>
                <span className="uppercase text-gray-400 text-xs tracking-widest">{label}</span>
                <span>{awayValue}</span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
                <div
                    style={{ width: `${homePercent}%`, backgroundColor: homeColor }}
                    className="transition-all duration-500"
                />
                <div
                    style={{ width: `${awayPercent}%`, backgroundColor: awayColor }}
                    className="transition-all duration-500"
                />
            </div>
        </div>
    );
};

const StatsComparison: React.FC<StatsComparisonProps> = ({ stats, homeTeamName, awayTeamName, homeColor = '#0070C0', awayColor = '#171717' }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="font-bold text-xl text-gray-900 mb-8 text-center">Match Stats</h3>

            <div className="max-w-2xl mx-auto">
                <StatRow label="Possession %" homeValue={stats.possession.home} awayValue={stats.possession.away} homeColor={homeColor} awayColor={awayColor} />
                <StatRow label="Shots" homeValue={stats.shots.home} awayValue={stats.shots.away} homeColor={homeColor} awayColor={awayColor} />
                <StatRow label="Shots on Target" homeValue={stats.shotsOnTarget.home} awayValue={stats.shotsOnTarget.away} homeColor={homeColor} awayColor={awayColor} />
                <StatRow label="Corners" homeValue={stats.corners.home} awayValue={stats.corners.away} homeColor={homeColor} awayColor={awayColor} />
                <StatRow label="Fouls" homeValue={stats.fouls.home} awayValue={stats.fouls.away} homeColor={homeColor} awayColor={awayColor} />
                <StatRow label="Yellow Cards" homeValue={stats.yellowCards.home} awayValue={stats.yellowCards.away} homeColor="#FFD700" awayColor="#FFD700" />
                <StatRow label="Red Cards" homeValue={stats.redCards.home} awayValue={stats.redCards.away} homeColor="#FF0000" awayColor="#FF0000" />
            </div>
        </div>
    );
};

export default StatsComparison;
