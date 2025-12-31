import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fixtures } from '../data/fixtures';
import { teams } from '../data/teams';
import { getNextFixture, formatMatchDate, getTeamInitial } from '../utils/fixtureUtils';

const Hero = () => {
    // Get the next fixture dynamically
    const nextFixtureData = getNextFixture(fixtures);

    // Create team lookup map
    const teamMap = new Map();
    teams.forEach(t => teamMap.set(t.name, t));

    // Get team details if next fixture exists
    const homeTeam = nextFixtureData ? teamMap.get(nextFixtureData.match.homeTeam) : null;
    const awayTeam = nextFixtureData ? teamMap.get(nextFixtureData.match.awayTeam) : null;

    return (
        <div className="relative bg-gradient-to-r from-mwiri-blue-deep to-mwiri-blue overflow-hidden rounded-3xl shadow-2xl mb-12 border border-white/10">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('/images/mwiri-logo.png')] bg-center bg-no-repeat bg-contain transform scale-150 translate-x-1/4"></div>

            <div className="px-6 py-12 md:p-12 relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-mwiri-yellow font-bold text-xs mb-6 uppercase tracking-wider shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-mwiri-yellow animate-pulse"></span>
                        Featured Matchweek
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6 text-white drop-shadow-sm">
                        The Mwiri League <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mwiri-yellow to-mwiri-gold">Season 2025/26</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl leading-relaxed font-medium">
                        Welcome to the official home of the Mwiri League. Follow your favorite teams, check the latest scores, and stay up to date with all the action from the Hilltop.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/fixtures" className="bg-mwiri-yellow text-mwiri-blue hover:bg-white hover:text-mwiri-blue font-bold py-2.5 px-6 rounded-full transition-colors duration-300 text-sm md:text-base">
                            View Fixtures
                        </Link>
                        <Link href="/clubs" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-mwiri-blue font-bold py-2.5 px-6 rounded-full transition-colors duration-300 text-sm md:text-base">
                            Meet the Clubs
                        </Link>
                    </div>
                </div>

                {/* Next Match Card */}
                <div className="md:w-1/3 w-full relative">
                    <div className="aspect-square rounded-full bg-gradient-to-br from-mwiri-blue-light to-mwiri-yellow opacity-30 absolute inset-0 blur-3xl animate-pulse"></div>
                    <div className="relative z-10 glass-dark rounded-2xl p-6 border border-white/10 shadow-2xl transform rotate-1 md:rotate-2 transition-transform duration-500 hover:rotate-0">
                        <div className="text-center">
                            {nextFixtureData ? (
                                <>
                                    <p className="text-mwiri-yellow font-bold text-xs uppercase tracking-widest mb-3">Next Match</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-center">
                                            {homeTeam?.logo ? (
                                                <div className="w-10 h-10 mx-auto mb-2 relative">
                                                    <Image src={homeTeam.logo} alt={homeTeam.name} fill className="object-contain" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-mwiri-blue font-bold mx-auto mb-2 text-sm">
                                                    {getTeamInitial(nextFixtureData.match.homeTeam)}
                                                </div>
                                            )}
                                            <span className="font-bold text-xs">{nextFixtureData.match.homeTeam.split("'")[0]}</span>
                                        </div>
                                        <span className="text-xl font-bold text-white/80">VS</span>
                                        <div className="text-center">
                                            {awayTeam?.logo ? (
                                                <div className="w-10 h-10 mx-auto mb-2 relative">
                                                    <Image src={awayTeam.logo} alt={awayTeam.name} fill className="object-contain" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-mwiri-blue font-bold mx-auto mb-2 text-sm">
                                                    {getTeamInitial(nextFixtureData.match.awayTeam)}
                                                </div>
                                            )}
                                            <span className="font-bold text-xs">{nextFixtureData.match.awayTeam.split("'")[0]}</span>
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium text-gray-300 bg-white/5 py-2 rounded">
                                        {formatMatchDate(nextFixtureData.date)} • {nextFixtureData.match.time || '16:00'}
                                    </div>
                                </>
                            ) : (
                                <div className="py-8">
                                    <p className="text-white/70 text-sm">No upcoming matches scheduled</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
