const express = require('express');

const app = express();
app.use(express.json());

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const time = new Date();
    const entries = persons.length;
    const content = `
        <p>Phonebook has info for ${entries} people</p>
        <p>${time.toString()}</p>
    `;
    response.send(content);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(p => p.id !== id);
    
    response.status(204).end();
});

const generateId = () => {
    const min = persons.length;
    const max = 1000;
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    return String(id);
}
app.post('/api/persons', (request, response) => {
    const body = request.body;
    
    if (!body.name || !body.number) {
        return response.status(400).json({ error: "missing name or number" })
    }
    const duplicatePerson = persons.find(p => p.name === body.name);
    
    if (duplicatePerson) {
        console.log(`Duplicate Name found: ${duplicatePerson.name}`)
        return response.status(400).json({ error: "name must be unique" })
    }
    
    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number,
    };
    
    persons = persons.concat(person);
    response.json(persons);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is listening to http://localhost:${PORT}`);
})