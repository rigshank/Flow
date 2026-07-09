import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../Components/Navbar/Navbar.js';

const ToDoList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSection, setNewSection] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    priority: 'Low',
    labels: '',
    reminder: ''
  });

  useEffect(() => {
    // Fetch categories (placeholder until backend CORS is fixed)
    setCategories(['Work', 'Personal']); // Mock data
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleAddSection = (e) => {
    e.preventDefault();
    if (newSection && selectedCategory) {
      console.log(`Adding section "${newSection}" to ${selectedCategory}`);
      setNewSection('');
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title && selectedCategory) {
      console.log(`Adding task:`, newTask);
      setNewTask({ title: '', dueDate: '', priority: 'Low', labels: '', reminder: '' });
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <h1>To-Do List</h1>
        <div className="section">
          <h2>Add Category</h2>
          <form onSubmit={handleAddCategory}>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
            />
            <button type="submit">Add</button>
          </form>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="section">
          <h2>Add Section</h2>
          <form onSubmit={handleAddSection}>
            <input
              type="text"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              placeholder="New section"
              disabled={!selectedCategory}
            />
            <button type="submit" disabled={!selectedCategory}>Add</button>
          </form>
        </div>

        <div className="section">
          <h2>Add Task</h2>
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task title"
              required
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="text"
              value={newTask.labels}
              onChange={(e) => setNewTask({ ...newTask, labels: e.target.value })}
              placeholder="Labels (comma-separated)"
            />
            <input
              type="datetime-local"
              value={newTask.reminder}
              onChange={(e) => setNewTask({ ...newTask, reminder: e.target.value })}
            />
            <button type="submit" disabled={!selectedCategory}>Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;