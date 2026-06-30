import React, { useState } from 'react';
import Sidebar from '../../../ui/layout/Sidebar';
import Header from '../../../ui/layout/Header';
import RightSideModal from '../../../ui/common/RightSideModal';
import ActionMenu from '../../../ui/common/ActionMenu';
import { FiStar, FiUser } from 'react-icons/fi';

// Dummy initial data
const initialCategories = [
  { id: 1, name: 'Wedding Photography' },
  { id: 2, name: 'Pre-Wedding Shoot' },
  { id: 3, name: 'Corporate Events' },
];

const initialServices = [
  { id: 1, categoryId: 1, name: 'Premium Wedding Service' },
  { id: 2, categoryId: 1, name: 'Standard Wedding Service' },
  { id: 3, categoryId: 2, name: 'Outdoor Pre-Wedding' },
];

const initialReviews = [
  { id: 101, userName: 'Sarah Jenkins', packageTitle: 'Gold Wedding Package', categoryId: 1, serviceId: 1, rating: 5, comment: 'Absolutely loved the photos! The team was so professional and captured every special moment perfectly.', date: 'Oct 25, 2026' },
  { id: 102, userName: 'Michael Smith', packageTitle: 'Outdoor Pre-Wedding', categoryId: 2, serviceId: 3, rating: 4, comment: 'Great service, highly recommend. Just wish we had a bit more time at the second location.', date: 'Oct 29, 2026' },
  { id: 103, userName: 'David & Lisa', packageTitle: 'Premium Wedding Service', categoryId: 1, serviceId: 1, rating: 5, comment: 'The drone shots were breathtaking. Worth every penny!', date: 'Nov 03, 2026' },
];

const Reviews = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'edit', 'view'
  const [selectedReview, setSelectedReview] = useState(null);
  
  const [formData, setFormData] = useState({
    rating: 5,
    comment: ''
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const openModal = (mode, review) => {
    setModalMode(mode);
    setSelectedReview(review);
    setFormData({ rating: review.rating, comment: review.comment });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReview(null);
  };

  const handleSave = () => {
    if (modalMode === 'edit' && selectedReview) {
      setReviews(reviews.map(r => 
        r.id === selectedReview.id ? { ...r, rating: Number(formData.rating), comment: formData.comment } : r
      ));
    }
    closeModal();
  };

  // Filtered reviews
  const filteredReviews = reviews.filter(review => {
    if (selectedCategory && review.categoryId !== Number(selectedCategory)) return false;
    if (selectedService && review.serviceId !== Number(selectedService)) return false;
    return true;
  });

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
        <Header title="Reviews Management" toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">All Reviews</h2>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <div className="relative min-w-[160px]">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedService(''); // Reset service when category changes
                  }}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer bg-white appearance-none text-sm ${selectedCategory ? 'text-gray-900' : 'text-gray-600'}`}
                >
                  <option value="">All Categories</option>
                  {initialCategories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
              
              <div className="relative min-w-[160px]">
                <select 
                  value={selectedService} 
                  onChange={(e) => setSelectedService(e.target.value)}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer bg-white appearance-none text-sm ${selectedService ? 'text-gray-900' : 'text-gray-600'} disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  disabled={!selectedCategory}
                >
                  <option value="">All Services</option>
                  {initialServices
                    .filter(s => !selectedCategory || s.categoryId === Number(selectedCategory))
                    .map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col relative hover:shadow-md transition-shadow">
                <div className="absolute right-4 top-4">
                  <ActionMenu 
                    onView={() => openModal('view', review)}
                    onEdit={() => openModal('edit', review)}
                    onDelete={() => handleDelete(review.id)}
                  />
                </div>

                <div className="flex items-center gap-3 mb-4 pr-6">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 shrink-0">
                    <FiUser size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight truncate">{review.userName}</h4>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      size={14} 
                      className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
                    />
                  ))}
                </div>

                <div className="mb-3">
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md mb-2">
                    {review.packageTitle}
                  </span>
                </div>

                <p className="text-gray-600 text-sm italic flex-1 line-clamp-3">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100 mt-6">
              <p className="text-gray-500">No reviews found matching the filters.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Right Side Modal for View/Edit */}
      <RightSideModal 
        visible={modalVisible} 
        onHide={closeModal} 
        title={modalMode === 'edit' ? 'Edit Review' : 'View Review'}
      >
        <div className="flex flex-col h-full mt-4">
          {selectedReview && (
            <div className="flex-1 overflow-y-auto">
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <div className="text-sm text-gray-500 mb-1">Reviewer Info</div>
                <div className="font-bold text-gray-900">{selectedReview.userName}</div>
                <div className="text-xs text-gray-400 mt-1">Submitted on {selectedReview.date}</div>
                <div className="mt-3 text-sm">
                  <span className="text-gray-500">Package: </span>
                  <span className="font-semibold text-gray-800">{selectedReview.packageTitle}</span>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                {modalMode === 'edit' ? (
                  <div className="relative">
                    <select 
                      value={formData.rating} 
                      onChange={(e) => setFormData({...formData, rating: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer appearance-none text-gray-900"
                    >
                      {[5, 4, 3, 2, 1].map(r => (
                        <option key={r} value={r}>{r} Stars</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        size={18} 
                        className={i < formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                {modalMode === 'edit' ? (
                  <textarea 
                    value={formData.comment} 
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
                    placeholder="Enter review comment..."
                  />
                ) : (
                  <p className="text-sm text-gray-700 bg-white border border-gray-200 p-4 rounded-lg italic">
                    "{formData.comment}"
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
                Update Review
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

export default Reviews;
