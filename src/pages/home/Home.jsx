import "./home.scss"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Selection from "../../components/selection/SelectionButtons";
import Health from "../../components/health/Health";
import Details from "../../components/details/Details";
import DropdownButton from "../../components/selection/DropdownButton";
import Footer from "../../components/footer/Footer";



export const Home = () => {
  
  const axiosPrivate = useAxiosPrivate();

  const [page,setPage]=useState(1);
  const selectedBox = (x) => setPage(x);

  const [device,setDevice]=useState(1);
  const selectDevice = (x) => setDevice(x);
  const [requests, setRequests] =useState(false)

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

  }]);
  
  //Api call, server data 
  useEffect (() =>{
    let isMounted =true;
    const controller =new AbortController();
     const getConvData = async()=>{

      try {
        const response = await axiosPrivate.get('/convdata', {
          signal: controller.signal
      });
        isMounted && setPosts(response.data);
        //console.log(response.data);
      } catch (error) {
        //console.log(error);
      }
    }

     getConvData();

     const interval = setInterval(() => {
        setRequests (!requests);

      }, 10000);

          
      return () => {
        isMounted =false;
        controller.abort();
        clearInterval(interval);
      }
    } ,[axiosPrivate,requests])
  
  return (
    <main >
        <Navbar/>
        <div className="home-page">
          <h3 className="title">Condition summary</h3>
          <div className="options">
            <Selection selectedBox ={selectedBox}/>
      
            <DropdownButton selectDevice ={selectDevice}/>
          </div>
              {
                  page ===2 && <Details posts={posts} device ={device} />
                }
                {
                  page ===1 && <Health posts={posts} device={device}/> 
                }
            </div>
        <Footer/>
    
    </main>
  )
}
