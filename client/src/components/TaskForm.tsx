'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '@/redux/slices/taskSlice';
import { AppDispatch } from '@/redux/store';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(createTask({ title, description, status: 'pending' }));
        setTitle('');
        setDescription('');
        setIsOpen(false);
    };

    return (
        <div className="mb-6">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.button
                        key="add-button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Plus size={20} />
                        Add New Task
                    </motion.button>
                ) : (
                    <motion.div
                        key="task-form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-hidden"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Create New Task</h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Enter task title"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Enter task description"
                                    rows={3}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TaskForm;
