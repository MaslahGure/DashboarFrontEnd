import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";


export default function Navlinks({closedMenu}) {
  const navigate = useNavigate();
    const logout = useLogout();
    const navItems=([
      {
        id:1,
        label: "Home",
        destination:"/"
      },
      {
        id:2,
        label: "Profile",
        destination:"/profile"
      },
      {
        id:3,
        label: "About",
        destination:"/about"
      },
      {
        id:4,
        label: "Logout",
        destination:"#"
      }
    ])
    const handleChange =(id)=>{
      if(id===4) signOut();
      closedMenu();

    }

    const signOut = async () => {
        await logout();
        navigate('/login');
    }
  return (
    <div>
        <ul className='flex-col absolute left-0 top-20 w-full bg-slate-200'>
         {navItems.map((items)=>{
          return(
            <li key ={items.id} onClick={()=>handleChange(items.id)} className=" hover:bg-sky-700 px-24 py-2 uppercase font-bold">
              <Link to ={items.destination}>{items.label}</Link>
            </li>
          )
         })}
        </ul>
    </div>
  )
}
