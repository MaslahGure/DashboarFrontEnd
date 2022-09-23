import AmrSettings  from './AmrSettings'
import TimeSeriesGraph from './TimeseriesGraph'
import "./amr.scss"
import { useState, useEffect} from 'react'
import { addDays } from 'date-fns'

export default function Amr({device, posts,requestsIntervalSetter}) {
  const [timePeriod, setTimePeriod]=useState("Last minute");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const rangeSetter = (x)=>{
      setRange(x);
      //requestsIntervalSetter(timePeriod,x)
    }
  const periodSetter =(interval)=> {
    setTimePeriod(interval);
    //requestsIntervalSetter(interval,range)   
  }
  useEffect (()=>{
    requestsIntervalSetter(timePeriod,range)   
  },[range,timePeriod,requestsIntervalSetter])
  return (
    <section className='amr' >
      <AmrSettings periodSetter={periodSetter} timePeriod={timePeriod} range={range} rangeSetter ={rangeSetter}/>
      <TimeSeriesGraph posts ={posts} device ={device} timePeriod={timePeriod} range={range}/>
    </section>
  )
}
