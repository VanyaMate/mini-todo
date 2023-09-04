import { useActions } from '@/hooks/redux/use-actions.hook.ts';
import { ITodo } from '@/store/todo/todo.interfaces.ts';
import { Checkbox } from 'antd';
import React, { useCallback } from 'react';


export interface ITodoItemProps {
    item: ITodo;
}

const TodoItem: React.FC<ITodoItemProps> = (props) => {
    const { todo } = useActions();
    const toggle   = useCallback(() => {
        todo.setItemStatus({
            id    : props.item.id,
            status: !props.item.status,
        });
    }, [ todo ]);

    return (
        <div>
            <Checkbox checked={ props.item.status }
                      onChange={ toggle }
            >
                { props.item.title }
            </Checkbox>
        </div>
    );
};

export default React.memo(TodoItem);