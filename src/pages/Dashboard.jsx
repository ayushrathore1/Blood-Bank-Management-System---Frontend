import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  UserIcon,
  UsersIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8">
      <div className="w-full max-w-screen-md mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2 flex items-center gap-2">
          <UserIcon className="h-7 w-7 text-blue-500" />
          Welcome, {user?.name ? user.name : "Life Saver"}!
        </h2>
        {/* Role Info */}
        <p className="mb-8 text-base sm:text-lg text-gray-700 flex items-center gap-2">
          <UsersIcon className="h-6 w-6 text-gray-600" />
          Role:{" "}
          <span className="font-semibold capitalize">{user?.userType}</span>
        </p>
        {/* Motivational Banner */}
        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center gap-2 shadow">
          <HeartIcon className="h-6 w-6 text-red-600 animate-pulse" />
          You hold the power to save lives. Every action here can be a beacon of
          hope.
        </div>
        {/* Actions */}
        <div className="flex flex-col gap-4 w-full">
          {user?.userType === "seeker" && (
            <Link
              to="/requests"
              className="bg-primary text-white px-4 py-3 rounded-lg font-medium w-full flex items-center gap-2 shadow hover:bg-red-700 transition"
            >
              <HeartIcon className="h-5 w-5 text-white" />
              View / Create Life-Saving Requests
            </Link>
          )}
          {user?.userType === "donor" && (
            <Link
              to="/search-donors"
              className="bg-primary text-white px-4 py-3 rounded-lg font-medium w-full flex items-center gap-2 shadow hover:bg-red-700 transition"
            >
              <HeartIcon className="h-5 w-5 text-white" />
              Respond & Become a Hero
            </Link>
          )}
          {user?.userType === "hospital" && (
            <Link
              to="/search-hospitals"
              className="bg-primary text-white px-4 py-3 rounded-lg font-medium w-full flex items-center gap-2 shadow hover:bg-red-700 transition"
            >
              <BuildingOffice2Icon className="h-5 w-5 text-white" />
              Manage Lifesaving Inventory & Requests
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
