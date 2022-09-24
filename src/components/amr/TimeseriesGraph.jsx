import LineChart from './LineChart';



function TimeSeriesGraph ({posts, device, timePeriod,range}) {
  
  let data =[];
  posts.length>2?data =posts: data=[]
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
              backgroundColor:["rgba(75,192,11)"],
              
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
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
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
          <LineChart lineData = {dataLine1} timePeriod={timePeriod} time ={time} className="lineChart"/>
          <LineChart lineData = {dataLine2} timePeriod={timePeriod} time ={time} className="lineChart"/>
          <LineChart lineData = {dataLine3} timePeriod={timePeriod} time ={time} className="lineChart"/>
    </section>
  )
}

export default TimeSeriesGraph