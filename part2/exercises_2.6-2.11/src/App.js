import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const addPerson = (event) => {
        console.log('Adding person: ', newName)
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        if (newName === '' || newNumber === '') {
            alert(`Name or number cannot be empty.`)
        } else if (persons.map(person => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook.`)
        } else if (persons.map(person => person.number).includes(newNumber)) {
            alert(`${newNumber} is already added to phonebook.`)
        } else {
            setPersons(persons.concat(newPerson))
        }

        setNewName('')
        setNewNumber('')
    }


    const handleNameInputChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberInputChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterInputChange = (event) => {
        setFilter(event.target.value)
    }


    return (
        <div>
            <h2>Phonebook</h2>

            <Filter handler={handleFilterInputChange} value={filter}/>

            <h3>add a new</h3>
            <PersonForm
              submitForm={addPerson}
              nameHandler={handleNameInputChange}
              numberHandler={handleNumberInputChange}
              nameValue={newName}
              numberValue={newNumber}
            />

            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter}/>
        </div>
    )
}


const Filter = ({handler, value}) => {
    return (
      <div>filter shown with<input onChange={handler} value={value}/></div>
    )
}

const Person = ({name, number}) => {
    return (
      <div>
          {name} {number}
      </div>
    )
}


const Persons = ({persons, filter}) => {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.toLowerCase().includes(filter.toLowerCase()))

    return (
      <div>
          {filtered.map((person, index) => <Person key={index} name={person.name} number={person.number}/>)}
      </div>
    )
}


const PersonForm = ({submitForm, nameHandler, numberHandler, nameValue, numberValue}) => {
    return (
        <form onSubmit={submitForm}>
            <div>name: <input onChange={nameHandler} value={nameValue}/></div>
            <div>number: <input onChange={numberHandler} value={numberValue}/></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}


export default App