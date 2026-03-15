import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import ResultCard from './ResultCard';

const Dashboard = ({ items, onDelete, onFilter, loading = false }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'TASK', 'REMINDER', 'NOTE', 'CODE'];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilter(filter);
  };

  const stats = {
    total: items.length,
    tasks: items.filter(item => item.type === 'TASK').length,
    reminders: items.filter(item => item.type === 'REMINDER').length,
    notes: items.filter(item => item.type === 'NOTE').length,
    code: items.filter(item => item.type === 'CODE').length,
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Knowledge Base</h2>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600 font-medium">Total Items</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-blue-700 mb-1">{stats.tasks}</div>
            <div className="text-sm text-blue-600 font-medium">Tasks</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm border border-amber-200 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-amber-700 mb-1">{stats.reminders}</div>
            <div className="text-sm text-amber-600 font-medium">Reminders</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm border border-purple-200 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-purple-700 mb-1">{stats.notes}</div>
            <div className="text-sm text-purple-600 font-medium">Notes</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-sm border border-orange-200 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-orange-700 mb-1">{stats.code}</div>
            <div className="text-sm text-orange-600 font-medium">Code</div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Items Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div>
                    <div className="w-16 h-5 bg-gray-200 rounded-full mb-1"></div>
                    <div className="w-20 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
              <div className="w-3/4 h-5 bg-gray-200 rounded mb-3"></div>
              <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
                <div className="w-full h-3 bg-gray-200 rounded"></div>
                <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
          <p className="text-gray-500">Upload a screenshot above to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map(item => (
            <ResultCard key={item.id} item={item} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;