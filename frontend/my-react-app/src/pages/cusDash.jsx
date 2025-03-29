// src/components/CustomerDashboard.jsx
import React, { useState } from 'react';
import { FaBars, FaPlus, FaEdit, FaTrash, FaCalendar, FaWrench, FaStar, FaRegStar } from 'react-icons/fa';
import Footer from './Footer';

function CustomerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [services, setServices] = useState([
    { id: 1, date: 'March 10, 2025', type: 'Oil Change', status: 'Completed', cost: 50, serviceCenter: 'Downtown Garage', technician: 'Alice Carter' },
    { id: 2, date: 'Feb 20, 2025', type: 'Brake Repair', status: 'Completed', cost: 150, serviceCenter: 'Eastside Auto', technician: 'Bob Davis' },
    { id: 3, date: 'April 15, 2025', type: 'Tire Rotation', status: 'Pending', cost: 80, serviceCenter: 'West End Service', technician: 'Charlie Evans' },
  ]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newService, setNewService] = useState({ date: '', type: '', status: 'Pending', cost: '', serviceCenter: '', technician: '' });
  const [editService, setEditService] = useState(null);
  const [showServiceCenterDropdownAdd, setShowServiceCenterDropdownAdd] = useState(false);
  const [showTechnicianDropdownAdd, setShowTechnicianDropdownAdd] = useState(false);
  const [showStatusDropdownAdd, setShowStatusDropdownAdd] = useState(false);
  const [showServiceCenterDropdownEdit, setShowServiceCenterDropdownEdit] = useState(false);
  const [showTechnicianDropdownEdit, setShowTechnicianDropdownEdit] = useState(false);
  const [showStatusDropdownEdit, setShowStatusDropdownEdit] = useState(false);

  // Predefined lists (could come from an API in a real app)
  const serviceCenters = [
    'Downtown Garage',
    'Eastside Auto',
    'West End Service',
    'Northside Mechanics',
    'Southtown Repairs'
  ];

  const technicians = [
    { name: 'Alice Carter', rating: 4 },   // 4 stars
    { name: 'Bob Davis', rating: 5 },     // 5 stars
    { name: 'Charlie Evans', rating: 3 }, // 3 stars
    { name: 'Dana Foster', rating: 4 },   // 4 stars
    { name: 'Evan Grant', rating: 2 }     // 2 stars
  ];

  const statuses = ['Pending', 'Completed'];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const filteredServices = filterStatus === 'All' ? services : services.filter(service => service.status === filterStatus);

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    setServices([...services, { ...newService, id: services.length + 1, cost: Number(newService.cost) }]);
    setNewService({ date: '', type: '', status: 'Pending', cost: '', serviceCenter: '', technician: '' });
    setShowAddModal(false);
    setShowServiceCenterDropdownAdd(false);
    setShowTechnicianDropdownAdd(false);
    setShowStatusDropdownAdd(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setServices(services.map(service => 
      service.id === editService.id ? { ...editService, cost: Number(editService.cost) } : service
    ));
    setEditService(null);
    setShowEditModal(false);
    setShowServiceCenterDropdownEdit(false);
    setShowTechnicianDropdownEdit(false);
    setShowStatusDropdownEdit(false);
  };

  const handleDelete = (id) => setServices(services.filter(service => service.id !== id));
  const handleEditClick = (service) => {
    setEditService({ ...service });
    setShowEditModal(true);
  };

  // Star Rating Component
  const StarRating = ({ rating }) => (
    <span className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        i < rating ? 
          <FaStar key={i} className="text-yellow-400" /> : 
          <FaRegStar key={i} className="text-gray-300" />
      ))}
    </span>
  );

  // Helper to get technician rating
  const getTechnicianRating = (technicianName) => {
    const tech = technicians.find(t => t.name === technicianName);
    return tech ? tech.rating : 0;
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-900">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:static md:translate-x-0 md:w-64 md:min-w-[16rem] transition-transform duration-300 ease-in-out z-20`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-center text-2xl font-extrabold flex-1 font-[Poppins] tracking-tight">Servio Dashboard</h2>
            <button className="md:hidden text-2xl hover:text-orange-500 transition-colors duration-200" onClick={toggleSidebar}>
              ×
            </button>
          </div>
          <ul className="space-y-2 font-[Open Sans]">
            {[
              { text: 'Home', path: '/dashboard', active: true },
              { text: 'Profile', path: '/profile' },
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
        </aside>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 hover:scale-110 transition-all duration-200 ease-in-out animate-pulse"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        {/* Main Content */}
        <main className="flex-1 p-5 max-w-7xl mx-auto w-full">
          <header className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-4 rounded-lg mb-6 flex justify-between items-center shadow-lg animate-slide-up">
            <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Welcome to Servio</h1>
          </header>

          {/* Overview Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="p-5 rounded-lg shadow-lg text-center bg-white animate-scale-up">
              <FaCalendar className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-[Raleway]">Upcoming Service</h3>
              <p className="text-gray-600 font-[Open Sans]">
                {services.find(s => s.status === 'Pending')?.date || 'No upcoming services scheduled.'}
              </p>
              <p className="text-gray-600 font-[Open Sans]">
                {services.find(s => s.status === 'Pending')?.serviceCenter || ''}
              </p>
              <p className="text-gray-600 font-[Open Sans] flex justify-center items-center gap-2">
                Technician: {services.find(s => s.status === 'Pending')?.technician || 'Not assigned'}
                {services.find(s => s.status === 'Pending')?.technician && (
                  <StarRating rating={getTechnicianRating(services.find(s => s.status === 'Pending')?.technician)} />
                )}
              </p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="mt-2 text-orange-600 hover:text-orange-800 hover:underline hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Schedule Now
              </button>
            </div>
            <div className="p-5 rounded-lg shadow-lg text-center bg-white animate-scale-up animate-delay-100">
              <FaWrench className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-[Raleway]">Total Services</h3>
              <p className="text-gray-600 font-[Open Sans]">
                {services.filter(s => s.status === 'Completed').length} Services Completed
              </p>
            </div>
          </section>

          {/* Service History */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-3 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 font-[Poppins]">Your Service History</h2>
              <div className="flex gap-2">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-2 rounded-md border bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-[Open Sans]"
                >
                  <option value="All">All Services</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 hover:scale-110 transition-all duration-200 ease-in-out flex items-center gap-1"
                >
                  <FaPlus /> Add Service
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg shadow-lg bg-white animate-fade-in">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Date</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Service Type</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Service Center</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Technician (Rating)</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Status</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Cost</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 font-[Open Sans]">{service.date}</td>
                      <td className="border border-gray-200 p-3 font-[Open Sans]">{service.type}</td>
                      <td className="border border-gray-200 p-3 font-[Open Sans]">{service.serviceCenter}</td>
                      <td className="border border-gray-200 p-3 font-[Open Sans] flex items-center gap-2">
                        {service.technician}
                        <StarRating rating={getTechnicianRating(service.technician)} />
                      </td>
                      <td className="border border-gray-200 p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-[Open Sans] ${
                          service.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="border border-gray-200 p-3 font-[Open Sans]">${service.cost.toFixed(2)}</td>
                      <td className="border border-gray-200 p-3 flex gap-2">
                        <button 
                          onClick={() => handleEditClick(service)}
                          className="text-orange-600 hover:text-orange-800 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(service.id)}
                          className="text-red-500 hover:text-red-700 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Add Service Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-white text-gray-900 animate-scale-up">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-gray-800">Add New Service</h3>
                <form onSubmit={handleServiceSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-800">Date</label>
                    <input
                      type="date"
                      value={newService.date}
                      onChange={(e) => setNewService({ ...newService, date: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Service Type</label>
                    <input
                      type="text"
                      value={newService.type}
                      onChange={(e) => setNewService({ ...newService, type: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Oil Change"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block mb-1 text-gray-800">Service Center</label>
                    <button
                      type="button"
                      onClick={() => setShowServiceCenterDropdownAdd(!showServiceCenterDropdownAdd)}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
                    >
                      {newService.serviceCenter || 'Select a Service Center'}
                      <span>{showServiceCenterDropdownAdd ? '▲' : '▼'}</span>
                    </button>
                    {showServiceCenterDropdownAdd && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                        {serviceCenters.map((center) => (
                          <li
                            key={center}
                            onClick={() => {
                              setNewService({ ...newService, serviceCenter: center });
                              setShowServiceCenterDropdownAdd(false);
                            }}
                            className="p-2 hover:bg-orange-100 cursor-pointer"
                          >
                            {center}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block mb-1 text-gray-800">Technician</label>
                    <button
                      type="button"
                      onClick={() => setShowTechnicianDropdownAdd(!showTechnicianDropdownAdd)}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
                    >
                      {newService.technician || 'Select a Technician'}
                      <span>{showTechnicianDropdownAdd ? '▲' : '▼'}</span>
                    </button>
                    {showTechnicianDropdownAdd && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                        {technicians.map((tech) => (
                          <li
                            key={tech.name}
                            onClick={() => {
                              setNewService({ ...newService, technician: tech.name });
                              setShowTechnicianDropdownAdd(false);
                            }}
                            className="p-2 hover:bg-orange-100 cursor-pointer flex items-center gap-2"
                          >
                            {tech.name}
                            <StarRating rating={tech.rating} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block mb-1 text-gray-800">Status</label>
                    <button
                      type="button"
                      onClick={() => setShowStatusDropdownAdd(!showStatusDropdownAdd)}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
                    >
                      {newService.status || 'Select a Status'}
                      <span>{showStatusDropdownAdd ? '▲' : '▼'}</span>
                    </button>
                    {showStatusDropdownAdd && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                        {statuses.map((status) => (
                          <li
                            key={status}
                            onClick={() => {
                              setNewService({ ...newService, status });
                              setShowStatusDropdownAdd(false);
                            }}
                            className="p-2 hover:bg-orange-100 cursor-pointer"
                          >
                            {status}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Cost ($)</label>
                    <input
                      type="number"
                      value={newService.cost}
                      onChange={(e) => setNewService({ ...newService, cost: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 50"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        setShowServiceCenterDropdownAdd(false);
                        setShowTechnicianDropdownAdd(false);
                        setShowStatusDropdownAdd(false);
                      }}
                      className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-md hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Service Modal */}
          {showEditModal && editService && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-white text-gray-900 animate-scale-up">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-gray-800">Edit Service</h3>
                <form onSubmit={handleEditSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-800">Date</label>
                    <input
                      type="date"
                      value={editService.date}
                      onChange={(e) => setEditService({ ...editService, date: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Service Type</label>
                    <input
                      type="text"
                      value={editService.type}
                      onChange={(e) => setEditService({ ...editService, type: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block mb-1 text-gray-800">Service Center</label>
                    <button
                      type="button"
                      onClick={() => setShowServiceCenterDropdownEdit(!showServiceCenterDropdownEdit)}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
                    >
                      {editService.serviceCenter || 'Select a Service Center'}
                      <span>{showServiceCenterDropdownEdit ? '▲' : '▼'}</span>
                    </button>
                    {showServiceCenterDropdownEdit && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                        {serviceCenters.map((center) => (
                          <li
                            key={center}
                            onClick={() => {
                              setEditService({ ...editService, serviceCenter: center });
                              setShowServiceCenterDropdownEdit(false);
                            }}
                            className="p-2 hover:bg-orange-100 cursor-pointer"
                          >
                            {center}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block mb-1 text-gray-800">Technician</label>
                    <button
                      type="button"
                      onClick={() => setShowTechnicianDropdownEdit(!showTechnicianDropdownEdit)}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
                    >
                      {editService.technician || 'Select a Technician'}
                      <span>{showTechnicianDropdownEdit ? '▲' : '▼'}</span>
                    </button>
                    {showTechnicianDropdownEdit && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                        {technicians.map((tech) => (
                          <li
                            key={tech.name}
                            onClick={() => {
                              setEditService({ ...editService, technician: tech.name });
                              setShowTechnicianDropdownEdit(false);
                            }}
                            className="p-2 hover:bg-orange-100 cursor-pointer flex items-center gap-2"
                          >
                            {tech.name}
                            <StarRating rating={tech.rating} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block mb-1 text-gray-800">Status</label>
                    <button
                      type="button"
                      onClick={() => setShowStatusDropdownEdit(!showStatusDropdownEdit)}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
                    >
                      {editService.status || 'Select a Status'}
                      <span>{showStatusDropdownEdit ? '▲' : '▼'}</span>
                    </button>
                    {showStatusDropdownEdit && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                        {statuses.map((status) => (
                          <li
                            key={status}
                            onClick={() => {
                              setEditService({ ...editService, status });
                              setShowStatusDropdownEdit(false);
                            }}
                            className="p-2 hover:bg-orange-100 cursor-pointer"
                          >
                            {status}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Cost ($)</label>
                    <input
                      type="number"
                      value={editService.cost}
                      onChange={(e) => setEditService({ ...editService, cost: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setShowServiceCenterDropdownEdit(false);
                        setShowTechnicianDropdownEdit(false);
                        setShowStatusDropdownEdit(false);
                      }}
                      className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-md hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}

export default CustomerDashboard;