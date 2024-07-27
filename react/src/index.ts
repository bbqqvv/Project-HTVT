import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Kiểm tra xem phần tử có tồn tại không
const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        React.createElement(
            React.StrictMode,
            null,
            React.createElement(App)
        )
    );
} else {
    console.error('Root element not found');
}
