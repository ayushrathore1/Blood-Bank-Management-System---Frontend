import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  HeartIcon,
  UserIcon,
  UsersIcon,
  BuildingOffice2Icon,
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-primary text-white shadow-lg w-full sticky top-0 z-50">
      <div className="mx-auto max-w-screen-2xl px-4">
        {/* Content Row */}
        <div className="flex justify-between items-center py-4 w-full">
          {/* Branding */}
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2 hover:text-gray-200"
            tabIndex={0}
          >
            <HeartIcon className="h-7 w-7 text-red-600 animate-bounce" />
            Blood Bank
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/requests"
              className="hover:text-gray-200 transition flex items-center gap-1"
              tabIndex={0}
            >
              <HeartIcon className="h-5 w-5 text-white" />
              All Requests
            </Link>
            <Link
              to="/search-donors"
              className="hover:text-gray-200 transition flex items-center gap-1"
              tabIndex={0}
            >
              <UsersIcon className="h-5 w-5 text-white" />
              Find Donors
            </Link>
            <Link
              to="/search-hospitals"
              className="hover:text-gray-200 transition flex items-center gap-1"
              tabIndex={0}
            >
              <BuildingOffice2Icon className="h-5 w-5 text-white" />
              Find Hospitals
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-gray-200 transition flex items-center gap-1"
                  tabIndex={0}
                >
                  <UserIcon className="h-5 w-5 text-white" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-sm bg-secondary px-3 py-1 rounded-full flex items-center gap-1">
                    <UserIcon className="h-4 w-4 text-white" />
                    {user?.name} ({user?.userType})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium flex items-center gap-1"
                    type="button"
                  >
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-primary" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium flex items-center gap-1"
                  tabIndex={0}
                >
                  <UserIcon className="h-5 w-5 text-primary" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-secondary px-4 py-2 rounded-lg hover:bg-red-800 transition font-medium flex items-center gap-1"
                  tabIndex={0}
                >
                  <UsersIcon className="h-5 w-5 text-white" />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
            tabIndex={0}
          >
            {menuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-primary w-full rounded-b-lg shadow-lg">
            <div className="flex flex-col gap-3 py-4 px-2">
              <Link
                to="/requests"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-200 flex items-center gap-2 py-2 px-2"
              >
                <HeartIcon className="h-5 w-5 text-white" />
                All Requests
              </Link>
              <Link
                to="/search-donors"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-200 flex items-center gap-2 py-2 px-2"
              >
                <UsersIcon className="h-5 w-5 text-white" />
                Find Donors
              </Link>
              <Link
                to="/search-hospitals"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-200 flex items-center gap-2 py-2 px-2"
              >
                <BuildingOffice2Icon className="h-5 w-5 text-white" />
                Find Hospitals
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-200 flex items-center gap-2 py-2 px-2"
                  >
                    <UserIcon className="h-5 w-5 text-white" />
                    Dashboard
                  </Link>
                  <span className="bg-secondary px-3 py-1 rounded-full flex items-center gap-2 mt-2 text-sm text-white">
                    <UserIcon className="h-4 w-4 text-white" />
                    {user?.name} ({user?.userType})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium flex items-center gap-2 mt-2"
                    type="button"
                  >
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-primary" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium flex items-center gap-2"
                  >
                    <UserIcon className="h-5 w-5 text-primary" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-secondary px-4 py-2 rounded-lg hover:bg-red-800 transition font-medium flex items-center gap-2"
                  >
                    <UsersIcon className="h-5 w-5 text-white" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
