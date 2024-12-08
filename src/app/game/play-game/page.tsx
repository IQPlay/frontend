"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function Page() {
    const [question, setQuestion] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("sessionId");

    useEffect(() => {
        if (sessionId) {
            fetchNextQuestion();
        }
    }, [sessionId]);

    const fetchNextQuestion = async () => {
        try {
            const response = await apiRequest(`/game/operation/${sessionId}`, "GET");
            setQuestion(response.question || "Aucune question disponible.");
            setStatus(response.status || "IN_PROGRESS");
        } catch (err: any) {
            console.error("Erreur lors de la récupération de la question :", err);
            setError(err.message || "Impossible de récupérer la question.");
        }
    };

    const handleAnswerSubmit = async () => {
        try {
            const response = await apiRequest(`/game/answer/${sessionId}`, "POST", { userAnswer: Number(userAnswer) });
            setScore(response.score || 0);
            setStatus(response.status || "ENDED");

            if (response.status === "IN_PROGRESS") {
                setQuestion(response.nextQuestion || "Aucune question disponible.");
            } else if (response.status === "ENDED") {
                alert("Partie terminée !");
                router.push("/game/start-game");
            }
        } catch (err: any) {
            console.error("Erreur lors de la soumission de la réponse :", err);
            setError(err.message || "Impossible de soumettre la réponse.");
        }
    };

    const handleStopGame = async () => {
        try {
            const response = await apiRequest(`/game/stop/${sessionId}`, "POST");
            alert(`Partie arrêtée. Score final : ${response.score}`);
            router.push("/game/start-game");
        } catch (err: any) {
            console.error("Erreur lors de l'arrêt de la partie :", err);
            setError(err.message || "Impossible d'arrêter la partie.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Calcul Mental</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-4">
                <p className="text-lg text-gray-700">Question : {question || "Chargement..."}</p>
                <label className="block text-gray-700">
                    Votre réponse :
                    <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="block w-full mt-1 border rounded px-3 py-2"
                    />
                </label>
                <button onClick={handleAnswerSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Soumettre
                </button>
                <button onClick={handleStopGame} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Arrêter la partie
                </button>
            </div>
            <div className="mt-6">
                <p className="text-gray-700">Score : {score}</p>
                <p className={`text-gray-700 ${status === "ENDED" ? "text-red-500" : ""}`}>Statut : {status}</p>
            </div>
        </div>
    );
}
