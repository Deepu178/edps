import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Dashboard from './components/Dashboard/Dashboard'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
  <App />
    {/* <Routes> */}
    {/* <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} /> */}
    {/* </Routes> */}
    {/* <App /> */}
    {/* </BrowserRouter> */}
    
  </React.StrictMode>
);


