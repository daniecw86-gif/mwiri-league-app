import { Team, LeagueTeamStats, FixtureGroup, MatchData } from '../types';
import { results } from './results';

// Define a BaseTeam type that doesn't strictly require home/away valid stats initially if we are going to overwrite them,
// but looking at the data, we want to match Team eventually.
// We'll use a temporary type for the input array.
type BaseTeamData = Omit<Team, 'home' | 'away'>;

const baseTeams: BaseTeamData[] = [
    {
        id: 1,
        name: "Ruga-Ruga'88",
        logo: "/images/clubs/ruga-ruga.jpg",
        primaryColor: "#1a472a",
        group: "Sir. Wilberforce Nadiope",
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        points: 0,
        form: [],
        manager: "James Okello",
        stadium: "Hilltop Arena",
        capacity: "15,000",
        nickname: "The Veterans",
        founded: "1988",
        website: "www.rugaruga88.com",
        description: "Ruga-Ruga'88 brings decades of experience and a hardened spirit to the league. Known for their tactical discipline and resilience.",
    },
    {
        id: 2,
        name: "Mbawo'91",
        logo: "/images/clubs/mbawo.jpg",
        primaryColor: "#8b4513",
        group: "Dr. Milton Obote",
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        points: 0,
        form: [],
        manager: "Patrick Timber",
        stadium: "The Woodworks",
        capacity: "12,000",
        nickname: "The Carpenters",
        founded: "1991",
        website: "www.mbawo91.com",
        description: "Solid as oak, Mbawo'91 is a tough team to break down. They build their attacks with precision and strength.",
    },
    {
        id: 3,
        name: "Bootlickers'93",
        logo: "/images/clubs/bootlickers.png",
        primaryColor: "#ffd700",
        group: "Sir. Wilberforce Nadiope",
        played: 2,
        won: 0,
        drawn: 2,
        lost: 0,
        gf: 0,
        ga: 0,
        points: 2,
        form: ['D', 'D'],
        manager: "Simon Says",
        stadium: "Loyalty Park",
        capacity: "10,000",
        nickname: "The Loyalists",
        founded: "1993",
        website: "www.bootlickers93.com",
        description: "A team that sticks to the plan no matter what. Their dedication to the badge is unmatched.",
    },
    {
        id: 4,
        name: "Winter'94",
        logo: "/images/clubs/winter.jpg",
        primaryColor: "#e0ffff",
        group: "Sir. Wilberforce Nadiope",
        played: 3,
        won: 1,
        drawn: 2,
        lost: 0,
        gf: 2,
        ga: 0,
        points: 5,
        form: ['W', 'D', 'D'],
        manager: "David Frost",
        stadium: "Ice Arena",
        capacity: "14,000",
        nickname: "The Blizzard",
        founded: "1994",
        website: "www.winter94.com",
        description: "Cool under pressure, Winter'94 freezes out opponents with their composed possession play.",
    },
    {
        id: 5,
        name: "Solida'95",
        logo: "/images/clubs/solida.png",
        primaryColor: "#696969",
        group: "Dr. Milton Obote",
        played: 2,
        won: 0,
        drawn: 1,
        lost: 1,
        gf: 0,
        ga: 1,
        points: 1,
        form: ['D', 'L'],
        manager: "Rock Stone",
        stadium: "Granite Ground",
        capacity: "11,500",
        nickname: "The Rocks",
        founded: "1995",
        website: "www.solida95.com",
        description: "True to their name, Solida'95 is built on a rock-solid defense that frustrates even the best attacks.",
    },
    {
        id: 6,
        name: "Top Layer'97",
        logo: "/images/clubs/toplayer.png",
        primaryColor: "#ff4500",
        group: "Dr. Milton Obote",
        played: 2,
        won: 1,
        drawn: 1,
        lost: 0,
        gf: 2,
        ga: 0,
        points: 4,
        form: ['D', 'W'],
        manager: "High Peak",
        stadium: "Summit Stadium",
        capacity: "13,000",
        nickname: "The Cream",
        founded: "1997",
        website: "www.toplayer97.com",
        description: "Always aiming for the top, this team plays attractive, high-pressing football.",
    },
    {
        id: 7,
        name: "Mpala'99",
        logo: "/images/clubs/mpala.jpg",
        primaryColor: "#daa520",
        group: "Dr. Milton Obote",
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        points: 0,
        form: [],
        manager: "Tom Lion",
        stadium: "Savannah Park",
        capacity: "16,000",
        nickname: "The Impalas",
        founded: "1999",
        website: "www.mpala99.com",
        description: "Fast and agile, Mpala'99 relies on speed and quick counter-attacks to catch opponents off guard.",
    },
    {
        id: 8,
        name: "Vuyos United'00",
        logo: "/images/clubs/vuyos.jpg",
        primaryColor: "#000080",
        group: "Dr. Milton Obote",
        played: 2,
        won: 0,
        drawn: 1,
        lost: 1,
        gf: 0,
        ga: 2,
        points: 1,
        form: ['D', 'L'],
        manager: "Vuyo M.",
        stadium: "Unity Ground",
        capacity: "9,000",
        nickname: "The United",
        founded: "2000",
        website: "www.vuyosunited.com",
        description: `Background
Vuyos utd Fc..class 2000 to 2005. VUYOS utd Fc is the cohort with the biggest energy and most attendance of every league match. The name Vuyos comes from the fact that the cohort underwent the most strikes ever held in Mwiri and switched the highest number of Head Masters from Mr Semuvule, Mulongo,Kintu,Mukubira all in  a span of 6 years.
Vuyos utd fc,even with all these distractions have the highest number of Division ones for an O level class ever recorded in Mwiri and right now have every individual in all distinct places in Govt ,Ministries,police,the Army,Health and NGOs to entertainment to private businesses even upto the famous restaurant sector.
In the Mwiri league,Vuyos attained its highest position of being Second when they played the final against Suici and sadly lost at Kings Park. But regardless every season ,they have attained the top 5 in the league. VUYOS utds rival is always Buliti and currently Buliti has failed to beat or discipline Vuyos in any sport but maybe Drinking alcohol. VUYOS has hosted the League every season and majorly are remembered for bringing Cardi B angels in the 3rd season at Hill top that brought the House down.
Vuyos utds goal is to keep going up the table but mostly connecting with different Hosts,establishing networks and creating memories with its brotherly Leopards.`,
    },
    {
        id: 9,
        name: "Buliti'01",
        logo: "/images/clubs/buliti.jpg",
        primaryColor: "#800000",
        group: "Sir. Wilberforce Nadiope",
        played: 2,
        won: 0,
        drawn: 0,
        lost: 2,
        gf: 0,
        ga: 3,
        points: 0,
        form: ['L', 'L'],
        manager: "Isaac Newton",
        stadium: "Gravity Field",
        capacity: "10,500",
        nickname: "The Force",
        founded: "2001",
        website: "www.buliti01.com",
        description: "Buliti'01 is a force to be reckoned with, playing a physical and direct style of football.",
    },
    {
        id: 10,
        name: "Muniga'02",
        logo: "/images/clubs/atletico muniga.jpg",
        primaryColor: "#4b0082",
        group: "Sir. Wilberforce Nadiope",
        played: 3,
        won: 1,
        drawn: 2,
        lost: 0,
        gf: 1,
        ga: 0,
        points: 5,
        form: ['D', 'W', 'D'],
        manager: "Dark Knight",
        stadium: "Shadow Realm",
        capacity: "8,000",
        nickname: "The Dark Horses",
        founded: "2002",
        website: "www.muniga02.com",
        description: "Unpredictable and dangerous, Muniga'02 often surprises big teams with their unconventional tactics.",
    },
    {
        id: 11,
        name: "Kombora'03",
        logo: "/images/clubs/kombora.jpg",
        primaryColor: "#ff0000",
        group: "Dr. Milton Obote",
        played: 2,
        won: 0,
        drawn: 1,
        lost: 1,
        gf: 0,
        ga: 1,
        points: 1,
        form: ['D', 'L'],
        manager: "Rocket Man",
        stadium: "Launchpad",
        capacity: "11,000",
        nickname: "The Rockets",
        founded: "2003",
        website: "www.kombora03.com",
        description: `Figuratively... that feeling of dread that slowly crawls up your spine, as you are partnered with a ''horse'' for a sosh date in plain view of every one. Which then morphs into sheer terror at the realisation that you will be the punchline for every joke, diss, abuse and banter amongst your classmates even long after you leave the mighty hill of Mwiri... KOMBORA !!!

For those to whom English is not your forte, don't let Kyagaba's arrogance fool you. We can be humble when we want. And in this spirit of humility, we shall be gracious enough to explain the meaning of Kombora... literally.

Literally, the terror inflicted on you by those who are stronger, smarter and generally better than you!  KOMBORA !!!                                                                                            An ominous sounding name, befitting an ominous group of gentlemen of the Class of 2003-2008.

Kombora has the honor and privilege of being the founding cohort of the Mwiri league. In hindsight, it is only fitting that such a great responsibility was burdened to the equally great men of Kombora.
 
Consequently, Kombora holds the distinction of having held the Mwiri league Chairmanship for the longest duration. Furthermore, Kombora pushed the envelope of exemplary leadership handing over the reigns for the Mwiri League contrary to popular Ugandan belief of holding onto power no matter what.
And in its time of great need, the league has returned home once more. Because, this season Six finds Kombora at the helm again.

Ever since the inception of the Mwiri league, Kombora has always stood out like the blue balls of Mwiri's famed vervet monkeys for its leadership pedigree, tenacity, grit, guile and resourcefulness. Speaking of leadership pedigree, Kombora has and still holds one of MOBA's highest offices, the Office of the Vice Presidency. Ochaya Ronald took the helm before passing on the mantle to the incumbent Vice President Isabirye Joel Natseli Jr to further Kombora's charge in championing the resurgence of Busoga College Mwiri as an academic powerhouse.

On the cricket field, Kombora lives up to its name, terrorizing all opponents. No season goes by without the team contesting either the finals or semis even when in bad form. On the soccer pitch, the terror takes on another form... The giant slayers!       You can bet the house on Kombora beating the team they surely have no right to even lace their boots.
 
Kombora has three cohorts vying for the honour to be considered their rivals in the league; Muniga, Blue-Dollar and Makaya. Muniga has the audacity to think they are better than Kombora. Probably, they treat it like a sibling rivalry.                                                       Blue_Dollar lacks the self-awareness nor the humility to know that they are not better than Kombora. Whereas for Makaya, they are simply loudmouths, Like their name ''Makaya'' denotes, empty on the inside!
 
Although excellent in all fields, it is outside the pitch that Kombora truly outdoes itself. When looking for the vibe at any match day, you really need look no further!  The most interesting and luscious female companions, the best dance moves, the people most likely to close the party, turn up the heat or bring the roof down...

 Kombora , a dreaded terror!`,
    },
    {
        id: 12,
        name: "Bluedollar'04",
        logo: "/images/clubs/blue-dollar.jpg",
        primaryColor: "#0000ff",
        group: "Dr. Milton Obote",
        played: 2,
        won: 0,
        drawn: 1,
        lost: 1,
        gf: 0,
        ga: 2,
        points: 1,
        form: ['D', 'L'],
        manager: "Richie Rich",
        stadium: "The Vault",
        capacity: "18,000",
        nickname: "The Tycoons",
        founded: "2004",
        website: "www.bluedollar04.com",
        description: "A wealthy club with high ambitions. They are investing heavily to climb up the table.",
    },
    {
        id: 13,
        name: "Lukambwe'05",
        logo: "/images/clubs/lukambwe.jpg",
        primaryColor: "#a52a2a",
        group: "Sir. Wilberforce Nadiope",
        played: 1,
        won: 1,
        drawn: 0,
        lost: 0,
        gf: 2,
        ga: 0,
        points: 3,
        form: ['W'],
        manager: "Warrior Chief",
        stadium: "Battleground",
        capacity: "9,500",
        nickname: "The Warriors",
        founded: "2005",
        website: "www.lukambwe05.com",
        description: `⚽🔥 FROM LUKAMBWE CUPS TO MWIRI LEAGUE CUPS – WE KEEP SERVING WINS! ☕🏆

When you hear Lukambwe, just know things are about to get boiling hot. This isn’t just a name — it’s a lifestyle, a legend, and a warning label for every opponent in the Mwiri League.

Back in school, Lukambwe was that scorching cup of tea you took when pockets were on E — no escort, low sugar, just vibes and pain. 😅 That same fire brewed the first-ever Mwiri League champions. From day one, Lukambwe FC didn’t come to play — we came to own the pitch, the afterparty, and the bragging rights. 🏆🔥

Every Lukambwe game? An El Clásico. Every Lukambwe turnout? A festival. Other teams come to play football — Lukambwe comes to make headlines, break ankles, and steal hearts. ❤⚽

And off the pitch? Don’t even start. Lukambwe’s got everything — accountants crunching numbers, auditors catching red flags, engineers building dreams, surveyors plotting success, and entertainers keeping the vibes on 100. If excellence was a sport, Lukambwe would still be champions. 💼🎤📐

Let’s not forget — Lukambwe has the most ex-school team players EVER. We don’t do “former glory.” We do permanent heat. 🔥🔥

So this season, just know: Lukambwe FC isn’t coming to compete we’re coming to reheat the league. 🫖⚡

Warning : when Lukambwe Boils… The League Sweats. 💨🔥
#LukambweFC #TooHotToHandle #MwiriLeague #WeBrewChampions #NoEscortJustGoals`,
    },
    {
        id: 14,
        name: "Suici'06",
        logo: "/images/clubs/suici.jpg",
        primaryColor: "#2f4f4f",
        group: "Sir. Wilberforce Nadiope",
        played: 1,
        won: 1,
        drawn: 0,
        lost: 0,
        gf: 2,
        ga: 0,
        points: 3,
        form: ['W'],
        manager: "Risk Taker",
        stadium: "The Edge",
        capacity: "7,000",
        nickname: "The Daredevils",
        founded: "2006",
        website: "www.suici06.com",
        description: "Living on the edge, Suici'06 plays a high-risk, high-reward style that keeps fans on their toes.",
    },
    {
        id: 15,
        name: "Kanga fc '07",
        logo: "/images/clubs/kanga.png",
        primaryColor: "#228b22",
        group: "Sir. Wilberforce Nadiope",
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        points: 0,
        form: [],
        manager: "Joey Jump",
        stadium: "Outback Arena",
        capacity: "8,500",
        nickname: "The Hoppers",
        founded: "2007",
        website: "www.kangafc07.com",
        description: "Full of energy, Kanga FC never stops running. Their fitness levels are among the best in the league.",
    },
    {
        id: 16,
        name: "Makaya'08",
        logo: "/images/clubs/makaya.jpg",
        primaryColor: "#d2691e",
        group: "Dr. Milton Obote",
        played: 3,
        won: 3,
        drawn: 0,
        lost: 0,
        gf: 7,
        ga: 0,
        points: 9,
        form: ['W', 'W', 'W'],
        manager: "Village Elder",
        stadium: "Community Park",
        capacity: "6,000",
        nickname: "The Locals",
        founded: "2008",
        website: "www.makaya08.com",
        description: "A community-focused club with a strong local following. They play with heart and passion.",
    },
    {
        id: 17,
        name: "Shadow'09",
        logo: "/images/clubs/shadow.jpg",
        primaryColor: "#000000",
        group: "Dr. Milton Obote",
        played: 1,
        won: 0,
        drawn: 0,
        lost: 1,
        gf: 0,
        ga: 4,
        points: 0,
        form: ['L'],
        manager: "Ghost Walker",
        stadium: "Twilight Zone",
        capacity: "5,000",
        nickname: "The Phantoms",
        founded: "2009",
        website: "www.shadow09.com",
        description: "Often underestimated, Shadow'09 prefers to stay out of the limelight until they strike.",
    },
    {
        id: 18,
        name: "Divers'13",
        logo: "/images/clubs/divers.jpg",
        primaryColor: "#00ced1",
        group: "Dr. Milton Obote",
        played: 2,
        won: 1,
        drawn: 1,
        lost: 0,
        gf: 1,
        ga: 0,
        points: 4,
        form: ['D', 'W'],
        manager: "Deep Blue",
        stadium: "Ocean View",
        capacity: "4,000",
        nickname: "The Divers",
        founded: "2013",
        website: "www.divers13.com",
        description: `Divers FC – Mwiri League
1. Meaning
The name “Divers FC” is a humorous and nostalgic nod to our high-school days at The School. The word “Divers” comes from our playful reputation for “diving” — being the first to arrive at school events, meals, or any activity that promised excitement. What began as a running joke among classmates of the Class of 2013–2018 has evolved into a proud identity symbolizing energy, readiness, and enthusiasm. Today, the name Divers FC stands for a spirit of eagerness, teamwork, and always showing up — both on and off the pitch.
2. Rivalries in the Mwiri League
No mention of Divers FC is complete without referencing our intense yet friendly rivalry with Wampa FC.
The Divers–Wampa rivalry is one of the most anticipated fixtures in the Mwiri League — a battle not just of football skills, but of pride, bragging rights, and shared history. Both teams trace their roots to closely linked school classes, and whenever they meet, the banter, chants, and atmosphere are electric. Fans describe it as “the Mwiri El Clásico”, a match where loyalty runs deep, and every tackle carries a memory.
3. Expectations for Mwiri League Season Six
Heading into Season Six of the Mwiri League, Divers FC is focused on consistency, discipline, and teamwork.
The club aims to build on its previous performances by:
•	Strengthening its defense and midfield coordination,
•	Promoting fitness and unity among all squad members, and
•	Delivering entertaining football that reflects the Divers’ playful yet determined character.
The team’s mantra for the season is “Arrive Early, Leave a Mark” — a modern echo of the origin of “Divers.” With improved preparation, renewed motivation, and stronger squad depth, Divers FC is eyeing a top-four finish and hopes to cement its place as one of the most respected sides in the league.
4. History
Divers FC was founded by members of the Busoga College Mwiri Class of 2013–2018 who shared a love for football and a desire to stay connected after school.
Initially started as a casual alumni team, the club quickly grew into a competitive outfit within the Mwiri Corporate League — a social and sporting platform bringing together different alumni classes.
From its early friendly matches to organized league participation, Divers FC has maintained the camaraderie, humor, and brotherhood that defined its founders. Over the seasons, the club has become known for:
•	Its passionate fan base,
•	Memorable match-day banter, and
•	Commitment to sportsmanship and community spirit.
Through ups and downs, Divers FC remains a living symbol of Mwiri pride, friendship, and the belief that no matter where life takes us — Divers will always show up first.
Motto: “First to Dive, Last to Quit.”
Mission: “To build unity, excellence, and brotherhood through the beautiful game.”`,
    },
    {
        id: 19,
        name: "Wampa Fc",
        logo: "/images/clubs/wampa.jpg",
        primaryColor: "#ff8c00",
        group: "Sir. Wilberforce Nadiope",
        played: 2,
        won: 1,
        drawn: 0,
        lost: 1,
        gf: 1,
        ga: 2,
        points: 3,
        form: ['L', 'W'],
        manager: "Snow Beast",
        stadium: "Cave Arena",
        capacity: "3,500",
        nickname: "The Beasts",
        founded: "2014",
        website: "www.wampafc.com",
        description: `Wampa FC: The Return of the Roll Call Renegades🔥

Wampa FC isn't just a team; it's a legacy forged in the storied halls of Mwiri. Representing the Class of 2017–2022, the name Wampa originates from a time honored school tradition—the immediate roll call. Sounding the drum meant instant attendance, and missing it brought the full wrath of the Prefectorial Disciplinary Committee: serious caning or hard punishment.

Yet, this cohort was different. Known for their stubborn resilience, many members famously missed the physical roll call but were somehow still marked present. It is this rebellious and determined spirit they carry forward today. They believe that since leaving Mwiri, they must continue to bring that same unmatched energy to dominate all Mwiri related activities and the Mwiri League💯 

For the past decade, you simply cannot discuss Mwiri sports without mentioning Wampa men. Their sporting pedigree is undeniable: In the 2022 Schools Cricket Week, an incredible six players from Wampa were on the team that won the coveted cricket shield. Wampa has also produced professional rugby players who are excelling in the national league, including Ziraba Taj and Mununuzi Moses. Most notably, Ojambo Jeremiah recently featured on the National Team. 

Last season, as the youngest cohort, Wampa FC had a disappointing debut, finishing in 18th place out of 21 teams. This season is different. They are fueled by fresh skills, renewed energy, and a score to settle with their old rivals, Divers FC, who had the upper hand during their school days.
Wampa FC’s Aim for Season Six is to finish in the Top Four positions in football and also win the cricket title. 

The Question is: 
Will Wampa FC be able to overcome last season's performance, make a powerful statement, and fulfill their aims of a Top Four football finish and a Cricket title?

Find out for yourselves😉 You absolutely do not want to miss this season🙌
Come November 22nd, get ready to witness fire and vibes on the pitch🔥💯`,
    },
    {
        id: 20,
        name: "Destroyers' FC10",
        logo: "/images/clubs/destroyers.png",
        primaryColor: "#36454f",
        group: "Sir. Wilberforce Nadiope",
        played: 2,
        won: 0,
        drawn: 0,
        lost: 2,
        gf: 0,
        ga: 3,
        points: 0,
        form: ['L', 'L'],
        manager: "Chaos Bringer",
        stadium: "Rubble Field",
        capacity: "3,000",
        nickname: "The Demolishers",
        founded: "2010",
        website: "www.destroyersfc10.com",
        description: "Currently struggling at the bottom, Destroyers' FC10 is looking to rebuild and come back stronger.",
    },
    {
        id: 21,
        name: "Sasi FC",
        logo: "/images/clubs/sasi.jpg",
        primaryColor: "#ff69b4",
        group: "Sir. Wilberforce Nadiope",
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        points: 0,
        form: [],
        manager: "Unknown",
        stadium: "Unknown",
        capacity: "0",
        nickname: "Sasi",
        founded: "2025",
        website: "www.sasifc.com",
        description: "New team in the league.",
    },
    {
        id: 22,
        name: "Salvo FC",
        logo: "/images/clubs/salvo.jpg",
        primaryColor: "#8a2be2",
        group: "Sir. Wilberforce Nadiope",
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        points: 0,
        form: [],
        manager: "Unknown",
        stadium: "Unknown",
        capacity: "0",
        nickname: "Salvo",
        founded: "2025",
        website: "www.salvofc.com",
        description: "New team in the league.",
    },
];


