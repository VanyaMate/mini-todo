import { AppStore, RootState } from '@/store/index.store.ts';
import { todoSlice } from '@/store/todo/todo.slice.ts';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>,
    store?: AppStore
}

export function renderWithProviders (
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = configureStore({
            reducer: {
                [todoSlice.name]: todoSlice.reducer,
            },
            preloadedState,
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {},
) {
    const Wrapper: React.FC<{
        children: React.ReactElement
    }> = ({ children }) => {
        return <Provider store={ store }>{ children }</Provider>;
    };

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}