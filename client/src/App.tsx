import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import AddNew from "./pages/addNew.tsx";
import Login from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-new" element={<AddNew />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
