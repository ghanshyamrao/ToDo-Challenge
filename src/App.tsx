import { useState, ChangeEvent } from "react";
import "./App.css";

interface TodoItem {
  text: string;
  completed: boolean;
  isEditing: boolean;
}

export default function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddInput = () => {
    if (value.trim() === "") {
      setError("Input cannot be empty");
      return;
    }
    setTodoList((prevState) => [
      ...prevState,
      { text: value, completed: false, isEditing: false },
    ]);
    setValue("");
    setError("");
  };

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDelete = (index: number) => {
    setTodoList((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index: number) => {
    setTodoList((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <main className="todo-app">
      <h1>To Do App</h1>
      <div className="input-group">
        <input onChange={handleValue} value={value} />
        <button onClick={handleAddInput}>Add</button>
      </div>
      {error && <p className="error">{error}</p>}
      <ul className="todo-list">
        {todoList.map((item, index) => (
          <li key={index} className={item.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span>{item.text}</span>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
