import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export const Todolist2 = () => {
  let [todo, setTodo] = useState([]);

  let [newTask, setNewTask] = useState("");

  useEffect(() => {
    const todoString = localStorage.getItem("todo");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodo(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  let addNewTask = () => {
    const newTodo = [
      ...todo,
      { task: newTask, id: uuidv4(), isCompleted: false },
    ];
    setTodo(newTodo);
    setNewTask("");
    console.log("New task added:", newTodo);
  };

  let updateTaskinput = (event) => {
    setNewTask(event.target.value);
  };

  let editTaskinput = (id) => {
    const taskToEdit = todo.find((t) => t.id === id);
    setNewTask(taskToEdit.task);
    setTodo(todo.filter((t) => t.id !== id));
  };

  let deleteTodo = (id) => {
    setTodo(todo.filter((t) => t.id !== id));
  };

  let doneTodo = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  return (
    <>
      <div className="container w-1/2 min-h-screen mx-auto my-6 p-4 bg-violet-100">
        <h2 className="text-center text-xl font-bold m-4">
          eTodo - Focus on what matters
        </h2>
        <h4 className="text-lg mt-7 mb-4 font-semibold">Add A Todo</h4>
        <div className="add-todo flex">
          <input
            type="text"
            value={newTask}
            onChange={updateTaskinput}
            placeholder="Enter your task"
            className="min-w-[40vw] px-4 rounded-md"
          />
          <button
            onClick={addNewTask}
            className="bg-cyan-500 px-6 py-0.5 text-lg mx-2 rounded-md text-white font-semibold"
          >
            Save
          </button>
        </div>
        <h4 className="my-4">All your Tasks</h4>
        <div className="all-todos my-8 h-10">
          {todo.length === 0 ? (
            <p>No Task Found</p>
          ) : (
            todo.map((t) => (
              <div key={t.id} className="todo my-2 flex justify-between">
                <div className="todo-detail">
                  <span>
                    <input
                      className="mr-2"
                      type="checkbox"
                      checked={t.isCompleted}
                      onChange={() => doneTodo(t.id)}
                    />
                  </span>
                  <span className={t.isCompleted ? "line-through" : ""}>
                    {t.task}
                  </span>
                </div>
                <div className="todo-btns">
                  <button
                    onClick={() => editTaskinput(t.id)}
                    className="bg-cyan-500 px-4 py-0.5 text-lg mx-1 rounded-md text-white font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(t.id)}
                    className="bg-cyan-500 px-4 py-0.5 text-lg mx-1 rounded-md text-white font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
