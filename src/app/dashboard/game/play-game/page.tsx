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
                router.push("/dashboard/game/history");
            }
        } catch (err: any) {
            console.error("Erreur lors de la soumission de la réponse :", err);
            setError(err.message || "Impossible de soumettre la réponse.");
        }
    };

    const handlePauseGame = async () => {
        try {
            const response = await apiRequest(`/game/pause/${sessionId}`, "POST");

            if (response.status === "UNKNOWN") {
                alert("Impossible de mettre en pause : session invalide.");
            } else if (response.status === "ENDED") {
                alert("La session est déjà terminée.");
            } else {
                alert("Partie mise en pause avec succès !");
            }

            router.push("/dashboard/game/history");

        } catch (err: any) {
            console.error("Erreur lors de la mise en pause de la partie :", err);
            setError(err.message || "Impossible de mettre en pause la partie.");
        }
    };

    const handleStopGame = async () => {
        try {
            const response = await apiRequest(`/game/stop/${sessionId}`, "POST");
            alert(`Partie arrêtée. Score final : ${response.score}`);
            router.push("/dashboard/game/history");
        } catch (err: any) {
            console.error("Erreur lors de l'arrêt de la partie :", err);
            setError(err.message || "Impossible d'arrêter la partie.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-4">Calcul Mental</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="shadow-lg rounded-lg p-6 w-full max-w-md">
                <p className="text-lg font-semibold mb-4">Question :</p>
                <p className="text-xl font-bold mb-6">{question || "Chargement..."}</p>

                <label className="block mb-4">
                    Votre réponse :
                    <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="block w-full mt-2 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </label>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button
                        onClick={handleAnswerSubmit}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Soumettre
                    </button>
                    <button
                        onClick={handlePauseGame}
                        className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                        Pause
                    </button>
                    <button
                        onClick={handleStopGame}
                        className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Arrêter
                    </button>
                </div>
            </div>

            <div className="mt-4 text-center">
                <p className="text-lg font-medium">Score : <span className="font-bold">{score}</span></p>
            </div>
        </div>
    );
}
