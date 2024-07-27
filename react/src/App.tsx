import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Login from './pages/login';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/logout" element={<Login />} />

            </Routes>
        </Router>
    );
};

export default App;
