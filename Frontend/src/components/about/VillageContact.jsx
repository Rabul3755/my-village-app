import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const VillageContact = () => {
  const { village } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: '🏛️',
      title: 'Gram Panchayat Office',
      details: [
        'Main Administration Building',
        'Center Point, Green Valley Village',
        village.district + ', ' + village.state
      ],
      contact: '+91 98765 43210',
      hours: 'Mon-Sat: 9:00 AM - 5:00 PM',
      email: 'panchayat@greenvalley.org'
    },
    {
      icon: '📞',
      title: 'Emergency Contacts',
      details: [
        'Police Control Room: 100',
        'Ambulance: 108',
        'Fire Station: 101',
        'Women Helpline: 1091'
      ],
      contact: '24/7 Available',
      hours: 'Emergency Services',
      email: 'emergency@greenvalley.org'
    },
    {
      icon: '🏥',
      title: 'Health Center',
      details: [
        'Primary Health Center',
        'Near Main Market',
        'Doctor Available: 8 AM - 2 PM'
      ],
      contact: '+91 98765 43211',
      hours: 'Mon-Sun: 8:00 AM - 8:00 PM',
      email: 'health@greenvalley.org'
    }
  ];

  const departments = [
    {
      name: 'Education Department',
      head: 'Priya Sharma',
      phone: '+91 98765 43213',
      email: 'education@greenvalley.org'
    },
    {
      name: 'Health Department',
      head: 'Dr. Vikram Mehta',
      phone: '+91 98765 43214',
      email: 'health@greenvalley.org'
    },
    {
      name: 'Public Works',
      head: 'Ramesh Kumar',
      phone: '+91 98765 43215',
      email: 'works@greenvalley.org'
    },
    {
      name: 'Women & Child',
      head: 'Anita Desai',
      phone: '+91 98765 43216',
      email: 'wcd@greenvalley.org'
    },
    {
      name: 'Agriculture',
      head: 'Suresh Patel',
      phone: '+91 98765 43217',
      email: 'agriculture@greenvalley.org'
    },
    {
      name: 'Water Supply',
      head: 'Rajesh Kumar',
      phone: '+91 98765 43218',
      email: 'water@greenvalley.org'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="space-y-12">
      
      {/* Contact Methods */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{method.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{method.title}</h3>
              
              <div className="space-y-3 mb-4">
                {method.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium text-gray-800">{method.contact}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">{method.hours}</span>
                </div>
                
                {method.email && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">{method.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form and Map */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What is this regarding?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe your query or concern in detail..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
              
              <p className="text-sm text-gray-500 text-center">
                We typically respond within 24 hours during business days.
              </p>
            </form>
          </div>

          {/* Village Map & Info */}
          <div className="space-y-6">
            
            {/* Quick Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">📍 Find Us</h3>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center text-gray-500 mb-4">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>Interactive Village Map</p>
                  <p className="text-sm">(Would show actual map in production)</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Address:</strong> Green Valley Village, {village.district}, {village.state}</p>
                <p><strong>PIN Code:</strong> 123456</p>
                <p><strong>Nearest City:</strong> {village.district} City (25 km)</p>
                <p><strong>Bus Stand:</strong> 2 km from village center</p>
                <p><strong>Railway Station:</strong> 30 km from village</p>
              </div>
            </div>

            {/* Department Contacts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Department Contacts</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <div className="font-medium text-gray-800">{dept.name}</div>
                      <div className="text-sm text-gray-600">{dept.head}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-800">{dept.phone}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[150px]">{dept.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visiting Hours & Guidelines */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Visiting Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Office Hours */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🏛️ Office Hours</h3>
            <div className="space-y-3">
              {[
                { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM', note: 'Lunch: 1 PM - 2 PM' },
                { day: 'Saturday', hours: '9:00 AM - 1:00 PM', note: 'Public dealing only' },
                { day: 'Sunday', hours: 'Closed', note: 'Emergency services available' }
              ].map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <div className="font-medium text-gray-800">{schedule.day}</div>
                    <div className="text-sm text-gray-600">{schedule.note}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{schedule.hours}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visitor Guidelines */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Visitor Guidelines</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Carry valid ID proof for official work</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Schedule appointments for detailed discussions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Public grievance meetings: Every Wednesday 10 AM - 1 PM</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Document submission: Bring original + photocopies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Emergency contacts available 24/7</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VillageContact;