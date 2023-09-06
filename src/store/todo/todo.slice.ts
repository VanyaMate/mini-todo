import { ITodo } from '@/store/todo/todo.interfaces.ts';
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';


export enum TodoListType {
    ALL       = 'all',
    COMPLETED = 'completed',
    ACTIVE    = 'active',
}

export interface ITodoSlice {
    list: ITodo[],
    type: TodoListType
}

const initialState: ITodoSlice = {
    list: [
/*        {
            id    : 1,
            title : 'First',
            status: true,
        }, {
            id    : 2,
            title : 'Second',
            status: false,
        }, {
            id    : 3,
            title : 'Third',
            status: false,
        },*/
    ],
    type: TodoListType.ALL,
};

export const todoSlice = createSlice({
    name        : 'todo',
    initialState: initialState,
    reducers    : {
        setListType (
            state: Draft<ITodoSlice>,
            action: PayloadAction<TodoListType>,
        ) {
            state.type = action.payload;
        },
        setItemStatus (
            state: Draft<ITodoSlice>,
            action: PayloadAction<{
                id: number,
                status: boolean
            }>,
        ) {
            const { id, status } = action.payload;
            for (let i = 0; i < state.list.length; i++) {
                const item: ITodo = state.list[i];
                if (item.id === id) {
                    item.status = status;
                    break;
                }
            }
        },
        removeCompletedItems (state: Draft<ITodoSlice>) {
            const uncompletedItems: ITodo[] = [];
            for (let i = 0; i < state.list.length; i++) {
                const item: ITodo = state.list[i];
                if (!item.status) {
                    uncompletedItems.push(item);
                }
            }
            state.list = uncompletedItems;
        },
        addItem (state: Draft<ITodoSlice>, action: PayloadAction<ITodo>) {
            state.list.push(action.payload);
        },
        removeItem (state: Draft<ITodoSlice>, action: PayloadAction<number>) {
            for (let i = 0; i < state.list.length; i++) {
                const item: ITodo = state.list[i];
                if (item.id === action.payload) {
                    state.list.splice(i, 1);
                    break;
                }
            }
        },
    },
});