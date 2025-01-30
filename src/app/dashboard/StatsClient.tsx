"use client";

import Link from "next/link";
import { Play, History, Target } from "lucide-react";

type DashboardData = {
    nbGames: number;
    avgScore: number;
    bestScore: number;
    serie: number;
};

export default function StatsClient({
                                        data,
                                        errorMessage
                                    }: {
    data: DashboardData | null;
    errorMessage: string | null;
}) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Tableau de bord</h1>

            {errorMessage ? (
                <p className="text-center text-red-500">{errorMessage}</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Parties jouées" value={data?.nbGames || 0} />
                        <StatCard title="Score moyen" value={data?.avgScore || 0} />
                        <StatCard title="Meilleur score" value={data?.bestScore || 0} />
                        <StatCard title="Série actuelle" value={`${data?.serie || 0} jours`} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/dashboard/game" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex items-center">
                            <Play className="mr-4 text-green-500" size={24} />
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Jouer</h2>
                                <p className="text-gray-600">Commencer une nouvelle partie de calcul mental</p>
                            </div>
                        </Link>
                        <Link href="/dashboard/game/history" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex items-center">
                            <History className="mr-4 text-blue-500" size={24} />
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Historique</h2>
                                <p className="text-gray-600">Voir l'historique de vos parties</p>
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
            <p className="text-2xl font-bold text-indigo-600">{value}</p>
        </div>
    );
}
