'use client';

import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '@/redux/slices/taskSlice';
import { AppDispatch } from '@/redux/store';
import { Trash2, Edit2, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface TaskItemProps {
    task: any;
}

const TaskItem = ({ task }: TaskItemProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const onDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(task._id));
        }
    };

    const onToggleStatus = () => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        dispatch(updateTask({ id: task._id, taskData: { status: newStatus } }));
    };

    const onUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateTask({ id: task._id, taskData: { title, description } }));
        setIsEditing(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`p-5 rounded-xl border ${task.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'
                } shadow-sm hover:shadow-md transition-all mb-4`}
        >
            {isEditing ? (
                <form onSubmit={onUpdate}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mb-2 px-3 py-2 border rounded"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mb-2 px-3 py-2 border rounded"
                    />
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={() => setIsEditing(false)} className="text-sm text-gray-500">Cancel</button>
                        <button type="submit" className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Save</button>
                    </div>
                </form>
            ) : (
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            {task.status === 'completed' ? (
                                <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                            ) : (
                                <Clock className="text-orange-400 w-5 h-5 flex-shrink-0" />
                            )}
                            <h3 className={`font-semibold text-lg ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                {task.title}
                            </h3>
                        </div>
                        <p className={`text-gray-600 mt-1 ${task.status === 'completed' ? 'line-through opacity-70' : ''}`}>
                            {task.description}
                        </p>
                        <div className="mt-3 flex gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                            </span>
                            <span className="text-xs text-gray-400 self-center">
                                {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={onToggleStatus}
                            className={`p-2 rounded-lg transition-colors ${task.status === 'completed' ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-green-100 text-green-600 hover:bg-green-200'
                                }`}
                            title={task.status === 'completed' ? "Mark as Pending" : "Mark as Completed"}
                        >
                            <CheckCircle size={18} />
                        </button>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                            title="Edit"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TaskItem;
