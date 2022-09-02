import "./about.scss"
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'

const About = () => {
  return (
    <section className="about-page">
        <Navbar />
        <div className="about-page-content">
            <p>
                One stop solution for AI and Data Analysis
            </p>
        </div>
        <Footer/>
    </section>
  )
}

export default About