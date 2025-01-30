"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api"; // Fonction utilitaire pour les requêtes API

export default function Page() {
    const [difficulty, setDifficulty] = useState(1);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleStart = async () => {
        try {
            // Appel à l'API pour démarrer la partie
            const response = await apiRequest(`/game/start`, "POST", { difficulty });
            router.push(`/game/play-game?sessionId=${response.sessionId}`);
        } catch (err: any) {
            console.error("Erreur détectée :", err);
            setError(err.message || "Impossible de démarrer la partie.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Démarrer une partie</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-4">
                <label className="block text-gray-700">
                    Difficulté :
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(Number(e.target.value))}
                        className="block w-full mt-1 border rounded px-3 py-2"
                    >
                        <option value={1}>Facile</option>
                        <option value={2}>Moyen</option>
                        <option value={3}>Difficile</option>
                    </select>
                </label>
                <button onClick={handleStart} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Commencer
                </button>
            </div>
        </div>
    );
}
