const Persons = ({filterPersons, handleDelete}) => {
    return (
        <div>
            {filterPersons.map(person => (
                <p key={person.id}>
                    {person.name} {person.number} 
                    <button onClick={() => handleDelete(person.id)}>delete</button>
                </p>
            ))}
        </div>
    );
};

export default Persons;