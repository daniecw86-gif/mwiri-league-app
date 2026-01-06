import React from 'react';
import Link from 'next/link';

interface StatsCardProps {
    title: string;
    player: {
        name: string;
        team: string;
        value: number;
        image?: string;
        teamLogo?: string | null;
    };
    statLabel: string;
    linkHref: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, player, statLabel, linkHref }) => {
    return (
        <div className="crystal-glass rounded-2xl overflow-hidden crystal-float">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-barlow font-bold text-mwiri-gold uppercase tracking-wide">{title}</h3>
                    <Link href={linkHref} className="text-mwiri-gold text-sm font-bold hover:text-white flex items-center gap-1 transition-colors">
                        View All
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    {/* Player Image / Team Logo */}
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border-2 border-mwiri-gold overflow-hidden relative">
                        {player.image ? (
                            <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                        ) : player.teamLogo ? (
                            <img src={player.teamLogo} alt={player.team} className="w-full h-full object-contain p-2" />
                        ) : (
                            <svg className="w-12 h-12 text-white/40" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="text-3xl font-black text-mwiri-gold mb-1">{player.value}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mb-2">{statLabel}</div>
                        <div className="font-bold text-white leading-tight">{player.name}</div>
                        <div className="text-sm text-white/60">{player.team}</div>
                    </div>
                </div>
            </div>
            <div className="bg-white/5 px-6 py-3 border-t border-white/10">
                <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-mwiri-gold to-mwiri-yellow h-1.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
