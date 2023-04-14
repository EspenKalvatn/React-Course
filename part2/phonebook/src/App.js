import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)


  useEffect( () => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const changeMessage = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 3000)
  }


    const addPerson = (event) => {
      event.preventDefault()
      const newPerson = {
          name: newName,
          number: newNumber,
      }

      const existingPerson = persons.find(person => person.name === newName)

      if (existingPerson) {
        const updatedPerson = {...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            const updatedPerson = persons.map(person => person.id === returnedPerson.id ? returnedPerson : person)
            setPersons(updatedPerson)
          })
          .catch(error => {
            console.log(error.response.data.error)
            changeMessage(error.response.data.error, 'error')
          })

        changeMessage(`Number is updated.`, 'success')

      } else {
          personService
          .create(newPerson)
            .then(returnedPerson => {
              console.log(returnedPerson)
              setPersons(persons.concat(returnedPerson))
              changeMessage(`Added ${newPerson.name}.`, 'success')
            })
            .catch(error => {
              console.log(error.response.data.error)
              changeMessage(error.response.data.error, 'error')
            })
      }

      setNewName('')
      setNewNumber('')
    }

    const removePerson = (id) => {
      const personToRemove = persons.find(person => person.id === id)
      console.log(`Deleting ${personToRemove.name}`)

      personService
        .remove(id)
        .then( () => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log('Removing person failed:', error.message)
          changeMessage(`Information of ${personToRemove.name} has already been removed from server`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        })
      changeMessage(`Information of ${personToRemove.name} has been removed from the server`, 'success')
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
          <Notification message={message} type={messageType}/>

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

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}


export default App