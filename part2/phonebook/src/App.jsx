import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/personForm'
import PersonService from './services/PersonService'
import Notification from './components/Notification'
import './index.css'

function App(props) {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')


  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNoChange = (event) => setNumber(event.target.value)

  const effectHook = () => {
    PersonService.getAll()
      .then((response) => {
        setPersons(response)
      })
      .catch(() => {
        console.log('error on data retrieval')
      })
  }

  useEffect(effectHook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (newName !== '') {
      const foundPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
      const person = {
        number: newNumber,
        name: newName
      }

      if (foundPerson === undefined) {
        PersonService.add(person)
          .then((response) => {
            setPersons(persons.concat(response))
            setNewName('')
            setNumber('')
            showMessage("success", `Added ${response.name}`)
          })
          .catch(error => {
            showMessage('error',error.response.data.error)
          })
      }
      else {
        const shouldModify = window.confirm(`${newName} is already added to phonebook, repace the old number with the new one?`)
        if (shouldModify) {
          foundPerson.number = newNumber
          PersonService.update(foundPerson)
            .then(response => {
              const newPersons = persons.map(element => (element.id === response.id ? response : element))
              setPersons(newPersons)
              showMessage("success", `Modified ${response.name}`)
            })
            .catch(error => {
              console.log('error on updating')
            })
        }
      }
    }
  }

  const handleSearch = (event) => {
    event != undefined && setSearchText(event.target.value)
  }

  const deletePerson = (person) => {
    const confirmation = window.confirm(`Delete ${person.name}?`)
    if (confirmation) {
      PersonService.remove(person.id)
        .then(response => {
          setPersons(persons.filter(item => item.id !== person.id))
        })
        .catch(error => {
          showMessage("error", `Information of ${person.name} has already been removed from the server`)
        })
    }
  }

  const showMessage = (messageType, message) => {
    setMessageType(messageType)
    setMessage(message)
    setTimeout(() => {
              setMessage(null)
            }, 3000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={messageType} message={message}></Notification>
      <Filter searchText={searchText} handleSearch={handleSearch}></Filter>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} handleNameChange={handleNameChange}
        newName={newName} newNumber={newNumber} handleNoChange={handleNoChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} searchText={searchText} onDelete={deletePerson}></Persons>
    </div>
  )
}

export default App