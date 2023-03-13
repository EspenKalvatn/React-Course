import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

  console.log('persons', persons)

  useEffect( () => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])


  const randomID = () => {
    return Math.floor(Math.random() * 10000) + 1
  }

    const addPerson = (event) => {
        console.log('Adding person: ', newName)
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber,
            id: randomID()
        }

        const existingPerson = persons.find(person => person.name === newName)

        if (existingPerson) {
          window.confirm(`${newName} is already added to phonebook.`)
          const updatedPerson = {...existingPerson, number: newNumber}
          personService
            .update(existingPerson.id, updatedPerson)
            .then(returnedPerson => {
              const updatedPerson = persons.map(person => person.id === returnedPerson.id ? returnedPerson : person)
              setPersons(updatedPerson)
            })
        } else {
            personService
            .create(newPerson)
              .then(returnedPerson => {
                console.log(returnedPerson)
                setPersons(persons.concat(returnedPerson))
              })
        }

        setNewName('')
        setNewNumber('')
    }

    const removePerson = (id) => {
      console.log(`Deleting person with id ${id}`)
      personService
        .remove(id)
        .then( () => {
          setPersons(persons.filter(person => person.id !== id))
        })
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
            <Persons persons={persons} filter={filter} deleteHandler={removePerson}/>
        </div>
    )
}


const Filter = ({handler, value}) => {
    return (
      <div>filter shown with<input onChange={handler} value={value}/></div>
    )
}

const Person = ({person, deleteHandler}) => {
    return (
      <div>
        {person.name} {person.number} {<button onClick={ () => deleteHandler(person.id) }>delete</button>}
      </div>
    )
}


const Persons = ({persons, filter, deleteHandler}) => {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.toLowerCase().includes(filter.toLowerCase()))

    return (
      <div>
          {filtered.map((person, index) => <Person key={index} person={person} deleteHandler={deleteHandler}/>)}
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