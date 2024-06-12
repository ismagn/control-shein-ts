import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { SheinProvider } from './context/SheinProvider';
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SheinProvider>
      <RouterProvider router={router} />
    </SheinProvider>
  </React.StrictMode>,
)
