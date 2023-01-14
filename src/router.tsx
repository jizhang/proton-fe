import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home'
import Dashboard from './routes/Dashboard'
import Login from './routes/Login'

export default createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
])
