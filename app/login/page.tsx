'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // ✅ Tambahkan state

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

      await signInWithEmailAndPassword(auth, email, password);
      router.push("/class"); // ✅ Redirect
    } catch (err: any) {
      console.error(err);
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-blue-100 py-10">
      <div className="flex w-3/4 max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold text-black">Login Sekarang</h2>
          <p className="text-gray-600">Halo, Selamat Datang Kembali 👋</p>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-black">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                placeholder="Masukkan alamat email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-4 relative">
              <label className="block text-black">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 pr-10"
                  placeholder="Masukkan kata sandi anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-500"
                >
                  {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{" "}
                Ingat Akun
              </label>
              <Link href="/forgot-password" className="text-blue-600 text-sm hover:underline">
                Lupa Kata Sandi?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 mt-6 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Tidak Punya Akun?{" "}
            <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Gambar kanan */}
        <div className="w-1/2 bg-white flex items-center justify-center">
          <img src="/login.png" alt="Illustration" className="w-4/5" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
