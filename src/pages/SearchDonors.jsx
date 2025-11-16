import { useState } from "react";
import { donorService } from "../services/donorService";
import { BLOOD_GROUPS } from "../utils/constants";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const SearchDonors = () => {
  const [params, setParams] = useState({
    bloodGroup: BLOOD_GROUPS[0],
    city: "",
  });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    donorService
      .searchDonors(params)
      .then((data) => {
        setDonors(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8">
      <div className="w-full max-w-screen-lg mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2 flex items-center gap-2">
          <MagnifyingGlassIcon className="h-7 w-7 text-red-600" />
          Find Life-Saving Donors
        </h2>
        <p className="mb-6 text-gray-700 text-base">
          Searching for a donor is searching for a hero. Every successful match
          could be hope for someone in need.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-2 mb-8 w-full"
          onSubmit={handleSearch}
        >
          <select
            name="bloodGroup"
            value={params.bloodGroup}
            onChange={handleChange}
            className="px-3 py-2 border rounded w-full sm:w-auto"
            required
          >
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="city"
            placeholder="Enter city"
            value={params.city}
            onChange={handleChange}
            className="px-3 py-2 border rounded w-full sm:w-56"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            Search Heroes
          </button>
        </form>
        {loading ? (
          <div className="py-10 text-center text-lg flex flex-col items-center gap-2">
            <HeartIcon className="h-7 w-7 text-red-500 animate-pulse" />
            Searching for lifesavers...
          </div>
        ) : donors.length === 0 ? (
          <div className="text-gray-500 text-lg flex items-center gap-2">
            <MagnifyingGlassIcon className="h-5 w-5" />
            No donors found—please try a different search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white shadow rounded-xl p-4 border-l-4 border-red-500 flex flex-col gap-1 w-full transition-transform hover:-translate-y-1 duration-200"
              >
                <div className="font-semibold text-xl flex items-center gap-2 mb-2">
                  <UserIcon className="h-5 w-5 text-blue-600" />
                  {donor.name}
                </div>
                <div className="flex items-center gap-2">
                  <HeartIcon className="h-5 w-5 text-red-600" />
                  <span className="font-bold">{donor.bloodGroup}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-gray-500" />
                  <span>{donor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-green-600" />
                  <span>{donor.location?.city || "N/A"}</span>
                </div>
                <div className="text-xs text-gray-500 italic mt-1">
                  Reaching out to a donor could save a life.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;
