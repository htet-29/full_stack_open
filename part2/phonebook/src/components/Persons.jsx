const Persons = ({filterPersons}) => {
    return (
        <div>
            {filterPersons.map(person => (
                <p key={person.id}>{person.name} {person.phone}</p>
            ))}
        </div>
    );
};

export default Persons;