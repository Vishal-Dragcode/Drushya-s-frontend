import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

const ActionMenu = ({ onView, onEdit, onDelete, onTrending, isTrending, position = 'bottom' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none cursor-pointer"
        title="More Actions"
      >
        <FiMoreVertical size={20} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden py-1 ${position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}`}>
          <button 
            onClick={() => { setIsOpen(false); onView(); }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left cursor-pointer"
          >
            <FiEye size={16} className="text-blue-500" /> View
          </button>
          <button 
            onClick={() => { setIsOpen(false); onEdit(); }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left cursor-pointer"
          >
            <FiEdit size={16} className="text-yellow-500" /> Edit
          </button>
          {onTrending && (
            <button 
              onClick={() => { setIsOpen(false); onTrending(); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors text-left cursor-pointer"
            >
              <i className={`pi ${isTrending ? 'pi-star-fill' : 'pi-star'} text-green-500`} style={{ fontSize: '1rem' }}></i> {isTrending ? 'Remove Trending' : 'Add to Trending'}
            </button>
          )}
          <button 
            onClick={() => { setIsOpen(false); onDelete(); }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
          >
            <FiTrash2 size={16} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
