import Link from "next/link";

const AuthForm = ({ type }: { type: "login" | "signup" }) => {
  const isLogin = type === "login";

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-4">{isLogin ? "Login now" : "Sign Up"}</h2>
      <p className="mb-6">{isLogin ? "Hi, Welcome back 👋" : "Join us today 🚀"}</p>
      <button className="w-full bg-pink-400 text-white py-3 rounded-md flex items-center justify-center mb-4">
        <span className="mr-2">🔴</span> Login with Google
      </button>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-400">or {isLogin ? "Login" : "Sign Up"} with Email</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <input type="email" placeholder="Enter your email" className="w-full p-3 border rounded-md mb-4" />
      <input type="password" placeholder="Enter your password" className="w-full p-3 border rounded-md mb-4" />
      <div className="flex justify-between mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" /> Remember Me
        </label>
        {isLogin && <Link href="#" className="text-indigo-600">Forgot Password?</Link>}
      </div>
      <button className="w-full bg-indigo-600 text-white py-3 rounded-md">
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <p className="text-center mt-4">
        {isLogin ? "Not registered yet?" : "Already have an account?"}{" "}
        <Link href={isLogin ? "/signup" : "/login"} className="text-pink-400">
          {isLogin ? "Create an account" : "Login"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
