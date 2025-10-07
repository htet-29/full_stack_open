import { useState, useEffect} from "react";
import countryService from "./services/country";
import Countries from "./components/Countries";

const App = () => {
    const [countries, setCountries] = useState(null);
    const [filterCountries, setFilterCountries] = useState(null);

    const hook = () => {
        countryService 
            .getAll()
            .then(initialCountries => {
                setCountries(initialCountries);
            })
    }
    
    useEffect(hook, []);
    
    const handleChange = (event) => {
        const value = event.target.value.toLowerCase();
        const filtered = countries.filter((c) => c.name.official.toLowerCase().includes(value));
        setFilterCountries(filtered);
    }

    return (
        <div>
            { !countries 
                ? <p>Loading...</p> 
                : <>
                    <div>
                        find countries <input onChange={handleChange} type="text" />
                    </div>
                    <div>
                        {
                            filterCountries && <Countries countries={filterCountries}/>  
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default App;