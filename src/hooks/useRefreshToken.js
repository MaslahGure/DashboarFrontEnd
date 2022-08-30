import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const refresh =async () =>{
        const response = await axios.get("/refresh",{
            withCredentials: true
        });
        setAuth(prev =>{

            return {...prev,
                accessToken: response.data.accessToken,
                username:response.data.username,
                email:response.data.email,
                userId:response.data.userId,
                photoUrl: response.data.photoUrl
                }

        });
        return response.data.accessToken;
    }
  return refresh;

}

export default useRefreshToken