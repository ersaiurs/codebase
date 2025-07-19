'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-white p-6 relative">
      {/* Tombol Kembali */}
      <Link 
        href="/" 
        className="absolute top-4 left-4 text-blue-600 text-3xl hover:text-blue-800 transition-transform hover:-translate-x-1"
      >
        &lt;
      </Link>

      <div className="max-w-4xl mx-auto space-y-10 mt-10">
        {/* Banner atau Judul */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-blue-700">Tentang CodeBase</h1>
          <p className="mt-2 text-gray-700 max-w-xl">
            CodeBase adalah platform belajar coding berbasis web yang memudahkan siapapun untuk belajar JavaScript dari dasar melalui permainan interaktif dan blok visual.
          </p>
        </div>

        {/* Gambar ilustrasi */}
        <div className="mt-2 flex justify-center">
          <Image
            src="/homepage.png" // ganti sesuai nama file banner di public/
            alt="CodeBase Banner"
            width={600}
            height={300}
            className="rounded"
          />
        </div>

        {/* Visi dan Misi */}
        <section className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">VISI</h3>
            <p className="text-gray-700">
              Menjadi platform edukasi coding anak terbaik di Indonesia dengan pembelajaran yang mudah, interaktif, dan menyenangkan.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">MISI</h3>
            <p className="text-gray-700">
              Memberikan akses belajar pemrograman dasar kepada semua anak dengan teknologi visual coding dan latihan soal bertahap.
            </p>
          </div>
        </section>

        {/* Kenapa CodeBase */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Kenapa Memilih CodeBase?</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded">
              <p className="font-semibold">🌟 Interaktif</p>
              <p className="text-gray-700 text-sm mt-1">Belajar melalui permainan dan blok visual coding seperti Blockly.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <p className="font-semibold">🛠️ Praktis</p>
              <p className="text-gray-700 text-sm mt-1">Tanpa install aplikasi, langsung belajar di browser kamu.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <p className="font-semibold">✅ Terstruktur</p>
              <p className="text-gray-700 text-sm mt-1">Materi dan latihan disusun per level untuk perkembangan bertahap.</p>
            </div>
          </div>
        </section>

        {/* Teknologi */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Teknologi yang Digunakan</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Next.js 13 App Router</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Firebase Firestore untuk database soal</li>
          </ul>
        </section>

        {/* Legalitas / Hak Cipta */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Hak Cipta</h3>
          <p className="text-gray-700">
            © 2025 CodeBase. Dikembangkan oleh Ersalia Syahira untuk edukasi pemrograman anak. Semua hak dilindungi.
          </p>
        </section>
      </div>
    </div>
  );
}
