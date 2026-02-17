'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '@/redux/slices/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        router.push('/');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-extralight text-black  flex items-center gap-2">
                            <span className="text-3xl"></span> Tasker
                        </Link>
                    </div>
                    <nav className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                    <User size={16} />
                                    <span>{user.username}</span>
                                </div>
                                <button
                                    onClick={onLogout}
                                    className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-medium"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
