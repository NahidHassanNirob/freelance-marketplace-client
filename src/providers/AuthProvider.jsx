// src/providers/AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from 'axios';
import { toast } from "react-hot-toast"; // npm install react-hot-toast


export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const serverUrl = import.meta.env.VITE_API_URL; // সার্ভার URL

    // 1. Register User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // 2. Login User
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // 3. Google Login
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // 4. Logout User
    const logOut = () => {
        setLoading(true);
        return signOut(auth).then(() => {
            // Logout হলে সার্ভার থেকে JWT টোকেন রিমুভ করার রিকোয়েস্ট
            axios.post(`${serverUrl}/auth/logout`, { email: user?.email })
                .catch(error => console.log('Logout token error:', error));
        });
    };

    // 5. Update Profile
    const handleUpdateProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
        });
    };

    // 6. Auth State Observer (JWT Handshake + Route Reload Fix)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // JWT টোকেন জেনারেশন এবং ক্লায়েন্ট সাইডে সংরক্ষণের জন্য সার্ভারে রিকোয়েস্ট
                const userInfo = { email: currentUser.email };
                axios.post(`${serverUrl}/auth/jwt`, userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
                    .catch(error => {
                        console.error("JWT Error:", error);
                        setLoading(false);
                    });
            } else {
                // ইউজার না থাকলে টোকেন রিমুভ করা
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [serverUrl]);

    const authInfo = { user, loading, createUser, signIn, logOut, handleUpdateProfile, googleSignIn };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;