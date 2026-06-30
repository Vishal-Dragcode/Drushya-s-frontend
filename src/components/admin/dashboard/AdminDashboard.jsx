import React, { useState } from 'react';
import Sidebar from '../../../ui/layout/Sidebar';
import Header from '../../../ui/layout/Header';
import { LuCalendar, LuMessageCircle, LuCamera } from 'react-icons/lu';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0 transition-all duration-300">
        <Header title="Dashboard Overview" toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Total Bookings */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 font-medium mb-1">Total Bookings</p>
                  <h3 className="text-4xl font-bold text-gray-900">142</h3>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                  <LuCalendar size={24} />
                </div>
              </div>
            </div>
            
            {/* Pending Inquiries */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 font-medium mb-1">Pending Inquiries</p>
                  <h3 className="text-4xl font-bold text-gray-900">24</h3>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <LuMessageCircle size={24} />
                </div>
              </div>
            </div>
            
            {/* Completed Shoots */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 font-medium mb-1">Completed Shoots</p>
                  <h3 className="text-4xl font-bold text-gray-900">85</h3>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                  <LuCamera size={24} />
                </div>
              </div>
            </div>
          </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
          
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
              <button className="text-yellow-600 font-medium text-sm hover:text-yellow-700">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-white border-b border-gray-100 text-sm text-gray-500">
                    <th className="py-4 px-6 font-medium">Client</th>
                    <th className="py-4 px-6 font-medium">Service</th>
                    <th className="py-4 px-6 font-medium">Date</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { name: 'Sarah Jenkins', service: 'Wedding Photography', date: 'Oct 24, 2026', status: 'Confirmed', statusColor: 'bg-green-100 text-green-700' },
                    { name: 'Michael & Emma', service: 'Pre-Wedding Shoot', date: 'Oct 28, 2026', status: 'Pending', statusColor: 'bg-yellow-100 text-yellow-700' },
                    { name: 'David Smith', service: 'Corporate Event', date: 'Nov 02, 2026', status: 'Confirmed', statusColor: 'bg-green-100 text-green-700' },
                    { name: 'Priya Sharma', service: 'Maternity Session', date: 'Nov 15, 2026', status: 'Completed', statusColor: 'bg-gray-100 text-gray-700' },
                  ].map((booking, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{booking.name}</td>
                      <td className="py-4 px-6 text-gray-600">{booking.service}</td>
                      <td className="py-4 px-6 text-gray-600">{booking.date}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${booking.statusColor}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Recent Inquiries</h3>
            </div>
            <div className="divide-y divide-gray-100 flex-1">
              {[
                { name: 'Amanda Clarke', time: '2 hours ago', msg: 'Interested in a newborn photoshoot for next month.' },
                { name: 'Rahul Desai', time: '5 hours ago', msg: 'Looking for a videographer for our commercial ad.' },
                { name: 'Elena Gilbert', time: '1 day ago', msg: 'Can you send me the premium wedding package details?' },
              ].map((inquiry, i) => (
                <div key={i} className="p-6 hover:bg-gray-50/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">{inquiry.name}</h4>
                    <span className="text-xs text-gray-400">{inquiry.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    "{inquiry.msg}"
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
              <button className="text-yellow-600 font-medium text-sm hover:text-yellow-700 w-full py-2">View All Messages</button>
            </div>
          </div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
