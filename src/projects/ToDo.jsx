import React, { useState } from "react";
import { useTodo } from "../context/ToDoContext";

const ToDo = () => {
  const [todoQuery, setTodoQuery] = useState("");
  const { state, dispatch } = useTodo();
  const [editId, setEditId] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch({
        type: "UPDATE_TODO",
        payload: { todoQuery, id: editId },
      });
      setEditId("");
    } else {
      dispatch({
        type: "ADD_TODO",
        payload: { todoQuery, id: crypto.randomUUID(), completed: false },
      });
    }

    setTodoQuery("");
  };

  const isTodoCompleted = (todo) => {
    if (todo) {
      // console.log(todo.id);

      const restTodo = state?.todos?.map((curr) => {
        if (curr.id === todo.id) {
          return { ...curr, completed: !curr.completed };
        }
        return curr;
      });

      dispatch({ type: "TODO_COMPLETED", payload: restTodo });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="py-10 text-center text-2xl md:text-3xl">
        To Do App using useReducer
      </h1>
      <form action="" onSubmit={addTodo} className=" flex items-center gap-3">
        <input
          type="text"
          name=""
          id=""
          value={todoQuery}
          placeholder="Add your todo..."
          className="w-full text-xl p-3 outline-none bg-white/20 rounded-md"
          onChange={(e) => setTodoQuery(e.target.value)}
        />
        <button
          type="submit"
          className="p-3 leading-3 text-2xl rounded-md bg-green-600 text-white cursor-pointer hover:bg-green-700 hover:transition-all"
        >
          {editId ? (
            <ion-icon name="create"></ion-icon>
          ) : (
            <ion-icon name="add"></ion-icon>
          )}
        </button>
      </form>
      <div className="mt-12">
        {state?.todos?.map((curr) => (
          <div
            key={curr.id}
            className="mb-4 p-2 bg-white/20 rounded-md flex items-center justify-between"
          >
            <div className="flex items-center overflow-x-auto">
              
              <span
                onClick={() => {
                  isTodoCompleted(curr);
                }}
                className={`leading-3 cursor-pointer text-2xl`}
              >
                {curr.completed ? (
                  <ion-icon name="checkmark-circle"></ion-icon>
                ) : (
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                )}
              </span>
              <p
                className={`text-xl pl-2 ${
                  curr.completed ? "line-through" : ""
                }`}
              >
                {curr.todoQuery}
              </p>
            </div>

            <div className="flex items-center gap-3 mx-2">
              <button
                className="p-2 leading-3 rounded-md bg-green-600 text-2xl cursor-pointer"
                onClick={() => {
                  setTodoQuery(curr.todoQuery);
                  setEditId(curr.id);
                }}
              >
                <ion-icon name="create"></ion-icon>
              </button>
              <button
                className="p-2 leading-3 rounded-md bg-red-500 text-2xl cursor-pointer"
                onClick={() =>
                  dispatch({ type: "DELETE_TODO", payload: curr.id })
                }
              >
                <ion-icon name="trash"></ion-icon>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDo;
