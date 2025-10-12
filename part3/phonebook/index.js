require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();
app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', (req, _res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        return JSON.stringify(req.body);
    }
    
    return '';
})

const customFormat = ':method :url :status :res[content-length] - :response-time ms :body';
app.use(morgan(customFormat));


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    })
});

app.get('/', (request, response) => {
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

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(_result => response.status(204).end())
        .catch(error => next(error));
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
    // const duplicatePerson = persons.find(p => p.name === body.name);
    
    // if (duplicatePerson) {
    //     console.log(`Duplicate Name found: ${duplicatePerson.name}`)
    //     return response.status(400).json({ error: "name must be unique" })
    // }
    
    const person = new Person({
        "name": body.name,
        "number": body.number,
    });
    
    person.save().then(savePerson => response.json(savePerson));
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'});
    }
    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening to http://localhost:${PORT}`);
});