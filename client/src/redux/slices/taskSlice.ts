import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/utils/api';

interface Task {
    _id: string;
    user: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: string;
    updatedAt: string;
}

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState: TaskState = {
    tasks: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

// Create new task
export const createTask = createAsyncThunk(
    'tasks/create',
    async (taskData: any, thunkAPI) => {
        try {
            const response = await api.post('/tasks', taskData);
            return response.data;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user tasks
export const getTasks = createAsyncThunk(
    'tasks/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/tasks');
            return response.data;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update task
export const updateTask = createAsyncThunk(
    'tasks/update',
    async ({ id, taskData }: { id: string; taskData: any }, thunkAPI) => {
        try {
            const response = await api.put(`/tasks/${id}`, taskData);
            return response.data;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete task
export const deleteTask = createAsyncThunk(
    'tasks/delete',
    async (id: string, thunkAPI) => {
        try {
            await api.delete(`/tasks/${id}`);
            return id;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks = state.tasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                );
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks = state.tasks.filter(
                    (task) => task._id !== action.payload
                );
            });
    },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
