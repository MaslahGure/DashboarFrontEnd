import { useState ,useEffect,useRef} from 'react'
import useAuth from "../../hooks/useAuth"
import useLogout from "../../hooks/useLogout";


import Logo from "../../img/CarioLog.png"
import Navlinks from './navlinks/Navlinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell,faBars,faSignOut, faUsers,faUser} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import userDefaultProfile from '../../img/defaultProfilePic.jpg';


function Navbar() {
    const {auth} = useAuth();
    const navigate =useNavigate();
    const [userPhotoUrl, setUserPhotoUrl] =useState(userDefaultProfile);

    const [open, setOpen] = useState(false);
    const [profleMenu, setProfileMenu]= useState(false)
    const closedMenu = () => setOpen(false);
    
    const userRole =auth?.role ||"";

    //Logging out
    const logout = useLogout();
    const signOut = async () => {
        await logout();
        navigate('/login');
    }
    const handleOnClickLogout =()=>{
        signOut();
      }
    


    const handleClickProfile =()=>{
        setProfileMenu(!profleMenu)
    }
    useEffect (()=>{
        if(auth?.photourl){
            setUserPhotoUrl(auth.photourl)
        }
    },[auth])
    const handleLogoClick =()=>{
        navigate("/");
    }

    // Close when click outside the menu
    const refOne = useRef(null)
    const refTwo = useRef(null)
    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
      }, [])
        // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if( e.key === "Escape" ) {
      setOpen(false)
      setProfileMenu(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
      
    }
    if( refTwo.current && !refTwo.current.contains(e.target) ) {
        setProfileMenu(false)
      }
  }


  return (
    <header className='sticky top-0 z-10  border-b-2 border-sky-400 bg-zinc-50'>
        <div className="flex justify-between max-w-full p-4">
            <div className='flex items-center'>
                <div className='p-3'>
                <img src={Logo} alt="" 
                    onClick={handleLogoClick}
                    className ="cursor-pointer w-12 h-12"
                />
                </div>
                <div className="flex items-center" ref={refOne}>
                    <FontAwesomeIcon icon={faBars} size ="xl" className='text-[red] cursor-pointer'
                onClick={() =>{
                    setOpen(!open);
                    }}
                    />
                    <span className='font-bold px-2 text-lg'>Menu</span>
                    {open &&  <Navlinks closedMenu ={closedMenu}/>}
                </div>
            </div>
            <div className="flex p-2 gap-3 items-center">
                <FontAwesomeIcon icon={faBell} size ="xl" color='black'/>
                <div className="flex flex-col">
                    <span className='Name'>{auth?.username}</span>
                    <span className='Rank'>{userRole ===9090?"Admin":"Client"}</span>

                </div>
                <div ref={refTwo}>
                   <img src={userPhotoUrl} alt="" className='h-[40px] w-[40px] rounded-full cursor-pointer' onClick={handleClickProfile}/>
                   {profleMenu && 
                        <ul className=' flex-col justify-between w-[15%] absolute top-16 right-0 border-l-gray-900 uppercas bg-gray-200 text-center font-bold'>
                            <li className='p-2 hover:bg-sky-700'>
                                <Link to = "/profile" >
                                    Profile
                                    <FontAwesomeIcon icon = {faUser} style={{paddingLeft:'0.5rem'}}/>
                                </Link>
                            </li>
                            <li className='p-2 hover:bg-sky-700'
                            onClick={()=>handleOnClickLogout()}>
                                <Link to = "/profile" >
                                    Logout
                                    <FontAwesomeIcon icon = {faSignOut} style={{paddingLeft:'0.5rem'}}/>
                                </Link>
                            </li>
                            <hr className ="border-black" />
                            {userRole=== 9090 &&
                                <li className='p-2 hover:bg-sky-700'>
                                    <Link to = "/users" >
                                        users
                                        <FontAwesomeIcon icon = {faUsers} style={{paddingLeft:'0.5rem'}}/>
                                    </Link>
                                </li>
                            }
                            
                        </ul>}
                </div>
                
            </div>
        </div>
    </header>
  )
}

export default Navbar