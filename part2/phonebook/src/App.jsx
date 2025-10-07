import { useState, useEffect } from "react";
import phoneBookService from "./services/phoneBook";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [phNumber, setPhNumber] = useState('');
    const [filterWord, setFilterWord] = useState("");
    
    const hook = () => {
        console.log('effect');
        phoneBookService
            .getAll()
            .then(initialPersons => {
                console.log('promise fullfilled');
                setPersons(initialPersons);
            });
    };

    useEffect(hook, []);
    
    console.log('render', persons.length, 'persons');

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
        const newPerson = {
            name: newName,
            number: phNumber,
            id: persons.length + 1,
        };

        const isTaken = persons.some((person) => person.name === newPerson.name);
        if (isTaken) {
            alert(`${newPerson.name} is already added to phonebook`);
            return;
        }
        
        phoneBookService
            .create(newPerson)
            .then(returnPerson => {
                setPersons(persons.concat(returnPerson));
                setNewName("");
                setPhNumber("");
            })
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterWord={filterWord} handleFilterChange={handleFilterChange}/>
            <h2>Add a new</h2>
            <PersonForm addName={addName} handleNameChange={handleNameChange} newName={newName} 
                handleNumberChange={handleNumberChange} phNumber={phNumber}
            />
            <h2>Numbers</h2>
            <Persons filterPersons={filterPersons}/>
        </div>
    );
};

export default App;
