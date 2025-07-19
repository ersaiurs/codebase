"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Link from "next/link";
import { Mail } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Link reset telah dikirim ke email Anda.");
    } catch (err: any) {
      console.error(err);
      setError("❌ Gagal mengirim email reset. Cek kembali alamat email.");
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4 pt-20">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Lupa Password?</h2>
        <p className="text-gray-600 text-center mb-6">
          Masukkan email akunmu dan kami akan kirimkan link reset.
        </p>

        <form onSubmit={handleResetPassword}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <span className="absolute top-1/3 -translate-y-1/3 left-3 text-gray-500">
              <Mail size={18} />
            </span>
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 mb-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg transition duration-200 hover:bg-blue-700 hover:scale-[1.02]"
          >
            Kirim Link Reset
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Kembali ke{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
