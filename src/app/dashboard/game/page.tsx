import Link from 'next/link';
import React from "react";

export default function GamePage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Nouvelle Partie</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="mb-4">Choisissez la difficulté pour commencer une nouvelle partie :</p>
                <div className="space-y-2">
                    <Link
                        href="/game/start-game"
                        className="block w-full text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                    >
                        Facile
                    </Link>
                </div>
            </div>
        </>
    );
}
