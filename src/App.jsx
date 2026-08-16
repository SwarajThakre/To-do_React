import React, { useState, useEffect } from 'react';
import { TodoProvider } from './contexts/index';
import { TodoForm, TodoItem } from './components';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = (todo) => {
    setTodos((prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">Taskify</h1>
            <p className="text-gray-500">Organize your day with ease</p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Todo Form */}
            <div className="p-6 border-b border-gray-100">
              <TodoForm />
            </div>

            {/* Todo List */}
            <div className="divide-y divide-gray-100">
              {filteredTodos.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p className="text-gray-500">
                    {filter === 'all'
                      ? 'No tasks yet. Add one above!'
                      : filter === 'active'
                      ? 'No active tasks'
                      : 'No completed tasks'}
                  </p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <TodoItem todo={todo} />
                  </div>
                ))
              )}
            </div>

            {/* Footer with Filters */}
            <div className="px-6 py-3 bg-gray-50 flex justify-between items-center text-sm">
              <span className="text-gray-500">
                {todos.filter((t) => !t.completed).length} items left
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-md ${
                    filter === 'all'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-500 hover:text-indigo-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-3 py-1 rounded-md ${
                    filter === 'active'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-500 hover:text-indigo-600'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-3 py-1 rounded-md ${
                    filter === 'completed'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-500 hover:text-indigo-600'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>

          {/* Attribution */}
          <div className="mt-8 text-center text-xs text-gray-400">
            Drag and drop to reorder list
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
