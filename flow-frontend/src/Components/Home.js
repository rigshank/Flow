import React, { useState, useEffect } from 'react';

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

  if (loading) return <div className="loading">Loading AI Overview...</div>;

  return (
    <div className="app">
      
      {/* Main Content */}
      <div className="main-content">
        <h1>AI Overview</h1>
        <div className="section">
          <h2>Tasks to Complete</h2>
          <ul>
            {overview.tasks.map(task => (
              <li key={task.id}>
                <strong>{task.title}</strong> (Priority: {task.priority}, Urgency: {task.urgency.toFixed(2)})<br />
                Summary: {task.summary}<br />
                Due: {task.due_date}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Deadlines</h2>
          <ul>
            {overview.deadlines.map(dl => (
              <li key={dl.id}>{dl.title} - {dl.due_date}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Relevant Whiteboard Images</h2>
          {overview.whiteboard_images.map((img, idx) => (
            <img key={idx} src={img.url} alt="Whiteboard" style={{ width: '100%', marginBottom: '10px' }} />
          ))}
        </div>

        <div className="section">
          <h2>Upcoming Events</h2>
          <ul>
            {overview.events.map(event => (
              <li key={event.title}>{event.title} - {event.start}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Notifications & Personal Messages</h2>
          <ul>
            {overview.notifications.map((notif, idx) => <li key={idx}>{notif}</li>)}
          </ul>
          <p>{overview.personal_messages[0]}</p>
          <p>Productivity Score: {overview.productivity_score.toFixed(1)}/10</p>
        </div>
      </div>
    </div>
  );
};

export default Home;