
const LoginForm = () => {
    return (
        <form className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Enter your username"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Enter your password"
                />
            </div>
            <button type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700">
                Login
            </button>
        </form>
    );
}

export default LoginForm;