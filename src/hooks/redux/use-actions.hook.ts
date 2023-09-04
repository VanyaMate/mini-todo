import { todoSlice } from '@/store/todo/todo.slice.ts';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';


export const useActions = function () {
    const dispatch = useDispatch();
    return {
        [todoSlice.name]: bindActionCreators(todoSlice.actions, dispatch),
    };
};