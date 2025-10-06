import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", phone: '040-123456', id: 1 },
        { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
    ]);
    const [newName, setNewName] = useState("");
    const [phNumber, setPhNumber] = useState('');
    const [filterWord, setFilterWord] = useState("");
    
    const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filterWord));

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setPhNumber(event.target.value);
    };
    
    const handleFilterChange = (event) => {
        setFilterWord(event.target.value);
    }

    const addName = (event) => {
        event.preventDefault();
        const nameObj = {
            name: newName,
            phone: phNumber,
            id: persons.length + 1,
        };

        const isTaken = persons.some((person) => person.name === nameObj.name);
        if (isTaken) {
            alert(`${nameObj.name} is already added to phonebook`);
            return;
        }
        setPersons(persons.concat(nameObj));
        setNewName("");
        setPhNumber("");
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter show with <input value={filterWord} onChange={handleFilterChange}/>
            </div>
            <h2>Add a new</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>
                <div>
                    number: <input onChange={handleNumberChange} value={phNumber} />
                </div>
                <div>debug: {newName}</div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {filterPersons.map(person => (
                <p key={person.id}>{person.name} {person.phone}</p>
            ))}
        </div>
    );
};

export default App;
