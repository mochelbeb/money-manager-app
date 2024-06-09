// pages/login.tsx
import Link from 'next/link';
import NavBar from "src/lib/components/NavBar";
import CopyRights from "src/lib/components/CopyRights";
import LoginForm from "src/lib/components/ui/login-form";
import SocialMediaComponent from "src/lib/components/ui/social-media";

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <NavBar/>
            <main className="flex flex-1 justify-center items-center p-4">
                <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
                    <LoginForm/>
                    <SocialMediaComponent/>
                    <p className="mt-6 text-center text-gray-400">
                        Do not have an account? <Link href="/signup" className="text-blue-400 hover:underline">Sign
                        up</Link>
                    </p>
                </div>
            </main>
            <CopyRights/>
        </div>
    );
};

export default Login;
