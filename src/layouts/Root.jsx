// src/layouts/Root.jsx
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Toaster /> {/* Toast Notification Container */}
            <div className="sticky top-0 z-10">
                <Navbar />
            </div>
            <main className="flex-grow container mx-auto px-4 md:px-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Root;