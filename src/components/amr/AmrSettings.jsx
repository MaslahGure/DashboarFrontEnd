import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faSearch} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const AmrSettings = () => {
  const [timePeriod, setTimePeriod] =useState("Last minute")
  const handleOnchange = (e) =>{
    setTimePeriod(e.target.value)

  }
  return (
    <div className='amr-settings'>
      <FontAwesomeIcon icon ={faClock} style ={{padding:"3px"}}/> 
      <select value ={timePeriod} onChange = {handleOnchange}>
        <option value = "Last minute">Last minute</option>
        <option value ="Last hour">Last hour</option>
        <option value ="Last 3 hours">Last 3 hours</option>
      </select>
      <FontAwesomeIcon icon ={faSearch} style ={{padding:"3px"}}/> 
      
    </div>
  )
}

export default AmrSettings