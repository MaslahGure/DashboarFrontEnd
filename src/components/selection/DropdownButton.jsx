import React from 'react'
import { useEffect,useState  } from 'react'

import "./selection.scss"


export default function DropdownButton({selectDevice}) {
 
  const [device,setDevice]=useState('Conveyor 1')
  
  
  useEffect (() => {
    device === "Conveyor 1"
    ? selectDevice(1)
    : selectDevice(2)

  },[device,selectDevice]);

  const handleOnchange = (e)=>{
    setDevice(e.target.value)
  }


  return (
    <div className='selection-dropdown'>
      <select value ={device} onChange = {handleOnchange}>
        <option value = "Conveyor 1">conveyor 1</option>
        <option value ="Conveyor 2">conveyor 2</option>
      </select>
      </div>
  )
}
