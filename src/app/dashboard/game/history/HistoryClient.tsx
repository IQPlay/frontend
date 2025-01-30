"use client";

import Link from "next/link";
import { Play, Clock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

type GameHistory = {
    id: number;
    name: string;
    level: number;
    score: number;
    state: string;
    createdAt: string;
};

export default function HistoryClient({ history, errorMessage }: { history: GameHistory[]; errorMessage: string | null }) {
    const router = useRouter();

    // Fonction pour reprendre une partie (uniquement pour les parties PAUSED)
    const handleResumeGame = async (sessionId: number) => {
        try {
            const response = await apiRequest(`/game/resume/${sessionId}`, "POST");

            if (response.status === "UNKNOWN") {
                alert("Impossible de reprendre : session invalide.");
            } else if (response.status === "ENDED") {
                alert("La session est déjà terminée.");
            } else {
                alert("Partie reprise avec succès !");
                router.push(`/dashboard/game/play-game?sessionId=${sessionId}`);
            }
        } catch (err) {
            console.error("Erreur lors de la reprise de la partie :", err);
            alert("Erreur lors de la reprise de la partie.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Historique des Parties</h1>
                <p className="text-gray-500 mt-2">Gérez et continuez vos parties en cours.</p>
            </div>

            {errorMessage ? (
                <p className="text-center text-red-500">{errorMessage}</p>
            ) : history.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {history.map((game) => (
                        <div
                            key={game.id}
                            className={`relative bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                                game.state === "IN_PROGRESS" || game.state === "PAUSED"
                                    ? "border-l-4 border-blue-500"
                                    : game.state === "ENDED"
                                        ? "border-l-4 border-gray-400"
                                        : "border-l-4 border-red-500"
                            }`}
                        >
                            <div className="flex justify-between items-center text-gray-600 text-sm">
                                <span className="font-medium">{game.createdAt}</span>
                                <span className="font-semibold text-indigo-600 text-lg">{game.score} pts</span>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-900 mt-2 flex items-center gap-2">
                                {game.state === "IN_PROGRESS" && <Clock className="text-blue-500" size={18} />}
                                {game.state === "PAUSED" && <Play className="text-yellow-500" size={18} />}
                                {game.state === "ENDED" && <CheckCircle className="text-gray-500" size={18} />}
                                {game.name}
                            </h2>

                            <p className="text-sm text-gray-500">Niveau : <span className="font-medium">{game.level}</span></p>

                            <p className={`mt-2 text-sm font-semibold uppercase ${
                                game.state === "IN_PROGRESS" ? "text-blue-600"
                                    : game.state === "PAUSED" ? "text-yellow-500"
                                        : game.state === "ENDED" ? "text-gray-500"
                                            : "text-red-600"
                            }`}>{game.state}</p>

                            {/* ✅ Bouton "Continuer" ou "Reprendre" en fonction de l'état */}
                            {game.state === "IN_PROGRESS" && (
                                <Link
                                    href={`/dashboard/game/play-game?sessionId=${game.id}`}
                                    className="mt-4 block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Continuer la partie
                                </Link>
                            )}

                            {game.state === "PAUSED" && (
                                <button
                                    onClick={() => handleResumeGame(game.id)}
                                    className="mt-4 block w-full bg-yellow-500 text-white text-center py-2 rounded-lg hover:bg-yellow-600 transition"
                                >
                                    Reprendre la partie
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Aucune partie jouée pour l'instant.</p>
            )}
        </div>
    );
}
