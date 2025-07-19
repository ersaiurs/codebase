'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, updateProfile, User } from 'firebase/auth';
import { UserCircle, LogOut, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) setNewName(currentUser.displayName || '');
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setEditingName(false);
        setShowConfirmLogout(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      setShowConfirmLogout(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleUpdateName = async () => {
    if (!user) return;
    try {
      await updateProfile(user, { displayName: newName });
      setEditingName(false);
    } catch (error) {
      console.error('Gagal update nama:', error);
    }
  };

  return (
    <>
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center relative shadow">
        <h1 className="text-xl font-bold tracking-wide">CodeBase</h1>

        <div className="space-x-6 flex items-center">
          <Link href="/" className="hover:underline">Beranda</Link>
          <Link href="/games" className="hover:underline">Permainan</Link>
          <Link href="/learning" className="hover:underline">Materi</Link>
          <Link href="/tentang" className="hover:underline">Tentang Kami</Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-white p-2 hover:bg-blue-700 rounded-lg transition"
                title="Akun"
              >
                <UserCircle className="w-6 h-6" />
              </button>

              {showDropdown && (
  <motion.div
    initial={{ opacity: 0, y: -10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.95 }}
    transition={{ duration: 0.2 }}
    className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg p-4 text-black z-20"
  >
    <div className="flex items-start gap-2 mb-4">
      <UserCircle className="w-8 h-8 text-blue-600 mt-1" />
      <div className="flex-1">
        {editingName ? (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="text-sm border rounded px-2 py-1 w-full"
            />
            <button
              onClick={handleUpdateName}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Simpan
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold truncate">
              Halo, {user.displayName || "Pengguna"}
            </p>
            <button
              onClick={() => setEditingName(true)}
              className="text-gray-500 hover:text-blue-600"
              title="Edit nama"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        )}
        <p className="text-sm text-gray-600 truncate">{user.email}</p>
      </div>
    </div>

    {/* Tombol Lihat Sertifikat */}
    <button
      onClick={() => {
        setShowDropdown(false);
        window.location.href = '/certificate';
      }}
      className="flex items-center w-full px-4 py-2 mb-2 text-sm text-blue-600 hover:bg-gray-100 rounded-lg transition"
    >
      🎖️ Lihat Sertifikat
    </button>

    {/* Tombol Logout */}
    <button
      onClick={() => setShowConfirmLogout(true)}
      className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 rounded-lg transition"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Keluar
    </button>
  </motion.div>
)}

            
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
              Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Konfirmasi Logout Modal */}
      <AnimatePresence>
        {showConfirmLogout && (
          <motion.div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold mb-2">Yakin ingin keluar?</h2>
              <p className="text-sm text-gray-600 mb-4">Anda akan keluar dari akun ini.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Ya, Keluar
                </button>
                <button
                  onClick={() => setShowConfirmLogout(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Batal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
