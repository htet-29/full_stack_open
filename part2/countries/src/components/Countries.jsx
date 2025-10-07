import CountryDetail from "./CountryDetail";

const Countries = ({countries}) => {

    if (!countries) return null;

    const count = countries.length;

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
                    <p key={f.name.common}>{f.name.common}</p>
                ))}
            </div>
        );
    }

    // if only one match
    return (
        <CountryDetail country={countries[0]}/>
    )
}

export default Countries;