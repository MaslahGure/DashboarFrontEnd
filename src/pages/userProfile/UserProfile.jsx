import { useState,useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./userProfile.scss"
import ProfilePic from "./ProfilePic";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { axiosPrivate } from "../../api/axios";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const UserProfile = () => {
    const {auth} =useAuth();
    const [changePassword, setChangePassword] =useState(false);
    const [currentPassword, setCurrentPassword] =useState("")

    
    const [newPassword, setNewPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChangePassword =() =>{
        setChangePassword(!changePassword)
    }

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(newPassword));
        setValidMatch(newPassword === matchPassword);
    }, [newPassword, matchPassword])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const email =auth?.email;
        console.log("submited")
        const v2 =PWD_REGEX.test(newPassword);
        
        if(!v2){
          setErrMsg ("Invalid Entry")
          return;
        }
    
        try {
            await axiosPrivate.put("/profile",
             JSON.stringify({ currentPassword,newPassword, email}),
             {
                 withCredentials: true
             }
         );
         setCurrentPassword(" ");
         setNewPassword(" ");
         setMatchPassword(" ");
         setSuccessMsg("Password Updated Successfully!");
         setErrMsg("");
         setChangePassword(false);
         
         
            }
           
         catch(err){
            if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 401) {
              setErrMsg('Current password is Wrong.');
          } else {
              setErrMsg('Password Update Failed')
          }
        }

    }



  return (
    <main className="profile-page">
        <Navbar/>
        <div className="userProfile-style">
        <ProfilePic/>
        <form className="nameEmailCard" >
            <label htmlFor="username">Name</label>
            <input type ="text"readOnly value={auth?.username}/>
            <label htmlFor="email">Email</label>
            <input type ="text" readOnly value={auth?.email}/>
        </form>
        <button onClick={handleChangePassword}>Change password</button>
        <p className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
        <p className={successMsg ? "successmsg" : "hide"}>{successMsg}</p>
        {changePassword &&
            <form className="nameEmailCard" onSubmit={handleSubmit}>
                <label htmlFor="currentPassword">Current Password</label>
                <input
                    type="password"
                    id ="password"
                    onChange={(e)=> setCurrentPassword(e.target.value)}
                    value ={currentPassword}
                    required
                />
                <label htmlFor="newPassword">
                     New Password:
                    <span className={validPassword ? "valid": "hide"}>
                    <FontAwesomeIcon icon ={faCheck}/>
                    </span>
                    <span className={validPassword || !newPassword?"hide":"invalid"}>
                    <FontAwesomeIcon icon ={faTimes}/>
                    </span>
                </label>
                <input
                    type="password" 
                    id ="newPassword"
                    value={newPassword}
                    onChange ={(e)=>setNewPassword(e.target.value)}
                    required
                    onFocus={()=>setPwdFocus(true)}
                    onBlur ={()=> setPwdFocus(false)}
                />
                <p className={pwdFocus && newPassword && !validPassword?"instructions":"hide"}>
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
                <button disabled ={!validPassword || !validMatch? true : false}>Update Password</button>
            </form>
            }
        </div>
        <Footer/>
    </main>
  )
}

export default UserProfile