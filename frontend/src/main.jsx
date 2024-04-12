import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ThemeProvider } from "@material-tailwind/react";
import { UserProvider } from './context/userContext.jsx';
import { DocumentProvider } from './context/documentContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <DocumentProvider>
            <App />
        </DocumentProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
