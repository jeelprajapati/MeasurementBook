import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import SingleProject from "./pages/singleProject/SingleProject";
import Client from "./pages/client/Client";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Bills from "./pages/bills/Bills.jsx"
import Measurement from "./pages/measurement/Measurement";

const Layout=()=>{
  
  return(
    <>
    <Navbar/>
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

