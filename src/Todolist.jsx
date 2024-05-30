import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
// let getTodo = () => {
//   const todoString = localStorage.getItem("todo");
//   console.log(todoString);
//   if (todoString) {
//     return JSON.parse(todoString);
//   }
//  else {
//   return [];
// }
// };
export const Todolist = () => {
  let [todo, setTodo] = useState([
    { task: "Sample Task", id: uuidv4(), isCompleted: false },
  ]);
  // getTodo(),
  let [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Fetch data from local storage after the todo state is updated
    const todoString = localStorage.getItem("todo");
    if (todoString) {
      setTodo(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    console.log("Saving todo to localStorage:", todo);
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  //   let saveToLS = () => {
  //     let savedTodo = localStorage.setItem("todo", JSON.stringify(todo));
  //     console.log(savedTodo);
  //   };
  let addNewTask = () => {
    let newTodo = [
      ...todo,
      { task: newTask, id: uuidv4(), isCompleted: false },
    ];
    setTodo(newTodo);
    setNewTask("");
    console.log("New task added", newTodo);
    // localStorage.setItem("todo", JSON.stringify(newTodo));
  };

  let updateTaskinput = (event) => {
    setNewTask(event.target.value);
  };
  let editTaskinput = (id) => {
    let t = todo.filter((todo) => todo.id == id);
    console.log(t); //first extract the todo which is an array then we show its task
    setNewTask(t[0].task);
    setTodo(todo.filter((todo) => todo.id != id));
    // saveToLS();
  };
  let deleteTodo = (id) => {
    setTodo(todo.filter((todo) => todo.id != id));
    // saveToLS();
  };

  let doneTodo = (id) => {
    setTodo((previousTodo) =>
      previousTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      })
    );
    // saveToLS();
  };

  return (
    <>
      <div className=" container xs:w-2/3 sm:w-2/3 md:w-[50%] min-h-screen mx-auto my-6 p-4 bg-violet-100">
        <div className="row">
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
              className=" w-[80%]  px-4 rounded-md"
            />
            <button
              onClick={addNewTask}
              disabled={newTask.length < 3}
              className="bg-cyan-500 px-6 py-0.5  text-lg mx-2 rounded-md text-white font-semibold cursor-pointer"
            >
              Save
            </button>
          </div>

          <h4 className="my-4">All your Task</h4>
          <div className="all-todos my-8 h-10">
            {todo == "" ? <p>No Task Found</p> : todo.task}
            {todo.map((todo) => (
              <div key={todo.id} className="todo my-2 flex justify-between">
                <div className="todo-detail">
                  <span>
                    <input
                      className="mr-2 cursor-pointer"
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => doneTodo(todo.id)}
                    />
                  </span>
                  <span
                    className={todo.isCompleted ? "line-through" : " "}
                    key={todo.id}
                  >
                    {todo.task}
                  </span>
                </div>
                <div className="todo-btns">
                  <button
                    onClick={() => editTaskinput(todo.id)}
                    className="bg-cyan-500 px-4 py-0.5 text-lg mx-1 rounded-md text-white font-medium cursor-pointer"
                  >
                    <EditNoteIcon />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-cyan-500 px-4 py-0.5 text-lg mx-1 rounded-md text-white font-medium cursor-pointer"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
