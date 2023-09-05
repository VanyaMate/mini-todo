import {
    TodoChangeHandler,
    TodoDeleteHandler,
} from '@/components/_todo/todo.types.ts';
import { ITodo } from '@/store/todo/todo.interfaces.ts';
import { Checkbox } from 'antd';
import React, { MouseEventHandler, useCallback } from 'react';

export interface ITodoItemProps {
    item: ITodo;
    onChange: TodoChangeHandler;
    onDelete: TodoDeleteHandler;
}

const TodoItem: React.FC<ITodoItemProps> = (props: ITodoItemProps) => {
    const onChange = useCallback<MouseEventHandler<HTMLElement>>((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        props.onChange(props.item.id, !props.item.status);
    }, [ props.onChange ]);

    return (
        <div>
            <Checkbox
                onClick={ onChange }
                checked={ props.item.status }
            >
                { props.item.title }
            </Checkbox>
        </div>
    );
};

export default React.memo(TodoItem);