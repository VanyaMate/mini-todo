import TodoList from '@/components/_todo/todo-list/todo-list.tsx';
import HeaderTitle from '@/components/header-title/header-title.tsx';
import { useSlice } from '@/hooks/redux/use-slice.hook.ts';
import { ITodoSlice } from '@/store/todo/todo.slice.ts';


const App = () => {
    const todoSlice: ITodoSlice = useSlice((state) => state.todo);

    return (
        <div>
            <HeaderTitle title={ 'todos' }/>
            <TodoList
                title={ 'All' }
                list={ todoSlice.list }
            />
            <TodoList
                title={ 'Completed' }
                list={ todoSlice.list.filter((item) => item.status) }
            />
            <TodoList
                title={ 'Active' }
                list={ todoSlice.list.filter((item) => !item.status) }
            />
        </div>
    );
};

export default App;