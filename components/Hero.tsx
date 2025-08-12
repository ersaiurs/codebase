'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Image from "next/image";

const Hero = () => {
  const miniCourseRef = useRef<HTMLDivElement>(null);
  const methodRef = useRef<HTMLDivElement>(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToMiniCourse = () => {
    miniCourseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMethod = () => {
    methodRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section>
      {/* Bagian Hero */}
      <div className="md:mt-8 container mx-auto px-12 py-16 bg-white flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-5xl font-bold">Mengetahui apa itu JavaScript</h2>
          <p className="text-gray-600 text-lg">
            Temukan pembelajaran pemrograman JavaScript terbaik untuk Kamu. Belajar dari dasar.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={scrollToMiniCourse}
              className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md"
            >
              Mulai Permainan
            </button>
            <button
              onClick={scrollToMethod}
              className="border border-blue-500 text-blue-500 px-6 py-3 rounded-md"
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
         
        </div>

        {/* Bagian Kanan */}
        <div className="md:w-3/5 flex flex-wrap gap-4 mt-12 md:mt-0 justify-center">
          <div className="bg-blue-200 p-6 rounded-lg w-44 text-center shadow-lg">
            <h3 className="font-bold">Cara Kerja</h3>
            <p className="text-sm">Belajar JavaScript dengan cara-cara yang menyenangkan.</p>
          </div>
          <div className="bg-white text-white p-4 rounded-lg w-36 text-center shadow-lg">
                <img
                  src="/js3.png"
                  alt="JavaScript Logo"
                  className="w-25 h-25 mx-auto mb-2 object-contain"
                />
              
              </div>

          <div className="bg-gray-300 p-6 rounded-lg w-44 text-center shadow-lg">
            <h3 className="font-bold">Permainan</h3>
            <p className="text-sm">Terdapat permainan yang menarik, Quiz, Cari Kata, dan Mencocokan Jawaban.</p>
          </div>
          <div className="bg-green-200 p-6 rounded-lg w-44 text-center shadow-lg">
            <h3 className="font-bold">Materi</h3>
            <p className="text-sm">Terdapat materi yang menarik untuk mempelajari JavaScript dari dasar.</p>

          </div>
        </div>
      </div>

      {/* Tentang Section */}
      <div className="px-8 py-16 bg-white">
        <h3 className="text-pink-500 font-semibold">TENTANG CODEBASE</h3>
        <h2 className="text-3xl font-bold mt-2">
          Belajar JavaScript Jadi Mudah dan Seru!
        </h2>

        <div className="mt-6 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1 flex items-start space-x-4">
            <span className="bg-purple-200 text-purple-600 p-3 rounded-full">⭐</span>
            <div>
              <h4 className="font-bold">Belajar Aktif & Praktis</h4>
              <p className="text-gray-600 text-sm">
                Belajar secara menyenangkan dengan praktik permainan untuk pemahaman yang lebih mendalam.
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-start space-x-4">
            <span className="bg-purple-200 text-purple-600 p-3 rounded-full">🛠</span>
            <div>
              <h4 className="font-bold">Fokus STEM</h4>
              <p className="text-gray-600 text-sm">
                Gabungkan sains, teknologi, teknik, dan matematika dalam pembelajaran yang terarah dan menyenangkan.
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-start space-x-4">
            <span className="bg-purple-200 text-purple-600 p-3 rounded-full">🤖</span>
            <div>
              <h4 className="font-bold">Memulai Dari Dasar</h4>
              <p className="text-gray-600 text-sm">
                Pahami konsep pemrograman sejak awal melalui latihan yang mudah diikuti dan cocok untuk pemula.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
            <Link href="/tentang">
          Selengkapnya Tentang Kami
            </Link>
          </button>
        </div>

        <div className="mt-8 bg-gray-300 rounded-md w-full h-64 flex items-center justify-center">
          <img src="gambar1.jpg" alt="Gambar edukasi atau robotika" className="w-full h-full object-cover rounded-md" />
        </div>
      </div>

      {/* Mengapa Memilih Kami */}
      <div className="px-8 py-16 bg-blue-100">
        <h3 className="text-blue-500 font-semibold">KENAPA MEMILIH KAMI</h3>
        <h2 className="text-3xl font-bold mt-2">Mengapa CodeBase Pilihan Tepat</h2>
        <p className="text-gray-600 mt-4">
          CodeBase dirancang khusus agar membuat betah belajar JavaScript sambil bermain, dengan fitur dan pendekatan yang tepat, seperti:
        </p>

        <ul className="mt-6 space-y-3">
          <li className="text-blue-600 font-bold">✅ Metode Belajar Interaktif & Menyenangkan</li>
          <li className="text-blue-600 font-bold">✅ Konten Visual & Praktik Langsung</li>
          <li className="text-blue-600 font-bold">✅ Materi Disesuaikan untuk Anak Usia 10–15 Tahun</li>
          <li className="text-blue-600 font-bold">✅ Dukungan Belajar Bertahap dari Dasar</li>
        </ul>

        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md">
        <Link href="/signup">
          Daftar Akun
        </Link>
        </button>
      </div>

      {/* Mini Course */}
      <div ref={miniCourseRef} className="px-8 py-16">
        <h2 className="text-3xl font-bold">Permainan</h2>
        <p className="text-gray-600 mt-2">
          Nikmati berbagai permainan edukatif yang dirancang untuk mengenalkan konsep JavaScript secara menyenangkan bagi anak-anak.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg p-4 rounded-md">
            <div className="bg-gray-300 h-40 rounded-md">
              <img src="logoquiz.jpg" alt="Quiz" className="w-full h-full object-cover rounded-md" />
            </div>
            <h4 className="font-bold mt-4">Permainan Quiz</h4>
            <p className="text-sm text-gray-500">Jawab soal seputar JavaScript dengan cara yang interaktif. Tingkatkan logika dan pemahaman melalui quiz bertingkat.</p>
            <p className="font-bold text-yellow-500">👇Coba Sekarang</p>
            <Link href="/games">
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Mainkan</button>
            </Link>
          </div>

          <div className="bg-white shadow-lg p-4 rounded-md">
            <div className="bg-gray-300 h-40 rounded-md">
              <img src="cari.png" alt="puzzle & Logic Games" className="w-full h-full object-cover rounded-md" />
            </div>
            <h4 className="font-bold mt-4">Cari Kata</h4>
            <p className="text-sm text-gray-500">Temukan istilah JavaScript tersembunyi dan latih fokus serta pengetahuan dasar dengan cara yang seru.</p>
            <p className="font-bold text-yellow-500">👇Coba Sekarang</p>
            <Link href="/games">
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Mainkan</button>
            </Link>
          </div>

          <div className="bg-white shadow-lg p-4 rounded-md">
            <div className="bg-gray-300 h-40 rounded-md overflow-hidden">
              <img src="cocok.png" alt="Mencocokan-Jawaban" className="w-full h-full object-cover rounded-md" />
            </div>
            <h4 className="font-bold mt-4">Mencocokan Jawaban</h4>
            <p className="text-sm text-gray-500"> Cocokkan pertanyaan dengan jawaban yang tepat sambil memahami konsep dasar JavaScript secara visual.</p>
            <p className="font-bold text-yellow-500">👇Coba Sekarang</p>
            <Link href="/games">
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Mainkan</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metode Pembelajaran */}
      <div
        ref={methodRef}
        className="bg-blue-100 px-6 md:px-16 py-32 md:py-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Kiri: Teks & Fitur */}
          <div>
            <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
              METODE BELAJAR
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 leading-snug">
              Belajar Kapan Saja, <br /> Di Mana Saja
            </h2>
            <p className="text-gray-700 mt-4">
              Belajar menyenangkan kapan pun dan di mana pun 
              eksplorasi, bermain, dan coding dengan cara seru!
            </p>

            {/* Daftar Fitur */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6 text-blue-800 font-semibold">
              <div className="flex items-center gap-2">🔘 Mudah Dipahami</div>
              <div className="flex items-center gap-2">🔘 Fleksibel</div>
              <div className="flex items-center gap-2">🔘 Terjangkau</div>
              <div className="flex items-center gap-2">🔘 Lengkap</div>
            </div>

            {/* Tombol CTA */}
            <Link href="/learning">
              <button className="mt-6 bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition">
                Belajar Sekarang!
              </button>
            </Link>
          </div>

          {/* Kanan: Gambar */}
          <div className="flex justify-center">
          <img
              src="/komp.png"
              alt="Belajar Coding"
              className="w-[320px] h-[320px] rounded-md object-contain animate-bounceY"
            />
          </div>
        </div>
      </div>


     {/* Footer*/}
      <footer className="bg-gray-50 px-8 py-12 text-sm text-gray-600">
  <div className="max-w-7xl mx-auto border-b pb-10">
    {/* Header & Deskripsi */}
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
      <h1 className="text-2xl font-bold text-black ml-10">
        Code<span className="text-blue-600">Base</span>
      </h1>
      <p className="md:max-w-3xl leading-relaxed">
        Coding Menyenangkan & Interaktif untuk Anak! Memberdayakan anak dengan petualangan coding seru dan pembelajaran langsung. Bergabunglah dengan ribuan anak yang menjelajahi dunia coding bersama CodeBase!
      </p>
    </div>

    <div className="border-t border-gray-300 mb-9" />

    {/* Menu */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-5 max-w-3xl mx-auto">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Halaman</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Beranda</a></li>
          <li><a href="#" className="hover:underline">Permainan</a></li>
          <li><a href="#" className="hover:underline">Materi</a></li>
          <li><a href="#" className="hover:underline">Tentang Kami</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Materi</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Pengenalan JavaScript</a></li>
          <li><a href="#" className="hover:underline">Struktur Data Dasar</a></li>
          <li><a href="#" className="hover:underline">Perulangan & Kondisi</a></li>
          <li><a href="#" className="hover:underline">Logika & Pemecahan Masalah</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Permainan</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Quiz</a></li>
          <li><a href="#" className="hover:underline">puzzle</a></li>
          <li><a href="#" className="hover:underline">Mencocokkan Jawaban</a></li>
        </ul>
      </div>
    </div>
  </div>

  {/* Footer bawah */}
  <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
    <p>Hak Cipta © 2025 CodeBase &nbsp; | &nbsp; Desain oleh Ersalia</p>
    <div className="space-x-4">
      <a href="#" className="hover:underline">Syarat Penggunaan</a>
      <a href="#" className="hover:underline">Kebijakan Privasi</a>
    </div>
  </div>
</footer>


      {/* Tombol Kembali ke Atas */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </section>
  );
};

export default Hero;
