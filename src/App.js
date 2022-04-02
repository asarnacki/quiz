import React from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Question from "./components/Question";
import Result from "./components/Result";
import Layout from "./components/Layout";
import Auth from "./components/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route path="/question" element={<Question />} />
            <Route path="/result" element={<Result />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
