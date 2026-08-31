import React, { useState, useEffect } from 'react';
import './ToDoList.css';

const ToDoList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSection, setNewSection] = useState('');
  const [sections, setSections] = useState({});
  const [selectedSection, setSelectedSection] = useState('');
  const [tasks, setTasks] = useState([]);
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

  useEffect(() => {
    setSelectedSection('');
  }, [selectedCategory]);

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
      setSections({
        ...sections,
        [selectedCategory]: [...(sections[selectedCategory] || []), newSection]
      });
      setNewSection('');
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title && selectedCategory) {
      const task = {
        ...newTask,
        id: Date.now(),
        category: selectedCategory,
        section: selectedSection
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', dueDate: '', priority: 'Low', labels: '', reminder: '' });
    }
  };

  return (
    <div className="todo-app-container">
      <h1 className="todo-header">Workspace</h1>
      
      <div className="todo-grid">
        
        {/* Categories & Sections Card */}
        <div className="neumorphic-card">
          <h2>📁 Workspace Structure</h2>
          
          <div className="form-group">
            <form onSubmit={handleAddCategory} className="form-row">
              <input
                type="text"
                className="neumorphic-input"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category..."
              />
              <button type="submit" className="neumorphic-button">Add</button>
            </form>
            
            <select
              className="neumorphic-input"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{ height: '1px', background: 'var(--shadow-dark)', opacity: 0.3, margin: '10px 0' }}></div>

          <div className="form-group">
            <form onSubmit={handleAddSection} className="form-row">
              <input
                type="text"
                className="neumorphic-input"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                placeholder="New section..."
                disabled={!selectedCategory}
              />
              <button type="submit" className="neumorphic-button secondary" disabled={!selectedCategory}>Add</button>
            </form>
            <select
              className="neumorphic-input"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedCategory || !(sections[selectedCategory] && sections[selectedCategory].length > 0)}
            >
              <option value="">Select Section</option>
              {sections[selectedCategory] && sections[selectedCategory].map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Task Card */}
        <div className="neumorphic-card">
          <h2>✨ Create Task</h2>
          <form onSubmit={handleAddTask} className="form-group">
            <input
              type="text"
              className="neumorphic-input"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="What needs to be done?"
              required
            />
            
            <div className="form-row">
              <input
                type="date"
                className="neumorphic-input"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
              <select
                className="neumorphic-input"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            <div className="form-row">
              <input
                type="text"
                className="neumorphic-input"
                value={newTask.labels}
                onChange={(e) => setNewTask({ ...newTask, labels: e.target.value })}
                placeholder="Labels (comma-separated)"
              />
              <input
                type="datetime-local"
                className="neumorphic-input"
                value={newTask.reminder}
                onChange={(e) => setNewTask({ ...newTask, reminder: e.target.value })}
              />
            </div>
            
            <button type="submit" className="neumorphic-button" disabled={!selectedCategory} style={{ marginTop: '10px' }}>
              Create Task
            </button>
          </form>
        </div>

        {/* All Tasks Card */}
        <div className="neumorphic-card full-width">
          <h2>📋 Open Tasks</h2>
          
          {tasks.length === 0 ? (
            <div className="empty-state">
              No tasks yet. Create one above to get started!
            </div>
          ) : (
            <div className="task-list">
              {tasks.map(task => (
                <div key={task.id} className="task-item">
                  <div className="task-header">
                    <div className="task-title">{task.title}</div>
                    <div className={`task-badge priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </div>
                  </div>
                  
                  <div className="task-meta">
                    <div className="task-meta-item">
                      📁 {task.category} {task.section ? `> ${task.section}` : ''}
                    </div>
                    {task.dueDate && (
                      <div className="task-meta-item">📅 {task.dueDate}</div>
                    )}
                    {task.labels && (
                      <div className="task-meta-item">🏷️ {task.labels}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ToDoList;