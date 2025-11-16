import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { USER_TYPES, BLOOD_GROUPS } from "../utils/constants";
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validatePincode,
} from "../utils/validators";
import {
  HeartIcon,
  UserIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    userType: "donor",
    name: "",
    email: "",
    password: "",
    phone: "",
    bloodGroup: "A+",
    age: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    registrationNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!validateEmail(formData.email)) {
      setError("Invalid email address");
      return false;
    }
    if (!validatePhone(formData.phone)) {
      setError("Phone number must be 10 digits");
      return false;
    }
    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!validatePincode(formData.pincode)) {
      setError("Pincode must be 6 digits");
      return false;
    }
    if (
      formData.userType === "donor" &&
      (!formData.age || formData.age < 18 || formData.age > 65)
    ) {
      setError("Donor age must be between 18 and 65");
      return false;
    }
    if (formData.userType === "hospital" && !formData.registrationNumber) {
      setError("Hospital registration number is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      const userData = {
        userType: formData.userType,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: {
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          address: formData.address,
        },
      };
      if (formData.userType === "donor") {
        userData.bloodGroup = formData.bloodGroup;
        userData.age = parseInt(formData.age, 10);
      }
      if (formData.userType === "hospital") {
        userData.registrationNumber = formData.registrationNumber;
      }
      await register(userData);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheckIcon className="h-10 w-10 text-green-600" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
            Join Our Life-Saving Network
          </h2>
          <span className="text-sm text-gray-600 text-center">
            Every registration brings hope to someone in need.
          </span>
        </div>
        <form
          className="mt-8 space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-blue-600" />
              <label className="block text-sm font-medium text-gray-700">
                Register as
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              >
                {USER_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {formData.userType === "hospital"
                  ? "Hospital Name"
                  : "Full Name"}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10 digit number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
                autoComplete="tel"
              />
            </div>
            {formData.userType === "donor" && (
              <>
                <div className="flex items-center gap-2">
                  <HeartIcon className="h-5 w-5 text-red-500" />
                  <label className="block text-sm font-medium text-gray-700">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  >
                    {BLOOD_GROUPS.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="18"
                    max="65"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </>
            )}
            {formData.userType === "hospital" && (
              <div className="md:col-span-2 flex items-center gap-2">
                <BuildingOffice2Icon className="h-5 w-5 text-blue-600" />
                <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
                autoComplete="address-level2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
                autoComplete="address-level1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6 digit pincode"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
                autoComplete="postal-code"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register & Save Lives"}
          </button>
          <div className="text-center text-sm pt-2">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-primary hover:text-green-700"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
