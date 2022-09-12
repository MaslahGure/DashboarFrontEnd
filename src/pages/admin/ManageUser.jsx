import { useState,useEffect } from "react"
import { axiosPrivate } from "../../api/axios"


const ManageUser = ({currentUser, currentUserManager,setSearchResult,updateUser}) => {
  
    const [userDatabase, setUserDatabase] = useState(currentUser?.database || "")
    const [userTableName, setUserTableName] = useState(currentUser.tablename || "")
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    
    const handleClick = ()=>{
      currentUserManager(false);
    }
    const handleSubmit =async(e)=>{
      const email = currentUser.email
      e.preventDefault();
      
      try {
        await axiosPrivate.put("/users/manage-user",
         JSON.stringify({ userDatabase,userTableName, email}),
         {
             withCredentials: true
         }
     );
     setSuccessMsg("User Database Updated Successfully!");
     setErrMsg("");
     updateUser();
     setSearchResult("")
     
    }
 
       
     catch(err){
        if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 401) {
          setErrMsg('You are not Authorized to perform this action.');
      } else {
          setErrMsg('Database Update Failed')
      }
    }

    }
    useEffect(()=>{
      
    },[successMsg,errMsg])
  return (
    <div className="mt-4">
      <p className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
      <p className={successMsg ? "successmsg" : "hide"}>{successMsg}</p>
      <table  className="table-auto text-center">
        <thead>
        <tr className='border border-slate-600'>
            <th className='p-2'>Name</th>
            <th className='p-2'>database</th>
            <th className='p-2'>table</th>
            <th className='p-2'>Action</th>
            </tr>
        </thead>
        <tbody>
          <tr className="border border-slate-600">
            <td className="p-2">{currentUser?.username}</td>
            <td className="p-2">{userDatabase}</td>
            <td className="p-2">{userTableName}</td>
            <td className="p-2"><button 
            onClick={handleClick}
            className="'p-0 m-1 rounded border-sky-500 bg-stone-400 text-sm font-thin text-center">Close</button></td>
          </tr>
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
      <label htmlFor='database'>Database</label>
        <input 
        type="text" 
        id ="database"
        value={userDatabase}
        required
        onChange={(e)=> setUserDatabase(e.target.value)}
        className='border border-sky-500'

        />
        <label htmlFor='table'>Table Name</label>
        <input 
        type="text" 
        id="table"
        value={userTableName}
        placeholder ={""}
        required
        onChange={(e)=> setUserTableName(e.target.value)}
        className='border border-sky-500'

        />
        <button className="border bg-green-500 text-white">Save changes</button>
      </form>
      
    </div>
  )
}

export default ManageUser