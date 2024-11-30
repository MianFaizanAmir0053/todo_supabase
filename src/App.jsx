import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching todos:', error);
    else setTodos(data);
    setLoading(false);
  };

  // Create a new todo
  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    const { data, error } = await supabase
      .from('todos')
      .insert([{ title: newTodo, is_completed: false }]).select('*');

    if (error) {
      console.error('Error adding todo:', error);
    } else if (data && data.length > 0) {
      setTodos([data[0], ...todos]);
      setNewTodo('');
    } else if (data === null) {
      console.error('Unexpected response: null');
    } else {
      console.error('Unexpected response:', data);
    }
  };

  // Update a todo
  const updateTodo = async (id) => {
    if (editTitle.trim() === '') return;
    const { data, error } = await supabase
      .from('todos')
      .update({ title: editTitle })
      .eq('id', id);

    if (error) console.error('Error updating todo:', error);
    else {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title: editTitle } : todo)));
      setEditTodo(null);
      setEditTitle('');
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) console.error('Error deleting todo:', error);
    else setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-sm mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Supabase CRUD</h1>

      {/* Add Todo */}
      <div className="mb-5 flex">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="mr-2 flex-1"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center mb-2">
              {editTodo === todo.id ? (
                <>
                  <Input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="mr-2 flex-1"
                  />
                  <Button onClick={() => updateTodo(todo.id)} className="mr-1">Save</Button>
                  <Button onClick={() => setEditTodo(null)} variant="secondary">Cancel</Button>
                </>
              ) : (
                <>
                  <span className="flex-1">{todo.title}</span>
                  <Button onClick={() => { setEditTodo(todo.id); setEditTitle(todo.title); }} className="mr-1">Edit</Button>
                  <Button onClick={() => deleteTodo(todo.id)} variant="danger">Delete</Button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
