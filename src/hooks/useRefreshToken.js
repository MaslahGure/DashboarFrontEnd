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
                userId:response.data.id,
                photourl: response.data.photourl,
                database: response.data.database,
                tablename: response.data.tablename,
                role: response.data.role,
                }

        });
        return response.data.accessToken;
    }
  return refresh;

}

export default useRefreshToken