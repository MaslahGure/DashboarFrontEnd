import AmrSettings  from './AmrSettings'
import TimeSeriesGraph from './TimeseriesGraph'
import "./amr.scss"

export default function Amr({device, posts}) {
  return (
    <section className='amr' >
      <AmrSettings/>
      <TimeSeriesGraph posts ={posts} device ={device}/>
    </section>
  )
}
