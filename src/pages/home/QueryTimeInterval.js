const getTimeInterval = async(requestsInterval,range)=>{

    const currentTime = new Date();
    const queryTime ={
        startDate:new Date(),
        endDate:new Date()
    }
    if(requestsInterval==="Last minute") {
         queryTime.startDate =new Date(currentTime.setMinutes(currentTime.getMinutes()-1))
         return queryTime;
        }
    else if(requestsInterval==="Last hour") {
        queryTime.startDate=new Date(currentTime.setHours(currentTime.getHours()-1))
        return queryTime;    
    }
    else if(requestsInterval==="Last 3 hours"){
        queryTime.startDate= new Date(currentTime.setHours(currentTime.getHours()-3))
        return queryTime;
    }
    else if(requestsInterval==="Last day"){
        queryTime.startDate= new Date(currentTime.setHours(currentTime.getHours()-24))
        return queryTime;
    }
    else if(requestsInterval==="Custom"){
        queryTime.startDate= range[0].startDate;
        queryTime.endDate =range[0].endDate
        return queryTime;
    }
    else return queryTime;
}


const fetchConveyorData =async(axiosPrivate,requestsInterval,range,setPosts)=>{

    const queryTime = await getTimeInterval(requestsInterval,range)
    try {
        const response = await axiosPrivate.post('/convdata',
        JSON.stringify({queryTime}),
        {
            headers:{"Content-Type":"application/json"},
            withCredentials: true
        }
      );
      
        response.data.length !==0?setPosts(response.data):setPosts([{ 
            speed_a:0,
            speed_b:0,
            current_a:0,
            current_b:0,
            motor_thermal_a:0,
            motor_thermal_b:0,
            drive_thermal_a:0,
            drive_thermal_b:0,
            tstamp:new Date(),}]);
      } catch (error) {
       return;
      }
}


export {
    getTimeInterval,
    fetchConveyorData
};

