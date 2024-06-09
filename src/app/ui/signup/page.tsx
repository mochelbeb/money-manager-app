'use client';

import Link from 'next/link';
import NavBar from "src/lib/components/NavBar";
import SignupForm from "src/lib/components/ui/signup-form";
import SocialMediaComponent from "src/lib/components/ui/social-media";

export default function Signup () {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <NavBar/>
            <main className="flex flex-1 justify-center items-center p-4">
                <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
                    <SignupForm/>
                    <SocialMediaComponent/>
                    <p className="mt-6 text-center text-gray-400">
                        Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Login</Link>
                    </p>
                </div>
            </main>
            <footer className="bg-gray-800 text-gray-400 text-center py-4">
                &copy; 2024 My Money Manager
            </footer>
        </div>
    );
}