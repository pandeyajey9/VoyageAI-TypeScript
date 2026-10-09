import useAuthStore from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full border-b border-sky-400/30 bg-black/80 backdrop-blur-md">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center py-5 sm:px-8 gap-4">
        <Link to="/dashboard" className="no-underline">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white [text-shadow:_0_0_8px_rgba(0,0,0,0.9),_0_2px_4px_rgba(0,0,0,0.9),_0_0_2px_rgba(0,0,0,1)] tracking-wide">
            Voyage<span className="text-sky-400">AI</span>
          </h1>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-3 w-full md:w-auto">
          <Link
            to="/ai-assistant"
            className="bg-black/60 hover:bg-sky-950/40 border border-sky-700/90 hover:border-sky-500 px-2 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2 rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-medium text-white transition-all duration-300 whitespace-nowrap"
          >
            Ask AI ⚡
          </Link>
          <button
            onClick={() => navigate("/favourites")}
            className="bg-black/60 hover:bg-sky-950/40 border border-sky-700/90 hover:border-sky-500 px-2 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2 rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-medium text-white transition-all duration-300 whitespace-nowrap"
          >
            Favourites
          </button>

          <Link
            to="/create-trip"
            className="bg-black/60 hover:bg-sky-950/40 border border-sky-700/90 hover:border-sky-500 px-2 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2 rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-medium text-white transition-all duration-300 whitespace-nowrap"
          >
            + Plan New Journey
          </Link>

          <button
            onClick={() => navigate("/trips")}
            className="bg-black/60 hover:bg-sky-950/40 border border-sky-700/90 hover:border-sky-500 px-2 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2 rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-medium text-white transition-all duration-300 whitespace-nowrap"
          >
            All Plans →
          </button>

          <button
            onClick={handleLogout}
            className="bg-black/90 hover:bg-red-950/20 border border-sky-700/90 hover:border-red-700/80 px-2 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2 rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-medium text-white transition-all duration-300 whitespace-nowrap"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
