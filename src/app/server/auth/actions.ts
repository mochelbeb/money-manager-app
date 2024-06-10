'use server';

import {z} from 'zod';
import { supabase } from "src/lib/database/supabaseClient";
import { State } from "src/lib/components/State";
import { hashPassword } from "src/lib/services/hashPassword";
import jwt from 'jsonwebtoken';
import {cookies} from "next/headers";
import bcrypt from "bcrypt";
import {setCookies} from "src/lib/services/cookies";

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
        // hash password
        const hashedPassword = await hashPassword(password);

        // check if hashing failed
        if (!hashedPassword) {
            return {
                status: 'error',
                errors: {
                    email: [],
                    name: [],
                    password: []
                },
                message: 'Error while signing up. Please try again.'
            }
        }

        // Insert the user data into the database
        let newUser = await supabase.from('users').insert([
            {
                fullName: name,
                email: email,
                password: hashedPassword
            }
        ]);

        if (newUser.error) {
            console.log(newUser.error);
            return {
                status: 'error',
                errors: {
                    email: [],
                    name: [],
                    password: []
                },
                message: 'Unable to signup user. Please try again.'
            };
        }

        // generate a token for the user
        const token = jwt.sign({email: email}, process.env.JWT_SECRET || '',
            {
            expiresIn: '24h'
            }
        );

        // set cookie
        cookies().set('session', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        return {
            status: 'success',
            errors: {
                email: [],
                name: [],
                password: []
            },
            message: "User created successfully",
        }

    } catch (error: any) {
        console.error(error);
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

export async function loginUser(prevState: State, formData: FormData) {
    try {
        const userLogin = UserValidator.omit({confirmPassword: true, name: true});

        const rawFormData = userLogin.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        if (!rawFormData.success) {
            console.log(rawFormData.error.flatten().fieldErrors);
            return {
                status: 'error',
                errors: rawFormData.error.flatten().fieldErrors,
                message: 'Invalid information provided.'
            }
        }

        const {email, password} = rawFormData.data;

        // check if user exists in table
        const {
            data: user,
            error
        } = await supabase.from('users').select('email, password').eq('email', email).limit(1);

        if (error) {
            console.log(error);
            return {
                status: 'error',
                errors: {
                    email: [],
                    name: [],
                    password: []
                },
                message: 'Error while logging in. Please try again.'
            }
        }

        if (!user || user.length === 0) {
            console.log('User does not exist');
            return {
                status: 'error',
                errors: {
                    email: ['User does not exist'],
                    name: [],
                    password: []
                },
                message: 'User does not exist'
            }
        }

        // compare the password
        const hashedPassword = user[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
            console.log('Invalid email or password');
            return {
                status: 'error',
                errors: {
                    email: [],
                    name: [],
                    password: []
                },
                message: 'Invalid Email or Password'
            }
        }

        // generate a token for the user
        const token = jwt.sign({email: email}, process.env.JWT_SECRET || '',
            {
                expiresIn: '24h'
            }
        );

        // set cookie
        setCookies('session', token);

        console.log('User logged in successfully');

        return {
            status: 'success',
            errors: {
                email: [],
                name: [],
                password: []
            },
            message: "User logged in successfully",
        }

    } catch (error: any) {
        console.error(error);
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