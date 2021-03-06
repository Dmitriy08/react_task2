const initialState = {
  fetching: true,
  todos: null,
};

const reducer = (state = initialState, action) => {
  let {todos} = state;
  switch (action.type) {
    case 'FETCH_TODOS_START':
      return {...state, fetching: true};
    case 'FETCH_TODOS_END':
      return {...state, fetching: false};
    case 'SET_TODOS':
      console.log(state)
      return {...state, todos: action.payload};
    case 'MAKE_ACTIVE':
      const updatedTodosInProgress = state.todos.in_progress.filter(item => !item.isActive).map(item => ({
        ...item,
        isActive: item.id === action.payload,
        startime: item.id === action.payload && new Date().toISOString(),
        nextElement: item.id === action.payload && false,
      }));

      const doneTodoItem = state.todos.in_progress.filter(item => item.isActive)
      doneTodoItem[0].finishedTime = new Date().toISOString()
      doneTodoItem[0].isActive = false
      delete doneTodoItem[0].nextElement
      state.todos.done.push(doneTodoItem[0])

      return {
        state, todos: {
          ...todos,
          in_progress: updatedTodosInProgress
        }
      };
    case 'ADD_TODO':
      const newTodoItem = {
        id: Date.now(),
        name: action.payload,
        isActive: !todos.in_progress.length
      }
      todos.in_progress.push(newTodoItem)
      return {...state, todos: {...todos}};
    case 'DELETE_TODO_ITEM':
      const id = action.payload;
      const newItemsInProgress = todos.in_progress.filter(item => item.id !== id);
      const newTodo = {
        in_progress: newItemsInProgress,
        done: todos.done
      }
      return {...state, todos: newTodo}
    case 'MAKE_DONE_LAST_ITEM':
      todos = {...state.todos};
      const doneTodoItemLast = state.todos.in_progress[0]
      doneTodoItemLast.finishedTime = new Date().toISOString()
      doneTodoItemLast.isActive = false
      delete doneTodoItemLast.nextElement
      state.todos.done.push(doneTodoItemLast)
      return {...state, todos: {
          in_progress: todos.in_progress.slice(1),
          done: todos.done
        }};
    default:
      return state;
  }
};

export default reducer;

