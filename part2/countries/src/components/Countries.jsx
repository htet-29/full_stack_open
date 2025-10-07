import CountryDetail from "./CountryDetail";
import countryService from "../services/country";
import { useEffect, useState } from "react";

const Countries = ({countries}) => {
    const [country, setCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const count = countries.length;

    const showDetail = (name) => {
        setIsLoading(true);
        setCountry(null)
        countryService
            .getCountryDetail(name)
            .then(returnCountry => {
                setCountry(returnCountry);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        if (count === 1 && countries[0]) {
            showDetail(countries[0].name.common);
        } else if (count > 1 || count === 0) {
            setCountry(null);
        }
    }, [count, countries]);

    const renderContent = () => {
        if (country) {
            return <CountryDetail country={country}/> 
        }

        if (isLoading) return <p>Loading...</p>
        // if there is no match
        if (count === 0) return <p>No matched found!</p>;
        
        // if there are more than 10 matches
        if (count > 10) {
            return <p>Too many matches, specify another filter</p>
        }
        
        // if less than 10 or more than one matches
        if (count > 1 && count <= 10) {
            return (
                <div>
                    {countries.map((f) => (
                        <p key={f.name.common}>
                            {f.name.common}  
                            <button onClick={() => showDetail(f.name.common)}>show</button>
                        </p>
                    ))}
                </div>
            );
        }
    }
    
    return renderContent();
}

export default Countries;