import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { requestService } from "../services/requestService";
import {
  HeartIcon,
  UserIcon,
  ExclamationCircleIcon,
  PhoneIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

const DonorDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestService
      .getAllRequests({ bloodGroup: user?.bloodGroup })
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8">
      <div className="w-full max-w-screen-lg mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-primary flex items-center gap-2">
          <HeartIcon className="h-7 w-7 text-red-600" />
          Welcome, {user?.name ? user.name : "Donor"}!
        </h2>
        {/* Banner */}
        <div className="text-base sm:text-lg mb-5 text-red-700 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-4 shadow">
          <UserIcon className="h-6 w-6 text-red-500" />
          Thank you for being a lifesaver. You are the hope someone needs.
        </div>
        {/* Sub-heading */}
        <h3 className="text-lg sm:text-xl mb-3 font-semibold flex items-center gap-2 text-gray-800">
          <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />
          Urgent Requests Matching Your Blood Group
        </h3>
        {/* Requests List */}
        {loading ? (
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <HeartIcon className="h-5 w-5 text-red-500 animate-pulse" />
            Loading life-saving requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="flex items-center gap-2 text-lg text-gray-500">
            <ExclamationCircleIcon className="h-5 w-5" />
            No matching urgent requests right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {requests.map((r) => (
              <div
                key={r._id}
                className="bg-white p-4 rounded-xl shadow border-l-4 border-red-500 flex flex-col gap-2"
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
                  <ExclamationCircleIcon className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold">Urgency:</span>
                  <span className="text-red-700">{r.urgency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold">Contact:</span>{" "}
                  {r.contactNumber}
                </div>
                <div className="flex items-center gap-2">
                  <BuildingOffice2Icon className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Hospital:</span>{" "}
                  {r.hospitalName}
                </div>
                <div className="text-xs text-gray-500 italic mt-1">
                  Your response can bring hope and healing to a family in
                  crisis.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
