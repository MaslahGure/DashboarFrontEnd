import { useState, useEffect } from 'react';
import userDefaultProfile from '../../img/defaultProfilePic.jpg';
import useAuth from "../../hooks/useAuth";
import {upload} from "../../api/firebase"
import useAxiosPrivate from '../../hooks/useAxiosPrivate';



const ProfilePic = () => {
    const {auth} =useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [userPhotoUrl, setUserPhotoUrl] =useState(userDefaultProfile);
    const [picToggle, setPicToggle]=useState(false);
    const [image, setImage] =useState(null);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    const handleChange = (e)=>{
        if(e.target.files[0]) setImage(e.target.files[0]);
    }
    const handleClick =()=>{
        upload(image,auth.userId, setLoading,setUserPhotoUrl, updateUserPhoto);
        setPicToggle(!picToggle);

    }
    const handlePicToggle =()=>{
        setPicToggle(!picToggle)
    }
    const updateUserPhoto = async(photoUrl)=>{
        const email =auth.email;
        try {
           await axiosPrivate.post('/profile',JSON.stringify({photoUrl,email}), 
            {
             withCredentials: true
            }
            
         );
         setSuccessMsg("Photo Updated Successfully!!");
         setErrMsg("");
         setUserPhotoUrl(photoUrl);
         } catch(err){
           if (!err?.response) {
             setErrMsg('No Server Response');
         } else if (err.response?.status === 401) {
             setErrMsg('Forbidden');
         } else {
             setErrMsg('Photo update failed')
         }
        }
    }
    useEffect (()=>{
        if(auth?.photoUrl){
            setUserPhotoUrl(auth.photoUrl)
        }
    },[auth])
  return (
    <div className="userProfilePic nameEmailCard">
        <p className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
        <p className={successMsg ? "successmsg" : "hide"}>{successMsg}</p>
            <img src={userPhotoUrl} alt="" className="userAvatar"
            onClick ={handlePicToggle} />
            {picToggle &&
                <div className="uploadPhoto">
                <input
                    type ="file"
                    onChange={handleChange}
                />
                <button disabled ={!image || loading} 
                onClick ={handleClick}
                >Update Photo</button>
            </div>
            
            }
            
    </div>
  )
}

export default ProfilePic
