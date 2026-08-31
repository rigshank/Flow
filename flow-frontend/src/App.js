import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home';
import ToDoList from './Components/ToDoList';
// import Whiteboard from './Components/Whiteboard

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<ToDoList />} />
        {/* <Route path="/whiteboard" element={<Whiteboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;