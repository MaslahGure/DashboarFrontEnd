import LineChart from './LineChart';


function TimeSeriesGraph ({posts, device}) {
  const reversePosts = [...posts].reverse(); // data reversed
  //timeseries:

  const currentTime = new Date();
  const dayAgo =currentTime.setHours(currentTime.getHours()-5)
  const dayAgoData =reversePosts.filter(post=>new Date(post.tstamp).getTime()>dayAgo)
  
  
  let time =[],
  tempMotorA =[],tempMotorB =[],
  driveThermalA =[],driveThermalB =[],
  currentA =[],currentB =[];
  for(let i=0; i<dayAgoData.length;i++){
    time.push(new Date(dayAgoData[i]?.tstamp).getHours() + ':'+new Date(dayAgoData[i]?.tstamp).getMinutes());
    tempMotorA.push(dayAgoData[i]?.motor_thermal_a)
    tempMotorB.push(dayAgoData[i]?.motor_thermal_b)
    driveThermalA.push(dayAgoData[i]?.motor_thermal_a)
    driveThermalB.push(dayAgoData[i]?.motor_thermal_b)
    currentA.push(dayAgoData[i]?.current_a)
    currentB.push(dayAgoData[i]?.current_b)
 
  }
    console.log(time[1],currentA[0],currentB[1],tempMotorA[1],tempMotorB[1])
   // const posts = posts;
  const dataLine1={
    labels:time, // x-axis
      datasets:[
          {
              label:device ===1
              ?"Motor temp a"
              :"Motor temp b",
              data:
                device ===1
                ?tempMotorA
                :tempMotorB
              
             
              , // y-axis
              backgroundColor:["rgba(75,192,11)"]
            }
      ],
      
  };
  const dataLine2={
    labels:time, // x-axis
    datasets:[
        {
            label:device ===1
            ?"drive_thermal_a"
            :"drive_thermal_b"
            ,
            data:
            device ===1 
            ?driveThermalA
            :driveThermalB
            , // y-axis
            backgroundColor:["rgba(75,192,11)"]
          }
    ]
};
  const dataLine3={
    labels:time, // x-axis
    datasets:[
        {
            label:device ===1
            ?"Motor current_a"
            :"Motor current_b"
            ,
            data: 
            device ===1
            ?currentA
            :currentB
            , // y-axis
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