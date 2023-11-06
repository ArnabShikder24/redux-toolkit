import { auth } from '@/lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface IUser {
    user: {
        email: string | null;
    };
    isLoading: boolean;
    isError: boolean;
    error: string | null;
}

const initialState: IUser = {
    user: { email: null },
    isLoading: false,
    isError: false,
    error: null
}

export const createUser = createAsyncThunk(
    'user/createUser',
    async ({ email, password }: { email: string; password: string; }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data.user.email;
    });

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }: { email: string; password: string; }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data.user.email;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.user.email = action.payload;
                state.isLoading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message!;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user.email = action.payload;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message!;
            })
    }
})

export default userSlice.reducer;