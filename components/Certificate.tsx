'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

interface CertificateProps {
  name: string;
  competition: string;
}

const Certificate: React.FC<CertificateProps> = ({ name, competition }) => {
  const certRef = useRef<HTMLDivElement>(null);

  const handleExportImage = async () => {
    if (certRef.current) {
      const canvas = await html2canvas(certRef.current);
      const link = document.createElement('a');
      link.download = `certificate-${name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={certRef} className="certificate">
        <div className="flex items-center justify-between gap-4">
          {/* Medali kiri */}
          <img
            src="/medali2.png"
            alt="Medali"
            className="w-20 h-20 object-contain"
          />

          {/* Konten utama sertifikat */}
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold mb-2">SERTIFIKAT PENGHARGAAN</h1>
            <p className="text-lg mb-1">diberikan kepada</p>
            <h2 className="text-2xl font-bold text-yellow-300 mb-2">{name}</h2>
            <p className="mb-1">atas keberhasilan dalam</p>
            <h3 className="text-xl font-semibold text-blue-200 mb-4">
              {competition}
            </h3>
            <p className="text-sm text-white/80 px-6">
              Terima kasih telah berpartisipasi dalam permainan CodeBase.
              Sertifikat ini diberikan sebagai bentuk apresiasi atas pencapaianmu.
            </p>
            <footer className="mt-6 text-sm text-white/70">
              <p>Hormat Kami,</p>
              <p>CodeBase</p>
            </footer>
          </div>

          {/* Medali kanan */}
          <img
            src="/medali2.png"
            alt="Medali"
            className="w-20 h-20 object-contain"
          />
        </div>
      </div>

      <button
        onClick={handleExportImage}
        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 shadow"
      >
        📸 Simpan Sebagai Gambar
      </button>

      <style jsx>{`
        .certificate {
          background: linear-gradient(135deg, #1e293b, #111827);
          color: #fff;
          border: 4px solid #eab308;
          border-radius: 12px;
          padding: 2rem;
          width: 100%;
          max-width: 700px;
          margin: 2rem auto;
          text-align: center;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Certificate;
