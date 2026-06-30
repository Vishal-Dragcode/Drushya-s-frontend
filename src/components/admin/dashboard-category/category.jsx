import React, { useState } from 'react';
import Sidebar from '../../../ui/layout/Sidebar';
import Header from '../../../ui/layout/Header';
import RightSideModal from '../../../ui/common/RightSideModal';
import ActionMenu from '../../../ui/common/ActionMenu';
import { FiPlus, FiImage } from 'react-icons/fi';

// Dummy initial data
const initialCategories = [
  { id: 1, name: 'Wedding Photography', description: 'Capture the most beautiful moments of your special day.', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc', status: 'Active' },
  { id: 2, name: 'Pre-Wedding Shoot', description: 'Romantic pre-wedding photoshoots at scenic locations.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552', status: 'Active' },
  { id: 3, name: 'Corporate Events', description: 'Professional coverage for all your corporate gatherings.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865', status: 'Inactive' },
];

const Category = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'add', 'edit', 'view'
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    status: 'Active'
  });

  const openModal = (mode, category = null) => {
    setModalMode(mode);
    setSelectedCategory(category);
    if (category && (mode === 'edit' || mode === 'view')) {
      setFormData({ ...category });
    } else {
      setFormData({ name: '', description: '', image: '', status: '' });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      const newCategory = {
        ...formData,
        id: Date.now()
      };
      setCategories([...categories, newCategory]);
    } else if (modalMode === 'edit') {
      setCategories(categories.map(cat => cat.id === selectedCategory.id ? { ...formData, id: cat.id } : cat));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
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
        <Header title="Category Management" toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
            <button 
              onClick={() => openModal('add')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FiPlus size={20} /> Add Category
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col relative z-0">
                <div className="h-48 bg-gray-200 relative rounded-t-xl overflow-hidden group">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiImage size={40} />
                    </div>
                  )}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${cat.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {cat.status}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 pr-8">{cat.name}</h3>
                    <div className="absolute right-3 top-4">
                      <ActionMenu 
                        onView={() => openModal('view', cat)}
                        onEdit={() => openModal('edit', cat)}
                        onDelete={() => handleDelete(cat.id)}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 flex-1">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500">No categories found. Click "Add Category" to create one.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Modal for Add/Edit/View */}
      <RightSideModal 
        visible={modalVisible} 
        onHide={closeModal} 
        title={
          modalMode === 'add' ? 'Add New Category' : 
          modalMode === 'edit' ? 'Edit Category' : 'Category Details'
        }
      >
        <div className="flex flex-col gap-5 mt-4">
          {modalMode === 'view' ? (
            <div className="space-y-6">
              <div className="h-48 w-full bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                 {formData.image ? (
                    <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiImage size={40} />
                    </div>
                  )}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Category Name</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{formData.name}</p>
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
              {/* Form fields for Add / Edit */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Category Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Wedding Photography" 
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
                  placeholder="Enter category description..." 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Category Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer text-gray-900"
                />
                {formData.image && (
                  <div className="mt-2 h-32 w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
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

              <div className="flex gap-3 mt-6">
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
                  {modalMode === 'add' ? 'Add Category' : 'Save Changes'}
                </button>
              </div>
            </>
          )}
        </div>
      </RightSideModal>
    </div>
  );
};

export default Category;
