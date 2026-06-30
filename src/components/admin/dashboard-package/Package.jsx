import React, { useState } from 'react';
import Sidebar from '../../../ui/layout/Sidebar';
import Header from '../../../ui/layout/Header';
import RightSideModal from '../../../ui/common/RightSideModal';
import ActionMenu from '../../../ui/common/ActionMenu';
import { FiPlus, FiImage, FiTrash2 } from 'react-icons/fi';

import BasicInfoTab from './tabs/BasicInfoTab';

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

const initialPackages = [
  { 
    id: 1, 
    title: 'Gold Wedding Package', 
    categoryId: 1,
    serviceId: 1,
    price: 1500,
    description: 'The ultimate package for your special day.', 
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    features: ['Full day coverage', 'Premium Album', '2 Photographers', 'Drone Coverage'],
    benefits: ['High-Resolution Images', 'Professional Retouching', 'Creative Direction', 'Fast Turnaround Time', 'Multiple Locations', 'Wardrobe Guidance', 'Online Digital Gallery', 'Print Release Rights'],
    requirements: ['Booking at least 2 weeks in advance', 'Initial consultation call (Phone or Zoom)', 'Deposit payment to secure your date', 'A positive attitude and willingness to relax', 'Any specific prop requests discussed beforehand'],
    itinerary: [
      { phase: 'Phase 1: Pre-shoot Consultation', items: ['Understanding your vision and specific requirements', 'Selecting the perfect location and lighting style', 'Wardrobe styling and aesthetic advice', 'Setting the timeline and deliverables'] },
      { phase: 'Phase 2: The Photoshoot Session', items: ['Guided posing and capturing natural candids', 'Multiple outfit changes and backdrop adjustments', 'Creative lighting setups for dynamic shots', 'Ensuring a relaxed, fun environment'] },
      { phase: 'Phase 3: Post-processing & Editing', items: ['Careful culling of the best images', 'Color correction and skin retouching'] }
    ],
    status: 'Active',
    reviews: [
      { id: 101, userName: 'Sarah Jenkins', rating: 5, comment: 'Absolutely loved the photos!' },
      { id: 102, userName: 'Michael Smith', rating: 4, comment: 'Great service, highly recommend.' }
    ],
    bookings: [
      { id: 201, clientName: 'Emily & John', date: 'Oct 24, 2026', status: 'Confirmed' },
      { id: 202, clientName: 'Jessica Taylor', date: 'Nov 12, 2026', status: 'Pending' }
    ]
  }
];

