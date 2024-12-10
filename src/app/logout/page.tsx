import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Déconnexion en cours...</p>
        </div>
    );
}
