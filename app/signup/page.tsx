"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { auth, db } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Kata sandi tidak sesuai.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password harus minimal 8 karakter!");
      return;
    }

    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date(),
      });

      alert("Signup berhasil! Silakan login untuk melanjutkan.");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email sudah digunakan. Silakan login dengan akun tersebut.");
      } else {
        setError(err.message || "Terjadi kesalahan saat mendaftar.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 py-10">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[900px]">
        {/* Form Sign Up */}
        <div className="w-1/2 p-7">
          <h2 className="text-3xl font-bold text-black">Buat Akun</h2>
          <p className="text-gray-600 mt-1">Gabung kami dan mulai belajar JavaScript! 🚀</p>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">Sign up dengan Email</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Nama</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="Masukkan nama anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="Masukkan alamat email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 relative">
              <label className="block text-gray-700">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-800 pr-10"
                  placeholder="Buat kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="mt-4 relative">
              <label className="block text-gray-700">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-800 pr-10"
                  placeholder="Ulangi kata sandi"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-4 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 mt-6 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Sudah Punya Akun?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Ilustrasi */}
        <div className="w-1/2 bg-white flex items-center justify-center">
          <img src="/signup2.png" alt="Sign Up Illustration" className="w-80" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
