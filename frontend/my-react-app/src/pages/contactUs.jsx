// src/components/Contact.jsx
import React, { useState } from 'react';
import { FaBars, FaSun, FaMoon, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Toggle Dark Mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`flex min-h-screen font-sans ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-center text-xl font-bold flex-1">Servio Dashboard</h2>
          <button className="md:hidden text-2xl" onClick={toggleSidebar}>×</button>
        </div>
        <ul className="space-y-2">
          {[
            { text: 'Home', path: '/dashboard' },
            { text: 'Book Service', path: '/book-service' },
            { text: 'Service History', path: '/service-history' },
            { text: 'Profile', path: '/profile' },
            { text: 'Contact Us', path: '/contact', active: true },
            { text: 'About Us', path: '/about-us' },
            { text: 'Logout', path: '/logout' },
          ].map((item) => (
            <li key={item.text} className="border-b border-gray-600">
              <a 
                href={item.path}
                className={`block py-3 px-4 hover:bg-gray-700 transition-colors ${item.active ? 'bg-gray-700 font-bold' : ''}`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-full"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      <button 
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-full"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      <button 
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-full"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      <button 
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-full"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <header className="bg-blue-600 text-white p-4 rounded-lg mb-6 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">Contact Us</h1>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-blue-700 transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </header>

        {/* Contact Content */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <section className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 font-medium`}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 font-medium`}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 font-medium`}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                  placeholder="Your message here..."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>

          {/* Contact Information */}
          <section className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-500" size={20} />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</p>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-900'}>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" size={20} />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</p>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-900'}>support@servio.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-500" size={20} />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</p>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-900'}>456 Service Lane, Auto City, AC 12345</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Contact;

