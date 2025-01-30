"use client";

import Link from "next/link";

type PlayerProfile = {
    id: number;
    email: string;
    username: string;
};

export default function ProfileClient({
                                          profile,
                                          errorMessage
                                      }: {
    profile: PlayerProfile | null;
    errorMessage: string | null;
}) {
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                <div className="bg-indigo-600 rounded-t-lg px-4 py-5 sm:px-6">
                    <h1 className="text-2xl font-bold text-white">Profil Utilisateur</h1>
                    <p className="text-indigo-200 text-sm mt-1">Détails personnels et statistiques de performance</p>
                </div>

                {errorMessage ? (
                    <div className="p-6 text-center text-red-500">{errorMessage}</div>
                ) : (
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Informations Personnelles</h3>
                        <div className="mt-4 border-t border-gray-200">
                            <dl className="divide-y divide-gray-200">
                                <div className="py-4 flex justify-between items-center">
                                    <dt className="text-sm font-medium text-gray-500">Nom d'utilisateur</dt>
                                    <dd className="text-sm text-gray-900">{profile?.username || "Non défini"}</dd>
                                </div>
                                <div className="py-4 flex justify-between items-center">
                                    <dt className="text-sm font-medium text-gray-500">Adresse e-mail</dt>
                                    <dd className="text-sm text-gray-900">{profile?.email || "Non défini"}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
                    <Link
                        href="/dashboard/profile/edit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Modifier le profil
                    </Link>
                </div>
            </div>
        </div>
    );
}
