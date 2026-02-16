import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Commentary Blog
            </Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/create">Create Post</Link>
            </div>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/create" element={<PostForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
