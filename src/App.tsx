
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { lazy } from "react";
import LayoutMain from './layouts/LayoutMain'

const HomePage = lazy(() => import('./pages/HomePage'))

const router = createBrowserRouter([
  {
    // path: "*",
    // element: <NotFoundPage/>
  },
  {
    path: "/",
    element: <LayoutMain Component={HomePage} />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
