import TodoItem from '@/components/_todo/todo-item/todo-item.tsx';
import {
    TodoAddHandler,
    TodoChangeHandler,
    TodoDeleteHandler,
} from '@/components/_todo/todo.types.ts';
import { useActions } from '@/hooks/redux/use-actions.hook.ts';
import { useSlice } from '@/hooks/redux/use-slice.hook.ts';
import { ITodo } from '@/store/todo/todo.interfaces.ts';
import { ITodoSlice, TodoListType } from '@/store/todo/todo.slice.ts';
import {
    Button,
    Input,
    List,
    Radio,
    RadioChangeEvent,
    Space,
    Typography,
} from 'antd';
import React, { useCallback, useMemo, useState } from 'react';


const TodoList: React.FC = () => {
    const { todo }                    = useActions();
    const todoSlice: ITodoSlice       = useSlice((state) => state.todo);
    const [ todoTitle, setTodoTitle ] = useState<string>('');
    const clearCompletedItems         = useCallback(() => {
        todo.removeCompletedItems();
    }, [ todo ]);
    const addItem: TodoAddHandler     = useCallback<TodoAddHandler>((title: string) => {
        todo.addItem({
            id    : Math.random(),
            title : title,
            status: false,
        });
        setTodoTitle('');
    }, [ todo, setTodoTitle ]);
    const changeItem                  = useCallback<TodoChangeHandler>((id: number, status: boolean) => {
        todo.setItemStatus({ id, status });
    }, [ todo ]);
    const removeItem                  = useCallback<TodoDeleteHandler>((id: number) => {
        todo.removeItem(id);
    }, [ todo ]);
    const todolist: ITodo[]           = useMemo<ITodo[]>(() => {
        if (todoSlice.type === TodoListType.ALL) {
            return todoSlice.list;
        } else if (todoSlice.type === TodoListType.COMPLETED) {
            return todoSlice.list.filter((item: ITodo) => item.status);
        } else {
            return todoSlice.list.filter((item: ITodo) => !item.status);
        }
    }, [ todoSlice.list, todoSlice.type ]);
    const itemsLeft: number           = useMemo<number>(() => {
        return todoSlice.list.filter((item: ITodo) => !item.status).length;
    }, [ todoSlice.list ]);

    return (
        <List
            header={
                <Input
                    size={ 'middle' }
                    value={ todoTitle }
                    onChange={ (e) => setTodoTitle(e.target.value) }
                    onKeyPress={ (e) => {
                        const value: string = e.currentTarget.value.trim();
                        if (e.key === 'Enter' && value) {
                            addItem(value);
                        }
                    } }
                    placeholder={ 'enter task description' }
                />
            }
            footer={
                <Space size={ 10 }>
                    <Typography.Text>Amount: { todoSlice.list.length }</Typography.Text>
                    <Typography.Text
                        type={ 'secondary' }>{ itemsLeft } items
                        left</Typography.Text>
                    <Radio.Group value={ todoSlice.type }
                                 onChange={ (e: RadioChangeEvent) => todo.setListType(e.target.value) }>
                        <Radio.Button
                            value={ TodoListType.ALL }>All</Radio.Button>
                        <Radio.Button
                            value={ TodoListType.ACTIVE }>Active</Radio.Button>
                        <Radio.Button
                            value={ TodoListType.COMPLETED }>Completed</Radio.Button>
                    </Radio.Group>
                    <Button
                        onClick={ clearCompletedItems }
                    >
                        Clear completed
                    </Button>
                </Space>
            }
            bordered
            dataSource={ todolist }
            renderItem={ (item: ITodo) => (
                <List.Item>
                    <TodoItem
                        item={ item }
                        onChange={ changeItem }
                        onDelete={ removeItem }
                        key={ item.id }
                    />
                </List.Item>
            ) }
        />
    );
};

export default React.memo(TodoList);