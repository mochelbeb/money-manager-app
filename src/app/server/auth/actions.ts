'use server';

import {z} from 'zod';
import {supabase} from "src/lib/database/supabaseClient";
import {State} from "src/lib/components/State";

const UserValidator = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long'
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters long'
    }),
    name: z.string({
        message: 'Invalid name'
    })
});


export async function signupUser(prevState: State, formData: FormData){
    try {
        const rawFormData = UserValidator.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            name: formData.get('name')
        });

        if (!rawFormData.success) {
            console.log(rawFormData.error.flatten().fieldErrors);
            return {
                status: 'error',
                errors: rawFormData.error.flatten().fieldErrors,
                message: 'Invalid information provided.'
            }
        }

        const {email, password, confirmPassword, name} = rawFormData.data;

        // check if password and confirm password are the same
        if (password !== confirmPassword) {
            return {
                status: 'error',
                errors: {
                    email: [],
                    name: [],
                    password: ['Passwords do not match']
                },
                message: 'Passwords do not match'
            }
        }

        // check if user already exists in table
        const {data: user, error} = await supabase.from('users').select('email').eq('email', email).limit(1);

        if (user && user.length > 0) {
            return {
                status: 'error',
                errors: {
                    email: ['User already exists'],
                    name: [],
                    password: []
                },
                message: 'User already exists'
            }
        }

        // Create a new user in Supabase Auth
        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            return {
                status: 'error',
                errors: {
                    email: [],
                    name: [],
                    password: []
                },
                message: 'Error signing up : ' + signUpError.message
            };
        }

        // Insert the user data into the database
        let newUser = await supabase.from('users').insert([
            {
                fullName: name,
                email: email,
            }
        ]);

        if (newUser.error) {
            return {
                status: 'error',
                errors: {
                    email: [],
                    name: [],
                    password: []
                },
                message: 'Error signing up : ' + newUser.error.message
            };
        }

        return {
            status: 'success',
            errors: {
                email: [],
                name: [],
                password: []
            },
            message: 'User created successfully'
        }

    } catch (error: any) {
        return {
            status: 'error',
            errors: {
                email: [],
                name: [],
                password: []
            },
            message: 'Internal Server Error'
        };
    }
}