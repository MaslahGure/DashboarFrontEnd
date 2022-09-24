import "./home.scss"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Selection from "../../components/selection/SelectionButtons";
import Health from "../../components/health/Health";
import Details from "../../components/details/Details";
import DropdownButton from "../../components/selection/DropdownButton";
import Footer from "../../components/footer/Footer";
import {fetchConveyorData} from './QueryTimeInterval'


export const Home = () => {

  
  const axiosPrivate = useAxiosPrivate();

  const [page,setPage]=useState(1);
  const selectedBox = (x) => setPage(x);

  const [device,setDevice]=useState(1);
  const selectDevice = (x) => setDevice(x);
  const [requests, setRequests] =useState(false)
  const [requestsInterval,setRequestsInterval]=useState("Last minute");
  const [range, setRange] = useState([])
  const requestsIntervalSetter =(interval,range)=>
          {
            setRange(range)
            setRequestsInterval(interval);
            
          }
  const [posts, setPosts] = useState([{
    //default values set when server is not responding
    speed_a:0,
    speed_b:0,
    current_a:0,
    current_b:0,
    motor_thermal_a:0,
    motor_thermal_b:0,
    drive_thermal_a:0,
    drive_thermal_b:0,
    tstamp:new Date(),

  }]);
  
  //Api call, server data 
  useEffect (() =>{

    fetchConveyorData(axiosPrivate,requestsInterval,range,setPosts);
    
    const interval = setInterval(() => { 
        setRequests (!requests);
       // console.log(`requested with: ${requestsInterval} `)
      },requestsInterval==="Last minute"?10000:100000);

        
      return () => {
        clearInterval(interval);
      }
    } ,[axiosPrivate,requestsInterval,range,requests])
  
  return (
    <main >
        <Navbar/>
        <div className="max-w-full p-4">
          <h3 className="font-bold p-1">Condition summary</h3>
          <div className="flex bg-orange-100">
            <Selection selectedBox ={selectedBox}/>
      
            <DropdownButton selectDevice ={selectDevice}/>
          </div>
              {
                  page ===2 && <Details posts={posts} device ={device} requestsIntervalSetter ={requestsIntervalSetter} />
                }
                {
                  page ===1 && <Health posts={posts} device={device}/> 
                }
            </div>
        <Footer/>
    
    </main>
  )
}
