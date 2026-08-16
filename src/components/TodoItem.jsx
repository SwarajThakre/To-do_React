import React, { useState } from 'react';
import { useTodos } from '../contexts/index';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.text);

  console.log('todo:', todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodos();
  const handleUpdate = () => {
    updateTodo(todo.id, { ...todo, text: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };
  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
        className="shrink-0 cursor-pointer"
      />
      <input
        type="text"
        value={todoMsg}
        readOnly={!isTodoEditable}
        onChange={(e) => setTodoMsg(e.target.value)}
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'
        }`}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            handleUpdate();
          } else {
            setIsTodoEditable(true);
          }
        }}
      >
        {isTodoEditable ? '📁' : '✏️'}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
