import EachConvHealth from './EachConvHealth'


export default function Health({device,posts}) {
 let post =posts[0];

  return (
    device ===1 && device !==3
    ? <EachConvHealth 
        mileage ={((post.speed_a*posts.length)/60).toFixed(1)}
        speed ={post.speed_a}
        current= {post.current_a}
        motor_temp= {post.motor_thermal_a}
        inverter_temp={post.drive_thermal_a}
        device ={1}
       />
    :<EachConvHealth 
        mileage ={((post.speed_b*posts.length)/60).toFixed(1)}
        speed ={post.speed_b}
        current= {post.current_b}
        motor_temp= {post.motor_thermal_b}
        inverter_temp={post.drive_thermal_b}
        device ={2}
      />
    
  )
}
