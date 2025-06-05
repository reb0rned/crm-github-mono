import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 gap-4">
        <Link
          to="/projects"
          className="text-2xl font-bold cursor-pointer select-none text-white"
        >
          CRM GitHub Projects
        </Link>

        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-white items-start sm:items-center">
          {user ? (
            <>
              <Link to="/projects" className="hover:underline">
                Projects
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
