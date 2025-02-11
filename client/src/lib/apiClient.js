import { HOST }  from '@/Utils/constants';
//changed from '' to ""
import  axios  from "axios";


const apiClient = axios.create({
   //added coma
    baseURL: HOST,
    withCredentials:true
});


export default apiClient