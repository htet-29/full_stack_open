import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", phone: '040-123456', id: 1 },
    ]);
    const [newName, setNewName] = useState("");
    const [phNumber, setPhNumber] = useState('');

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setPhNumber(event.target.value);
    }

    const addName = (event) => {
        event.preventDefault();
        const nameObj = {
            name: newName,
            phone: phNumber
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
            {persons.map(person => (
                <p>{person.name} {person.phone}</p>
            ))}
        </div>
    );
};

export default App;
