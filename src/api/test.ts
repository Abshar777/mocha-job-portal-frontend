"use client"
import axios from "axios";


export const test = async () => {
    const { data: { data, token } } = (await axios.get(`https://test-51mb.onrender.com/api/check-cookie`, {
        withCredentials: true,
    }));
    console.log(data, token,"🌊🌊🌊🌊🌊🌊🌊");
    return { data, token }

}