/**
 * Tests for React components
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from '../components/NewsCard';
import ClubCard from '../components/ClubCard';

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: { alt: string; src: string }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img alt={props.alt} src={props.src} />;
    },
}));

// Mock next/link
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));

describe('NewsCard Component', () => {
    const defaultProps = {
        title: 'Test News Article',
        category: 'Match Report',
        date: 'Nov 22, 2025',
        link: '/news/1',
    };

    it('renders news card with title', () => {
        render(<NewsCard {...defaultProps} />);
        expect(screen.getByText('Test News Article')).toBeInTheDocument();
    });

    it('renders news card with category', () => {
        render(<NewsCard {...defaultProps} />);
        expect(screen.getByText('Match Report')).toBeInTheDocument();
    });

    it('renders news card with date', () => {
        render(<NewsCard {...defaultProps} />);
        expect(screen.getByText('Nov 22, 2025')).toBeInTheDocument();
    });

    it('renders link to news article', () => {
        render(<NewsCard {...defaultProps} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/news/1');
    });

    it('renders Read Article text', () => {
        render(<NewsCard {...defaultProps} />);
        expect(screen.getByText('Read Article')).toBeInTheDocument();
    });

    it('renders fallback when no image URL provided', () => {
        render(<NewsCard {...defaultProps} />);
        expect(screen.getByText('Mwiri')).toBeInTheDocument();
    });
});

describe('ClubCard Component', () => {
    const mockTeam = {
        id: 1,
        name: "Makaya'08",
        stadium: 'Hilltop Arena',
        logo: '/images/clubs/makaya.jpg',
        primaryColor: '#005696',
    };

    it('renders club card with team name', () => {
        render(<ClubCard team={mockTeam} />);
        expect(screen.getByText("Makaya'08")).toBeInTheDocument();
    });

    it('renders club card with stadium name', () => {
        render(<ClubCard team={mockTeam} />);
        expect(screen.getByText('Hilltop Arena')).toBeInTheDocument();
    });

    it('renders View Profile button', () => {
        render(<ClubCard team={mockTeam} />);
        expect(screen.getByText('View Profile')).toBeInTheDocument();
    });

    it('renders link to club page', () => {
        render(<ClubCard team={mockTeam} />);
        const link = screen.getByText('View Profile').closest('a');
        expect(link).toHaveAttribute('href', '/clubs/1');
    });

    it('renders fallback initial when no logo', () => {
        const teamWithoutLogo = { ...mockTeam, logo: undefined };
        render(<ClubCard team={teamWithoutLogo} />);
        expect(screen.getByText('M')).toBeInTheDocument();
    });

    it('renders default stadium text when not provided', () => {
        const teamWithoutStadium = { ...mockTeam, stadium: undefined };
        render(<ClubCard team={teamWithoutStadium} />);
        expect(screen.getByText('Home Ground')).toBeInTheDocument();
    });
});
