import "./admin.scss"
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Table from "./Table";
import Search from "./Search";
//import { useNavigate, useLocation } from "react-router-dom";

const About = () => {
  const axiosPrivate = useAxiosPrivate();
  

  const [userUpdate, setUserUpdate]=useState(false);//used to automatically refetch data when user updated
  const updateUser =()=>setUserUpdate(true)
 // const navigate = useNavigate();
  //const location = useLocation()

  const [users, setUsers] = useState([]);
  const [searchResult, setSearchResult] =useState();

  //manages the manage page and users list page -> viewing status
  const [manageCurrentUser, setManageCurrentUser]=useState(false);
  const currentUserManager = (x)=> setManageCurrentUser(x)
  
  //Api call, server data 
  //const effectRun = useRef(false);
  useEffect (() =>{
    let isMounted =true;
    const controller =new AbortController();
     const getUsers = async()=>{

      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal
      });
      //console.log(response.data)
      
        isMounted && setUsers(response.data);
        setUserUpdate(false)
       
       
      } catch (error) {
        //navigate('/login', { state: { from: location }, replace: true });
        //console.log(error)
       
      }
     
    }

        getUsers();
        
    
 

          
      return () => {
        isMounted =false;
        controller.abort();
      }
    } ,[axiosPrivate,userUpdate])
  
  return (
    <section className="">
        <Navbar/>
        <main className="flex-col mt-20 items-center">
            <h2>Users List</h2>
            {!manageCurrentUser && <Search users ={users} setSearchResult ={setSearchResult}/>}
            <Table 
            users ={searchResult?searchResult:users}
            setUserUpdate={setUserUpdate} updateUser={updateUser}
            setSearchResult={setSearchResult}
            manageCurrentUser ={manageCurrentUser}
            currentUserManager ={currentUserManager}/>
            
        </main>
        <Footer/>
    </section>
  )
}

export default About