// src/components/AdminReports.jsx
import React, { useState } from 'react';
import { FaBars, FaChartBar, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function AdminReports() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedReport, setExpandedReport] = useState(null);
  const [reportData] = useState([
    { id: 1, customer: 'John Doe', service: 'Oil Change', date: 'March 10, 2025', status: 'Completed', cost: 50 },
    { id: 2, customer: 'Jane Smith', service: 'Brake Repair', date: 'Feb 20, 2025', status: 'Completed', cost: 150 },
    { id: 3, customer: 'Mike Johnson', service: 'Tire Rotation', date: 'April 15, 2025', status: 'Pending', cost: 80 },
    { id: 4, customer: 'Emily Brown', service: 'Engine Tune-Up', date: 'March 15, 2025', status: 'Completed', cost: 200 },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleReport = (id) => setExpandedReport(expandedReport === id ? null : id);

  const totalServices = reportData.length;
  const totalRevenue = reportData.reduce((sum, item) => sum + item.cost, 0);
  const pendingServices = reportData.filter(item => item.status === 'Pending').length;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-900">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:static md:translate-x-0 md:w-64 md:min-w-[16rem] transition-transform duration-300 ease-in-out z-20`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-center text-2xl font-extrabold flex-1 font-[Poppins] tracking-tight">Servio Admin</h2>
            <button className="md:hidden text-2xl hover:text-orange-500 transition-colors duration-200" onClick={toggleSidebar}>
              ×
            </button>
          </div>
          <ul className="space-y-2 font-[Open Sans]">
            {[
              { text: 'Dashboard', path: '/admin' },
              { text: 'Manage Users', path: '/manage-users' },
              { text: 'All Services', path: '/all-services' },
              { text: 'Reports', path: '/admin-reports', active: true },
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
          <header className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-6 rounded-lg mb-6 flex items-center gap-3 shadow-lg animate-slide-up">
            <FaChartBar size={28} />
            <div>
              <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Admin Reports Dashboard</h1>
              <p className="text-sm mt-1 font-[Open Sans]">Insights into service performance</p>
            </div>
          </header>

          {/* Metrics Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-scale-up">
            <div className="p-6 rounded-lg shadow-lg bg-white flex items-center gap-4 hover:bg-gray-50 transition-all duration-200 ease-in-out">
              <div className="p-3 bg-orange-100 rounded-full">
                <FaChartBar className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 font-[Raleway]">Total Services</h3>
                <p className="text-2xl font-bold text-gray-600 font-[Open Sans]">{totalServices}</p>
              </div>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white flex items-center gap-4 hover:bg-gray-50 transition-all duration-200 ease-in-out">
              <div className="p-3 bg-orange-100 rounded-full">
                <FaChartBar className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 font-[Raleway]">Total Revenue</h3>
                <p className="text-2xl font-bold text-gray-600 font-[Open Sans]">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white flex items-center gap-4 hover:bg-gray-50 transition-all duration-200 ease-in-out">
              <div className="p-3 bg-orange-100 rounded-full">
                <FaChartBar className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 font-[Raleway]">Pending Services</h3>
                <p className="text-2xl font-bold text-gray-600 font-[Open Sans]">{pendingServices}</p>
              </div>
            </div>
          </section>

          {/* Accordion Reports */}
          <section className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-[Poppins]">Detailed Service Reports</h2>
            <div className="space-y-4">
              {reportData.map((report) => (
                <div key={report.id} className="rounded-lg shadow-lg bg-white overflow-hidden">
                  <button 
                    onClick={() => toggleReport(report.id)}
                    className="w-full p-4 flex justify-between items-center bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-t-lg hover:bg-orange-700 transition-all duration-200 ease-in-out focus:outline-none"
                  >
                    <span className="text-lg font-semibold font-[Raleway]">{report.customer} - {report.service}</span>
                    {expandedReport === report.id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedReport === report.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-4 font-[Open Sans]">
                      <p><strong>Date:</strong> {report.date}</p>
                      <p><strong>Status:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          report.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </p>
                      <p><strong>Cost:</strong> ${report.cost.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer - Full Width */}
      <footer className="w-full bg-gray-800 text-white p-4">
        <p className="text-center font-[Open Sans]">© 2025 Servio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminReports;