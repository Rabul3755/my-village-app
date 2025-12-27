import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import Map from "./pages/Map";
import Leaders from "./pages/Leaders";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminIssues from "./pages/admin/AdminIssues";
import AdminLeaders from "./pages/admin/AdminLeaders";
import AdminRepresentatives from "./pages/admin/AdminRepresentatives";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

// Create a separate component for public routes
const PublicRoutes = () => (
  <>
    <Header />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/map" element={<Map />} />
        <Route path="/leaders" element={<Leaders />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <AppProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Routes>
                {/* Public routes */}
                <Route path="/*" element={<PublicRoutes />} />
                
                {/* Admin login route */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
                {/* Admin protected routes */}
                <Route path="/admin/*" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="issues" element={<AdminIssues />} />
                  <Route path="leaders" element={<AdminLeaders />} />
                  <Route path="representatives" element={<AdminRepresentatives />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </AdminAuthProvider>
        </AuthProvider>
      </AppProvider>
    </Router>
  );
}

export default App;