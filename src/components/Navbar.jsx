// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logOut()
            .then(() => toast.success('Logged out successfully!'))
            .catch(error => console.error(error));
    };

    const navLinks = (
        <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/allJobs">All Jobs</NavLink>
            {user && (
                <>
                    <NavLink to="/addJob">Add a Job</NavLink>
                    <NavLink to="/my-accepted-tasks">My Accepted Tasks</NavLink>
                </>
            )}
            
        </>
    );

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center py-4">
                
                {/* Logo/Heading (Consistent Style) */}
                <Link to="/" className="text-2xl font-extrabold text-blue-600">
                    Frelance<span className="text-gray-800">Market</span>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden lg:flex space-x-6 font-medium text-gray-700">
                    {navLinks}
                </nav>

                {/* User/Auth Section */}
                <div className="flex items-center space-x-4">
                    
                    {user ? (
                        <>
                            {/* User Info (PhotoURL and DisplayName on hover) */}
                            <div className="relative group">
                                <img
                                    src={user.photoURL || 'default_user.png'}
                                    alt={user.displayName || 'User'}
                                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-600"
                                    title={user.displayName || user.email}
                                />
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg hidden group-hover:block z-20">
                                    <div className="p-3 text-sm font-semibold text-gray-800">
                                        {user.displayName || 'User'}
                                    </div>
                                    <hr />
                                    <Link to="/myPostedJobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        My Posted Jobs
                                    </Link>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:font-bold">
                                        LogOut
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 font-semibold text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 rounded-md transition duration-200">
                                Login
                            </Link>
                            <Link to="/register" className="hidden sm:block px-4 py-2 font-semibold text-white bg-green-500 hover:bg-green-600 rounded-md transition duration-200">
                                Register
                            </Link>
                        </>
                    )}
                    
                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-2xl text-gray-700">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <nav className="flex flex-col space-y-2 font-medium text-gray-700">
                    {navLinks}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;