import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"
import LoginPage from './pages/LoginPage'
import NotesPage from './pages/NotesPage'
import ErrorPage from './pages/ErrorPage';


let router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
    errorElement: <ErrorPage />
  },

  {
    path: "/notes",
    element: <NotesPage></NotesPage>,
    errorElement: <ErrorPage />
  }
]);


function App() {


  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  )
}

export default App
