import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadZone from './components/UploadZone';
import Dashboard from './components/Dashboard';

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fetchingItems, setFetchingItems] = useState(true);

  const fetchItems = async (type = null) => {
    try {
      setFetchingItems(true);
      const url = type ? `${API_BASE_URL}/items?type=${type}` : `${API_BASE_URL}/items`;
      const response = await axios.get(url);
      setItems(response.data);
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
    } finally {
      setFetchingItems(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async (file) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSuccess(`Successfully processed "${response.data.title}" as ${response.data.type}!`);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
      
      // Refresh items
      await fetchItems();
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/items/${id}`);
      setSuccess('Item deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
      await fetchItems();
    } catch (err) {
      setError('Failed to delete item');
      console.error(err);
    }
  };

  const handleFilter = (type) => {
    fetchItems(type === 'All' ? null : type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📸 KnowSnap
          </h1>
          <p className="text-lg text-gray-600">
            Extract text from screenshots and organize them intelligently
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{success}</p>
            </div>
          </div>
        )}
        
        <UploadZone onUpload={handleUpload} loading={loading} />
        
        <Dashboard 
          items={items} 
          onDelete={handleDelete} 
          onFilter={handleFilter}
          loading={fetchingItems}
        />
      </div>
    </div>
  );
}

export default App;