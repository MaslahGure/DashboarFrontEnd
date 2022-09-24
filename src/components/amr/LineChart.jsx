import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as chartjs} from "chart.js/auto"
import 'chartjs-adapter-date-fns';

function LineChart({lineData, timePeriod,time}) {

  const timeFrame ={
    "Last minute":"minute",
    'Last hour':'hour',
    'Last 3 hours':'day',
    'Last day':'day',
    'Custom':'day',
  }
  const StepSize ={
    "Last minute":1,
    'Last hour':2,
    'Last 3 hours':5,
    'Last day':5,
    'Custom':5,
  }
  
  
  const options ={
          animation: false,
          tension:1,
          scales: {
            x: {
                parsing:false,
                offset:false,
                type: 'timeseries',
                time:{
                 unit:timeFrame[timePeriod]??'day',
                  stepSize:StepSize[timePeriod]??1,
                 /*  displayFormats: {
                     'day': 'dd'
                  } */
                },
                ticks:{
                  major:{
                    enabled:false
                  },
                 /*  font: (context)=>{
                    const boldedTicks = context.tick && context.tick.major? 'bold':'';
                    return{weight:boldedTicks}
                  }  */
                  /* callback:(value,index,ticks) =>{
                    if(timePeriod === 'Last minute') return lineData.labels[index]
                  } */
                }
                
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