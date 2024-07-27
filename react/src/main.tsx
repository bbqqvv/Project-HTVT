import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // .js không cần thiết nếu App.tsx hoặc App.jsx
import './index.css';

// TypeScript có thể không cần loại bỏ kiểm tra kiểu cho document.getElementById
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error('Root element not found');
}
