import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Login from './pages/Login';
import VangThiPage from './pages/VangThiPage';
import HoanThiPage from './pages/HoanThiPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/sinhvien/dashboard" element={<Layout />}>
                    <Route path="/sinhvien/dashboard/vangthi" element={<VangThiPage />} />
                    <Route path="/sinhvien/dashboard/hoanthi" element={<HoanThiPage />} />
                    <Route path="/logout" element={<Login />} />
                </Route>

            </Routes>
        </Router>
    );
};

export default App;
