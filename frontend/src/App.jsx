import Document from './components/Document/Document'
import DocumentPage from './components/DocumentRow/DocumentPage'
import Header from './components/Header/Header'
import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom"

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
