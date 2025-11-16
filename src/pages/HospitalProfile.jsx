import { useAuth } from "../hooks/useAuth";
import InventoryManager from "../components/hospital/InventoryManager";
import { BuildingOffice2Icon, HeartIcon } from "@heroicons/react/24/solid";

const HospitalProfile = () => {
  const { user } = useAuth();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-8">
      <div className="w-full max-w-xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2 text-blue-800">
          <BuildingOffice2Icon className="h-7 w-7 text-blue-600" />
          Hospital Profile: {user?.name}
        </h2>
        <div className="mb-6 flex items-center gap-2 p-3 rounded bg-blue-50 text-blue-700 border border-blue-200 text-sm shadow">
          <HeartIcon className="h-5 w-5 text-red-600" />
          Your inventory and information are trusted in moments of need. Thank
          you for being a pillar of hope in your community.
        </div>
        <InventoryManager />
        {/* Add more profile update fields if needed */}
      </div>
    </div>
  );
};

export default HospitalProfile;
