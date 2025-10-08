import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric'

const getWeatherData = (city_name) => {
    const request = axios.get(`${baseURL}&q=${city_name}&appid=${api_key}`);
    return request.then(response => response.data);
}

export default { getWeatherData };