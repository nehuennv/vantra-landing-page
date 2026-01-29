import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden">


            <Navbar />

            <main className="flex-grow z-10 w-full">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
