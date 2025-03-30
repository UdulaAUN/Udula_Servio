// app.jsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerDashboard from './pages/cusDash'; 
import CustomerProfile from './pages/cusProfile';
import Contact from './pages/contactUs';
import EditProfile from './pages/EditProfile';
import Guest from './pages/guest';
import AboutUs from './pages/aboutUs';
import AdminDashboard from './pages/admin';
import ManageUsers from './pages/manageUsers';
import AllServices from './pages/allServices';
import AdminReports from './pages/reports';
import ContactTechnician from './pages/contactTechnician';
import BookServiceCenter from './pages/BookServiceCenter';
import './index.css'; 

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<CustomerDashboard />} />
            <Route path="/profile" element={<CustomerProfile />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/edit-profile" element={<EditProfile />}/>
            <Route path="/guest" element={<Guest />}/>
            <Route path="/about" element={<AboutUs />}/>
            <Route path="/admin" element={<AdminDashboard />}/>
            <Route path="/manage-users" element={<ManageUsers />}/>
            <Route path="/all-services" element={<AllServices />}/>
            <Route path="/reports" element={<AdminReports />}/>
            <Route path="/contact-technician" element={<ContactTechnician />}/>
            <Route path="/book-service-center" element={<BookServiceCenter />}/>

          </Routes>
          
        </div>
      </div>
    </Router>
  );
}

// DOM rendering
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);

export default App;