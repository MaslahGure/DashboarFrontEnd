import DetailPageElements from './DetailPageElements'
import Amr from "../amr/Amr";
import "./details.scss"


export default function Details({posts,device}) {
  let post = posts[0];
  
  return (
    <section className='page-display page-detail'>
      { device===1
        ? 
        <DetailPageElements 
            mileage ={((post.speed_a*posts.length)/60).toFixed(1)}
            speed ={post.speed_a}
            current= {post.current_a}
            motor_temp= {post.motor_thermal_a}
            inverter_temp={post.drive_thermal_a}
            device ={1}
          />
        :<DetailPageElements 
            mileage ={((post?.speed_b*posts.length)/60).toFixed(1)}
            speed ={post.speed_b}
            current= {post.current_b}
            motor_temp= {post.motor_thermal_b}
            inverter_temp={post.drive_thermal_b}
            device ={2}
          />
      }
      {
        device === 1
        ? <Amr device={1} posts ={posts}/>
        :<Amr device={2} posts ={posts}/>
      }
      
    </section>
  )
}
