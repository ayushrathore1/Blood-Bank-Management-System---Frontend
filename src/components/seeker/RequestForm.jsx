import { useState } from "react";
import { requestService } from "../../services/requestService";
import { BLOOD_GROUPS, URGENCY_LEVELS } from "../../utils/constants";
import {
  HeartIcon,
  ExclamationTriangleIcon,
  BuildingOffice2Icon,
  UserIcon,
  PhoneIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const initialState = {
  bloodGroup: BLOOD_GROUPS[0],
  unitsNeeded: 1,
  urgency: "routine",
  hospitalName: "",
  patientName: "",
  contactNumber: "",
  additionalInfo: "",
};

const RequestForm = ({ onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      await requestService.createRequest(form);
      setSuccess(true);
      setForm(initialState);
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-3"
    >
      <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-red-700">
        <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
        Life-Saving Blood Request Form
      </h3>
      <div className="mb-4 text-sm text-gray-600">
        Posting a request is an act of courage—it could be the moment you save a
        life.
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-3 flex items-center gap-2">
          <XCircleIcon className="h-5 w-5 text-red-600" />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded mb-3 flex items-center gap-2">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          Request posted! Help is on the way.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium">
            <HeartIcon className="h-5 w-5 text-red-500" />
            Blood Group
          </label>
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            required
            className="border px-2 py-2 rounded w-full focus:ring-2 focus:ring-red-300"
          >
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Units Needed</label>
          <input
            type="number"
            name="unitsNeeded"
            value={form.unitsNeeded}
            min={1}
            max={10}
            onChange={handleChange}
            required
            className="border px-2 py-2 rounded w-full focus:ring-2 focus:ring-red-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
            Urgency
          </label>
          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            required
            className="border px-2 py-2 rounded w-full focus:ring-2 focus:ring-red-300"
          >
            {URGENCY_LEVELS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium">
            <BuildingOffice2Icon className="h-5 w-5 text-blue-600" />
            Hospital Name
          </label>
          <input
            type="text"
            name="hospitalName"
            value={form.hospitalName}
            onChange={handleChange}
            required
            className="border px-2 py-2 rounded w-full focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium">
            <UserIcon className="h-5 w-5 text-gray-700" />
            Patient Name
          </label>
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            required
            className="border px-2 py-2 rounded w-full focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium">
            <PhoneIcon className="h-5 w-5 text-gray-500" />
            Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            required
            className="border px-2 py-2 rounded w-full focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium">
            <InformationCircleIcon className="h-5 w-5 text-indigo-500" />
            Additional Info
          </label>
          <textarea
            name="additionalInfo"
            value={form.additionalInfo}
            onChange={handleChange}
            rows={2}
            className="border px-2 py-2 rounded w-full focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </div>
      <button
        disabled={loading}
        className="mt-4 bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 justify-center hover:bg-red-700 transition disabled:opacity-50"
        type="submit"
      >
        {loading ? (
          "Submitting..."
        ) : (
          <>
            <HeartIcon className="h-5 w-5 text-white" />
            Create Life-Saving Request
          </>
        )}
      </button>
    </form>
  );
};

export default RequestForm;
