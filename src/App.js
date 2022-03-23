import React from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import Question from "./components/Question";
import Result from "./components/Result";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
