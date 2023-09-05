import TodoList from '@/components/_todo/todo-list/todo-list.tsx';
import { Typography } from 'antd';


const App = () => {
    return (
        <div>
            <Typography.Title>Todos</Typography.Title>
            <TodoList/>
        </div>
    );
};

export default App;