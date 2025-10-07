const CountryDetail = ({country}) => {
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
        </div>
    )
}

export default CountryDetail;