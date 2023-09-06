import {
    ITodoSlice,
    TodoListType,
    todoSlice,
} from '@/store/todo/todo.slice.ts';
import { describe, it } from 'vitest';


describe('[redux-slice] Todo', () => {
    it('[init] Clear', () => {
        expect(todoSlice.reducer(undefined, { type: undefined })).toEqual({
            list: [],
            type: TodoListType.ALL,
        });
    });

    it('[init] Filled', () => {
        expect(todoSlice.reducer({
            list: [
                {
                    id    : 1,
                    title : 'title',
                    status: false,
                },
            ],
            type: TodoListType.ALL,
        }, { type: undefined })).toEqual({
            list: [ { id: 1, title: 'title', status: false } ],
            type: TodoListType.ALL,
        });
    });

    it('[action] Adding item', () => {
        expect(todoSlice.reducer(undefined, todoSlice.actions.addItem({
            id    : 1,
            title : 'title',
            status: false,
        }))).toEqual({
            list: [
                {
                    id    : 1,
                    title : 'title',
                    status: false,
                },
            ],
            type: TodoListType.ALL,
        });
    });

    it('[action] Remove item', () => {
        const initialState: ITodoSlice = {
            list: [
                {
                    id    : 1,
                    title : 'title',
                    status: false,
                },
                {
                    id    : 2,
                    title : 'title',
                    status: false,
                },
            ],
            type: TodoListType.ALL,
        };


        expect(todoSlice.reducer(initialState, todoSlice.actions.removeItem(1))).toEqual({
            list: [
                {
                    id    : 2,
                    title : 'title',
                    status: false,
                },
            ],
            type: TodoListType.ALL,
        });
    });

    it('[action] Change item status', () => {
        const initialState: ITodoSlice = {
            list: [
                {
                    id    : 1,
                    title : 'title',
                    status: false,
                }, {
                    id    : 2,
                    title : 'title',
                    status: false,
                },
            ],
            type: TodoListType.ALL,
        };


        expect(todoSlice.reducer(initialState, todoSlice.actions.setItemStatus({
            id    : 1,
            status: true,
        }))).toEqual({
            list: [
                {
                    id    : 1,
                    title : 'title',
                    status: true,
                },
                {
                    id    : 2,
                    title : 'title',
                    status: false,
                },
            ],
            type: TodoListType.ALL,
        });
    });

    it('[action] Remove all completed items', () => {
        const initialState: ITodoSlice = {
            list: [
                {
                    id    : 1,
                    title : 'title',
                    status: true,
                },
                {
                    id    : 2,
                    title : 'title',
                    status: true,
                },
                {
                    id    : 3,
                    title : 'title',
                    status: false,
                },
            ],
            type: TodoListType.ALL,
        };


        expect(todoSlice.reducer(initialState, todoSlice.actions.removeCompletedItems())).toEqual({
            list: [
                {
                    id    : 3,
                    title : 'title',
                    status: false,
                },
            ],
            type: TodoListType.ALL,
        });
    });

    it('[action] Change list type', () => {
        const initialState: ITodoSlice = {
            list: [],
            type: TodoListType.ALL,
        };


        expect(todoSlice.reducer(initialState, todoSlice.actions.setListType(TodoListType.COMPLETED))).toEqual({
            list: [],
            type: TodoListType.COMPLETED,
        });
    });
});