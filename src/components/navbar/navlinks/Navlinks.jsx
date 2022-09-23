import { Link } from "react-router-dom";

export default function Navlinks({closedMenu}) {
   
    const navItems=([
      {
        id:1,
        label: "Home",
        destination:"/"
      },
      {
        id:3,
        label: "About",
        destination:"/about"
      },
      
    ])
    const handleChange =()=>{
      closedMenu();

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
