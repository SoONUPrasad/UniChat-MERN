import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Navigate to={'/signin'}/>,
    },
    {
      path: "/signin",
      element: isAuthenticated ? <Navigate to={'/'}/> : <SignIn />,
    },
    {
      path: "/signup",
      element: isAuthenticated ? <Navigate to={'/'}/> : <SignUp />,
    },
  ]);
  return (
    <RouterProvider router={router}>
      <Toaster />
    </RouterProvider>
  );
}

export default App;
