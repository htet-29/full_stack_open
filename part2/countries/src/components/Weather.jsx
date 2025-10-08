const Weather = ({weather}) => {
    if (!weather) return null;
    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <p>Temperatures -{weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather;