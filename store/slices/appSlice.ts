import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AppSlice{
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AppSlice = {
    isLoading: false,
    error: null,
    isAuthenticated: true,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        logout: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
});

// Export the actions
export const { setIsLoading, setError, logout } = appSlice.actions;

// Export state
export const selectApp = (state: RootState) => state.app;

// Export the reducer
export default appSlice.reducer;