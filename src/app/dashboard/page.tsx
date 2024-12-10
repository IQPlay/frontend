import { checkAuth } from "@/lib/auth-ssr";

export default async function DashboardPage() {
    const data = await checkAuth();
    return (
        <div>
            <h1>Bienvenue sur votre dashboard, {data.user} !</h1>
            <p>Voici votre contenu protégé.</p>
        </div>
    );
}
