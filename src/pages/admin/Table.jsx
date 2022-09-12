import { useState } from "react"
import ManageUser from './ManageUser'
const Table = ({users, updateUser, setSearchResult, manageCurrentUser,currentUserManager}) => {
    //const [manageCurrentUser, setManageCurrentUser]=useState(false);
    const [currentUser,setCurrentUser] = useState('');


    const handleMangeClick =(user)=>{
        setCurrentUser(user); 
        currentUserManager(true)
    }
  return (
    !manageCurrentUser?
    <table className="table-auto text-center">
        <thead>
            <tr className='border border-slate-600'>
            <th className='p-2'>Name</th>
            <th className='p-2'>database</th>
            <th className='p-2'>table</th>
            <th className='p-2'>Action</th>
            </tr>
        </thead>
        <tbody>
            {users?.length
                ? (
                
                    users.map((user, i) => 
                    <tr key={i} className="border border-slate-600">
                        <td className='p-2'>{user?.username}</td>
                        <td className='p-2'> {user?.database?user.database:'Not Assigned'}</td>
                        <td className='p-2'>{user?.tablename?user.tablename:'Not Assigned'}</td>
                        <td onClick={()=>handleMangeClick(user)}><button 
                        className='p-0 m-1 rounded border-sky-500 bg-stone-400 text-sm font-thin text-center'
                        >Manage</button></td>
                    </tr>)
            
                ) : <tr><td className = "border border-slate-700 ">No users to display</td></tr>
            }
        </tbody>
  </table>
  :<ManageUser currentUser ={currentUser} currentUserManager={currentUserManager}  updateUser={updateUser} setSearchResult={setSearchResult}/>
  )
}

export default Table