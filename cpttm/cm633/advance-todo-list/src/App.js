import React from "react";
import "./App.css";
// import { Todo } from "./component/todo";

class App extends React.Component {
  state = {
    todos: [],
    newItemTitle: "",
  };

  clickHandler = (todoId, shouldDelete) => {
    let newTodos = [...this.state.todos];

    if (!shouldDelete) {
      // toggle the state of the item
      const target = newTodos.find((todo) => {
        return todo.id === todoId;
      });
      target.done = !target.done;
    } else {
      // perform delete action
      newTodos = this.state.todos.filter((todo) => {
        return todo.id !== todoId;
      });
    }
    this.setState({
      todos: newTodos,
    });
  };

  inputHandler = (e) => {
    this.setState({
      newItemTitle: e.target.value,
    });
  };

  createItem = (e) => {
    // hit enter to input
    if (e.key === "Enter") {
      // check input value if empty
      // TODO:
      if (e.target.value.trim() === "") {
        alert("Please do not enter EMPTY value");
        return false;
      }

      const newTodos = [...this.state.todos];
      const randomId = Math.floor(Math.random() * 1000000) + 1;
      newTodos.push({
        id: randomId,
        title: this.state.newItemTitle,
        done: false,
      });

      this.setState({
        todos: newTodos,
        newItemTitle: "",
      });
    } else {
    }
  };

  render() {
    return (
      <div className="min-h-screen w-full bg-slate-100 flex justify-center items-center">
        <div className="bg-white flex-1 max-w-md rounded-xl shadow-xl overflow-hidden mx-4 ">
          <input
            type="text"
            className="bg-slate-600 text-white p-6 w-full outline-none text-3xl"
            placeholder="Type something..."
            value={this.state.newItemTitle}
            onChange={this.inputHandler}
            onKeyDown={this.createItem}
          />
          <ul>
            {this.state.todos.map((todo) => {
              return (
                <li
                  onClick={(e) => {
                    console.log(e);
                    this.clickHandler(todo.id, e.altKey);
                  }}
                  key={todo.id}
                  className={`p-6 text-3xl transition border-b border-slate-100 hover:bg-blue-500 hover:text-white cursor-pointer bg-slate-200 text-slate-600
                  ${todo.done ? "line-through" : ""}`}
                >
                  {todo.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
