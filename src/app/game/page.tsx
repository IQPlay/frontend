"use client"
import Link from "next/link";

export default function GameHome() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Jeu de Calcul Mental</h1>
            <p className="text-gray-600 mb-6">Choisissez une action pour commencer.</p>
            <div className="space-y-4">
                <Link href="/game/start-game" className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                    Démarrer une partie
                </Link>
                <Link href="/" className="px-4 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300">
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
