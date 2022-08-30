import React from 'react'
import LineChart from './LineChart';



function TimeSeriesGraph ({posts, device}) {
  
   // const posts = posts;
  const reversePosts = [...posts].reverse(); // data reversed
  const dataLine1={
    labels:reversePosts.map((post) => post.tstamp.slice(15,19)), // x-axis
      datasets:[
          {
              label:"Motor temp a",
              data:reversePosts.map((post) => post.motor_thermal_a), // y-axis
              backgroundColor:["rgba(75,192,11)"]
            }
      ],
      
  };
  const dataLine2={
    labels:reversePosts.map((post) => post.tstamp.slice(15,19)), // x-axis
    datasets:[
        {
            label:"drive_thermal_a",
            data:reversePosts.map((post) => post.drive_thermal_a), // y-axis
            backgroundColor:["rgba(75,192,11)"]
          }
    ]
};
  const dataLine3={
    labels:reversePosts.map((post) => post.tstamp.slice(15,19)), // x-axis
    datasets:[
        {
            label:"Motor current_a",
            data:reversePosts.map((post) => post.current_a), // y-axis
            backgroundColor:["rgba(75,192,11)"],
            
          }
    ]
};
  
    return (
    <section className='timeSeriesGraph'>
          <LineChart lineData = {dataLine1} className="lineChart"/>
          <LineChart lineData = {dataLine2} className="lineChart"/>
          <LineChart lineData = {dataLine3} className="lineChart"/>
    </section>
  )
}

export default TimeSeriesGraph