const calculateTeamStats = (teamsList: BaseTeamData[], matchResults: FixtureGroup[]): Team[] => {
    // Deep clone to avoid mutating the base config if we re-run
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const calculatedTeams: any[] = JSON.parse(JSON.stringify(teamsList));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const teamMap = new Map<string, any>();

    // Initialize map for quick lookup
    calculatedTeams.forEach(team => {
        // Reset stats to ensure we are calculating from scratch
        team.played = 0;
        team.won = 0;
        team.drawn = 0;
        team.lost = 0;
        team.gf = 0;
        team.ga = 0;
        team.points = 0;
        team.form = [];

        // Initialize Home/Away splits
        // Cast to compatible Stats types
        const emptyStats: LeagueTeamStats = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, form: [] };
        team.home = { ...emptyStats };
        team.away = { ...emptyStats };

        teamMap.set(team.name, team);
    });

    matchResults.forEach(fixture => {
        fixture.matches.forEach((match: MatchData) => {
            // Only process if the match has valid scores (not null/undefined)
            if (match.homeScore === undefined || match.awayScore === undefined) return;

            const homeTeam = teamMap.get(match.homeTeam);
            const awayTeam = teamMap.get(match.awayTeam);

            if (homeTeam && awayTeam) {
                // Overall Stats
                homeTeam.played++;
                awayTeam.played++;

                homeTeam.gf += match.homeScore;
                homeTeam.ga += match.awayScore;
                awayTeam.gf += match.awayScore;
                awayTeam.ga += match.homeScore;

                // Home/Away Split Stats (Games Played/Goals)
                homeTeam.home.played++;
                homeTeam.home.gf += match.homeScore;
                homeTeam.home.ga += match.awayScore;

                awayTeam.away.played++;
                awayTeam.away.gf += match.awayScore;
                awayTeam.away.ga += match.homeScore;

                if (match.homeScore > match.awayScore) {
                    // Home Win
                    homeTeam.won++;
                    homeTeam.points += 3;
                    homeTeam.form.push('W');

                    homeTeam.home.won++;
                    homeTeam.home.points += 3;
                    homeTeam.home.form.push('W');

                    awayTeam.lost++;
                    awayTeam.form.push('L');

                    awayTeam.away.lost++;
                    awayTeam.away.form.push('L');
                } else if (match.homeScore < match.awayScore) {
                    // Away Win
                    awayTeam.won++;
                    awayTeam.points += 3;
                    awayTeam.form.push('W');

                    awayTeam.away.won++;
                    awayTeam.away.points += 3;
                    awayTeam.away.form.push('W');

                    homeTeam.lost++;
                    homeTeam.form.push('L');

                    homeTeam.home.lost++;
                    homeTeam.home.form.push('L');
                } else {
                    // Draw
                    homeTeam.drawn++;
                    homeTeam.points += 1;
                    homeTeam.form.push('D');

                    homeTeam.home.drawn++;
                    homeTeam.home.points += 1;
                    homeTeam.home.form.push('D');

                    awayTeam.drawn++;
                    awayTeam.points += 1;
                    awayTeam.form.push('D');

                    awayTeam.away.drawn++;
                    awayTeam.away.points += 1;
                    awayTeam.away.form.push('D');
                }
            }
        });
    });

    // Keep only last 5 form (most recent last?)
    calculatedTeams.forEach(team => {
        if (team.form.length > 5) {
            team.form = team.form.slice(team.form.length - 5);
        }
    });

    return calculatedTeams as Team[];
};

export const teams: Team[] = calculateTeamStats(baseTeams, results);
