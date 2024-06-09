import Image from "next/image";

const SocialMediaComponent = () => {
    return (
        <div className="mt-6 text-center">
            <p className="text-gray-400">Or continue with</p>
            <div className="flex justify-center space-x-4 mt-4">
                <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
                    <Image src="/images/social-media/google.png" alt="Google" width={24} height={24}/>
                </button>
                <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
                    <Image src="/images/social-media/facebook.png" alt="Facebook" width={24} height={24}/>
                </button>
                <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
                    <Image src="/images/social-media/twitter.png" alt="X(twiiter)" width={24} height={24}/>
                </button>
            </div>
        </div>
    );
}

export default SocialMediaComponent;