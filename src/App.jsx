import React from "react";

import ToDo from "./projects/ToDo";
import { TodoProvider } from "./context/ToDoContext";

const App = () => {
  return (
    <div className="w-full min-h-lvh bg-gray-900 px-5">
      <div className="max-w-5xl mx-auto py-4 text-white">
        <TodoProvider>
          <ToDo />
        </TodoProvider>
      </div>
    </div>
  );
};

export default App;
