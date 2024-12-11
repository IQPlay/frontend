import Link from 'next/link';
import React from "react";

const mockUserData = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2024-01-01",
    totalGames: 50,
    averageScore: 150,
};

export default function ProfilePage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Profil Utilisateur</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Informations du profil</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Détails personnels et statistiques</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        {/* ... Contenu inchangé */}
                    </dl>
                </div>
            </div>
            <div className="mt-4">
                <Link
                    href="/dashboard/profile/edit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Modifier le profil
                </Link>
            </div>
        </>
    );
}
