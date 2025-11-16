import { Link } from "react-router-dom";
import {
  HeartIcon,
  UsersIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const Home = () => (
  <div className="w-full min-h-screen flex flex-col justify-center items-center py-12 px-4 bg-gradient-to-br from-red-50 to-white">
    <div className="flex items-center gap-3 mb-4">
      <HeartIcon className="h-10 w-10 text-red-600 animate-bounce" />
      <h1 className="text-2xl sm:text-4xl font-extrabold text-primary text-center">
        Blood Bank Management System
      </h1>
    </div>
    <div className="w-full max-w-xl mb-8 text-base sm:text-lg text-gray-700 text-center">
      <p className="mb-2">
        <span className="font-semibold text-red-800">
          Where every click can help save a life.
        </span>
      </p>
      <p>
        Join our life-saving platform—unite donors, hospitals, and seekers for
        urgent help and hope. Your next step could change everything for someone
        in crisis.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-md">
      <Link
        to="/register"
        className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center gap-2 shadow transition"
      >
        <UsersIcon className="h-6 w-6 text-white" />
        Become a Life Saver
      </Link>
      <Link
        to="/requests"
        className="flex-1 bg-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 flex items-center justify-center gap-2 shadow transition"
      >
        <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
        View Urgent Requests
      </Link>
    </div>
    <div className="text-xs text-gray-500 max-w-md text-center mt-10">
      We believe every donor is a hero, and every request is a call for hope.
    </div>
  </div>
);

export default Home;
