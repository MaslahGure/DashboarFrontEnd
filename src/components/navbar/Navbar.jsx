import { useState ,useEffect} from 'react'
import useAuth from "../../hooks/useAuth"

import "./navbar.scss"
import Logo from "../../img/CarioLog.png"
import {GiHamburgerMenu} from "react-icons/gi"
import Navlinks from './navlinks/Navlinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell,faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import userDefaultProfile from '../../img/defaultProfilePic.jpg';


function Navbar() {
    const {auth} = useAuth();
    const navigate =useNavigate();
    const [userPhotoUrl, setUserPhotoUrl] =useState(userDefaultProfile);

    const [open, setOpen] = useState(false);
    const [profleMenu, setProfileMenu]= useState(false)
    const closedMenu = () => setOpen(false);
    const userRole ="Client"


    const handleClickProfile =()=>{
        setProfileMenu(!profleMenu)
    }
    useEffect (()=>{
        if(auth?.photoUrl){
            setUserPhotoUrl(auth.photoUrl)
        }
    },[auth])
    const handleLogoClick =()=>{
        navigate("/");
    }

  return (
    <header className='navbar'>
        <div className="wrapper">
            <div className='left-item'>
                <div className="logo">
                <img src={Logo} alt="" 
                    onClick={handleLogoClick}
                    style ={{cursor:'pointer'}}
                />
                </div>
                <div className="menu">
                    <GiHamburgerMenu className='hamburgerMenuIcon'
                onClick={() =>{
                    setOpen(!open);
                    }}
                    />
                    <span className='menuText'>Menu</span>
                    <div className="naveLinks">
                    {open &&  <Navlinks closedMenu ={closedMenu}/>}
                    </div>
                </div>
            </div>
            <div className="right-item">
                <div className="notification">
                <FontAwesomeIcon icon={faBell} size ="xl" color='black'/>
                </div>
                <div className="userDetails">
                    <span className='Name'>{auth?.username}</span>
                    <span className='Rank'>{userRole}</span>

                </div>
                <div className ="profile-menu" >
                   <img src={userPhotoUrl} alt="" className='avatar' onClick={handleClickProfile}/>
                   {profleMenu && 
                        <ul>
                            <li>
                                <Link to = "/profile" >
                                    Profile
                                    <FontAwesomeIcon icon = {faArrowCircleRight}/>
                                </Link>
                            </li>
                            <li>
                                <Link to = "/users" >
                                    users
                                    <FontAwesomeIcon icon = {faArrowCircleRight}/>
                                </Link>
                            </li>
                        </ul>}
                </div>
                
            </div>
        </div>
    </header>
  )
}

export default Navbar