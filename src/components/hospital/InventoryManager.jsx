import { hospitalService } from "../../services/hospitalService";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { BLOOD_GROUPS } from "../../utils/constants";
import {
  HeartIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const InventoryManager = () => {
  const { user } = useAuth();
  const [units, setUnits] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (bg, value) => {
    setUnits((u) => ({ ...u, [bg]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      for (const bg of BLOOD_GROUPS) {
        await hospitalService.updateInventory(user.id, {
          bloodGroup: bg,
          unitsAvailable: units[bg] || 0,
        });
      }
      setSuccess("Inventory updated! You're prepared to save more lives.");
    } catch {
      setError("Failed to update inventory. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="w-full max-w-lg mx-auto bg-white shadow rounded-xl p-6 my-6 space-y-3"
    >
      <h3 className="font-bold mb-2 flex items-center gap-2 text-blue-700">
        <HeartIcon className="h-6 w-6 text-red-600" />
        Manage Blood Inventory
      </h3>
      <div className="mb-4 text-sm text-gray-600">
        Keeping your inventory updated keeps hope alive for those in urgent
        need.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BLOOD_GROUPS.map((bg) => (
          <div
            key={bg}
            className="flex items-center gap-2 bg-blue-50 rounded p-2"
          >
            <HeartIcon className="h-5 w-5 text-red-500" />
            <span className="font-semibold">{bg}:</span>
            <input
              type="number"
              min={0}
              name={bg}
              value={units[bg] || ""}
              onChange={(e) => handleChange(bg, e.target.value)}
              className="border rounded px-2 py-1 w-20 focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}
      </div>
      <button
        className="w-full bg-primary text-white px-4 py-2 mt-2 rounded-lg font-bold flex items-center gap-2 justify-center hover:bg-blue-700 transition"
        type="submit"
      >
        <HeartIcon className="h-5 w-5 text-white" />
        Update & Save Lives
      </button>
      {success && (
        <div className="mt-2 text-green-600 flex items-center gap-2">
          <CheckCircleIcon className="h-5 w-5" />
          {success}
        </div>
      )}
      {error && (
        <div className="mt-2 text-red-600 flex items-center gap-2">
          <XCircleIcon className="h-5 w-5" />
          {error}
        </div>
      )}
    </form>
  );
};

export default InventoryManager;
