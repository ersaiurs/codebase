'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const Level1Quiz = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showModal, setShowModal] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'quizQuestions', 'level1', 'questions'));
      const fetched: Question[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetched.push({
          question: data.question,
          options: data.options,
          answer: data.answer,
          explanation: data.explanation,
        });
      });
      setQuestions(shuffleArray(fetched));
      setStartTime(Date.now()); // ⏱️ Mulai catat waktu di sini
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selected !== null || isFinished || timeUp) return;
    const timer = setTimeout(() => {
      if (timeLeft > 0) setTimeLeft((prev) => prev - 1);
      else setTimeUp(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, selected, isFinished, timeUp]);

  const saveProgressToFirestore = async () => {
    if (!userId) return;
    const userRef = doc(getFirestore(), 'users', userId);
    await setDoc(
      userRef,
      {
        email: getAuth().currentUser?.email,
        displayName: getAuth().currentUser?.displayName,
        progress: { level1: true },
        scores: { level1: score },
      },
      { merge: true }
    );
  };

  const handleAnswer = (answer: string) => {
    if (selected === null) {
      setSelected(answer);
      setShowExplanation(true);
      if (answer === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      setIsFinished(true);

      // Hitung waktu total
      if (startTime) {
        const endTime = Date.now();
        const totalSeconds = Math.floor((endTime - startTime) / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setDuration(`${minutes} menit ${seconds} detik`);
      }

      localStorage.setItem('level1Completed', 'true');
      localStorage.setItem('level1Score', score.toString());
      saveProgressToFirestore();
    }
  };

  const handleBackClick = () => {
    setShowModal(true);
  };

  const handleConfirmLeave = () => {
    router.push('/games/quiz/select');
  };

  const handleCancelLeave = () => {
    setShowModal(false);
  };

  const restartQuiz = () => {
    const randomized = shuffleArray(questions);
    setQuestions(randomized);
    setCurrentQuestion(0);
    setSelected(null);
    setShowExplanation(false);
    setIsFinished(false);
    setScore(0);
    setTimeLeft(30);
    setTimeUp(false);
    setStartTime(Date.now()); // ⏱️ Catat ulang waktu mulai
    setDuration(null);
  };

  const current = questions[currentQuestion];

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-yellow-800">
        <p className="text-xl font-bold">⏳ Memuat Permainan</p>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-red-600 font-bold text-xl">⚠️ Tidak ada pertanyaan tersedia.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 text-blue-600 text-3xl hover:text-blue-800 transition-transform hover:-translate-x-1"
      >
        &lt;
      </button>

      {!isFinished ? (
        <div className="bg-white border shadow-md rounded-lg w-full max-w-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h1 className="text-xl font-semibold">Quiz Level 1</h1>
            <span className="bg-gray-700 text-white text-sm px-2 py-1 rounded-md">
              Time: <span className="text-orange-400 font-bold">{timeLeft}</span>
            </span>
          </div>

          <div className="px-6 py-4">
            <p className="font-semibold text-lg mb-4">
              {currentQuestion + 1}. {current.question}
            </p>

            <div className="flex flex-col gap-3">
              {current.options.map((option, index) => {
                const isCorrect = option === current.answer;
                const isSelected = option === selected;

                let bgColor = 'bg-white hover:bg-gray-100';
                if (selected !== null) {
                  if (isCorrect) bgColor = 'bg-green-200';
                  else if (isSelected) bgColor = 'bg-red-200';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`border px-4 py-2 text-left rounded-md text-gray-900 font-medium ${bgColor}`}
                    disabled={selected !== null}
                  >
                    <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="mt-6 bg-yellow-50 p-4 rounded-md border text-gray-800">
                <p className="font-bold">Penjelasan:</p>
                <p>{current.explanation}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t">
            <span className="bg-orange-400 text-white px-3 py-1 rounded-md text-sm">
              {currentQuestion + 1}/{questions.length}
            </span>
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={!showExplanation}
            >
              {currentQuestion + 1 < questions.length ? 'Next Question' : 'Lihat Skor'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border shadow-md rounded-lg w-full max-w-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">🎉 Quiz Selesai!</h2>
          <p className="text-gray-700 mb-2">
            Skor kamu: <strong>{score} / {questions.length}</strong>
          </p>
          {duration && (
            <p className="text-sm text-gray-600 mb-2">
              Waktu yang kamu habiskan: <strong>{duration}</strong>
            </p>
          )}
          <p className="text-sm text-gray-600">Kamu berhasil menyelesaikan Level 1! 🚀</p>

          <Link
            href="/games/quiz/select"
            className="inline-block mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Kembali ke Pilihan Level
          </Link>

          <button
            onClick={restartQuiz}
            className="inline-block mt-4 ml-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            🔁 Mulai Ulang
          </button>
        </div>
      )}

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

      {timeUp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">⏰ Waktu Habis!</h2>
            <p className="mb-4 text-gray-700">Sayang sekali, waktu kamu sudah habis.</p>
            <button
              onClick={restartQuiz}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
            >
              🔁 Mulai Ulang
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level1Quiz;
