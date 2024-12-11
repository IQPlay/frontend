import { checkAuth } from "@/lib/auth-ssr";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    await checkAuth(); // Vérifie l'authentification au niveau du serveur

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <a href="/dashboard" className="text-xl font-bold text-gray-800">
                                    Dashboard
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-4">Bienvenue</span>
                            <a href="/dashboard/profile" className="text-gray-600 hover:text-gray-800">
                                Profil
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="p-4">{children}</main>
        </div>
    );
}
