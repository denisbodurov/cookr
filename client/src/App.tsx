import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import AddNew from "./pages/addNew.tsx";
import Login from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import Header from "./components/header.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Register />} />
          <Route path="/add-new" element={<AddNew />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
