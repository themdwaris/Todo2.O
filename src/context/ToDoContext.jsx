import { createContext, useContext, useReducer } from "react";

const TodoContext = createContext();

const getLocalData = () => {
  const isLocalData = JSON.parse(localStorage.getItem("todos"));
  if (isLocalData) {
    return isLocalData;
  } else {
    return [];
  }
};
const initialState = {
  todos: [...getLocalData()],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      if (action.payload.todoQuery === "") {
        alert("Please type a todo");
      } else {
        const isTodoExist = state.todos.find((curr) =>
          curr?.todoQuery
            .toLowerCase()
            .includes(action.payload?.todoQuery.toLowerCase())
        );
        if (isTodoExist) {
          alert("Todo is already exist.");
          return { ...state };
        } else {
          localStorage.setItem(
            "todos",
            JSON.stringify([...state.todos, action.payload])
          );
          return {
            ...state,
            todos: [...state.todos, action.payload],
          };
        }
      }

    case "DELETE_TODO":
      const remainingTodos = state.todos.filter(
        (curr) => curr.id !== action.payload
      );
      localStorage.setItem("todos", JSON.stringify(remainingTodos));
      return {
        ...state,
        todos: remainingTodos,
      };

    case "UPDATE_TODO":
      // console.log(action.payload.id);

      const updatedTodos = state.todos.map((curr) => {
        if (curr.id === action.payload.id) {
          return { ...action.payload, id: action.payload.id };
        }
        return curr;
      });
      // console.log(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return {
        ...state,
        todos: updatedTodos,
      };

    case "TODO_COMPLETED":
      // console.log(action.payload);
      const updatedTodo = action.payload;
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      return {
        ...state,
        todos: updatedTodo,
      };

    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => useContext(TodoContext);

export { TodoContext, TodoProvider, useTodo };
