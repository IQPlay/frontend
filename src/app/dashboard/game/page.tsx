// app/game/page.tsx (Server Component)
import Link from 'next/link';
import GameClient from './GameClient';

export default function GamePage() {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <GameClient />
        </div>
    );
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg">
            {icon}
            <div>
                <h3 className="font-semibold text-indigo-700">{title}</h3>
                <p className="text-sm text-indigo-600">{description}</p>
            </div>
        </div>
    );
}