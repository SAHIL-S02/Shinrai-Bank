import config from "@/config/config";
import axios from "axios";
import { AccessTokenContextInfo } from "@/contexts/AccessTokenContext";
import { useContext} from "react";

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
export const getDashboardData = async(accessToken) =>{
    if(!accessToken){
        return new Error("accessToken not found");
    }
    const res = await axios.get(`${config.BACKEND_PORT}/get-dashboardData`, {headers:{Authorization: `Bearer ${accessToken}`}});
    return res;
};
export const sendMoney = async (accessToken, reciverPhoneNumber, amount, password) =>{
    if(!accessToken){
        return new Error("accessToken not found");
    }
    if(!reciverPhoneNumber){
        return new Error("Recever not given ");
    }
    if(!amount){
        return new Error("Amount not given");
    }
    const res = await axios.post(`${config.BACKEND_PORT}/send-money`,{reciverPhoneNumber, amount:amount, password}, {headers:{Authorization: `Bearer ${accessToken}`}});
    return res;
}
export const getTransactions = async(pageNo, accessToken) => {
    if(!accessToken){
        return new Error("accessToken not found");
    }
    if(!pageNo){
        return new Error("Page No not found");
    }
    const res = await axios.get(`${config.BACKEND_PORT}/transactions?page=${pageNo}&limit=10`, {headers:{Authorization:`Bearer ${accessToken}`}});
    return res;
}
export const checkBalance = async(accessToken, password) =>{
    if(!accessToken){
        return new Error("accessToken not found");
    }
    if(!password){
        return new Error("Password not found");
    }
    const res = await axios.post(`${config.BACKEND_PORT}/check-balance`, {password}, {headers:{Authorization:`Bearer ${accessToken}`}});
    return res;
}