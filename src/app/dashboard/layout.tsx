import { checkAuth } from "@/lib/auth-ssr";
import Header from "../partials/private/header";
import Footer from "../partials/private/footer";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    await checkAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="p-4">{children}</main>
            <Footer />
        </div>
    );
}
