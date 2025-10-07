import { useState, useEffect } from "react";
import phoneBookService from "./services/phoneBook";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [phNumber, setPhNumber] = useState('');
    const [filterWord, setFilterWord] = useState("");
    const [notiMessage, setNotiMessage] = useState(null);

    const hook = () => {
        phoneBookService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            });
    };

    useEffect(hook, []);

    const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filterWord));

    const addName = (event) => {
        event.preventDefault();

        // const isTaken = persons.some((person) => person.name === newPerson.name);
        const person = persons.find(p => p.name === newName);
        if (person) {
            if (window.confirm(
                `${person.name} is already added to phonebook, replace the old number with a new one?`
            )) {
                const updatePerson = { ...person, number: phNumber };
                phoneBookService
                    .update(person.id, updatePerson)
                    .then(returnPerson => {
                        setPersons(persons.map(p => p.id === returnPerson.id ? returnPerson : p));
                        showNotification(`Updated ${updatePerson.name}'s phone number`);
                        setNewName("");
                        setPhNumber("");
                    })
            }
        } else {
            const newPerson = {
                name: newName,
                number: phNumber,
                id: String(persons.length + 1)
            }

            phoneBookService
                .create(newPerson)
                .then(returnPerson => {
                    setPersons(persons.concat(returnPerson));
                    showNotification(`Added ${newPerson.name}`);
                    setNewName("");
                    setPhNumber("");
                })
        }

    };

    const handleDeleteOf = (id) => {
        const person = persons.find(p => p.id === id);

        if (window.confirm(`Delete ${person.name}?`)) {
            phoneBookService.deletePerson(id)
            setPersons(persons.filter(p => p.id !== id));
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setPhNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterWord(event.target.value);
    }

    function showNotification(message) {
        setNotiMessage(message);
        setTimeout(() => {
            setNotiMessage(null);
        }, 5000);
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notiMessage} />
            <Filter filterWord={filterWord} handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm addName={addName} handleNameChange={handleNameChange} newName={newName}
                handleNumberChange={handleNumberChange} phNumber={phNumber}
            />
            <h2>Numbers</h2>
            <Persons filterPersons={filterPersons} handleDelete={handleDeleteOf} />
        </div>
    );
};

export default App;
