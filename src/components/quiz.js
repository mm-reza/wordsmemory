"use client"
import { useRef, useState } from 'react'

export default function Quiz() {
  
  const [people, setPeople] = useState([
    { english: 'Hello', french: 'Bonjour' },
    { english: 'Goodbye', french: 'Au revoir' },
    { english: 'Yes', french: 'Oui' },
    { english: 'No', french: 'Non' },
  ])

  const dragPerson = useRef(0)
  const draggedOverPerson = useRef(0)

  function handleSort() {
    const peopleClone = [...people]
    const temp = peopleClone[dragPerson.current]
    peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current]
    peopleClone[draggedOverPerson.current] = temp
    setPeople(peopleClone)
    console.log(temp);
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4">
      <h1 className="text-xl font-bold mt-4">List</h1>
      {people.map((person, index) => (
        <div className="relative flex space-x-3 border rounded p-2 bg-gray-100"
          draggable
          onDragStart={() => (dragPerson.current = index)}
          onDragEnter={() => (draggedOverPerson.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>{person.french}</p>
        </div>
      ))}
    </main>
  )
}