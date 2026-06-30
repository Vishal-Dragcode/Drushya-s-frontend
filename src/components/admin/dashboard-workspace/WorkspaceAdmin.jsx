import React, { useState, useEffect } from 'react';
import Sidebar from '../../../ui/layout/Sidebar';
import Header from '../../../ui/layout/Header';
import RightSideModal from '../../../ui/common/RightSideModal';
import ActionMenu from '../../../ui/common/ActionMenu';
import { FiPlus, FiImage } from 'react-icons/fi';

const initialGallery = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    title: 'Main Studio',
    description: 'Our primary shooting area equipped with state-of-the-art lighting.',
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop',
    title: 'Client Lounge',
    description: 'A comfortable space to discuss ideas and review portfolios.',
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1200&auto=format&fit=crop',
    title: 'Editing Bay',
    description: 'Where the magic happens post-production.',
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5d1?q=80&w=1200&auto=format&fit=crop',
    title: 'Props Room',
    description: 'Extensive collection of props and backdrops for every occasion.',
  },
  {
    id: 5,
    thumbnail: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1200&auto=format&fit=crop',
    title: 'Makeup & Wardrobe',
    description: 'Dedicated styling area for your convenience.',
  },
  {
    id: 6,
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1200&auto=format&fit=crop',
    title: 'Conference Room',
    description: 'Professional setting for corporate project planning.',
  }
];

const WorkspaceAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Use localStorage to persist state across reloads for demo purposes
  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('drushya_workspace_gallery');
    if (saved) {
      return JSON.parse(saved).map(item => ({
        ...item,
        thumbnail: item.thumbnail || item.imageSrc || ''
      }));
    }
    return initialGallery;
  });

  useEffect(() => {
    localStorage.setItem('drushya_workspace_gallery', JSON.stringify(gallery));
  }, [gallery]);

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'add', 'edit', 'view'
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const [formData, setFormData] = useState({
    thumbnail: '',
    title: '',
    description: '',
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this workspace photo?')) {
      setGallery(gallery.filter(g => g.id !== id));
    }
  };

  const openModal = (mode, photo = null) => {
    setModalMode(mode);
    setSelectedPhoto(photo);
    
    if (photo && (mode === 'edit' || mode === 'view')) {
      setFormData({ ...photo });
    } else {
      setFormData({
        thumbnail: '',
        title: '',
        description: '',
      });
    }
    
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPhoto(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, thumbnail: imageUrl }));
    }
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      const newPhoto = {
        ...formData,
        id: Date.now()
      };
      setGallery([...gallery, newPhoto]);
    } else if (modalMode === 'edit' && selectedPhoto) {
      setGallery(gallery.map(g => 
        g.id === selectedPhoto.id ? { ...formData, id: g.id } : g
      ));
    }
    closeModal();
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
        <Header title="Workspace Gallery Management" toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Workspace Photos</h2>
            <button 
              onClick={() => openModal('add')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FiPlus size={20} /> Add Photo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {gallery.map((photo) => (
              <div key={photo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="relative h-48 bg-gray-200">
                  {photo.thumbnail ? (
                    <img 
                      src={photo.thumbnail} 
                      alt={photo.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiImage size={40} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full shadow-sm">
                    <ActionMenu 
                      onView={() => openModal('view', photo)}
                      onEdit={() => openModal('edit', photo)}
                      onDelete={() => handleDelete(photo.id)}
                    />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{photo.title || <span className="text-gray-400 italic">No Title</span>}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{photo.description || <span className="text-gray-400 italic">No Description</span>}</p>
                </div>
              </div>
            ))}
          </div>
          
          {gallery.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100 mt-6">
              <p className="text-gray-500">No workspace photos found. Click "Add Photo" to create one.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Right Side Modal for View/Edit/Add */}
      <RightSideModal 
        visible={modalVisible} 
        onHide={closeModal} 
        title={
          modalMode === 'add' ? 'Add Workspace Photo' : 
          modalMode === 'edit' ? 'Edit Workspace Photo' : 'Photo Details'
        }
      >
        <div className="flex flex-col h-full mt-4">
          <div className="flex-1 overflow-y-auto pr-2 space-y-5 pb-6">
            
            {modalMode === 'view' ? (
              <div className="space-y-5">
                <div className="h-64 w-full bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                  {formData.thumbnail ? (
                    <img src={formData.thumbnail} alt={formData.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiImage size={40} />
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Title</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{formData.title || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Description</p>
                      <p className="text-md text-gray-800 mt-1 whitespace-pre-wrap">{formData.description || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Thumbnail Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer text-gray-900"
                  />
                  {formData.thumbnail && (
                    <div className="mt-2 h-40 w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Title</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Main Studio" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="e.g. Equipped with state-of-the-art lighting..." 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </>
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
                {modalMode === 'add' ? 'Save Photo' : 'Update Photo'}
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

export default WorkspaceAdmin;
