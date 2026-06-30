import React, { useState } from 'react';
import Sidebar from '../../../ui/layout/Sidebar';
import Header from '../../../ui/layout/Header';
import RightSideModal from '../../../ui/common/RightSideModal';
import ActionMenu from '../../../ui/common/ActionMenu';
import { FiPlus, FiImage, FiVideo, FiTrash2 } from 'react-icons/fi';

// Dummy initial data
const initialCategories = [
  { id: 1, name: 'Wedding Photography' },
  { id: 2, name: 'Pre-Wedding Shoot' },
  { id: 3, name: 'Corporate Events' },
];

const initialServices = [
  { 
    id: 1, 
    name: 'Premium Wedding Package', 
    categoryId: 1,
    description: 'Full day coverage with premium album.', 
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
    banners: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552',
      'https://images.unsplash.com/photo-1511578314322-379afb476865'
    ],
    bannerVideo: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    status: 'Active' 
  }
];

const Service = ({ isTrendingPage = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('drushya_services');
    if (saved) {
      // Migrate old data on the fly just in case
      return JSON.parse(saved).map(s => ({
        ...s,
        thumbnail: s.thumbnail || s.cardImage || s.banner || '',
        banners: s.banners || (s.banner ? [s.banner] : [])
      }));
    }
    return initialServices;
  });
  
  React.useEffect(() => {
    localStorage.setItem('drushya_services', JSON.stringify(services));
  }, [services]);

  const [categories] = useState(initialCategories);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'add', 'edit', 'view'
  const [selectedService, setSelectedService] = useState(null);
  
  // Tabs: 'basic', 'banners', 'gallery', 'video'
  const [activeTab, setActiveTab] = useState('basic');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    thumbnail: '',
    banners: [],
    gallery: [],
    bannerVideo: '',
    status: 'Active'
  });

  const openModal = (mode, service = null) => {
    setModalMode(mode);
    setSelectedService(service);
    setActiveTab('basic');
    if (service && (mode === 'edit' || mode === 'view')) {
      setFormData({ 
        ...service,
        thumbnail: service.thumbnail || service.cardImage || service.banner || '',
        banners: service.banners || (service.banner ? [service.banner] : [])
      });
    } else {
      setFormData({ 
        name: '', 
        categoryId: '', 
        description: '', 
        thumbnail: '', 
        banners: [],
        gallery: [], 
        bannerVideo: '', 
        status: 'Active' 
      });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedService(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    setFormData(prev => ({ ...prev, banners: [...prev.banners, ...newImages] }));
  };

  const removeBannerImage = (index) => {
    setFormData(prev => ({
      ...prev,
      banners: prev.banners.filter((_, i) => i !== index)
    }));
  };

  const handleGalleryAdd = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...newImages] }));
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      const newService = {
        ...formData,
        id: Date.now()
      };
      setServices([...services, newService]);
    } else if (modalMode === 'edit') {
      setServices(services.map(srv => srv.id === selectedService.id ? { ...formData, id: srv.id } : srv));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(srv => srv.id !== id));
    }
  };

  const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === Number(catId));
    return cat ? cat.name : 'Unknown';
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
        <Header title={isTrendingPage ? "Trending Services" : "Service Management"} toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{isTrendingPage ? "Trending Services" : "Services"}</h2>
            {!isTrendingPage && (
              <button 
                onClick={() => openModal('add')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FiPlus size={20} /> Add Service
              </button>
            )}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.filter(srv => !isTrendingPage || srv.isTrending).map((srv) => (
              <div key={srv.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col relative z-0">
                <div className="h-48 bg-gray-200 relative rounded-t-xl overflow-hidden group">
                  {srv.thumbnail ? (
                    <img src={srv.thumbnail} alt={srv.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiImage size={40} />
                    </div>
                  )}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${srv.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {srv.status}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 pr-8">{srv.name}</h3>
                    <div className="absolute right-3 top-4">
                      <ActionMenu 
                        onView={() => openModal('view', srv)}
                        onEdit={() => openModal('edit', srv)}
                        onDelete={() => handleDelete(srv.id)}
                        onTrending={() => setServices(services.map(s => s.id === srv.id ? { ...s, isTrending: !s.isTrending } : s))}
                        isTrending={srv.isTrending}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md inline-block mb-3 w-fit">
                    {getCategoryName(srv.categoryId)}
                  </span>
                  <p className="text-sm text-gray-500 line-clamp-2 flex-1">{srv.description}</p>
                </div>
              </div>
            ))}
          </div>

          {services.filter(srv => !isTrendingPage || srv.isTrending).length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500">{isTrendingPage ? 'No trending services found.' : 'No services found. Click "Add Service" to create one.'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Modal for Add/Edit/View */}
      <RightSideModal 
        visible={modalVisible} 
        onHide={closeModal} 
        title={
          modalMode === 'add' ? 'Add New Service' : 
          modalMode === 'edit' ? 'Edit Service' : 'Service Details'
        }
      >
        <div className="flex flex-col h-full">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mt-2 mb-5 overflow-x-auto no-scrollbar">
            <button 
              className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'basic' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Info
            </button>
            <button 
              className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'banners' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('banners')}
            >
              Banners
            </button>
            <button 
              className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'gallery' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
            <button 
              className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'video' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('video')}
            >
              Video
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pb-6 pr-2">
            
            {/* --- BASIC INFO TAB --- */}
            {activeTab === 'basic' && (
              <div className="flex flex-col gap-4">
                {modalMode === 'view' ? (
                  <div className="space-y-4">
                    <div className="h-48 w-full bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                      {formData.thumbnail ? (
                        <img src={formData.thumbnail} alt={formData.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FiImage size={40} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Service Name</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Category</p>
                      <p className="text-md text-gray-800 mt-1">{getCategoryName(formData.categoryId)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Description</p>
                      <p className="text-md text-gray-800 mt-1">{formData.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Status</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold ${formData.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {formData.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">Service Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Premium Wedding Package" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <div className="relative">
                        <select 
                          name="categoryId"
                          value={formData.categoryId}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer bg-white appearance-none ${formData.categoryId ? 'text-gray-900' : 'text-gray-400'}`}
                        >
                          <option value="" disabled>Select Category</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3} 
                        placeholder="Enter service description..." 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">Thumbnail Image</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer text-gray-900"
                      />
                      {formData.thumbnail && (
                        <div className="mt-2 h-32 w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <div className="relative">
                        <select 
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer bg-white appearance-none ${formData.status ? 'text-gray-900' : 'text-gray-400'}`}
                        >
                          <option value="" disabled>Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* --- BANNERS TAB --- */}
            {activeTab === 'banners' && (
              <div className="flex flex-col gap-4">
                {modalMode !== 'view' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Upload Service Banner Images (Multiple)</label>
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
                {modalMode !== 'view' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Video URL (YouTube/Vimeo)</label>
                    <input 
                      type="text" 
                      name="bannerVideo"
                      value={formData.bannerVideo}
                      onChange={handleInputChange}
                      placeholder="e.g. https://www.youtube.com/embed/..." 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                    <p className="text-xs text-gray-500">Provide an embed URL (e.g. youtube.com/embed/xyz)</p>
                  </div>
                )}

                {formData.bannerVideo ? (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 font-medium mb-2">Video Preview</p>
                    <div className="h-48 w-full bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                      <iframe 
                        src={formData.bannerVideo} 
                        className="w-full h-full" 
                        title="Service Video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-6">No video URL provided.</p>
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
                {modalMode === 'add' ? 'Save Service' : 'Update Service'}
              </button>
            </div>
          )}
          {modalMode === 'view' && (
            <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
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

export default Service;
