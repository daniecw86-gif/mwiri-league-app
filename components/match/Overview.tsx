import React from 'react';
import { Match, MatchEvent } from '../../types';

interface OverviewProps {
    match: Match;
}

const Overview: React.FC<OverviewProps> = ({ match }) => {
    const { events, venue, date, time } = match;

    return (
        <div className="space-y-6">
            {/* Match Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-900">Match Events</h3>
                </div>
                <div className="p-6">
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-100"></div>

                        <div className="space-y-8">
                            {events.map((event: MatchEvent, index: number) => (
                                <div key={index} className={`flex items-center justify-between ${event.team === 'home' ? 'flex-row' : 'flex-row-reverse'} group`}>
                                    {/* Team Event Content */}
                                    <div className={`w-5/12 ${event.team === 'home' ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                        <div className="font-bold text-gray-900 text-lg leading-none">{event.player}</div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{event.detail}</div>
                                    </div>

                                    {/* Time/Icon */}
                                    <div className={`relative z-10 w-12 h-12 flex items-center justify-center bg-white border-4 rounded-full font-black text-sm shadow-sm transition-transform group-hover:scale-110 ${event.team === 'home' ? 'border-mwiri-blue text-mwiri-blue' : 'border-mwiri-gold text-mwiri-gold-dark'
                                        }`}>
                                        {event.time}'
                                    </div>

                                    {/* Empty Space with Icon for Event Type */}
                                    <div className={`w-5/12 ${event.team === 'home' ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                                        {event.type === 'goal' && <span className="text-2xl animate-bounce inline-block">⚽</span>}
                                        {event.type === 'card' && (event.cardType === 'yellow' ? <span className="text-2xl">🟨</span> : <span className="text-2xl">🟥</span>)}
                                        {event.type === 'sub' && <span className="text-2xl text-gray-400">🔄</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Match Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Match Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-mwiri-blue">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Venue</p>
                            <p className="font-medium text-gray-900">{venue}</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-mwiri-blue">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Date & Time</p>
                            <p className="font-medium text-gray-900">{date} • {time}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
