import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as chartjs} from "chart.js/auto"

function LineChart({lineData}) {
  const currentTime = new Date();
  const dayAgo =currentTime.setDate(currentTime.getDate()-5)
  const options ={
      scales: {
          y: {
              beginAtZero: true,
             
              ticks:{
                //stepSize:20,
                //type:'timeseries'
              }
              
          },
          x: {
             //beginAtZero:true,
             
              //min:dayAgo
              
          }
      }
        

  }
// console.log(dayAgo)
  return (
        <Line 
        data={lineData}
        width={"700px"}

        options ={options}
        
        />
  )
}

export default LineChart