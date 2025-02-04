import { HOST }  from '@/Utils/constants';
//changed from '' to ""
import  axios  from "axios";


const apiClient = axios.create({
   //added coma
    baseURL: HOST,
    headers: {
        "Content-Type": "application/json",
        
      },
});


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  export default apiClient