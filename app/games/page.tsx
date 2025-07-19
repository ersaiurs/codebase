'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const GameIntroPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set status login
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleStartGame = () => {
    if (isAuthenticated) {
      // Jika user sudah login, arahkan ke pemilihan level
      router.push('/games/select');
    } else {
      // Jika user belum login, arahkan ke halaman login
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-white-100 via-white-100 to-white-100 relative overflow-hidden">
      {/* Tombol Kembali */}
      <Link 
        href="/" 
        className="absolute top-4 left-4 text-blue-600 text-3xl hover:text-blue-800 transition-transform hover:-translate-x-1"
      >
        &lt;
      </Link>

      {/* Ilustrasi */}
      <Image 
        src="/code.jpg" 
        alt="Kids Coding Illustration" 
        width={300} 
        height={300} 
        className="rounded-xl shadow-lg"
      />

      {/* Judul */}
      <h1 className="text-4xl font-extrabold text-purple-700 mb-4 text-center drop-shadow-md">
        Selamat Datang di Permainan CodeBase!
      </h1>

      {/* Deskripsi */}
      <p className="text-xl text-gray-800 mb-6 text-center max-w-xl">
        Pelajari cara menemukan jawaban yang benar tentang JavaScript dengan permainan yang menyenangkan dan interaktif. Mari kita jelajahi bersama!
      </p>

      {/* Tombol Mulai */}
      <button 
        onClick={handleStartGame}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-transform"
      >
        🚀 Mulai Bermain
      </button>
    </div>
  );
};

export default GameIntroPage;
