import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { hospitalService } from "../services/hospitalService";
import { requestService } from "../services/requestService";
import {
  BuildingOffice2Icon,
  HeartIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const HospitalDashboard = () => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hospitalService
      .getHospitalById(user?.id)
      .then((res) => setInventory(res.data.inventory || []));
    requestService
      .getAllRequests()
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-8">
      <div className="w-full max-w-screen-lg mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-primary flex items-center gap-2">
          <BuildingOffice2Icon className="h-7 w-7 text-blue-600" />
          Welcome, {user?.name ? user.name : "Hospital"}!
        </h2>
        <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 shadow">
          <HeartIcon className="h-6 w-6 text-red-600" />
          You are trusted with lives—every unit and request here is a step
          towards healing and hope.
        </div>

        {/* Inventory grid */}
        <h3 className="mb-2 font-semibold text-lg flex items-center gap-2 text-blue-800">
          <HeartIcon className="h-5 w-5 text-red-400" />
          Current Blood Inventory
        </h3>
        <div className="flex flex-wrap gap-3 mb-6">
          {inventory.length === 0 ? (
            <span className="text-gray-500 italic">
              No inventory data available.
            </span>
          ) : (
            inventory.map((inv) => (
              <span
                key={inv.bloodGroup}
                className="px-4 py-2 border-l-4 border-red-500 rounded bg-white shadow text-sm font-semibold flex items-center gap-2"
              >
                <HeartIcon className="h-4 w-4 text-red-500" />
                {inv.bloodGroup}:{" "}
                <span className="text-red-700">{inv.unitsAvailable}</span> units
              </span>
            ))
          )}
        </div>

        {/* Recent Requests */}
        <h3 className="mb-2 font-semibold text-lg flex items-center gap-2 text-blue-800">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
          Recent Life-Saving Requests
        </h3>
        {loading ? (
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <HeartIcon className="h-5 w-5 text-red-500 animate-pulse" />
            Loading recent requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-500">
            <ExclamationTriangleIcon className="h-5 w-5" />
            No blood requests right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {requests.slice(0, 5).map((r) => (
              <div
                key={r._id}
                className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-gray-700" />
                  <span className="font-semibold">Patient:</span>
                  <span className="text-red-800">{r.patientName}</span>
                </div>
                <div>
                  <span className="font-semibold">Units Needed:</span>{" "}
                  {r.unitsNeeded}
                </div>
                <div className="flex items-center gap-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold">Urgency:</span>{" "}
                  <span className="text-red-700">{r.urgency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold">Contact:</span>{" "}
                  {r.contactNumber}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="text-blue-700">{r.status}</span>
                </div>
                <div className="text-xs text-gray-500 italic mt-1">
                  Your response brings hope to those in need of critical care.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDashboard;
