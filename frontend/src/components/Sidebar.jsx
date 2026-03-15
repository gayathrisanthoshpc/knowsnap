import React from 'react';
import { BarChart3, CheckCircle, Calendar, BookOpen, Code, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, activeFilter, onFilter, stats }) => {
  const filters = [
    { key: 'All', label: 'All Items', icon: BarChart3, count: stats.total },
    { key: 'TASK', label: 'Tasks', icon: CheckCircle, count: stats.tasks },
    { key: 'REMINDER', label: 'Reminders', icon: Calendar, count: stats.reminders },
    { key: 'NOTE', label: 'Notes', icon: BookOpen, count: stats.notes },
    { key: 'CODE', label: 'Code', icon: Code, count: stats.code },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 backdrop-blur-xl bg-white/10 border-r border-white/20 transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-white lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="p-6 border-b border-white/20">
            <h3 className="text-sm font-medium text-white/70 mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="backdrop-blur-xl bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-xs text-white/70">Total</div>
              </div>
              <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30">
                <div className="text-2xl font-bold text-white">{stats.tasks + stats.reminders + stats.notes + stats.code}</div>
                <div className="text-xs text-white/70">Active</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex-1 p-6">
            <h3 className="text-sm font-medium text-white/70 mb-4">Filter by Type</h3>
            <div className="space-y-2">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.key;

                return (
                  <button
                    key={filter.key}
                    onClick={() => onFilter(filter.key)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'backdrop-blur-xl bg-white/20 border border-white/30 text-white shadow-lg transform scale-105'
                        : 'backdrop-blur-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{filter.label}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      isActive
                        ? 'bg-white/30 text-white'
                        : 'bg-white/20 text-white/80'
                    }`}>
                      {filter.count}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs text-white/60">
                KnowSnap v1.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;