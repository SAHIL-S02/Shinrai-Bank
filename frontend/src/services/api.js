import config from "@/config/config";
import api from "./axiosInstance";

export const registerUser = async (data) => {
    const res = await api.post(`/api/auth/register`, data);
    return res;
};
export const verifyUser = async (data) =>{
    const res = await api.post(`/api/auth/verify`, data);
    return res;
}
export const loginUser = async (data) => {
    const res = await api.post(`/api/auth/login`, data, { withCredentials: true });
    return res;
};
export const getDashboardData = async() =>{
    // No need to pass accessToken — the interceptor attaches it automatically
    const res = await api.get(`/api/auth/get-dashboardData`);
    return res;
};
export const sendMoney = async (reciverPhoneNumber, amount, password) =>{
    if(!reciverPhoneNumber){
        return new Error("Recever not given ");
    }
    if(!amount){
        return new Error("Amount not given");
    }
    const res = await api.post(`/api/auth/send-money`,{reciverPhoneNumber, amount:amount, password});
    return res;
}
export const getTransactions = async(pageNo) => {
    if(!pageNo){
        return new Error("Page No not found");
    }
    const res = await api.get(`/api/auth/transactions?page=${pageNo}&limit=10`);
    return res;
}
export const checkBalance = async(password) =>{
    if(!password){
        return new Error("Password not found");
    }
    const res = await api.post(`/api/auth/check-balance`, {password});
    return res;
}