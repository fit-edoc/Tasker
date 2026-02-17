'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, reset } from '@/redux/slices/taskSlice';
import { AppDispatch, RootState } from '@/redux/store';
import TaskForm from '@/components/TaskForm';
import TaskItem from '@/components/TaskItem';
import { Loader2, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const { user } = useSelector((state: RootState) => state.auth);
    const { tasks, isLoading, isError, message } = useSelector(
        (state: RootState) => state.tasks
    );

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        if (!user) {
            router.push('/login');
        } else {
            dispatch(getTasks());
        }

        return () => {
            dispatch(reset());
        };
    }, [user, router, isError, message, dispatch]);

    const filteredTasks = tasks.filter((task: any) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {user && user.username}</h1>
                    <p className="text-gray-500 mt-1">Here are your tasks for today.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64 transition-shadow"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white cursor-pointer transition-shadow"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            <TaskForm />

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'}
                    </span>
                </div>

                {filteredTasks.length > 0 ? (
                    <motion.div layout className="space-y-4">
                        {filteredTasks.map((task: any) => (
                            <TaskItem key={task._id} task={task} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        {searchTerm || filterStatus !== 'all' ? (
                            <p>No tasks found matching your filters.</p>
                        ) : (
                            <p>No tasks found. Create one to get started!</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
