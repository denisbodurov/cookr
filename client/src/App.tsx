import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.tsx';
import AddNew from './pages/addNew.tsx';
import Header from './components/header.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addNew" element={<AddNew />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
