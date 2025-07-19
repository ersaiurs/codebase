'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const questions = [
  { id: 'q1', text: 'For' },
  { id: 'q2', text: 'Else if' },
  { id: 'q3', text: 'Switch' },
  { id: 'q4', text: 'While' },
  { id: 'q5', text: 'Do/While' },
];

const answers = [
  { id: 'q2', text: 'Digunakan jika ada banyak kondisi berbeda.' },
  { id: 'q4', text: 'Mengulang kode selama kondisi bernilai benar (true).' },
  { id: 'q1', text: 'Digunakan untuk mengulang kode dengan jumlah iterasi yang sudah ditentukan.' },
  { id: 'q3', text: 'Memilih salah satu dari banyak pilihan nilai.' },
  { id: 'q5', text: 'Mengulang kode minimal satu kali, lalu terus mengulang selama kondisi bernilai benar.' },
];

export default function DragMatchingGame() {
  const [correct, setCorrect] = useState<string[]>([]);
  const [dropped, setDropped] = useState<{ [key: string]: string }>({});
  const [attempts, setAttempts] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ✅ Cek akses
  useEffect(() => {
    const checkProgress = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        router.push('/login');
        return;
      }

      const userRef = doc(getFirestore(), 'users', user.uid);
      const snapshot = await getDoc(userRef);
      const progress = snapshot.data()?.progress || {};

      const quizDone = progress.level1 && progress.level2 && progress.level3 && progress.level4 && progress.level5;
      const puzzleDone = progress.wordsearch;

      if (!quizDone || !puzzleDone) {
        alert('❗Anda harus menyelesaikan semua quiz dan puzzle sebelum memainkan game ini.');
        router.push('/games/select');
      } else {
        setIsLoading(false);
      }
    };

    checkProgress();
  }, [router]);

  const handleDragEnd = (event: any) => {
    const { over, active } = event;
    if (attempts <= 0) return;

    if (over) {
      const questionId = over.id;
      const answerId = active.id;

      if (questionId === answerId) {
        setCorrect((prev) => [...prev, questionId]);
        setDropped((prev) => ({ ...prev, [questionId]: active.data.current?.text }));
      } else {
        setAttempts((prev) => prev - 1);
      }
    }
  };

  const handleReset = () => {
    setCorrect([]);
    setDropped({});
    setAttempts(3);
    setGameFinished(false);
  };

  const handleBackClick = () => {
    setShowModal(true);
  };

  const handleConfirmLeave = () => {
    router.push('/games/select');
  };

  const handleCancelLeave = () => {
    setShowModal(false);
  };

  const saveProgressToFirestore = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(getFirestore(), 'users', user.uid);
    await setDoc(
      userRef,
      {
        email: user.email,
        displayName: user.displayName,
        progress: { jsmatch: true },
      },
      { merge: true }
    );
  };

  useEffect(() => {
    if (correct.length === questions.length) {
      saveProgressToFirestore();
      setGameFinished(true);
    }
  }, [correct]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        ⏳ Memuat permainan...
      </div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      
      <div className="relative flex flex-col justify-start items-center py-8 px-4 bg-white">
        <button
          onClick={handleBackClick}
          className="absolute top-4 left-4 text-blue-600 text-3xl hover:text-blue-800 transition-transform hover:-translate-x-1"
        >
          &lt;
        </button>
      </div>

      <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-lg mt-4">
  {gameFinished && (
    <div className="mt-8 text-center bg-green-50 p-6 border border-green-400 rounded-lg shadow-md animate-pulse">
      <h2 className="text-2xl font-bold text-green-700 mb-2">🎉 Selamat! 🎊</h2>
      <p className="mt-4 text-green-600 text-lg">
        Anda telah menuntaskan game <span className="font-semibold">Mencocokkan Jawaban JavaScript</span> dari CodeBase.
      </p>
      <p className="mt-2 text-green-500">
        🏅 Silakan unduh sertifikat Anda melalui ikon profil di kanan atas!
      </p>
    </div>
  )}

  <h1 className="text-3xl font-bold mb-4 mt-4 text-center">Mencocokkan Jawaban : JavaScript</h1>

  <p className="mb-6 text-center text-red-500">
    Drag jawaban yang benar mengenai perulangan di bawah ini.{' '}
    <span className="font-bold">{attempts}</span> sisa kesempatan.
  </p>

        
        {attempts === 0 && (
          <div className="text-center text-red-500 font-semibold mb-4">
            Kesempatan habis.
          </div>
        )}

        <div className="grid grid-cols-2 gap-10 p-4 border-2 border-blue-400 rounded-lg shadow-md">
          <div>
            <h2 className="text-xl font-semibold mb-2">Perulangan</h2>
            {questions.map((q) => (
              <DroppableBox
                key={q.id}
                id={q.id}
                text={q.text}
                droppedItem={dropped[q.id]}
                isCorrect={correct.includes(q.id)}
              />
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
            {answers.map((a) =>
              !Object.values(dropped).includes(a.text) ? (
                <DraggableBox
                  key={a.id}
                  id={a.id}
                  text={a.text}
                  disabled={attempts === 0}
                />
              ) : null
            )}
          </div>
        </div>

    

        <div className="mt-6 text-center">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-400 text-white font-semibold"
          >
            Reset / Mulai Ulang
          </button>
        </div>
      </div>

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
    </DndContext>
  );
}

function DraggableBox({
  id,
  text,
  disabled,
}: {
  id: string;
  text: string;
  disabled: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { text },
    disabled,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`border rounded px-3 py-2 shadow mb-2 bg-white cursor-${
        disabled ? 'not-allowed' : 'move'
      } opacity-${disabled ? '50' : '100'}`}
    >
      {text}
    </div>
  );
}

function DroppableBox({
  id,
  text,
  droppedItem,
  isCorrect,
}: {
  id: string;
  text: string;
  droppedItem?: string;
  isCorrect: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`border rounded px-3 py-4 mb-4 min-h-[60px] ${
        isOver ? 'bg-blue-100' : 'bg-white'
      }`}
    >
      <div className="font-semibold">{text}</div>
      {droppedItem && (
        <div className="mt-2 text-sm">
          {droppedItem}{' '}
          {isCorrect && <span className="text-green-500 ml-2">✔️</span>}
        </div>
      )}
    </div>
  );
}
