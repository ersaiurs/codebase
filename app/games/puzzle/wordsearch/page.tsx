'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const wordList = ['VAR', 'STRING', 'CONST', 'BOOLEAN', 'ARRAY', 'NULL', 'OBJECT', 'NUMBER', 'LET', 'UNDEFINED'];
const gridSize = 12;
const highlightColors = [
  'bg-green-400', 'bg-blue-400', 'bg-pink-400', 'bg-purple-400',
  'bg-yellow-400', 'bg-red-400', 'bg-teal-400', 'bg-indigo-400',
  'bg-amber-400', 'bg-lime-400'
];

function getRandomChar() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}

function placeWordsOnGrid(words: string[], size: number) {
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  const directions = [[0, 1], [1, 0], [1, 1], [-1, 1]];
  const wordPositions: { [key: string]: [number, number][] } = {};

  for (let word of words) {
    let placed = false;
    while (!placed) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const startX = Math.floor(Math.random() * size);
      const startY = Math.floor(Math.random() * size);
      const path: [number, number][] = [];
      let fits = true;

      for (let i = 0; i < word.length; i++) {
        const x = startX + dir[0] * i;
        const y = startY + dir[1] * i;
        if (x < 0 || y < 0 || x >= size || y >= size || (grid[x][y] && grid[x][y] !== word[i])) {
          fits = false;
          break;
        }
        path.push([x, y]);
      }

      if (fits) {
        path.forEach(([x, y], i) => grid[x][y] = word[i]);
        wordPositions[word] = path;
        placed = true;
      }
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!grid[i][j]) {
        grid[i][j] = getRandomChar();
      }
    }
  }

  return { grid, wordPositions };
}

