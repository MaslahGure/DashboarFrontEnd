import React from 'react'
import "./progressBar.scss"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressBar({percentage, unit, end,mode}) {

  const progressValue = (percentage*100)/end;
    const changeColor =() =>{ 
      if(mode !=="health"){ 
        // with health at 100% color green is displayed
          if(progressValue<=70)
              return `rgb(${0},${255}, 0)`
          else if(progressValue>70 && progressValue<85) 
              return `rgb(${255},${255}, 0)`
          else 
              return `rgb(${255},${0}, 0)`
          }
        else
          {
            if(progressValue>=80)
                return `rgb(${0},${255}, 0)`
            else if(progressValue>=70 && progressValue<80) 
                return `rgb(${255},${255}, 0)`
            else 
                return `rgb(${255},${0}, 0)`
      }

    }
      
  return (
    <div className='progressBar'>
        <CircularProgressbar
        value={progressValue}
        text={`${percentage} ${unit}`}
        circleRatio= {0.7}
        styles ={{
          trail:{
            strokeLinecap:"butt",
            transform:"rotate(-126deg)",
            transformOrigin:"center center"
          },
          path:{
            strokeLinecap:"butt",
            transform:"rotate(-126deg)",
            transformOrigin:"center center",
            stroke:changeColor(),
            transition:0.5
          },
          text:{
            fill:"rgb(0,255,0)",
            fontSize:"14px",

          },
        }}
        strokeWidth ={10}
      />
    </div>
  )
}
