import React from 'react'
import "./health.scss"
import ProgressBar from '../circularBar/ProgressBar'
import { faBoxesPacking} from "@fortawesome/free-solid-svg-icons";
import  {FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EachConvHealth = ({mileage,speed,current,motor_temp,inverter_temp,device}) => {

    return (
    <section className='health'>
      <div className="health-title">
          <FontAwesomeIcon icon={faBoxesPacking}/>
          <h5>General/whitey_conv{device}</h5>
      </div>
      <div className="millage-speed">
          <div className="millage">
            <p className='progressBar-title-mileage '>Mileage</p>
            <span className='Mileage-value'>{`${mileage} m`}</span>
          </div>
          <div className="speed">
            <p className='progressBar-description '>speed</p>
            <ProgressBar percentage={speed}  unit ={"m/s"} end ={1500}  mode= {"normal"}/>
          </div>
      </div>
      <div className="temp-current">
          <div className="temp">
            <div className='temp-element'>
              <ProgressBar percentage={inverter_temp}  unit ={"\xB0C"}end ={100} mode= {"normal"}/>
              <p className='progressBar-description '>temp _i</p>
            </div> 
            <p className='progressBar-title '>Motor temp</p>
            <div className='temp-element'>
              <ProgressBar percentage={motor_temp}  unit ={"\xB0C"}end ={100} mode={"normal"}/>
              <p className='progressBar-description '>temp_r</p>
            </div>
          </div>
          <div className="current">
            <p className='progressBar-title '>Motor current</p>
          <ProgressBar percentage={current*1000} unit ={"mA"} end ={1700} mode={"normal"}/>
        </div>
      </div>

      
    </section>
  )
}

export default EachConvHealth