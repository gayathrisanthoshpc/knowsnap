import { useState } from 'react';
import { Trash2, Eye, EyeOff, CheckCircle, Calendar, BookOpen, Code, Clock } from 'lucide-react';

const typeIcons = {
  TASK: CheckCircle,
  REMINDER: Calendar,
  NOTE: BookOpen,
  CODE: Code,
};

const typeColors = {
  TASK: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-400/30',
    text: 'text-blue-300',
    accent: 'bg-blue-400',
    icon: 'text-blue-400'
  },
  REMINDER: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-400/30',
    text: 'text-amber-300',
    accent: 'bg-amber-400',
    icon: 'text-amber-400'
  },
  NOTE: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-400/30',
    text: 'text-purple-300',
    accent: 'bg-purple-400',
    icon: 'text-purple-400'
  },
  CODE: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-400/30',
    text: 'text-emerald-300',
    accent: 'bg-emerald-400',
    icon: 'text-emerald-400'
  },
};

const ResultCard = ({ item, onDelete }) => {
  const [showRawText, setShowRawText] = useState(false);
  const TypeIcon = typeIcons[item.type];
  const colors = typeColors[item.type];

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(item.id);
    }
  };

  return (
    <div className={`bg-[#1a1410] rounded-lg border ${colors.border} hover:border-[#f97316]/30 transition-all duration-500 overflow-hidden group hover:shadow-2xl hover:shadow-[#f97316]/20 hover:-translate-y-1 animate-card-flip`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${colors.bg} border border-white/10 animate-scale-bounce`}>
              <TypeIcon className={`h-4 w-4 ${colors.icon} animate-pulse`} />
            </div>
            <div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border border-white/10 animate-fade-in`}>
                {item.type}
              </div>
              <div className="flex items-center text-xs text-white/60 mt-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <Clock className="h-3 w-3 mr-1.5 animate-bounce" />
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
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-400/20 text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110 hover:rotate-12"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <h3 className="text-lg font-display font-bold text-white mb-3 leading-tight animate-text-reveal">
          {item.title}
        </h3>

        <p className="text-white/80 mb-4 text-sm leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {item.summary}
        </p>

        <div className="mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-green-400 animate-bounce" />
            Action Items
          </h4>
          <ul className="space-y-2">
            {item.actions.map((action, index) => (
              <li key={index} className="flex items-start text-sm text-white/70 animate-stagger-fade-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                <span className={`inline-block w-1.5 h-1.5 ${colors.accent} rounded-full mt-2 mr-3 flex-shrink-0 animate-scale-bounce`}></span>
                {action}
              </li>
            ))}
          </ul>
        </div>

        <div className={`border-t border-white/10 pt-4 transition-all duration-300 ${showRawText ? 'mt-4' : ''} animate-fade-in`} style={{ animationDelay: '0.5s' }}>
          <button
            onClick={() => setShowRawText(!showRawText)}
            className="flex items-center text-sm text-white/60 hover:text-white transition-all duration-300 hover:scale-105"
          >
            {showRawText ? <EyeOff className="h-4 w-4 mr-2 animate-rotate-scale" /> : <Eye className="h-4 w-4 mr-2 animate-bounce" />}
            {showRawText ? 'Hide' : 'Show'} extracted text
          </button>

          {showRawText && (
            <div className="mt-3 p-4 bg-black/20 rounded-lg border border-white/10 transition-all duration-500 animate-slide-up-bounce">
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