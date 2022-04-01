import axios from 'axios';
require("dotenv").config({ path: 'C:\Users\JoshG\Downloads\SerendipityFinal\client\.env' })


console.log(process.env.URL)

export const fetchWeather = async (query) => {
    const { data } = await axios.get(process.env.URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: process.env.API_KEY
        }
    });

    return data;

}