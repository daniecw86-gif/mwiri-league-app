import React from 'react';
import Image from 'next/image';

interface Team {
    id: number;
    name: string;
    stadium?: string;
    logo?: string | null;
    primaryColor?: string;
}

interface ClubCardProps {
    team: Team;
}

const ClubCard: React.FC<ClubCardProps> = ({ team }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative">
            <div className="h-32 bg-gray-900 relative overflow-hidden group-hover:h-36 transition-all duration-300">
                {/* Background Pattern/Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-mwiri-blue-deep to-mwiri-blue opacity-100"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('/images/stadium-pattern.png')] bg-cover"></div>

                {/* Team Primary Color Accent */}
                <div
                    className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full"
                    style={{ backgroundColor: team.primaryColor || 'transparent', opacity: 0.1 }}
                ></div>

                {/* Logo Container */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                        className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-[3px] border-white overflow-hidden p-3 relative"
                    >
                        {team.logo ? (
                            <Image src={team.logo} alt={`${team.name} logo`} fill className="object-contain p-1" />
                        ) : (
                            <span className="text-2xl font-black text-slate-300">{team.name.charAt(0)}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-10 pb-6 px-6 text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight group-hover:text-mwiri-blue transition-colors">{team.name}</h3>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{team.stadium || 'Home Ground'}</p>

                <div className="w-full h-px bg-slate-100 mb-4"></div>

                <a href={`/clubs/${team.id}`} className="inline-flex items-center justify-center text-xs font-bold text-mwiri-blue bg-blue-50 hover:bg-mwiri-blue hover:text-white py-2 px-4 rounded-full transition-all duration-300">
                    View Profile
                </a>
            </div>
        </div>
    );
};

export default ClubCard;
