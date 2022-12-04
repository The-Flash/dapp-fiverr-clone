import axios from "axios";

export const diggAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CLIENT_URL as string,
});