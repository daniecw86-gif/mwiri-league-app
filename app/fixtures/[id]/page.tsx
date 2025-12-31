import { matchDetails } from "../../../data/matchDetails";
import Link from "next/link";
import MatchCentreClient from "../../../components/MatchCentreClient";

// This is a Server Component
export async function generateStaticParams() {
    // In a real app, we'd fetch all match IDs. For now, we only have ID 1.
    return [{ id: "1" }];
}

export default async function MatchCentre({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const match = matchDetails[id as keyof typeof matchDetails];

    if (!match) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Match not found</h1>
                    <Link href="/fixtures" className="text-mwiri-blue hover:underline mt-4 inline-block">
                        Back to Fixtures
                    </Link>
                </div>
            </div>
        );
    }

    return <MatchCentreClient match={match} />;
}
