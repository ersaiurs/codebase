import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-10 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-indigo-600">EducareBook</h1>
      <div>
        <Link href="/signup" className="bg-indigo-600 text-white px-6 py-2 rounded-md">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
