import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as chartjs} from "chart.js/auto"
import 'chartjs-adapter-date-fns';

function LineChart({lineData}) {
  const options ={
        
    //parsing: false,
          scales: {
            x: {
                type: 'time',
                
            },
            y: {
              suggestedMin: 1,
              suggestedMax: 2.5,
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