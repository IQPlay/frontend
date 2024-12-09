import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Dashboard() {
    const cookieStore = await cookies(); // cookies() retourne une promesse
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/login");
    }

    return (
        <div>
            <h1>Bienvenue sur votre tableau de bord !</h1>
            <a
                href="/logout"
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Déconnexion
            </a>
        </div>
    );
}
