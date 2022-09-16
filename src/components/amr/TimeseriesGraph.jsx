import LineChart from './LineChart';



function TimeSeriesGraph ({posts, device, timePeriod,range}) {
  
  //data pre-processing
  const reversePosts = [...posts].reverse(); // data reversed
  const currentTime = new Date();
  //time period selection
  let relativeTime =0;
  if(timePeriod === 'Last minute'){
    relativeTime =currentTime.setMinutes(currentTime.getMinutes()-1)
  }
  else if(timePeriod ==='Last hour'){
    relativeTime =currentTime.setHours(currentTime.getHours()-1)
  }
  else if(timePeriod==='Last 3 hours'){
    relativeTime =currentTime.setHours(currentTime.getHours()-3) 
  }
  else if(timePeriod==='Last day'){
    relativeTime =currentTime.setHours(currentTime.getHours()-24)
  }
  else if(timePeriod==='Custom'){
    relativeTime =currentTime.setMinutes(currentTime.getMinutes()-1)
  }
  else{
    relativeTime =currentTime.setMinutes(currentTime.getMinutes()-1)
  }

 
  let data =[]
  timePeriod ==='Custom'?data=reversePosts.filter(post=>(new Date(post.tstamp).getTime()>range[0]?.startDate.getTime() && new Date(post.tstamp).getTime()<range[0]?.endDate.getTime()))
                        :data=reversePosts.filter(post=>new Date(post.tstamp).getTime()>relativeTime);
  
  let time =[],
  tempMotorA =[],tempMotorB =[],
  driveThermalA =[],driveThermalB =[],
  currentA =[],currentB =[];
  for(let i=0; i<data.length;i++){
    time.push(new Date(data[i]?.tstamp));
    tempMotorA.push(data[i]?.motor_thermal_a)
    tempMotorB.push(data[i]?.motor_thermal_b)
    driveThermalA.push(data[i]?.drive_thermal_a)
    driveThermalB.push(data[i]?.drive_thermal_b)
    currentA.push(data[i]?.current_a)
    currentB.push(data[i]?.current_b)
 
  }
    //console.log(time[1],currentA[0],currentB[1],tempMotorA[1],tempMotorB[1])
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
                :tempMotorB, // y-axis
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