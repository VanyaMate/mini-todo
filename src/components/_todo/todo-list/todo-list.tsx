import TodoItem from '@/components/_todo/todo-item/todo-item.tsx';
import { ITodo } from '@/store/todo/todo.interfaces.ts';
import AntdCollapse
    from '@/components/_ui/_collapses/antd-collapse/antd-collapse.tsx';
import { Space } from 'antd';
import React from 'react';


export interface ITodoListProps {
    list: ITodo[];
    title: string;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
    return (
        <AntdCollapse
            title={ props.title }
            children={
                <Space
                    direction={ 'vertical' }
                    size={ 10 }
                >
                    {
                        props.list.map((item) => {
                            return (
                                <TodoItem
                                    item={ item }
                                    key={ item.id }
                                />
                            );
                        })
                    }
                </Space>
            }
        />
    );
};

export default React.memo(TodoList);