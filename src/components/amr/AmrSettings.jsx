import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faSearch} from "@fortawesome/free-solid-svg-icons";
import DateRangePickerComp from './DateRangePickerComp';


const AmrSettings = ({timePeriod,periodSetter,range,rangeSetter}) => {
 
  const handleOnchange = (e) =>{
    periodSetter(e.target.value);

  }
  return (
    <div className='flex justify-center'>
      <FontAwesomeIcon icon ={faClock} style ={{padding:"3px"}}/> 
      <select value ={timePeriod} onChange = {handleOnchange} className="p-1 bg-blue-200">
        <option value = "Last minute">Last minute</option>
        <option value ="Last hour">Last hour</option>
        <option value ="Last 3 hours">Last 3 hours</option>
        <option value ="Last day">Last 24 hours</option>
        <option value ="Custom">Custom Range</option>
      </select>
      <FontAwesomeIcon icon ={faSearch} style ={{padding:"3px"}}/> 
      {timePeriod==='Custom'&& <DateRangePickerComp range={range} rangeSetter={rangeSetter}/>}
    </div>
  )
}

export default AmrSettings