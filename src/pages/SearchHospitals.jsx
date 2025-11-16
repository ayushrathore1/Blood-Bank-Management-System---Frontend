import { useState } from "react";
import { hospitalService } from "../services/hospitalService";
import {
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

const SearchHospitals = () => {
  const [params, setParams] = useState({ city: "" });
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    hospitalService
      .getAllHospitals(params)
      .then((data) => {
        setHospitals(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-8">
      <div className="w-full max-w-screen-lg mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2 flex items-center gap-2">
          <MagnifyingGlassIcon className="h-7 w-7 text-blue-600" />
          Find Trusted Hospitals
        </h2>
        <p className="mb-6 text-gray-700 text-base">
          Every hospital in this network is a pillar of hope, ready for urgent
          care and life-saving support.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-2 mb-8 w-full"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            name="city"
            placeholder="Enter city"
            value={params.city}
            onChange={handleChange}
            className="px-3 py-2 border rounded w-full sm:w-64"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            Search Hospitals
          </button>
        </form>
        {loading ? (
          <div className="py-10 text-center text-lg flex flex-col items-center gap-2">
            <BuildingOffice2Icon className="h-7 w-7 text-blue-400 animate-pulse" />
            Searching for pillars of healing...
          </div>
        ) : hospitals.length === 0 ? (
          <div className="text-gray-500 text-lg flex items-center gap-2">
            <MagnifyingGlassIcon className="h-5 w-5" />
            No hospitals found. Try a different city.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {hospitals.map((hospital) => (
              <div
                key={hospital._id}
                className="bg-white shadow rounded-xl p-4 border-l-4 border-blue-500 flex flex-col gap-1 w-full transition-transform hover:-translate-y-1 duration-200"
              >
                <div className="font-semibold text-xl flex items-center gap-2 mb-2">
                  <BuildingOffice2Icon className="h-5 w-5 text-blue-600" />
                  {hospital.name}
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-gray-500" />
                  <span>{hospital.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-green-700" />
                  <span>{hospital.location?.city || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                  <span>
                    Registration #:{" "}
                    <span className="font-mono font-bold">
                      {hospital.registrationNumber}
                    </span>
                  </span>
                </div>
                <div className="text-xs text-gray-500 italic mt-1">
                  Trusted for urgent care and support in your community.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHospitals;
