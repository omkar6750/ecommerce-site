import { HOST } from '@/Utils/constants';
import axios from "axios";


const apiClient = axios.create({
    baseURL: HOST,
});


export default apiClient