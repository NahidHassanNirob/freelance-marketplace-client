// src/pages/Login.jsx
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await signIn(email, password);
            toast.success('Login successful!');
            // Navigate to the desired route or home page
            navigate(from, { replace: true }); 
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Invalid email or password.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast.success('Google login successful!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error('Google login failed.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-2xl bg-white">
                <h1 className="text-2xl font-bold text-center text-gray-800">Login to your account</h1>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="text-sm font-bold">Email</label>
                        <input type="email" name="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-md border" />
                    </div>
                    <div>
                        <label className="text-sm font-bold">Password</label>
                        <input type="password" name="password" placeholder="Password" required className="w-full px-4 py-3 rounded-md border" />
                    </div>
                    
                    <div className="flex justify-end text-xs">
                         {/* Forget Password (text only) as required */}
                        <a href="#" className="text-blue-600 hover:underline">Forget Password?</a>
                    </div>

                    <button type="submit" className="w-full py-3 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                </form>

                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-sm text-gray-600">or login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>

                <div className="flex justify-center space-x-4">
                    <button onClick={handleGoogleSignIn} aria-label="Login with Google" className="p-3 rounded-md border border-gray-300 hover:bg-gray-50 transition duration-200">
                        <FcGoogle className="text-2xl" />
                    </button>
                </div>

                <p className="text-xs text-center sm:px-6 text-gray-600">
                    Don't have an account? 
                    <Link to="/register" className="ml-1 underline text-blue-600 font-bold">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;