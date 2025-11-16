import RequestForm from "../components/seeker/RequestForm";
import { useAuth } from "../hooks/useAuth";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const SeekerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50 py-8 flex flex-col items-center">
      <div className="w-full max-w-xl px-4 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-primary flex items-center gap-2 text-center">
          <ExclamationTriangleIcon className="h-7 w-7 text-yellow-500" />
          Welcome, {user?.name ? user.name : "Seeker"}!
        </h2>
        <div className="mb-6 p-4 rounded-lg bg-yellow-50 text-yellow-800 border border-yellow-200 text-center text-base shadow">
          Your strength and courage help save lives. You are never alone—our
          heroes and hospitals stand with you.
        </div>
        <RequestForm />
      </div>
    </div>
  );
};

export default SeekerDashboard;
