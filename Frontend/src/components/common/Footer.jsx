import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Village Voice</h3>
            <p className="text-gray-300">
              A community platform for our village to raise voices, track issues, and connect with local leaders.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/issues" className="hover:text-white">Report Issue</a></li>
              <li><a href="/map" className="hover:text-white">Village Map</a></li>
              <li><a href="/leaders" className="hover:text-white">Local Leaders</a></li>
              <li><a href="/about" className="hover:text-white">About Village</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-gray-300 space-y-2">
              <p>Gram Panchayat Office</p>
              <p>Green Valley Village</p>
              <p>contact@villagevoice.org</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Village Voice. A community initiative.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;