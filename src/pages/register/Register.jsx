import React, { useRef, useEffect, useState } from 'react'
import "./register.scss"

import axios from "../../api/axios";
import {Link, useNavigate} from 'react-router-dom';

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const USER_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;

const EMAIL_REGEX = /^([a-z\d._]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2-8})?$/;


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';



function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  //const location = useLocation();
  const from = "/"

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
   // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, email,password, matchPassword])

    const handleSubmit= async (e) =>{

      //prevent page reload
      e.preventDefault();

      //check with wrong info is submitted
      const v1 =USER_REGEX.test(username);
      const v2 =PWD_REGEX.test(password);
      const v3 =EMAIL_REGEX.test(email);
      
      if(!v1 || !v2 || !v3){
        setErrMsg ("Invalid Entry")
        return;
      }

      try {
         await axios.post(REGISTER_URL,
          JSON.stringify({ username,password, email}),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );

      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUsername('');
      setPassword('');
      setEmail('');
      setMatchPassword('');
      navigate(from, {replace: true});
    

      } catch(err){
        if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
          setErrMsg('Email already exists, Login instead?');
      } else {
          setErrMsg('Registration Failed')
      }
      //for screen readers
      errRef.current.focus();
     }

  
    

    }
  return (
    <div className='register-style'>
    <section className='form-style'>
      <p ref={errRef} className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} >
        <label htmlFor="username">
          Full Name:
          <span className={validName ? "valid": "hide"}>
            <FontAwesomeIcon icon ={faCheck}/>
          </span>
          <span className={validName || !username?"hide":"invalid"}>
            <FontAwesomeIcon icon ={faTimes}/>
          </span>
        </label>
        <input
           type="text" 
           id ="username"
           ref={userRef}
           autoComplete ="off"
           value={username}
           onChange ={(e)=>setUsername(e.target.value)}
           required
           onFocus={()=>setUserFocus(true)}
           onBlur ={()=> setUserFocus(false)}
        />
        <p className={userFocus && username && !validName?"instructions":"hide"}>
          <FontAwesomeIcon icon ={faInfoCircle}/>
          4 to 24 characters. <br/>
          Must begin with a letter. <br/>
          Letters, numbers, undrscores ,hyphens allowed
        </p>
        <label htmlFor="Email">
          Email:
          <span className={validEmail ? "valid": "hide"}>
            <FontAwesomeIcon icon ={faCheck}/>
          </span>
          <span className={validEmail || !email?"hide":"invalid"}>
            <FontAwesomeIcon icon ={faTimes}/>
          </span>
        </label>
        <input
           type="email" 
           id ="email"
           value={email}
           onChange ={(e)=>setEmail(e.target.value)}
           required
           onFocus={()=>setEmailFocus(true)}
           onBlur ={()=> setEmailFocus(false)}
        />
        <p className={emailFocus && email && !validEmail?"instructions":"hide"}>
          <FontAwesomeIcon icon ={faInfoCircle}/>
          Only lowercase letters @<br/>
          Must begin with a letter. <br/>
          Must contain @ and dot
          Must not contain hyphen -
        </p>


        <label htmlFor="password">
          password:
          <span className={validPassword ? "valid": "hide"}>
            <FontAwesomeIcon icon ={faCheck}/>
          </span>
          <span className={validPassword || !password?"hide":"invalid"}>
            <FontAwesomeIcon icon ={faTimes}/>
          </span>
        </label>
        <input
           type="password" 
           id ="password"
           value={password}
           onChange ={(e)=>setPassword(e.target.value)}
           required
           onFocus={()=>setPwdFocus(true)}
           onBlur ={()=> setPwdFocus(false)}
        />
        <p className={pwdFocus && password && !validPassword?"instructions":"hide"}>
          <FontAwesomeIcon icon ={faInfoCircle}/>
          8 to 24 characters. <br/>
          Must include uppercase and lowercase letters, a number and a special character <br/>
          Allowed special characters: !@#$%
        </p>
        <label htmlFor="confirm_password">
          Confirm Password:
          <span className={validMatch && matchPassword? "valid": "hide"}>
            <FontAwesomeIcon icon ={faCheck}/>
          </span>
          <span className={validMatch || !matchPassword?"hide":"invalid"}>
            <FontAwesomeIcon icon ={faTimes}/>
          </span>
        </label>
        <input
           type="password" 
           id ="confirm_password"
           onChange ={(e)=>setMatchPassword(e.target.value)}
           required
           onFocus={()=>setMatchFocus(true)}
           onBlur ={()=> setMatchFocus(false)}
        />
        <p className={matchFocus &&!validMatch?"instructions":"hide"}>
          <FontAwesomeIcon icon ={faInfoCircle}/>
         Password does not match
        </p>

        <button disabled ={!validName || !validEmail||!validPassword || !validMatch? true : false}>Sign Up</button>
      </form>
      <p>
        Already register? <br/> 
        <Link to ="/login">Login</Link>
        
      </p>
      
      
    </section>
    </div>
  )
}

export default Register