import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, X, Sparkles, Zap, Brain } from 'lucide-react';
import UploadZone from './components/UploadZone';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fetchingItems, setFetchingItems] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [appLoaded, setAppLoaded] = useState(false);

  // App initialization effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
    setActiveFilter(type);
    fetchItems(type === 'All' ? null : type);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden transition-opacity duration-1000 ${
      appLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Hidden file input for WelcomeScreen */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        id="file-input"
      />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

        {/* Additional floating elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-cyan-400 rounded-full animate-bounce opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-emerald-400 rounded-full animate-bounce opacity-50 animation-delay-2000"></div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeFilter={activeFilter}
        onFilter={handleFilter}
        stats={{
          total: items.length,
          tasks: items.filter(item => item.type === 'TASK').length,
          reminders: items.filter(item => item.type === 'REMINDER').length,
          notes: items.filter(item => item.type === 'NOTE').length,
          code: items.filter(item => item.type === 'CODE').length,
        }}
      />

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Header */}
        <header className="backdrop-blur-xl bg-white/10 border-b border-white/20 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-white hover:scale-110"
                >
                  {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white flex items-center">
                      KnowSnap
                      <Zap className="h-4 w-4 ml-2 text-yellow-400 animate-pulse" />
                    </h1>
                    <p className="text-xs text-white/70 flex items-center">
                      <Brain className="h-3 w-3 mr-1" />
                      AI-Powered Screenshot Intelligence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="relative z-10">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Notifications */}
            <div className="mb-8 space-y-4">
              {error && (
                <div className="backdrop-blur-xl bg-red-500/20 border border-red-400/30 text-red-100 rounded-xl p-4 flex items-center animate-fade-in shadow-2xl shadow-red-500/20">
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
                <div className="backdrop-blur-xl bg-green-500/20 border border-green-400/30 text-green-100 rounded-xl p-4 flex items-center animate-fade-in shadow-2xl shadow-green-500/20">
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
            </div>

            {/* Upload Zone */}
            <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <UploadZone onUpload={handleUpload} loading={loading} />
            </div>

            {/* Dashboard */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Dashboard
                items={items}
                onDelete={handleDelete}
                onFilter={handleFilter}
                loading={fetchingItems}
                onUpload={handleUpload}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;