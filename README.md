<<<<<<< HEAD
# Mwiri League - Official Application

The official web application for the Mwiri League, featuring live match results, team statistics, fixtures, and more.

## 🏆 Features

- **Live Match Results** - Real-time scores and match updates
- **Comprehensive Team Statistics** - Detailed stats for all teams including home/away performance
- **Interactive League Table** - Filter by overall, home, or away performance
- **Match Centre** - Detailed match pages with lineups, statistics, and head-to-head analysis
- **Player Statistics** - Top scorers, assists, and disciplinary records
- **Fixtures & Results** - Complete schedule and historical results
- **Club Profiles** - Detailed information about each team
- **News Feed** - Latest league news and match reports
- **Dark Mode Support** - Choose your preferred theme
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **UI Components**: Custom components with Lucide icons
- **State Management**: React hooks
- **Data**: TypeScript-based data files with full type safety

## 📦 Getting Started

### Prerequisites

- Node.js 20+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mwiri-league-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. (Optional) Create environment configuration:
```bash
cp .env.example .env.local
```
Then edit `.env.local` with your values.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
mwiri-league-app/
├── app/              # Next.js App Router pages
│   ├── clubs/        # Club pages
│   ├── fixtures/     # Fixtures pages
│   ├── matches/      # Match centre
│   ├── news/         # News pages
│   ├── results/      # Results pages
│   ├── stats/        # Statistics pages
│   ├── table/        # League table
│   └── players/      # Player pages
├── components/       # React components
│   ├── match/        # Match-related components
│   └── ...           # Other components
├── config/           # Configuration files
├── data/             # Data files (TypeScript)
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── public/           # Static assets
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Data Management

All league data is stored in TypeScript files in the `/data` directory:
- `teams.ts` - Team information and statistics
- `fixtures.ts` - Upcoming matches
- `results.ts` - Match results
- `players.ts` - Player information
- `news.ts` - News articles
- `stats.ts` - Computed statistics
- `matchDetails.ts` - Detailed match information

To update results or add new fixtures, edit the appropriate TypeScript file.

## 🎨 Customization

### Theme Colors

The app uses custom Mwiri League brand colors defined in `app/globals.css`:
- Primary Blue: `#005696`
- Primary Yellow: `#FFD100`
- Additional shades for various UI elements

### Configuration

App settings can be customized in `config/app.config.ts`:
- League name and season
- Feature flags
- UI constants
- External service integrations

## 📊 Features Roadmap

- [ ] Admin panel for data management
- [ ] Player profiles with detailed statistics
- [ ] Video highlights integration
- [ ] Live match updates
- [ ] Team comparison tool
- [ ] Advanced analytics
- [ ] Mobile app (PWA)

## 🤝 Contributing

Contributions are welcome! Please follow these  steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and maintained for the Mwiri League.

## 👥 Contact

For questions or support, contact the league administration.

---

**Mwiri League** - *Excellence on the Hilltop* 🏔️⚽
=======
# mwiri-league-app
The Mwiri League Website
>>>>>>> 7a36af93f13cbe5a8cd5611286a1cecd066ca3ae
