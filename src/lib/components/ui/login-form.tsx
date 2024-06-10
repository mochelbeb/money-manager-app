'use client';

import {State} from "src/lib/components/State";
import {useFormState} from "react-dom";
import {loginUser} from "src/app/server/auth/actions";
import feedbackModel from "src/lib/services/feedback";
import {redirect} from "next/navigation";
import { initialState } from "src/lib/constants/stats";

const LoginForm = () => {

    const [state, dispatch] = useFormState(loginUser, initialState);
    handleState(state);

    return (
        <form className="space-y-6" action={dispatch}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Enter your Email"
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

const handleState = (state: State) => {
    console.log(state);
    if (state.status === 'success') {
        feedbackModel({
            status: state.status,
            message: 'Login successfully',
            title: 'Success'
        }).then();

        redirect('/');

    } else if (state.status === 'error' && !(state.errors.email?.length || state.errors.password?.length)) {
        feedbackModel({
            status: state.status,
            message: state.message,
            title: 'Error'
        }).then();
    }
}

export default LoginForm;