const Package = ({ isTrendingPage = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('drushya_packages');
    if (saved) {
      return JSON.parse(saved).map(p => ({
        ...p,
        thumbnail: p.thumbnail || p.banner || p.cardImage || p.imageSrc || ''
      }));
    }
    return initialPackages;
  });
  
  React.useEffect(() => {
    localStorage.setItem('drushya_packages', JSON.stringify(packages));
  }, [packages]);

  const [categories] = useState(initialCategories);
  const [services] = useState(initialServices);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'add', 'edit', 'view'
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    serviceId: '',
    price: '',
    description: '',
    thumbnail: '',
    features: [],
    benefits: [],
    requirements: [],
    itinerary: [],
    status: 'Active',
    reviews: [],
    bookings: [],
    banners: [],
    gallery: [],
    bannerVideo: ''
  });

  const openModal = (mode, pkg = null) => {
    setModalMode(mode);
    setSelectedPackage(pkg);

    if (pkg && (mode === 'edit' || mode === 'view')) {
      setFormData({ ...pkg });
    } else {
      setFormData({
        title: '',
        categoryId: '',
        serviceId: '',
        price: '',
        description: '',
        thumbnail: '',
        features: [],
        benefits: [],
        requirements: [],
        itinerary: [],
        status: 'Active',
        reviews: [],
        bookings: [],
        banners: [],
        gallery: [],
        bannerVideo: ''
      });
    }
    setActiveTab('basic');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPackage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'categoryId') {
        updated.serviceId = '';
      }
      return updated;
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, thumbnail: imageUrl }));
    }
  };

  const handleBannersAdd = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, banners: [...(prev.banners || []), ...newImages] }));
  };

  const removeBannerImage = (index) => {
    setFormData(prev => ({
      ...prev,
      banners: (prev.banners || []).filter((_, i) => i !== index)
    }));
  };

  const handleGalleryAdd = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, gallery: [...(prev.gallery || []), ...newImages] }));
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      const newPkg = {
        ...formData,
        id: Date.now()
      };
      setPackages([...packages, newPkg]);
    } else if (modalMode === 'edit') {
      setPackages(packages.map(p => p.id === selectedPackage.id ? { ...formData, id: p.id } : p));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === Number(catId));
    return cat ? cat.name : 'Unknown';
  };

  const getServiceName = (srvId) => {
    const srv = services.find(s => s.id === Number(srvId));
    return srv ? srv.name : 'Unknown';
  };

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
        <Header title={isTrendingPage ? "Trending Packages" : "Package Management"} toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{isTrendingPage ? "Trending Packages" : "Packages"}</h2>
            {!isTrendingPage && (
              <button 
                onClick={() => openModal('add')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FiPlus size={20} /> Add Package
              </button>
            )}
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {packages.filter(pkg => !isTrendingPage || pkg.isTrending).map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col relative z-0">
                <div className="h-48 bg-gray-200 relative rounded-t-xl overflow-hidden group">
                  {pkg.thumbnail ? (
                    <img src={pkg.thumbnail} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiImage size={40} />
                    </div>
                  )}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${pkg.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {pkg.status}
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-sm font-bold shadow-sm bg-gray-900 text-white">
                    ₹{pkg.price}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 pr-8">{pkg.title}</h3>
                    <div className="absolute right-3 top-4">
                      <ActionMenu 
                        onView={() => openModal('view', pkg)}
                        onEdit={() => openModal('edit', pkg)}
                        onDelete={() => handleDelete(pkg.id)}
                        onTrending={() => setPackages(packages.map(p => p.id === pkg.id ? { ...p, isTrending: !p.isTrending } : p))}
                        isTrending={pkg.isTrending}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">
                      {getCategoryName(pkg.categoryId)}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {getServiceName(pkg.serviceId)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 flex-1">{pkg.description}</p>
                </div>
              </div>
            ))}
          </div>

          {packages.filter(pkg => !isTrendingPage || pkg.isTrending).length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500">{isTrendingPage ? 'No trending packages found.' : 'No packages found. Click "Add Package" to create one.'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Modal for Add/Edit/View */}
      <RightSideModal 
        visible={modalVisible} 
        onHide={closeModal} 
        title={
          modalMode === 'add' ? 'Add New Package' : 
          modalMode === 'edit' ? 'Edit Package' : 'Package Details'
        }
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto pb-6 mt-4">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button 
                onClick={() => setActiveTab('basic')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'basic' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Basic Info
              </button>
              <button 
                onClick={() => setActiveTab('banners')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'banners' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Banners
              </button>
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'gallery' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Gallery
              </button>
              <button 
                onClick={() => setActiveTab('video')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'video' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Video
              </button>
            </div>

            {activeTab === 'basic' && (
              <BasicInfoTab 
                modalMode={modalMode} 
                formData={formData} 
                setFormData={setFormData}
                categories={categories}
                services={services}
                handleInputChange={handleInputChange}
                handleThumbnailChange={handleThumbnailChange}
              />
            )}

            {/* --- BANNERS TAB --- */}
            {activeTab === 'banners' && (
              <div className="flex flex-col gap-4">
                {modalMode !== 'view' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Upload Package Banner Images (Multiple)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={handleBannersAdd}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer text-gray-900"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-3 mt-2">
                  {formData.banners && formData.banners.length > 0 ? (
                    formData.banners.map((img, idx) => (
                      <div key={idx} className="relative h-32 w-full bg-gray-100 rounded-lg overflow-hidden group border border-gray-200">
                        <img src={img} alt={`Banner ${idx}`} className="w-full h-full object-cover" />
                        {modalMode !== 'view' && (
                          <button 
                            onClick={() => removeBannerImage(idx)}
                            className="absolute top-2 right-2 bg-white p-1.5 rounded-full text-red-500 shadow-md hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-6">No banner images uploaded yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* --- GALLERY TAB --- */}
            {activeTab === 'gallery' && (
              <div className="flex flex-col gap-4">
                {modalMode !== 'view' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Upload Gallery Images (Multiple)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={handleGalleryAdd}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer text-gray-900"
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {formData.gallery && formData.gallery.length > 0 ? (
                    formData.gallery.map((img, idx) => (
                      <div key={idx} className="relative h-24 bg-gray-100 rounded-lg overflow-hidden group">
                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        {modalMode !== 'view' && (
                          <button 
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute top-1 right-1 bg-white/80 p-1.5 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="col-span-2 text-sm text-gray-500 text-center py-6">No gallery images uploaded yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* --- VIDEO TAB --- */}
            {activeTab === 'video' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Video Embed URL</label>
                  {modalMode !== 'view' ? (
                    <input 
                      type="text" 
                      name="bannerVideo"
                      value={formData.bannerVideo || ''}
                      onChange={handleInputChange}
                      placeholder="e.g. https://www.youtube.com/embed/..." 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                  ) : (
                    <p className="text-md text-gray-800 break-all">{formData.bannerVideo || '-'}</p>
                  )}
                </div>
                {formData.bannerVideo && (
                  <div className="mt-2 w-full aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe 
                      src={formData.bannerVideo} 
                      title="Video preview" 
                      className="w-full h-full"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {modalMode !== 'view' && (
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
                {modalMode === 'add' ? 'Save Package' : 'Update Package'}
              </button>
            </div>
          )}
        </div>
      </RightSideModal>
    </div>
  );
};

export default Package;
