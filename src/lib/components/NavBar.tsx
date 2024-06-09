// components/NavBar.tsx
import Link from 'next/link';

const NavBar = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800">
            <Link href="/" className="text-xl font-bold">
                Money Mr.
            </Link>
            <Link href="/login" className="text-gray-300">
                Login
            </Link>
        </header>
    );
};

export default NavBar;
