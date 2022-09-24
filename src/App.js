//Headers
import React from "react";
import RequireAuth from "./components/RequireAuth";
import {
  Route,
  Routes
} from "react-router-dom";

// Components
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Layout from "./components/Layout";
import Missing from "./pages/missing/Missing";
import PersistLogin from "./components/PersistLogin";
import UserProfile from "./pages/userProfile/UserProfile";
import About from "./pages/about/About";
import Admin from "./pages/admin/Admin";
import Unauthorized from "./pages/unauthorized/Unauthorized";


//App


function App() {


  return (
    <div className="App">
        <Routes>
          <Route path ="/" element ={<Layout/>}>
            {/*Public routes*/}
            <Route path ="/login" element ={<Login/>}/>
            <Route path ="/register" element ={<Register/>}/>
            <Route path ="/unauthorized" element ={<Unauthorized/>}/>
              
              {/*Protected routes*/}
              <Route element={<PersistLogin/>}>
                <Route element ={<RequireAuth allowedRoles ={[4848,9090]}/>}>
                  <Route path ="/" element={<Home/>}/>
                  <Route path ="/profile" element ={<UserProfile/>}/>
                  <Route path ="/about" element ={<About/>}/>
                </Route>
                <Route element ={<RequireAuth allowedRoles={[9090]}/>}>
                  <Route path ="/users" element ={<Admin/>}/>
                </Route>
              </Route>

              {/*Catch all routes*/}
              <Route path="/*" element ={<Missing/>}/>

          </Route>
        </Routes>
    </div>
    
  );
}

export default App;