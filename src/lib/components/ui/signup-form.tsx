'use client';

import {signupUser} from "src/app/server/auth/actions";
import {useFormState} from "react-dom";
import {State} from "src/lib/components/State";
import feedbackModel from "src/lib/services/feedback";
import {redirect} from "next/navigation";
import {initialState} from "src/lib/constants/stats";

const SignupForm = () => {

    const [state, dispatch] = useFormState(signupUser, initialState);

    // call feedbackModel after form submission
    handleState(state);

    return (
        <form className="space-y-6" action={dispatch}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Enter your full name"
                />
                <span className="text-red-400 text-sm"> {state?.errors?.name} </span>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Enter your email address"
                />
                <span className="text-red-400 text-sm"> {state?.errors?.email} </span>

            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Enter your password"
                />
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm
                    Password</label>
                <input
                    required
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Confirm your password"
                />
                <span className="text-red-400 text-sm"> {state?.errors?.password} </span>
            </div>
            {/* handle errors after submit */}
            <div className="text-red-400 text-sm">
                {/* error message */}

            </div>
            <button type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700">
                Sign Up
            </button>
        </form>
    );
}

const handleState = (state: State) => {
    if (state.status === 'success') {
        feedbackModel({
            status: state.status,
            message: 'User created successfully',
            title: 'Success'
        }).then();

        redirect('/');

    } else if (state.status === 'error' && !(state.errors.email?.length || state.errors.password?.length || state.errors.name?.length)) {
        feedbackModel({
            status: state.status,
            message: state.message,
            title: 'Error'
        }).then();
    }
}

export default SignupForm;