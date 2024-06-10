import Link from 'next/link';
import Image from 'next/image';
import NavBar from 'src/lib/components/NavBar';
import CopyRights from "src/lib/components/CopyRights";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <NavBar />
            <main className="flex flex-1 justify-center items-center p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900">
                <div className="max-w-6xl flex flex-col md:flex-row items-center">
                    {/* Left Section: Text and Button */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <h1 className="text-5xl font-bold leading-tight">
                                Manage money <br /> in your pockets
                            </h1>
                            <p className="text-lg text-gray-400 mt-4">
                                Enjoy zero fees, and set money aside at high yields. <br />
                                You’ll keep more of your money and gain greater control over your finances.
                            </p>
                        </div>
                        <Link href="/login" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300">
                                Get early access
                        </Link>
                        <div className="mt-6">
                            <p className="text-gray-400">Integrated with</p>
                            <div className="flex space-x-6 mt-2">
                                <Image src="/images/banks/visa.png" alt="VISA" width={100} height={50} />
                                <Image src="/images/banks/wise.png" alt="Wise" width={100} height={50} />
                                <Image src="/images/banks/paypal.png" alt="PayPal" width={100} height={50}/>
                            </div>
                        </div>
                    </div>
                    {/* Right Section: Graphic */}
                    <div className="flex-1 mt-8 md:mt-0">
                        {/* add rounded corners */}
                        <Image src="/images/dashboard/Mockup.png" alt="Dashboard Mockup" width={600} height={400} className="rounded-lg" />
                    </div>
                </div>
            </main>
            <CopyRights/>
        </div>
    );
};

export default Home;
