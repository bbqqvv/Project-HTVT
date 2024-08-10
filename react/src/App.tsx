// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Login from './pages/Login';
// import HoanThiPage from './pages/HoanThiPage';
// import VangThiPage from './pages/VangThiPage';
import KhoaPage from './pages/KhoaPage';
import KhaoThiPage from './pages/KhaoThiPage';

import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    {/* Routes for SinhVien */}
                    {/* <Route path="/sinhvien/dashboard" element={<Layout />}>
                        <Route path="/sinhvien/dashboard/hoanthi" element={<HoanThiPage />} />
                        <Route path="/sinhvien/dashboard/vangthi" element={<VangThiPage />} />
                    </Route> */}

                    {/* Routes for Khoa */}
                    <Route path="/khoa/dashboard" element={<Layout />}>
                        <Route path="/khoa/dashboard/notification" element={<KhoaPage />} />

                        {/* <Route index element={<KhoaPage />} /> */}
                        {/* Add additional routes for Khoa here if needed */}
                    </Route>

                    {/* Routes for KhaoThi */}
                    <Route path="/khaothi/dashboard" element={<Layout />}>
                        <Route path="/khaothi/dashboard/notification" element={<KhaoThiPage />} />

                        {/* <Route index element={<KhaoThiPage />} /> */}
                        {/* Add additional routes for KhaoThi here if needed */}
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
