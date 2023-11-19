import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import './App.css'
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import SingleProject from "./pages/singleProject/SingleProject";
import Client from "./pages/client/Client";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Bills from "./pages/bills/Bills.jsx"
import Measurement from "./pages/measurement/Measurement";
import Forgetpassword from "./pages/forgetPassword/Forgetpassword.jsx";
import Reset from "./component/resetPassword/Reset.jsx";

const Layout=()=>{
  
  return(
    <>
    <Outlet/>
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/project",
        element:<Projects/>
      },
      {
        path:"/client",
        element:<Client/>
      },
      {
        path:"/project/:id",
        element:<SingleProject/>
      },
      {
        path:"/bills",
        element:<Bills/>
      },
      {
        path:"/measurementbook",
        element:<Measurement/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/forget-password",
        element:<Forgetpassword/>
      },
      {
        path:"/reset-password",
        element:<Reset/>
      }
    ]
  }
]);
const App = () => {

  return (
      <>
         <RouterProvider router={router} />
      </>
  )
}

export default App

