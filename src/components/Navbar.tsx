import { Link, useLocation } from "react-router-dom";
import { clearToken } from "../services/auth";

interface Props {
  variant?: "auth" | "app";
}

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 group">
    <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-200 group-hover:scale-105 transition-transform duration-200">
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    </div>
    <span className="font-bold text-gray-900 text-lg tracking-tight">NutriScan</span>
  </Link>
);

export default function Navbar({ variant = "auth" }: Props) {
  const { pathname } = useLocation();

  const handleLogout = () => {
    clearToken();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100/80 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        {variant === "auth" ? (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className={`text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200
                ${pathname === "/login"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200
                ${pathname === "/register"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-200"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-200 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg active:scale-95"
                }`}
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 font-medium transition-colors duration-200 cursor-pointer group"
          >
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