export default function WordSearchGame() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [positions, setPositions] = useState<{ [key: string]: [number, number][] }>({});
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<[number, number] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [challengeMode, setChallengeMode] = useState(false);
  const [challengeTime, setChallengeTime] = useState(60);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const generateNewGrid = () => {
    const { grid, wordPositions } = placeWordsOnGrid(wordList, gridSize);
    setGrid(grid);
    setPositions(wordPositions);
    setFoundWords([]);
    setSelectedCells([]);
    setDirection(null);
  };

  useEffect(() => {
    generateNewGrid();
  }, []);

  useEffect(() => {
    if (!timerStarted || timeLeft === null || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev > 1) return prev - 1;
        clearInterval(timer);
        setTimerStarted(false);
        const duration = challengeTime;
        router.push(`/games/puzzle/complete?time=${duration}`);
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerStarted, timeLeft]);

  useEffect(() => {
    if (foundWords.length === wordList.length) {
      const saveProgress = async () => {
        try {
          const { getAuth, onAuthStateChanged } = await import('firebase/auth');
          const { getFirestore, doc, setDoc } = await import('firebase/firestore');
          const auth = getAuth();
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              const userRef = doc(getFirestore(), 'users', user.uid);
              await setDoc(userRef, { progress: { wordsearch: true } }, { merge: true });
            }
          });
        } catch (e) {
          console.error('Error saving progress:', e);
        }
      };
      saveProgress();

      const endTime = Date.now();
      const duration = startTime ? Math.round((endTime - startTime) / 1000) : 0;
      setTimeout(() => {
        router.push(`/games/puzzle/complete?time=${duration}`);
      }, 1000);
    }
  }, [foundWords]);

  const handleMouseDown = (x: number, y: number) => {
    setIsDragging(true);
    setSelectedCells([[x, y]]);
    setDirection(null);
  };

  const handleMouseEnter = (x: number, y: number) => {
    if (!isDragging) return;
    setSelectedCells((prev) => {
      const [startX, startY] = prev[0];
      const dx = x - startX;
      const dy = y - startY;

      if (prev.length === 1) {
        if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
          setDirection([Math.sign(dx), Math.sign(dy)]);
          const path: [number, number][] = [];
          for (let i = 0; i <= Math.max(Math.abs(dx), Math.abs(dy)); i++) {
            path.push([startX + i * Math.sign(dx), startY + i * Math.sign(dy)]);
          }
          return path;
        }
        return prev;
      }

      if (direction) {
        const expectedX = startX + direction[0] * prev.length;
        const expectedY = startY + direction[1] * prev.length;
        if (x === expectedX && y === expectedY) {
          return [...prev, [x, y]];
        }
      }
      return prev;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const selectedWord = selectedCells.map(([x, y]) => grid[x][y]).join('');
    const reversedWord = selectedWord.split('').reverse().join('');
    const match = wordList.find(w => w === selectedWord || w === reversedWord);
    if (match && !foundWords.includes(match)) {
      setFoundWords([...foundWords, match]);
    }
    setSelectedCells([]);
    setDirection(null);
  };

  const handleBackClick = () => setShowModal(true);
  const handleConfirmLeave = () => router.push('/games/select');
  const handleCancelLeave = () => setShowModal(false);

  const startChallenge = () => {
    setChallengeMode(true);
    setTimeLeft(challengeTime);
    setTimerStarted(true);
    setStartTime(Date.now());
  };

  const getHighlightClasses = (x: number, y: number) => {
    return Object.entries(positions).map(([word, coords], idx) =>
      foundWords.includes(word) && coords.some(([i, j]) => i === x && j === y)
        ? highlightColors[idx % highlightColors.length]
        : ''
    ).join(' ');
  };

  const isSelected = (x: number, y: number) =>
    selectedCells.some(([i, j]) => i === x && j === y);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-4 flex flex-col items-center relative"
      onMouseUp={handleMouseUp}
    >
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 text-blue-600 text-3xl hover:text-blue-800 transition-transform hover:-translate-x-1"
      >
        &lt;
      </button>

      <h1 className="text-4xl font-bold mb-4 text-blue-700 mt-12">🧩 Cari Kata: JavaScript</h1>

      <div className="flex gap-8 items-start mt-4">
        {/* Grid */}
        <div className="grid grid-cols-12 gap-1 p-2 border-2 border-blue-400 rounded-lg shadow-lg">
          {grid.map((row, i) =>
            row.map((char, j) => (
              <div
                key={`${i}-${j}`}
                onMouseDown={() => handleMouseDown(i, j)}
                onMouseEnter={() => handleMouseEnter(i, j)}
                className={clsx(
                  'w-8 h-8 font-semibold flex items-center justify-center rounded cursor-pointer select-none transition-transform transform hover:scale-110',
                  isSelected(i, j) ? 'bg-yellow-300 scale-110' :
                  getHighlightClasses(i, j) || 'bg-white hover:bg-orange-300'
                )}
              >
                {char}
              </div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="ml-6 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-orange-800 mb-2">Kata:</h2>
            <div className="grid grid-cols-2 gap-2">
              {wordList.map((word, idx) => (
                <span
                  key={word}
                  className={clsx(
                    'px-2 py-1 text-sm rounded text-center font-mono transition-colors',
                    foundWords.includes(word)
                      ? `${highlightColors[idx % highlightColors.length]} text-white line-through`
                      : 'bg-blue-100 text-orange-800'
                  )}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={generateNewGrid}
            className="px-4 py-2 bg-red-400 text-white font-semibold rounded hover:bg-red-600"
          >
            🔄 Reset / Acak Ulang
          </button>

          {/* Challenge Mode */}
          <div className="mt-2 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-purple-800 mb-2">🎯 Mode Tantangan</h2>
            <div className="flex items-center gap-2">
              <select
                value={challengeTime}
                onChange={(e) => setChallengeTime(Number(e.target.value))}
                className="border rounded px-2 py-1"
                disabled={challengeMode}
              >
                <option value={60}>60 detik</option>
                <option value={90}>90 detik</option>
                <option value={120}>120 detik</option>
              </select>
              <button
                onClick={startChallenge}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                disabled={challengeMode}
              >
                ▶️ Mulai Tantangan
              </button>
            </div>
            {challengeMode && timeLeft !== null && (
              <p className="mt-2 text-red-600 font-bold text-sm">
                ⏱ Waktu Tersisa: {timeLeft} detik
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi</h2>
            <p className="mb-6">Yakin ingin keluar? Progress Anda akan hilang.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmLeave}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Ya
              </button>
              <button
                onClick={handleCancelLeave}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
