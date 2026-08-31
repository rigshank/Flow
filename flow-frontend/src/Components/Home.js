import React, { useState, useEffect } from 'react';
import './ToDoList.css';

const Home = ({ userId = 1 }) => {
  const [overview, setOverview] = useState({
    tasks: [], deadlines: [], whiteboard_images: [], events: [], notifications: [], personal_messages: [], productivity_score: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/ai-overview?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        setOverview(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching AI overview:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="todo-app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontFamily: 'DM Serif Display' }}>Loading AI Overview...</div>;

  return (
    <div className="todo-app-container">
      <h1 className="todo-header">AI Overview</h1>
      
      <div className="todo-grid">
        
        {/* Tasks to Complete Card */}
        <div className="neumorphic-card full-width">
          <h2>🎯 Tasks to Complete</h2>
          {overview.tasks.length === 0 ? (
            <div className="empty-state">No tasks pending.</div>
          ) : (
            <div className="task-list">
              {overview.tasks.map(task => (
                <div key={task.id} className="task-item">
                  <div className="task-header">
                    <div className="task-title">{task.title}</div>
                    <div className={`task-badge priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </div>
                  </div>
                  <div className="task-meta" style={{ marginTop: '5px' }}>
                    <div className="task-meta-item">⚠️ Urgency: {task.urgency.toFixed(2)}</div>
                    <div className="task-meta-item">📅 Due: {task.due_date}</div>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    {task.summary}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Deadlines Card */}
        <div className="neumorphic-card">
          <h2>⏰ Deadlines</h2>
          {overview.deadlines.length === 0 ? (
            <div className="empty-state">No upcoming deadlines.</div>
          ) : (
            <div className="task-list" style={{ gridTemplateColumns: '1fr' }}>
              {overview.deadlines.map(dl => (
                <div key={dl.id} className="task-item">
                  <div className="task-title" style={{ fontSize: '18px' }}>{dl.title}</div>
                  <div className="task-meta" style={{ marginTop: '8px' }}>
                    <div className="task-meta-item">📅 {dl.due_date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Events Card */}
        <div className="neumorphic-card">
          <h2>📅 Upcoming Events</h2>
          {overview.events.length === 0 ? (
            <div className="empty-state">No upcoming events.</div>
          ) : (
            <div className="task-list" style={{ gridTemplateColumns: '1fr' }}>
              {overview.events.map(event => (
                <div key={event.title} className="task-item">
                  <div className="task-title" style={{ fontSize: '18px' }}>{event.title}</div>
                  <div className="task-meta" style={{ marginTop: '8px' }}>
                    <div className="task-meta-item">⏰ {event.start}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications & Productivity Card */}
        <div className="neumorphic-card">
          <h2>🔔 Updates & Score</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div>
              <div style={{ fontSize: '48px', fontFamily: 'DM Serif Display', color: 'var(--accent-end)' }}>
                {overview.productivity_score.toFixed(1)}<span style={{ fontSize: '24px', color: 'var(--text-muted)' }}>/10</span>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Productivity Score
              </div>
            </div>

            {overview.personal_messages[0] && (
              <div style={{ padding: '15px', background: 'var(--bg-color)', boxShadow: 'var(--inset)', borderRadius: '12px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                "{overview.personal_messages[0]}"
              </div>
            )}

            {overview.notifications.length > 0 && (
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {overview.notifications.map((notif, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-start)' }}></span>
                    {notif}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Relevant Whiteboard Images */}
        <div className="neumorphic-card">
          <h2>🖼️ Relevant Whiteboards</h2>
          {overview.whiteboard_images.length === 0 ? (
            <div className="empty-state">No images found.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {overview.whiteboard_images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img.url} 
                  alt="Whiteboard" 
                  style={{ width: '100%', borderRadius: '12px', boxShadow: 'var(--raised-sm)' }} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;