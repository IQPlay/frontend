import React from 'react';

export default function EditProfilePage() {
    const mockUserData = {
        name: "John Doe",
        email: "john@example.com",
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                {/* Header Section */}
                <div className="bg-indigo-600 rounded-t-lg px-4 py-5 sm:px-6">
                    <h1 className="text-2xl font-bold text-white">Modifier le Profil</h1>
                    <p className="text-indigo-200 text-sm mt-1">Mettez à jour vos informations personnelles</p>
                </div>

                {/* Form Section */}
                <form className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nom
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                defaultValue={mockUserData.name}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Adresse e-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                defaultValue={mockUserData.email}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="********"
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirmez le mot de passe
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="********"
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
