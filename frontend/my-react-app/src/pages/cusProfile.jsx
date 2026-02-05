// src/components/Profile.jsx
import React, { useState } from 'react';
import { FaBars, FaEdit } from 'react-icons/fa';
import { motion } from "framer-motion"; // For animations
import Footer from './Footer';

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+123 456 7890',
    address: '123 Main Street, City, Country',
    vehicleMake: 'Toyota',
    vehicleModel: 'Corolla',
    vehicleYear: '2020',
    licensePlate: 'ABC-1234',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' // Placeholder image
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Framer Motion animation variants (copied from CustomerDashboard.jsx and EditProfile.jsx)
  const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const slideUpVarijants = {
    visible: { opacityjj: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };


  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
s
    const pulseVasriants = {
    pulse: {
      scale: [1, 1.1, s1],
s    }
  };

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  onst sidebarVariants = {
    visible: { x: 0, transition: { dxuration: 0.3, ease: "easeInOut" } }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-900">
      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.aside 
          className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transform 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:static md:translate-x-0 md:w-64 md:min-w-[16rem] transition-transform duration-300 ease-in-out z-20`}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }} // Always visible on desktop, overridden by CSS on mobile
          variants={sidebarVariants}
          // Only apply animation on mobile
          {...(window.innerWidth < 768 ? { animate: isSidebarOpen ? "visible" : "hidden" } : {})}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-center text-2xl font-extrabold flex-1 font-[Poppins] tracking-tight">Servio Dashboard</h2>
            <button className="md:hidden text-2xl hover:text-orange-500 transition-colors duration-200" onClick={toggleSidebar}>
              ×
            </button>
          </div>
          <ul className="space-y-2 font-[Open Sans]">
            {[
              { text: 'Home', path: '/dashboard' },
              { text: 'Profile', path: '/profile', active: true },
              { text: 'Contact Us', path: '/contact' },
              { text: 'About Us', path: '/about-us' },
              { text: 'Logout', path: '/logout' },
            ].map((item) => (
              <li key={item.text} className="border-b border-gray-600">
                <a 
                  href={item.path}
                  className={`block py-3 px-4 hover:bg-orange-700 hover:scale-105 transition-all duration-300 ease-in-out transform ${
                    item.active ? 'bg-orange-600 font-bold scale-105' : ''
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </motion.aside>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 hover:scale-110 transition-all duration-200 ease-in-out"
          onClick={toggleSidebar}
          variants={pulseVariants}
          animate="pulse"
        >
          <FaBars />
        </motion.button>

        {/* Main Content */}
        <main className="flex-1 p-5 max-w-7xl mx-auto w-full">
          <motion.header 
            className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-4 rounded-lg mb-6 flex justify-between items-center shadow-lg"
            initial="hidden"
            animate="visible"
            variants={slideUpVariants}
          >
            <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Your Profile</h1>
          </motion.header>

          {/* Profile Sections */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Picture Section */}
            <motion.section 
              className="p-6 rounded-lg shadow-lg bg-white flex flex-col items-center"
              initial="hidden"
              animate="visible"
              variants={scaleUpVariants}
            >
              <img 
                src={userData.profilePicture} 
                alt="Profile Picture" 
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-600"
              />
            </motion.section>

            {/* Personal Information and Vehicle Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Sector */}
              <motion.section 
                className="p-6 rounded-lg shadow-lg bg-white"
                initial="hidden"
                animate="visible"
                variants={scaleUpVariants}
                transition={{ delay: 0.1 }} // Matches animate-delay-100
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 font-[Poppins]">Personal Information</h2>
                  <a 
                    href="/edit-profile"
                    className="text-orange-600 hover:text-orange-800 hover:scale-105 transition-all duration-200 ease-in-out flex items-center gap-1"
                    title="Edit Personal Information"
                  >
                    <FaEdit /> Edit
                  </a>
                </div>
                <div className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">Full Name</label>
                    <p className="text-gray-900">{userData.name}</p>
                  </div>
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">Email</label>
                    <p className="text-gray-900">{userData.email}</p>
                  </div>
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">Phone Number</label>
                    <p className="text-gray-900">{userData.phone}</p>
                  </div>
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">Address</label>
                    <p className="text-gray-900">{userData.address}</p>
                  </div>
                </div>
              </motion.section>

              {/* Vehicle Details Sector */}
              <motion.section 
                className="p-6 rounded-lg shadow-lg bg-white"
                initial="hidden"
                animate="visible"
                variants={scaleUpVariants}
                transition={{ delay: 0.2 }} // Matches animate-delay-200
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 font-[Poppins]">Vehicle Details</h2>
                  <a 
                    href="/edit-profile"
                    className="text-orange-600 hover:text-orange-800 hover:scale-105 transition-all duration-200 ease-in-out flex items-center gap-1"
                    title="Edit Vehicle Details"
                  >
                    <FaEdit /> Edit
                  </a>
                </div>
                <div className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">Make</label>
                    <p className="text-gray-900">{userData.vehicleMake}</p>
                  </div>
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">Model</label>
                    <p className="text-gray-900">{userData.vehicleModel}</p>
                  </div>
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">Year</label>
                    <p className="text-gray-900">{userData.vehicleYear}</p>
                  </div>
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">License Plate</label>
                    <p className="text-gray-900">{userData.licensePlate}</p>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </main>
      </div>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}

export default Profile;
