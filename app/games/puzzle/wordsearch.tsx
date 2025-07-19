// app/games/puzzle/WordSearch.tsx
'use client'

import { useState } from 'react'
import { grid, words } from './wordlist'
import clsx from 'clsx'

export default function WordSearch() {
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [selected, setSelected] = useState<[number, number][]>([])

  const handleCellClick = (row: number, col: number) => {
    setSelected(prev => [...prev, [row, col]])
  }

  const checkSelection = () => {
    const selectedLetters = selected.map(([r, c]) => grid[r][c]).join('').toUpperCase()
    const reversed = selectedLetters.split('').reverse().join('')

    const match = words.find(word => word === selectedLetters || word === reversed)
    if (match && !foundWords.includes(match)) {
      setFoundWords([...foundWords, match])
    }
    setSelected([])
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-10 gap-1 mb-4">
        {grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const isSelected = selected.some(([r, c]) => r === rowIndex && c === colIndex)
            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={clsx(
                  'w-8 h-8 text-center rounded font-bold',
                  isSelected ? 'bg-yellow-300' : 'bg-white border'
                )}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {letter}
              </button>
            )
          })
        )}
      </div>

      <button
        onClick={checkSelection}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Cek Kata
      </button>

      <div>
        <h3 className="font-semibold mb-2">Daftar Kata:</h3>
        <ul className="list-disc ml-5">
          {words.map(word => (
            <li
              key={word}
              className={clsx(foundWords.includes(word) && 'line-through text-green-500')}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
