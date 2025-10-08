import { useEffect, useState } from "react";
import weatherService from "../services/weather";
import Weather from "./Weather";

const CountryDetail = ({country}) => {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        weatherService
            .getWeatherData(country.capital)
            .then(weatherData => {
                setWeather(weatherData);
            })
            .finally(() => setIsLoading(false));
        
    }, [])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>{country.capital}</p>
            <p>{country.area}</p>
            <div>
                <h2>Languages</h2>
                <ul>
                    {Object.keys(country.languages).map(language => (
                        <li key={language}>{country.languages[language]}</li>
                    ))}
                </ul>
                <img src={country.flags["png"]} alt={`flag of ${country.name.common}`} />
            </div>
            {
                isLoading && !weather
                ? <p>Loading weather data...</p>
                : <Weather weather={weather}/>
            }
        </div>
    )
}

export default CountryDetail;