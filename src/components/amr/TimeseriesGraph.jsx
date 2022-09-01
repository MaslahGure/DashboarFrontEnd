import LineChart from './LineChart';


function TimeSeriesGraph ({posts, device}) {
  
   // const posts = posts;
  const reversePosts = [...posts].reverse(); // data reversed
  const dataLine1={
    labels:reversePosts.map((post) => post.tstamp.slice(15,19)), // x-axis
      datasets:[
          {
              label:device ===1
              ?"Motor temp a"
              :"Motor temp b",
              data:reversePosts.map((post) => 
             device ===1
               ? post.motor_thermal_a
               :post.motor_thermal_b
              ), // y-axis
              backgroundColor:["rgba(75,192,11)"]
            }
      ],
      
  };
  const dataLine2={
    labels:reversePosts.map((post) => post.tstamp.slice(15,19)), // x-axis
    datasets:[
        {
            label:device ===1
            ?"drive_thermal_a"
            :"drive_thermal_b"
            ,
            data:reversePosts.map((post) => 
            device ===1 
            ?post.drive_thermal_a
            :post.drive_thermal_b
            ), // y-axis
            backgroundColor:["rgba(75,192,11)"]
          }
    ]
};
  const dataLine3={
    labels:reversePosts.map((post) => post.tstamp.slice(15,19)), // x-axis
    datasets:[
        {
            label:device ===1
            ?"Motor current_a"
            :"Motor current_b"
            ,
            data:reversePosts.map((post) => 
            device ===1
            ?post.current_a
            :post.current_b
            ), // y-axis
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