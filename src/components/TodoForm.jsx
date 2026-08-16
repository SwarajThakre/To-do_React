import React, { useState } from 'react';
import { useTodos } from '../contexts/index';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ text: todo, completed: false });
    setTodo('');
  };
  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        placeholder="Add a new todo..."
        required
      />
      <button
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
        type="submit"
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
