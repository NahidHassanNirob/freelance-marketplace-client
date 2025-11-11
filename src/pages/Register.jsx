// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const { createUser, handleUpdateProfile, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError('');

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const photoUrl = form.get('photo');
        const password = form.get('password');

        // Password Validation Logic
        if (password.length < 6) {
            setRegisterError('Password must be at least 6 characters long.');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setRegisterError('Password must include at least one uppercase letter.');
            return;
        }
        if (!/[a-z]/.test(password)) {
            setRegisterError('Password must include at least one lowercase letter.');
            return;
        }

        try {
            // 1. Create User
            await createUser(email, password);

            // 2. Update Profile (Name & Photo URL)
            await handleUpdateProfile(name, photoUrl);

            // 3. Success Notification and Navigation
            toast.success('Registration successful! Welcome to Freelance Marketplace.');
            navigate('/');
            
        } catch (error) {
            console.error(error);
            setRegisterError(error.message);
            toast.error('Registration failed. Please check the error.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast.success('Google login successful!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Google login failed.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-2xl bg-white">
                <h1 className="text-2xl font-bold text-center text-gray-800">Register Account</h1>
                
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="text-sm font-bold">Name</label>
                        <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 rounded-md border" />
                    </div>
                    <div>
                        <label className="text-sm font-bold">Email</label>
                        <input type="email" name="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-md border" />
                    </div>
                    <div>
                        <label className="text-sm font-bold">Photo URL</label>
                        <input type="text" name="photo" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md border" />
                    </div>
                    <div>
                        <label className="text-sm font-bold">Password</label>
                        <input type="password" name="password" placeholder="Password" required className="w-full px-4 py-3 rounded-md border" />
                        <p className="text-xs mt-1 text-gray-500">Min 6 chars, 1 Uppercase, 1 Lowercase</p>
                    </div>

                    {registerError && <p className="text-red-600 text-sm font-medium">{registerError}</p>}

                    <button type="submit" className="w-full py-3 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
                        Register
                    </button>
                </form>

                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-sm text-gray-600">or register with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>

                <div className="flex justify-center space-x-4">
                    <button onClick={handleGoogleSignIn} aria-label="Register with Google" className="p-3 rounded-md border border-gray-300 hover:bg-gray-50 transition duration-200">
                        <FcGoogle className="text-2xl" />
                    </button>
                </div>

                <p className="text-xs text-center sm:px-6 text-gray-600">
                    Already have an account? 
                    <Link to="/login" className="ml-1 underline text-blue-600 font-bold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;