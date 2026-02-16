import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostView from "./pages/PostView";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import "./App.css";

const Login = () => <div className="flex items-center justify-center min-h-screen">Login Page Placeholder</div>;
const Register = () => <div className="flex items-center justify-center min-h-screen">Register Page Placeholder</div>;

function App() {
  return (
    <Router>
      <div className="App bg-gray-50 min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
