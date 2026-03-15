import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Upload, BarChart3, CheckCircle, Calendar, BookOpen, Code } from 'lucide-react';
import UploadZone from './components/UploadZone';
import Dashboard from './components/Dashboard';

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
    <div className="min-h-screen bg-[#121313] text-white font-body relative overflow-hidden">
      {/* Atmospheric background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#FF6044]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#FF6044]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF6044]/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>

      {/* Hidden file input for WelcomeScreen */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        id="file-input"
      />

      {/* Main layout grid */}
      <div className="grid grid-cols-[280px_1fr] min-h-screen">
        {/* Sidebar */}
        <aside className="bg-[#0F0F0F] border-r border-white/10 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#FF6044] rounded-lg flex items-center justify-center shadow-lg shadow-[#FF6044]/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-display font-bold text-white">KnowSnap</h1>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-[#FF6044] rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/60">v1.0 · AI-Powered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Zone */}
          <div className="p-6 border-b border-white/10">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white/80">Upload Screenshot</h3>
              <button
                onClick={() => document.getElementById('file-input')?.click()}
                disabled={loading}
                className="w-full p-4 border-2 border-dashed border-white/20 rounded-lg hover:border-[#FF6044]/50 hover:bg-[#FF6044]/5 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center space-y-2">
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#FF6044] border-t-transparent"></div>
                  ) : (
                    <Upload className="w-6 h-6 text-white/60 group-hover:text-[#FF6044] transition-colors" />
                  )}
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                    {loading ? 'Processing...' : 'Drop or click to upload'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-1">
              {[
                { key: 'All', label: 'All Items', icon: BarChart3, count: items.length },
                { key: 'TASK', label: 'Tasks', icon: CheckCircle, count: items.filter(item => item.type === 'TASK').length },
                { key: 'REMINDER', label: 'Reminders', icon: Calendar, count: items.filter(item => item.type === 'REMINDER').length },
                { key: 'NOTE', label: 'Notes', icon: BookOpen, count: items.filter(item => item.type === 'NOTE').length },
                { key: 'CODE', label: 'Code', icon: Code, count: items.filter(item => item.type === 'CODE').length },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleFilter(item.key)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    activeFilter === item.key
                      ? 'bg-[#FF6044]/10 border border-[#FF6044]/20 text-[#FF6044]'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeFilter === item.key
                      ? 'bg-[#FF6044]/20 text-[#FF6044]'
                      : 'bg-white/10 text-white/60'
                  }`}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <div className="text-xs text-white/40 space-y-1">
              <div>Frontend: localhost:5176</div>
              <div>Backend: localhost:8000</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative">
          {/* Header */}
          <header className="border-b border-white/10 bg-[#0F0F0F]/50 backdrop-blur-sm">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold text-white">
                    Your <span className="text-[#FF6044]">Knowledge Base</span>
                  </h1>
                  <p className="text-sm text-white/60 mt-1">
                    Transform screenshots into actionable insights
                  </p>
                </div>
                {items.length > 0 && (
                  <div className="text-right">
                    <div className="text-2xl font-display font-bold text-white">{items.length}</div>
                    <div className="text-xs text-white/60">Total items</div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-8">
            {/* Stats Overview */}
            {items.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total', value: items.length, color: 'border-white/20' },
                  { label: 'Tasks', value: items.filter(item => item.type === 'TASK').length, color: 'border-blue-400/30' },
                  { label: 'Notes', value: items.filter(item => item.type === 'NOTE').length, color: 'border-purple-400/30' },
                  { label: 'Code', value: items.filter(item => item.type === 'CODE').length, color: 'border-emerald-400/30' },
                ].map((stat, index) => (
                  <div key={stat.label} className="bg-[#0F0F0F] rounded-lg p-4 border border-white/10">
                    <div className="text-2xl font-display font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                    <div className={`w-full h-0.5 ${stat.color} mt-3 rounded-full`}></div>
                  </div>
                ))}
              </div>
            )}

            {/* Notifications */}
            <div className="mb-6 space-y-3">
              {error && (
                <div className="bg-red-500/10 border border-red-400/20 rounded-lg p-4 flex items-center animate-fade-in">
                  <div className="text-red-400 mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-red-200">{error}</div>
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-4 flex items-center animate-fade-in">
                  <div className="text-green-400 mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-green-200">{success}</div>
                </div>
              )}
            </div>

            {/* Dashboard */}
            <Dashboard
              items={items}
              onDelete={handleDelete}
              onFilter={handleFilter}
              loading={fetchingItems}
              onUpload={handleUpload}
            />

            {/* Pro tip */}
            {items.length > 0 && (
              <div className="mt-8 bg-[#0F0F0F] rounded-lg p-4 border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-[#FF6044] mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 000 16zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white mb-1">💡 Pro tip</div>
                    <div className="text-xs text-white/60">
                      Use high-contrast screenshots for better OCR accuracy. Avoid blurry or low-resolution images.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;