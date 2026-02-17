'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login, reset } from '@/redux/slices/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Link from 'next/link';
import { LogIn, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (isError) {
            // You could add toast notification here
            console.error(message);
        }

        if (isSuccess || user) {
            router.push('/dashboard');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, router, dispatch]);

    const onSubmit = (data: any) => {
        dispatch(login(data));
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-indigo-100">Sign in to continue to your dashboard</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                {...register('email', { required: 'Email is required' })}
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                placeholder="you@example.com"
                            />
                            {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message as string}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                {...register('password', { required: 'Password is required' })}
                                type="password"
                                className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                placeholder="••••••••"
                            />
                            {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password.message as string}</span>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? <Loader2 className="animate-spin mr-2" /> : <LogIn className="mr-2" />}
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Register here
                        </Link>
                    </div>
                    {isError && <div className="mt-4 text-center text-sm text-red-600 bg-red-50 p-2 rounded">{message}</div>}
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
