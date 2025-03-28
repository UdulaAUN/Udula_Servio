// src/components/AboutUs.jsx
import React from 'react';

function AboutUs() {
  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <ul className="space-y-2">
          {[
            { text: 'Home', path: '/dashboard' },
            { text: 'Book Service', path: '/book-service' },
            { text: 'Service History', path: '/service-history' },
            { text: 'Profile', path: '/profile' },
            { text: 'Contact Us', path: '/contact' },
            { text: 'About Us', path: '/about-us', active: true },
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

      {/* Main Content */}
      <main className="flex-1 p-5">
        <header className="bg-blue-600 text-white p-4 text-center rounded-lg mb-6">
          <h1 className="text-2xl font-bold">About Servio</h1>
        </header>

        <section className="space-y-6">
          {/* Company Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Who We Are</h2>
            <p className="text-gray-600">
              Servio is a leading car service and repair management system dedicated to simplifying vehicle maintenance for customers worldwide. Founded with a mission to enhance the automotive service experience, we provide a seamless platform for booking, tracking, and managing your car care needs.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Our Mission</h2>
            <p className="text-gray-600">
              Our goal is to empower vehicle owners with a user-friendly, reliable tool that ensures their cars remain in top condition. We strive to deliver exceptional service management, transparency, and convenience through innovative technology and customer-focused solutions.
            </p>
          </div>

          {/* Team Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Janiru', role: 'Founder & CEO', img: '' },
                { name: 'Veenath', role: 'Lead Developer', img: '' },
                { name: 'Udula', role: 'Customer Support', img: '' },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
                  />
                  <h3 className="text-lg font-medium text-gray-800">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Ready to experience hassle-free car maintenance? Join Servio today!
            </p>
            <a 
              href="/register"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;