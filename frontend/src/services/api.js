import config from "@/config/config";
import axios from "axios";


export const registerUser = async (data) => {
    const res = await axios.post(`${config.BACKEND_PORT}/register`,data);
    return res;
};
export const verifyUser = async (data) =>{
    const res = await axios.post(`${config.BACKEND_PORT}/verify`, data);
    return res;
}
export const loginUser = async (data) => {
    const res = await axios.post(`${config.BACKEND_PORT}/login`, data);
    return res;
};
export const getDashboardData = async(data) =>{
    const res = await axios.get(`${config.BACKEND_PORT}/login`, )
}