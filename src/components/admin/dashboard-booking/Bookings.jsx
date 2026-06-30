import React, { useState } from 'react';
import Sidebar from '../../../ui/layout/Sidebar';
import Header from '../../../ui/layout/Header';
import RightSideModal from '../../../ui/common/RightSideModal';
import ActionMenu from '../../../ui/common/ActionMenu';
import { FiCalendar, FiUser } from 'react-icons/fi';

const initialBookings = [
  { id: 201, clientName: 'Emily & John', packageTitle: 'Gold Wedding Package', date: 'Oct 24, 2026', status: 'Confirmed', email: 'emily.john@example.com', phone: '+1 234 567 8900', notes: 'Looking forward to the shoot!' },
  { id: 202, clientName: 'Jessica Taylor', packageTitle: 'Gold Wedding Package', date: 'Nov 12, 2026', status: 'Pending', email: 'jessica.t@example.com', phone: '+1 987 654 3210', notes: 'Need to discuss location details.' },
  { id: 203, clientName: 'David Smith', packageTitle: 'Corporate Events', date: 'Nov 02, 2026', status: 'Completed', email: 'david.s@company.com', phone: '+1 555 123 4567', notes: 'Annual conference coverage.' },
  { id: 204, clientName: 'Michael & Emma', packageTitle: 'Outdoor Pre-Wedding', date: 'Oct 28, 2026', status: 'Pending', email: 'm.emma@example.com', phone: '+1 444 987 6543', notes: '' },
];

const Bookings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState(initialBookings);
  
  // Filter
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'edit', 'view'
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  const [formData, setFormData] = useState({
    status: 'Pending',
    notes: ''
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const openModal = (mode, booking) => {
    setModalMode(mode);
    setSelectedBooking(booking);
    setFormData({ status: booking.status, notes: booking.notes || '' });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBooking(null);
  };

  const handleSave = () => {
    if (modalMode === 'edit' && selectedBooking) {
      setBookings(bookings.map(b => 
        b.id === selectedBooking.id ? { ...b, status: formData.status, notes: formData.notes } : b
      ));
    }
    closeModal();
  };

  const handleStatusChange = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  // Filtered bookings
  const filteredBookings = bookings.filter(booking => {
    if (statusFilter !== 'All' && booking.status !== statusFilter) return false;
    return true;
  });

  const tabs = ['All', 'Pending', 'Confirmed', 'Completed', 'Rejected'];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0 transition-all duration-300">
        <Header title="Bookings Management" toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">All Bookings</h2>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto space-x-2 border-b border-gray-200 mb-6 scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = statusFilter === tab;
              const count = tab === 'All' ? bookings.length : bookings.filter(b => b.status === tab).length;
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'border-yellow-500 text-yellow-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'Confirmed' ? 'Confirmed (Approved)' : tab}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-sm text-gray-500">
                    <th className="py-4 px-6 font-medium">Client</th>
                    <th className="py-4 px-6 font-medium">Package</th>
                    <th className="py-4 px-6 font-medium">Date</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredBookings.map((booking, index) => {
                    const isLastRows = index >= filteredBookings.length - 2 && filteredBookings.length > 2;
                    return (
                    <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                            <FiUser size={14} />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{booking.clientName}</div>
                            <div className="text-xs text-gray-500">{booking.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600 font-medium">
                        {booking.packageTitle}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        <div className="flex items-center gap-2">
                          <FiCalendar size={14} className="text-gray-400" />
                          <span>{booking.date}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative inline-block w-36">
                          <select 
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            className={`w-full text-xs font-bold pl-3 pr-8 py-1.5 rounded-full border cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 ${getStatusColor(booking.status)}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg className="w-3 h-3 fill-current opacity-70" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <ActionMenu 
                          onView={() => openModal('view', booking)}
                          onEdit={() => openModal('edit', booking)}
                          onDelete={() => handleDelete(booking.id)}
                          position={isLastRows ? 'top' : 'bottom'}
                        />
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No bookings found matching the filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Right Side Modal for View/Edit */}
      <RightSideModal 
        visible={modalVisible} 
        onHide={closeModal} 
        title={modalMode === 'edit' ? 'Edit Booking' : 'Booking Details'}
      >
        <div className="flex flex-col h-full mt-4">
          {selectedBooking && (
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <div className="text-sm text-gray-500 mb-1">Client Details</div>
                <div className="font-bold text-gray-900 text-lg mb-2">{selectedBooking.clientName}</div>
                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <div><strong>Email:</strong> {selectedBooking.email}</div>
                  <div><strong>Phone:</strong> {selectedBooking.phone}</div>
                </div>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl mb-6">
                <div className="text-sm text-blue-800 font-semibold mb-2">Booking Information</div>
                <div className="flex flex-col gap-2 text-sm text-gray-700">
                  <div><strong>Package:</strong> {selectedBooking.packageTitle}</div>
                  <div><strong>Date:</strong> {selectedBooking.date}</div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Booking Status</label>
                {modalMode === 'edit' ? (
                  <div className="relative">
                    <select 
                      value={formData.status} 
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer bg-white appearance-none text-sm text-gray-900`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed (Approve)</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                  </div>
                ) : (
                  <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full border ${getStatusColor(formData.status)}`}>
                    {formData.status}
                  </span>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                {modalMode === 'edit' ? (
                  <textarea 
                    value={formData.notes} 
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
                    placeholder="Add private notes about this booking..."
                  />
                ) : (
                  <p className="text-sm text-gray-700 bg-white border border-gray-200 p-4 rounded-lg">
                    {formData.notes ? formData.notes : <span className="text-gray-400 italic">No notes added yet.</span>}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          {modalMode === 'edit' && (
            <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
              <button 
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors cursor-pointer"
              >
                Update Booking
              </button>
            </div>
          )}
          {modalMode === 'view' && (
            <div className="mt-auto pt-4 border-t border-gray-100">
              <button 
                onClick={closeModal}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </RightSideModal>
    </div>
  );
};

export default Bookings;
