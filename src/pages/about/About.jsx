import "./about.scss"
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"

const About = () => {
  const {auth} =useAuth();
  const axiosPrivate =useAxiosPrivate();

  const email = auth.email;
  const database = auth.database;
  const tablename = auth.tablename;

  const handleClick =async(e)=>{
    e.preventDefault();
   
    console.log(email,database,tablename)
    
    try {
      const response = await axiosPrivate.post("/client-data",
       JSON.stringify({database,tablename, email}),
       {
           withCredentials: true
       }
   );
   console.log(response.data)
   
  }

     
   catch(err){
      console.log(err)
  }

  }
  return (
    <section className="about-page">
        <Navbar />
        <div className="about-page-content flex-col">
            <p>
                One stop solution for AI and Data Analysis
            </p>
            <button onClick={handleClick}
            
            className ="p-4 m-4 border border-sky-500 bg-green-500 text-sm font-thin text-center">Try</button>
        </div>
        <Footer/>
    </section>
  )
}

export default About