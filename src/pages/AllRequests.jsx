import { useEffect, useState } from "react";
import { requestService } from "../services/requestService";
import {
  HeartIcon,
  ExclamationCircleIcon,
  PhoneIcon,
  UserIcon,
  BuildingOffice2Icon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestService
      .getAllRequests()
      .then((data) => {
        setRequests(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[30vh] w-full bg-white">
        <HeartIcon className="h-8 w-8 text-red-600 mb-2 animate-pulse" />
        <span className="text-lg text-gray-700">
          Loading life-saving requests...
        </span>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 pb-10">
      <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-700 mb-1 flex items-center gap-2">
          <HeartIcon className="h-7 w-7 text-red-600" />
          Life-Saving Blood Requests
        </h2>
        <p className="mb-6 text-base sm:text-lg text-gray-700">
          Every request here is a chance to be someone's hero. Thank you for
          making a difference.
        </p>
        {requests.length === 0 ? (
          <div className="text-lg text-gray-500 flex items-center gap-2">
            <ExclamationCircleIcon className="h-6 w-6 text-gray-400" />
            No urgent requests found at the moment.
          </div>
        ) : (
          <div
            className="
            grid grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-4 sm:gap-6
          "
          >
            {requests.map((req) => (
              <div
                key={req._id}
                className="
                  bg-white shadow-lg rounded-xl p-6 flex flex-col gap-2 border-l-4 border-red-600
                  w-full transition-transform duration-200 hover:-translate-y-1
                  "
              >
                {/* Request Header */}
                <div className="flex items-center gap-2 mb-2">
                  <UserIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-xl font-bold text-red-700 line-clamp-1">
                    {req.patientName}
                  </span>
                </div>
                {/* Main Details */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:text-base">
                  <span className="flex items-center gap-1">
                    <HeartIcon className="h-5 w-5 text-red-500" />
                    <span className="font-semibold">Blood Group:</span>{" "}
                    {req.bloodGroup}
                  </span>
                  <span>
                    <span className="font-semibold">Units Needed:</span>{" "}
                    {req.unitsNeeded}
                  </span>
                  <span className="flex items-center gap-1">
                    <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">Urgency:</span>{" "}
                    <span className="text-red-700">{req.urgency}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <BuildingOffice2Icon className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Hospital:</span>{" "}
                    {req.hospitalName}
                  </span>
                  <span className="flex items-center gap-1">
                    <InformationCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">Status:</span> {req.status}
                  </span>
                  <a
                    href={`tel:${req.contactNumber}`}
                    className="flex items-center gap-1 underline text-blue-700 hover:text-blue-900"
                  >
                    <PhoneIcon className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold">Contact:</span>{" "}
                    {req.contactNumber}
                  </a>
                </div>
                {/* Extra Info */}
                {req.additionalInfo && (
                  <span className="flex items-center gap-1 mt-2 text-sm text-gray-700">
                    <InformationCircleIcon className="h-5 w-5 text-indigo-500" />
                    <span className="font-semibold">Extra Info:</span>{" "}
                    {req.additionalInfo}
                  </span>
                )}
                {/* Footer */}
                <div className="mt-1 text-xs text-gray-500 italic">
                  When you respond, you bring hope and healing to families. Your
                  act truly saves lives.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;
