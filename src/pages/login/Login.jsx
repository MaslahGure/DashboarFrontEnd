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
    <div className="flex justify-center items-center bg-slate-100 min-h-screen">
    <section className='w-full max-w-md flex flex-col grow bg-gray-200 p-6 m-4 shadow shadow-blue-500/40 md:shadow-indigo-500/40'>
      <img src={CairoLabLog} alt="" className='w-[320px]' />
      <p ref={errRef} className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className='mt-2'>Email</label>
        <input 
        type="email"
        id ="email"
        ref ={emailRef}
        autoComplete = "off"
        onChange={(e)=> setEmail(e.target.value)}
        value ={email}
        required
        className='text-lg p-1 rounded-lg'
         />
        <label htmlFor="password" className='mt-2'>Password</label>
        <input 
        type="password"
        id ="password"
        onChange={(e)=> setPassword(e.target.value)}
        value ={password}
        required
        className='text-lg p-1 rounded-lg'
         />
         <button disabled ={!email ||!password? true : false}
         className ='text-lg p-1 rounded-lg my-2 border border-blue-300'>Sign In</button>
          <div className="flex items-center mt-2">
            <input 
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked ={persist}
            className=' indeterminate:bg-gray-300 '
            />
            <label htmlFor="persist" className='m-0'>Stay logged In</label>
          </div>
      </form>
      <p>
        Need an Account? <br />
        <span>
          <Link to ="/register" className='visited:text-purple-600'>
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