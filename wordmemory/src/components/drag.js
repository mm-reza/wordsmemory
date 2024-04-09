"use client"
import { useRef, useState } from 'react'

export default function Darg() {
  const [people, setPeople] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Max Walters' },
    { id: 3, name: 'Adam Smith' },
    { id: 4, name: 'Tom Johnson' },
  ])

  const dragPerson = useRef(0)
  const draggedOverPerson = useRef(0)

  function handleSort() {
    const peopleClone = [...people]
    const temp = peopleClone[dragPerson.current]
    peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current]
    peopleClone[draggedOverPerson.current] = temp
    setPeople(peopleClone)
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
          <p>{person.name}</p>
        </div>
      ))}
    </main>
  )
}