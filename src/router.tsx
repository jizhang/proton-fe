import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'

const Dashboard = lazy(() => import('./routes/Dashboard'))
const RealtimeOverview = lazy(() => import('./routes/RealtimeOverview'))

export default createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/realtime', element: <RealtimeOverview /> },
])
