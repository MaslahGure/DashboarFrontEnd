import convImage from "../../img/convBeltImage.svg"
import Oil from "../../img/convOil.svg";
import ProgressBar from "../circularBar/ProgressBar";
import "./health.scss"

export default function Health({device,posts}) {
 const conveyor_health =95;
 const failure= "None"

  return (
    <section className="page-display">
      <div className="conveyor-image">
       <img src={convImage} alt="" />
      </div>
      <div className="conveyor-parts-image">
        <img src={Oil} alt="" className='oil' />
      </div>
      <div className="performance-health">
        <div className="health-of-conveyor">
          <p>Health</p>
          <ProgressBar 
          percentage={conveyor_health}
           unit ={"%"} end ={100} mode={"health"}
           />
          <p >{device===1?"Conv A":"Conv B"}</p>
          </div>
        <div className="conveyor-detail-performance">
          {device===1
          ?posts?.slice(0,1).map((post,index)=>{
            return(
              <ul key ={index}>
                <li> frequency_a <span className='convElement'>{`${post.frequency_a} Hz`}</span></li>
                <li> speed_a <span className='convElement'>{`${post.speed_a} rpm`}</span></li>
                <li> current_a <span className='convElement'>{`${post.current_a} A`}</span></li>
                <li> line_voltage_a <span className='convElement'>{`${post.line_voltage_a} V`}</span></li>
            </ul>
            )
          })
          :posts?.slice(0,1).map((post,index)=>{
            return(
              <ul key ={index}>
                <li> frequency_b <span className='convElement'>{`${post.frequency_b} Hz`}</span></li>
                <li> speed_b <span className='convElement'>{`${post.speed_b} rpm`}</span></li>
                <li> current_b <span className='convElement'>{`${post.current_b} A`}</span></li>
                <li> line_voltage_b <span className='convElement'>{`${post.line_voltage_b} V`}</span></li>
            </ul>
            )
          })} 
          </div>
          <div className="expected-failure">
            <ul>
              <li>
                Expected Failure <span>{failure}</span>
              </li>
            </ul>
          </div>

      </div>
    </section>
    
  )
}
