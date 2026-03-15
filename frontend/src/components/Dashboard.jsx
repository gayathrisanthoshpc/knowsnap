import React, { useState, useEffect } from 'react';
import { Upload, Sparkles, TrendingUp } from 'lucide-react';
import ResultCard from './ResultCard';
import WelcomeScreen from './WelcomeScreen';

const Dashboard = ({ items, onDelete, onFilter, loading = false, onUpload }) => {
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'TASK': return 'from-blue-500/20 to-cyan-500/20 border-blue-400/30';
      case 'REMINDER': return 'from-amber-500/20 to-orange-500/20 border-amber-400/30';
      case 'NOTE': return 'from-purple-500/20 to-pink-500/20 border-purple-400/30';
      case 'CODE': return 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-400/30';
    }
  };

  // Show welcome screen when there are no items and not loading
  if (items.length === 0 && !loading) {
    return <WelcomeScreen onUpload={onUpload} loading={loading} />;
  }

  return (
    <div className="relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Sparkles className="h-8 w-8 mr-3 text-purple-300" />
              Your Knowledge Base
            </h2>
            {stats.total > 0 && (
              <div className="flex items-center text-white/70 text-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                {stats.total} items processed
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{stats.total}</div>
              <div className="text-sm text-white/70 font-medium">Total Items</div>
              <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className={`backdrop-blur-xl bg-gradient-to-br ${getTypeColor('TASK')} rounded-2xl p-6 border hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group`}>
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{stats.tasks}</div>
              <div className="text-sm text-white/80 font-medium">Tasks</div>
              <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className={`backdrop-blur-xl bg-gradient-to-br ${getTypeColor('REMINDER')} rounded-2xl p-6 border hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 group`}>
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{stats.reminders}</div>
              <div className="text-sm text-white/80 font-medium">Reminders</div>
              <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className={`backdrop-blur-xl bg-gradient-to-br ${getTypeColor('NOTE')} rounded-2xl p-6 border hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group`}>
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{stats.notes}</div>
              <div className="text-sm text-white/80 font-medium">Notes</div>
              <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className={`backdrop-blur-xl bg-gradient-to-br ${getTypeColor('CODE')} rounded-2xl p-6 border hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 group`}>
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{stats.code}</div>
              <div className="text-sm text-white/80 font-medium">Code</div>
              <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {filters.map((filter, index) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter
                    ? 'backdrop-blur-xl bg-white/20 text-white shadow-2xl shadow-purple-500/30 border border-white/30'
                    : 'backdrop-blur-xl bg-white/5 text-white/80 border border-white/20 hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/10'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {filter}
                {activeFilter === filter && <Sparkles className="inline h-4 w-4 ml-2 animate-pulse" />}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                    <div>
                      <div className="w-16 h-5 bg-white/20 rounded-full mb-1"></div>
                      <div className="w-20 h-3 bg-white/20 rounded"></div>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>
                <div className="w-3/4 h-5 bg-white/20 rounded mb-3"></div>
                <div className="w-full h-4 bg-white/20 rounded mb-2"></div>
                <div className="w-2/3 h-4 bg-white/20 rounded mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="w-24 h-4 bg-white/20 rounded"></div>
                  <div className="w-full h-3 bg-white/20 rounded"></div>
                  <div className="w-4/5 h-3 bg-white/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ResultCard item={item} onDelete={onDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;