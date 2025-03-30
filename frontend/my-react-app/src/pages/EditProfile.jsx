// src/components/EditProfile.jsx
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { motion } from "framer-motion"; // For animations
import Footer from './Footer';

function EditProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Lakshan',
    email: 'lakshan@gmail.com',
    phone: '+94 70 123 4567',
    address: '123 Kundasale, Kandy',
    vehicleMake: 'Toyota',
    vehicleModel: 'Corolla',
    vehicleYear: '2020',
    licensePlate: 'ABC-1234'
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
  };

  // Framer Motion animation variants from CustomerDashboard
  const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeIn" } }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } }
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
              { text: 'Service History', path: '/service-history' },
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
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 hover:scale-110 transition-all duration-200 ease-in-out animate-pulse"
          onClick={toggleSidebar}
          variants={pulseVariants}
          animate="pulse"
        >
          <FaBars />
        </motion.button>

        {/* Main Content */}
        <main className="flex-1 p-5 max-w-7xl mx-auto w-full">
          <motion.header 
            className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-4 rounded-lg mb-6 flex justify-between items-center shadow-lg animate-slide-up"
            initial="hidden"
            animate="visible"
            variants={slideUpVariants}
          >
            <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Edit Your Profile</h1>
          </motion.header>

          <motion.section 
            className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto animate-scale-up"
            initial="hidden"
            animate="visible"
            variants={scaleUpVariants}
          >
            <motion.h2 
              className="text-xl font-bold text-gray-800 mb-4 font-[Poppins]"
              initial="hidden"
              animate="visible"
              variants={slideUpVariants}
            >
              Update Your Information
            </motion.h2>
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6 font-[Open Sans] animate-fade-in"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
            >
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 mb-1 font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <motion.h3 
                  className="text-lg font-semibold mb-3 text-gray-800 font-[Raleway]"
                  initial="hidden"
                  animate="visible"
                  variants={slideUpVariants}
                >
                  Vehicle Details
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">Make</label>
                    <input
                      type="text"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">Model</label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">Year</label>
                    <input
                      type="number"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 mb-1 font-medium">License Plate</label>
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <motion.a 
                  href="/profile"
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105 transition-all duration-200 ease-in-out transform"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.a>
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-md hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.form>
          </motion.section>
        </main>
      </div>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}

export default EditProfile;