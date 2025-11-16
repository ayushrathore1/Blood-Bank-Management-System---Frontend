import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SeekerDashboard from "./pages/SeekerDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import DonorProfile from "./pages/DonorProfile";
import HospitalProfile from "./pages/HospitalProfile";
import AllRequests from "./pages/AllRequests";
import SearchDonors from "./pages/SearchDonors";
import SearchHospitals from "./pages/SearchHospitals";
import RequestForm from "./components/seeker/RequestForm";

function App() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />
      <main className="flex-1 w-full bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="w-full mx-auto px-2 sm:px-4 md:px-8 max-w-screen-2xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/requests" element={<AllRequests />} />
            <Route path="/search-donors" element={<SearchDonors />} />
            <Route path="/search-hospitals" element={<SearchHospitals />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {user?.userType === "seeker" ? (
                    <SeekerDashboard />
                  ) : user?.userType === "donor" ? (
                    <DonorDashboard />
                  ) : user?.userType === "hospital" ? (
                    <HospitalDashboard />
                  ) : (
                    <Dashboard />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/donor"
              element={
                <ProtectedRoute allowedUserTypes={["donor"]}>
                  <DonorProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/hospital"
              element={
                <ProtectedRoute allowedUserTypes={["hospital"]}>
                  <HospitalProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request/create"
              element={
                <ProtectedRoute allowedUserTypes={["seeker"]}>
                  <RequestForm />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
