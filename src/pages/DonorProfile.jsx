import { useAuth } from "../hooks/useAuth";
import { donorService } from "../services/donorService";
import { useState } from "react";
import {
  HeartIcon,
  UserIcon,
  IdentificationIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

const DonorProfile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(user || {});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await donorService.updateDonor(user.id, form);
    setSuccess(true);
  };

  return (
    <form
      onSubmit={handleSave}
      className="
        w-full
        max-w-xl
        mx-auto
        my-10
        bg-white
        rounded-xl
        shadow
        px-4
        py-8
        sm:px-8
        sm:py-10
      "
    >
      <h3 className="mb-6 text-xl sm:text-2xl font-bold text-red-700 flex items-center gap-2">
        <HeartIcon className="h-7 w-7 text-red-600" />
        Heroic Donor Profile
      </h3>
      <div className="mb-4 text-sm px-3 py-2 rounded bg-red-100 text-red-700 flex gap-2 items-center border border-red-200">
        <UserIcon className="h-5 w-5 text-red-600" />
        Your profile powers hope—keeping it updated saves lives when it matters
        most.
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <IdentificationIcon className="h-5 w-5 text-gray-700" />
          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Your full name"
            className="px-3 py-2 border rounded-md w-full focus:ring-2 focus:ring-red-400"
            required
            autoComplete="name"
          />
        </div>
        <div className="flex items-center gap-2">
          <HeartIcon className="h-5 w-5 text-red-500" />
          <input
            name="bloodGroup"
            value={form.bloodGroup || ""}
            onChange={handleChange}
            placeholder="Blood Group (e.g., B+)"
            className="px-3 py-2 border rounded-md w-full focus:ring-2 focus:ring-red-400"
            required
            autoComplete="off"
          />
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="h-5 w-5 text-gray-600" />
          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Your contact number"
            className="px-3 py-2 border rounded-md w-full focus:ring-2 focus:ring-red-400"
            required
            autoComplete="tel"
          />
        </div>
        {/* Add more fields as needed, matching your existing design */}
      </div>
      <button
        className="w-full bg-primary text-white px-6 py-3 mt-6 rounded-lg font-bold shadow hover:bg-red-700 transition"
        type="submit"
      >
        Save & Keep Saving Lives
      </button>
      {success && (
        <div className="mt-4 text-sm bg-green-100 border border-green-200 text-green-700 rounded p-2 flex items-center gap-2">
          <HeartIcon className="h-5 w-5 text-green-600" />
          Profile updated! You’re ready to help save a life.
        </div>
      )}
    </form>
  );
};

export default DonorProfile;
