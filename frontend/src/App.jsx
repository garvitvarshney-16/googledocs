import Document from './components/Document/Document'
import DocumentPage from './components/DocumentRow/DocumentPage'
import Header from './components/Header/Header'
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from "react-router-dom"
import {v4 as uuid} from 'uuid'

const Layout = () => {
  return (
    <>
      <Header />
      <Document />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />
  },
  {
    path: '/doc',
    element: <Navigate to={`/doc/${uuid()}`}/>
  },
  {
    path: '/doc/:id',
    element: <DocumentPage />
  },
])


function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
