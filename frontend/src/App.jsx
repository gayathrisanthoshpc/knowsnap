import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Upload, BarChart3, CheckCircle, Calendar, BookOpen, Code } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
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
    setIsDragging(false);

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

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      await handleUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
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

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.trim().toLowerCase();
    return (
      item.title?.toLowerCase().includes(query) ||
      item.summary?.toLowerCase().includes(query) ||
      item.extracted_text?.toLowerCase().includes(query)
    );
  });

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  const handleCopyAll = async () => {
    const allText = filteredItems
      .map((item) => `${item.title}\n${item.extracted_text}`)
      .join('\n\n-----\n\n');

    try {
      await navigator.clipboard.writeText(allText);
      setSuccess('Copied all extracted text to clipboard!');
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError('Copy failed. Your browser may block clipboard access.');
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Delete all items? This cannot be undone.')) return;

    setBulkActionLoading(true);
    try {
      for (const item of items) {
        await axios.delete(`${API_BASE_URL}/items/${item.id}`);
      }
      setSuccess('All items deleted.');
      setTimeout(() => setSuccess(null), 4000);
      await fetchItems();
    } catch (err) {
      setError('Failed to delete all items.');
      console.error(err);
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div
      className="min-h-screen text-[#faf5f0] relative overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-40 w-[580px] h-[580px] bg-[#f97316]/15 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Drag & drop overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1410]/70 backdrop-blur-sm">
          <div className="border-2 border-dashed border-[#f97316]/60 rounded-2xl p-10 text-center">
            <p className="text-lg font-semibold text-[#faf5f0] mb-2">Drop image to upload</p>
            <p className="text-sm text-[#faf5f0]/60">Let go to instantly process the screenshot.</p>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        id="file-input"
      />

      {/* Layout grid */}
      <div className="grid grid-cols-[240px_1fr] min-h-screen">
        {/* Sidebar */}
        <aside className="bg-[#1a1410] border-r border-[#faf5f0]/10 flex flex-col">
          <div className="p-6 border-b border-[#faf5f0]/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-lg flex items-center justify-center shadow-lg shadow-[#f97316]/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#faf5f0]">KnowSnap</h1>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-[#f97316] rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-[#faf5f0]/60">@v1.0 · AI-Powered</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-[#faf5f0]/10">
            <h3 className="text-sm font-semibold text-[#faf5f0]/80 mb-3">Upload Screenshot</h3>
            <button
              onClick={() => document.getElementById('file-input')?.click()}
              disabled={loading}
              className="w-full p-4 border-2 border-dashed border-[#faf5f0]/20 rounded-lg hover:border-[#f97316]/50 hover:bg-[#f97316]/5 transition-all duration-200 group"
            >
              <div className="flex flex-col items-center space-y-2">
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#f97316] border-t-transparent" />
                ) : (
                  <Upload className="w-6 h-6 text-[#faf5f0]/60 group-hover:text-[#f97316] transition-colors" />
                )}
                <span className="text-sm text-[#faf5f0]/60 group-hover:text-[#faf5f0] transition-colors">
                  {loading ? 'Processing...' : 'Drop or click to upload'}
                </span>
              </div>
            </button>
          </div>

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
                      ? 'bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316]'
                      : 'text-[#faf5f0]/70 hover:text-[#faf5f0] hover:bg-[#faf5f0]/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeFilter === item.key
                      ? 'bg-[#f97316]/20 text-[#f97316]'
                      : 'bg-[#faf5f0]/10 text-[#faf5f0]/60'
                  }`}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          <div className="p-6 border-t border-[#faf5f0]/10">
            <div className="text-xs text-[#faf5f0]/40 space-y-1">
              <div>Frontend: localhost:5173</div>
              <div>Backend: localhost:8000</div>
            </div>
          </div>
        </aside>

        <main className="relative overflow-y-auto">
          <header className="border-b border-[#faf5f0]/10 bg-[#1a1410]/50 backdrop-blur-sm">
            <div className="px-8 py-6 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#faf5f0]">
                    Your <span className="text-[#f97316]">Knowledge Base</span>
                  </h1>
                  <p className="text-sm text-[#faf5f0]/60 mt-1">Transform screenshots into actionable insights</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search all items..."
                      className="w-64 px-4 py-2 rounded-lg bg-[#1a1410]/70 border border-[#faf5f0]/10 text-sm text-[#faf5f0] placeholder:text-[#faf5f0]/40 focus:outline-none focus:ring-2 focus:ring-[#f97316]/50"
                    />
                    {searchQuery && (
                      <button
                        onClick={handleSearchClear}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#faf5f0]/60 hover:text-[#faf5f0]"
                        aria-label="Clear search"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {items.length > 0 && (
                    <button
                      onClick={handleCopyAll}
                      className="px-4 py-2 rounded-lg bg-[#f97316]/20 text-[#faf5f0] hover:bg-[#f97316]/30 transition"
                    >
                      Copy all text
                    </button>
                  )}

                  {items.length > 0 && (
                    <button
                      onClick={handleDeleteAll}
                      disabled={bulkActionLoading}
                      className="px-4 py-2 rounded-lg bg-red-500/10 text-red-200 hover:bg-red-500/20 transition disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {bulkActionLoading ? 'Deleting...' : 'Delete all'}
                    </button>
                  )}
                </div>
              </div>

              {items.length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#faf5f0]/60">
                    Showing {filteredItems.length} of {items.length} items
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#faf5f0]">{items.length}</div>
                    <div className="text-xs text-[#faf5f0]/60">Total items</div>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="p-8">
            {items.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total', value: items.length, color: 'border-[#f97316]' },
                  { label: 'Tasks', value: items.filter(item => item.type === 'TASK').length, color: 'border-[#f97316]' },
                  { label: 'Notes', value: items.filter(item => item.type === 'NOTE').length, color: 'border-[#f97316]' },
                  { label: 'Code', value: items.filter(item => item.type === 'CODE').length, color: 'border-[#f97316]' },
                ].map((stat, index) => (
                  <div key={stat.label} className={`bg-[#1a1410] rounded-lg p-4 border-t-4 ${stat.color} border-[#faf5f0]/10`}>
                    <div className="text-2xl font-bold text-[#faf5f0] mb-1">{stat.value}</div>
                    <div className="text-xs text-[#faf5f0]/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

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

            <Dashboard
              items={filteredItems}
              onDelete={handleDelete}
              onFilter={handleFilter}
              loading={fetchingItems}
              onUpload={handleUpload}
            />

            {items.length > 0 && (
              <div className="mt-8 bg-[#1a1410] rounded-lg p-4 border-l-4 border-[#f97316]">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-[#f97316] mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 000 16zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#faf5f0] mb-1">💡 Pro tip</div>
                    <div className="text-xs text-[#faf5f0]/60">
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
