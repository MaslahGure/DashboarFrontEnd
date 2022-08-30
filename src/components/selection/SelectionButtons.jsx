import React from 'react'
import { useState } from 'react'
import "./selection.scss"

export default function Selection({selectedBox}) {
  const [selected,setSelected] =useState(0);
  
  return (
    <div className='selection-buttons'>
        <button className={selected === 1? "buttons active":"buttons"}
        onClick={() =>{
          setSelected(1);
          selectedBox(1)
        }}
        >Health</button>
   
        <button className={selected === 2? "buttons active":"buttons"}
        onClick={() =>{
          setSelected(2)
          selectedBox(2);
        }}
        >Details</button>

    </div>
  )
}
