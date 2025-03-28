// src/components/ManageUsers.jsx
import React, { useState } from 'react';
import { FaUsers, FaChartBar, FaCar, FaPlus, FaEdit, FaTrash, FaBars } from 'react-icons/fa';
import Footer from './Footer';


function ManageUsers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', role: 'Customer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', role: 'Customer' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', phone: '+1122334455', role: 'Admin' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'Customer' });
  const [editUser, setEditUser] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', phone: '', role: 'Customer' });
    setShowAddModal(false);
  };

  const handleEditUserSubmit = (e) => {
    e.preventDefault();
    setUsers(users.map(user => 
      user.id === editUser.id ? editUser : user
    ));
    setEditUser(null);
    setShowEditModal(false);
  };

  const handleDelete = (id) => setUsers(users.filter(user => user.id !== id));
  const handleEditClick = (user) => {
    setEditUser({ ...user });
    setShowEditModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-900">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:static md:translate-x-0 md:w-64 md:min-w-[16rem] transition-transform duration-300 ease-in-out z-20`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-center text-2xl font-extrabold flex-1 font-[Poppins] tracking-tight">Admin Dashboard</h2>
            <button className="md:hidden text-2xl hover:text-orange-500 transition-colors duration-200" onClick={toggleSidebar}>
              ×
            </button>
          </div>
          <ul className="space-y-2 font-[Open Sans]">
            {[
              { text: 'Dashboard', path: '/admin', icon: <FaChartBar /> },
              { text: 'Manage Users', path: '/admin-users', icon: <FaUsers />, active: true },
              { text: 'All Services', path: '/all-services', icon: <FaCar /> },
              { text: 'Reports', path: '/reports', icon: <FaChartBar /> },
              { text: 'Logout', path: '/logout', icon: null },
            ].map((item) => (
              <li key={item.text} className="border-b border-gray-600">
                <a 
                  href={item.path}
                  className={`flex items-center gap-2 py-3 px-4 hover:bg-orange-700 hover:scale-105 transition-all duration-300 ease-in-out transform ${
                    item.active ? 'bg-orange-600 font-bold scale-105' : ''
                  }`}
                >
                  {item.icon}
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
            <div>
              <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Manage Users</h1>
              <p className="text-sm mt-1 font-[Open Sans]">Administer user accounts for Servio</p>
            </div>
          </header>

          {/* User Management */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 font-[Poppins]">User List</h2>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 hover:scale-110 transition-all duration-200 ease-in-out flex items-center gap-1"
              >
                <FaPlus /> Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg shadow-lg bg-white animate-fade-in">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Name</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Email</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Phone</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Role</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 font-[Open Sans]">{user.name}</td>
                      <td className="border border-gray-200 p-3 font-[Open Sans]">{user.email}</td>
                      <td className="border border-gray-200 p-3 font-[Open Sans]">{user.phone}</td>
                      <td className="border border-gray-200 p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-[Open Sans] ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="border border-gray-200 p-3 flex gap-2">
                        <button 
                          onClick={() => handleEditClick(user)}
                          className="text-orange-600 hover:text-orange-800 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
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

          {/* Add User Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-white text-gray-900 animate-scale-up">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-gray-800">Add New User</h3>
                <form onSubmit={handleAddUserSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-800">Name</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Phone</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., +1234567890"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
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

          {/* Edit User Modal */}
          {showEditModal && editUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-white text-gray-900 animate-scale-up">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-gray-800">Edit User</h3>
                <form onSubmit={handleEditUserSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-800">Name</label>
                    <input
                      type="text"
                      value={editUser.name}
                      onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Email</label>
                    <input
                      type="email"
                      value={editUser.email}
                      onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Phone</label>
                    <input
                      type="tel"
                      value={editUser.phone}
                      onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Role</label>
                    <select
                      value={editUser.role}
                      onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
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

export default ManageUsers;