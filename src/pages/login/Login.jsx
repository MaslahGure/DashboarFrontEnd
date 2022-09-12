import React from 'react';
import {useRef, useState, useEffect} from "react";
import "./login.scss"
import {Link, useNavigate, useLocation} from 'react-router-dom';
import CairoLabLog from '../../img/CairoLabLogo.png'

import axios from "../../api/axios";
import useAuth from '../../hooks/useAuth';
import Footer from '../../components/footer/Footer';

const LOGIN_URL ='/auth';

function Login() {
  const {setAuth, persist, setPersist} =useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"


  const emailRef = useRef();
  const errRef = useRef();

  const [email,setEmail]=useState("");

  const [password,setPassword]=useState("");
  const [errMsg,setErrMsg]=useState("");
  //const [success,setSuccess]=useState(false);
 

  useEffect(()=>{
    emailRef.current.focus();
  },[])

  useEffect(()=>{
    setErrMsg('');
  },[email,password])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({email,password}),
      {
        headers:{"Content-Type":"application/json"},
        withCredentials: true
      }

    );
     const accessToken =response?.data;
     setAuth({email,password,accessToken});    
      setEmail ("");
      setPassword("");
      //setSuccess(true); // remove when Launching
      navigate(from, {replace: true});
      
    } catch (error) {
      if(!error?.response) {
        setErrMsg("No server Response");
      } else if(error.response?.status ===400) {
        setErrMsg("Missing Email or Password");
      }
      else if(error.response?.status === 401) {
        setErrMsg("Wrong email or password ");
      }
      else {
        setErrMsg("Login Failed");
      }
      
    }

  }
  const togglePersist= ()=>{
    setPersist(prev => !prev);
  }

  useEffect (()=>{
    localStorage.setItem("persist",persist);
  },[persist]);

  return (
    <div className="login-style">
    <section className='form-style'>
      <img src={CairoLabLog} alt="" />
      <p ref={errRef} className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input 
        type="email"
        id ="email"
        ref ={emailRef}
        autoComplete = "off"
        onChange={(e)=> setEmail(e.target.value)}
        value ={email}
        required
         />
        <label htmlFor="password">Password</label>
        <input 
        type="password"
        id ="password"
        onChange={(e)=> setPassword(e.target.value)}
        value ={password}
        required
         />
         <button disabled ={!email ||!password? true : false}>Sign In</button>
          <div className="rememberMeCheck">
            <input 
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked ={persist}
            />
            <label htmlFor="persist">Stay logged In</label>
          </div>
      </form>
      <p>
        Need an Account? <br />
        <span>
          <Link to ="/register">
          Sign Up
          </Link>
        </span>
      </p>

    </section>
    <Footer/>
    </div>
  )
}

export default Login