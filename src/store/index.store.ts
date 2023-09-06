import { todoSlice } from '@/store/todo/todo.slice.ts';
import {
    combineReducers,
    configureStore,
    PreloadedState,
} from '@reduxjs/toolkit';


const reducers = combineReducers({
    [todoSlice.name]: todoSlice.reducer,
});

export const store = function (preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: reducers,
        preloadedState,
    });
};

export type RootState = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof store>;