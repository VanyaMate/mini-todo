import { todoSlice } from '@/store/todo/todo.slice.ts';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
    reducer: {
        [todoSlice.name]: todoSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;