import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as chartjs} from "chart.js/auto"
import 'chartjs-adapter-date-fns';

function LineChart({lineData, timePeriod,currentTime}) {

  const options ={
          animation: false,
        
          scales: {
            x: {
                type: 'time',
               /*  ticks:{
                  callback:(value,index,ticks) =>{
                    if(timePeriod === 'Last minute') return lineData.labels[index]
                  }
                } */
                
            },
            y: {
              suggestedMin: 1,
              suggestedMax: 2.5,
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