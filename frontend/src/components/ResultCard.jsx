import React, { useState } from 'react';
import { Trash2, Eye, EyeOff, CheckCircle, Calendar, BookOpen, Code } from 'lucide-react';

const typeIcons = {
  TASK: CheckCircle,
  REMINDER: Calendar,
  NOTE: BookOpen,
  CODE: Code,
};

const typeColors = {
  TASK: 'bg-blue-100 text-blue-800 border-blue-200',
  REMINDER: 'bg-amber-100 text-amber-800 border-amber-200',
  NOTE: 'bg-purple-100 text-purple-800 border-purple-200',
  CODE: 'bg-orange-100 text-orange-800 border-orange-200',
};

const ResultCard = ({ item, onDelete }) => {
  const [showRawText, setShowRawText] = useState(false);
  const TypeIcon = typeIcons[item.type];

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(item.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${typeColors[item.type]}`}>
              <TypeIcon className="h-4 w-4" />
            </div>
            <div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${typeColors[item.type]}`}>
                {item.type}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(item.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
          {item.title}
        </h3>
        
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
          {item.summary}
        </p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
            Action Items
          </h4>
          <ul className="space-y-2">
            {item.actions.map((action, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {action}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => setShowRawText(!showRawText)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            {showRawText ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showRawText ? 'Hide' : 'Show'} extracted text
          </button>
          
          {showRawText && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
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