import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as chartjs} from "chart.js/auto"

function LineChart({lineData}) {
  const options ={
      scales: {
          y: {
              beginAtZero: true,
              ticks:{
                stepSize:20
              }
              
          },
          x: {
             beginAtZero:true,
              ticks:{
                stepSize:2
              }
              
          }
      }

  }
 
  return (
        <Line 
        data={lineData}
        width={"700px"}

        options ={options}
        
        />
  )
}

export default LineChart