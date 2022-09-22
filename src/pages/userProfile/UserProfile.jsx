import { useState,useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { faCheck, faTimes, faInfoCircle, faDatabase, faMailBulk, faUser,faTableCells} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <main>
        <Navbar/>
        <div className="border shadow shadow-slate-600 mt-11 rounded-sm w-[300px] min-h-full">
            <ProfilePic/>
            <form className="p-4 mx-2" >
                <label htmlFor="username" className="m-1 font-bold"><FontAwesomeIcon icon ={faUser}/> Name</label>
                <input type ="text"readOnly value={auth?.username} className ="border rounded-md border-purple-200 p-2"/>
                <label htmlFor="email" className="m-1 font-bold"><FontAwesomeIcon icon ={faMailBulk}/> Email</label>
                <input type ="text" readOnly value={auth?.email} className ="border rounded-md border-purple-200 p-2"/>
                <label htmlFor="database"className="m-1 font-bold"><FontAwesomeIcon icon ={faDatabase}/> Current Database</label>
                <input type ="database" readOnly value={auth?.database} className ="border rounded-md border-purple-200 p-2"/>
                <label htmlFor="tablename"className="m-1 font-bold"><FontAwesomeIcon icon ={faTableCells}/> Current Table</label>
                <input type ="tablename" readOnly value={auth?.tablename} className ="border rounded-md border-purple-200 p-2"/>
            </form>
            <button onClick={handleChangePassword} className ="border rounded-lg p-2 mb-2 bg-gray-200 ml-6">Change password</button>
            <p className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
            <p className={successMsg ? "successmsg" : "hide"}>{successMsg}</p>
        </div>
        {changePassword &&
            <form className="m-2 p-4 border rounded-md w-[300px]" onSubmit={handleSubmit}>
                <label htmlFor="currentPassword">Current Password</label>
                <input
                    type="password"
                    id ="password"
                    onChange={(e)=> setCurrentPassword(e.target.value)}
                    value ={currentPassword}
                    required
                    className="text-lg p-1 rounded-lg border"
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
                    className="text-lg p-1 rounded-lg border"
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
                    className="text-lg p-1 rounded-lg border"
                 />
                 <p className={matchFocus &&!validMatch?"instructions":"hide"}>
                    <FontAwesomeIcon icon ={faInfoCircle}/>
                    Password does not match
                </p>
                <button disabled ={!validPassword || !validMatch? true : false} className= 'border rounded-lg my-2 p-2 bg-green-500'>Update Password</button>
            </form>
            }
        <Footer/>
    </main>
  )
}

export default UserProfile