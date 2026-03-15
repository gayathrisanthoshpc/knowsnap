import React, { useState } from 'react';
import { Trash2, Eye, EyeOff, CheckCircle, Calendar, BookOpen, Code, Sparkles, Clock } from 'lucide-react';

const typeIcons = {
  TASK: CheckCircle,
  REMINDER: Calendar,
  NOTE: BookOpen,
  CODE: Code,
};

const typeColors = {
  TASK: {
    bg: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-400/30',
    text: 'text-blue-300',
    accent: 'from-blue-400 to-cyan-400',
    shadow: 'shadow-blue-500/20'
  },
  REMINDER: {
    bg: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-400/30',
    text: 'text-amber-300',
    accent: 'from-amber-400 to-orange-400',
    shadow: 'shadow-amber-500/20'
  },
  NOTE: {
    bg: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-400/30',
    text: 'text-purple-300',
    accent: 'from-purple-400 to-pink-400',
    shadow: 'shadow-purple-500/20'
  },
  CODE: {
    bg: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-400/30',
    text: 'text-emerald-300',
    accent: 'from-emerald-400 to-teal-400',
    shadow: 'shadow-emerald-500/20'
  },
};

const ResultCard = ({ item, onDelete }) => {
  const [showRawText, setShowRawText] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const TypeIcon = typeIcons[item.type];
  const colors = typeColors[item.type];

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(item.id);
    }
  };

  return (
    <div
      className={`backdrop-blur-xl bg-gradient-to-br ${colors.bg} rounded-2xl border ${colors.border} hover:shadow-2xl hover:${colors.shadow} transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
              <TypeIcon className={`h-5 w-5 ${colors.text}`} />
            </div>
            <div>
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl bg-white/10 border border-white/20 ${colors.text} transition-all duration-300`}>
                <Sparkles className="h-3 w-3 mr-1.5 animate-pulse" />
                {item.type}
              </div>
              <div className="flex items-center text-xs text-white/60 mt-2">
                <Clock className="h-3 w-3 mr-1.5" />
                {new Date(item.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg backdrop-blur-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 hover:text-red-200 transition-all duration-200 transform hover:scale-110"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 leading-tight">
          {item.title}
        </h3>

        <p className="text-white/80 mb-4 text-sm leading-relaxed">
          {item.summary}
        </p>

        <div className="mb-4">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
            Action Items
          </h4>
          <ul className="space-y-2">
            {item.actions.map((action, index) => (
              <li key={index} className="flex items-start text-sm text-white/70">
                <span className={`inline-block w-1.5 h-1.5 bg-gradient-to-r ${colors.accent} rounded-full mt-2 mr-3 flex-shrink-0 transition-all duration-300 ${isHovered ? 'scale-125' : ''}`}></span>
                {action}
              </li>
            ))}
          </ul>
        </div>

        <div className={`border-t border-white/20 pt-4 transition-all duration-300 ${showRawText ? 'mt-4' : ''}`}>
          <button
            onClick={() => setShowRawText(!showRawText)}
            className="flex items-center text-sm text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
          >
            {showRawText ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showRawText ? 'Hide' : 'Show'} extracted text
          </button>

          {showRawText && (
            <div className="mt-3 p-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 transition-all duration-300 animate-fade-in">
              <p className="text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed">
                {item.extracted_text}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;