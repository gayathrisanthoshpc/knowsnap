import { useState } from 'react';
import { Trash2, Eye, EyeOff, CheckCircle, Calendar, BookOpen, Code, Clock, Edit3, Save, X, CheckSquare, Square } from 'lucide-react';
import axios from 'axios';

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.extracted_text);
  const [selectedType, setSelectedType] = useState(item.type);
  const [dueDate, setDueDate] = useState(item.due_date ? new Date(item.due_date).toISOString().split('T')[0] : '');
  const [isCompleted, setIsCompleted] = useState(item.completed || false);
  const [isUpdating, setIsUpdating] = useState(false);

  const TypeIcon = typeIcons[item.type];
  const colors = typeColors[item.type];

  const API_BASE_URL = 'http://localhost:8000';

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(item.id);
    }
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const updateData = {
        extracted_text: editedText,
        type: selectedType,
        completed: isCompleted,
        due_date: dueDate || null
      };

      await axios.put(`${API_BASE_URL}/items/${item.id}`, updateData);
      
      // Update local state
      item.extracted_text = editedText;
      item.type = selectedType;
      item.completed = isCompleted;
      item.due_date = dueDate;
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update item:', error);
      alert('Failed to update item. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditedText(item.extracted_text);
    setSelectedType(item.type);
    setDueDate(item.due_date ? new Date(item.due_date).toISOString().split('T')[0] : '');
    setIsCompleted(item.completed || false);
    setIsEditing(false);
  };

  const toggleCompleted = async () => {
    const newCompleted = !isCompleted;
    setIsCompleted(newCompleted);
    
    try {
      await axios.put(`${API_BASE_URL}/items/${item.id}`, { completed: newCompleted });
      item.completed = newCompleted;
    } catch (error) {
      console.error('Failed to update completion status:', error);
      setIsCompleted(!newCompleted); // Revert on error
    }
  };

  const highlightText = (text) => {
    if (!text) return text;
    
    // Simple highlighting - replace **HIGHLIGHT** markers with styled spans
    return text.replace(/\*\*HIGHLIGHT\*\*(.*?)\*\*ENDHIGHLIGHT\*\*/g, '<mark class="bg-yellow-200 text-black px-1 rounded">$1</mark>');
  };

  return (
    <div className={`bg-[#1a1410] rounded-lg border ${colors.border} hover:border-[#f97316]/30 transition-all duration-500 overflow-hidden group hover:shadow-2xl hover:shadow-[#f97316]/20 hover:-translate-y-1 animate-card-flip ${isCompleted ? 'opacity-75' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${colors.bg} border border-white/10 animate-scale-bounce`}>
              <TypeIcon className={`h-4 w-4 ${colors.icon} animate-pulse`} />
            </div>
            <div>
              {isEditing ? (
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#1a1410] border border-white/20 text-white"
                >
                  <option value="TASK">Task</option>
                  <option value="REMINDER">Reminder</option>
                  <option value="NOTE">Note</option>
                  <option value="CODE">Code</option>
                </select>
              ) : (
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border border-white/10 animate-fade-in`}>
                  {item.type}
                </div>
              )}
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
          <div className="flex items-center space-x-2">
            {item.type === 'TASK' && (
              <button
                onClick={toggleCompleted}
                className={`p-2 rounded-lg transition-all duration-300 ${isCompleted ? 'text-green-400 hover:text-green-300' : 'text-white/60 hover:text-white'}`}
                title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {isCompleted ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
              </button>
            )}
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-400/20 text-green-400 hover:text-green-300 transition-all duration-300 hover:scale-110"
                  title="Save changes"
                >
                  {isUpdating ? <div className="animate-spin h-4 w-4 border-2 border-green-400 border-t-transparent rounded-full" /> : <Save className="h-4 w-4" />}
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-400/20 text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110"
                  title="Cancel editing"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/20 text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                title="Edit item"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-400/20 text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110 hover:rotate-12"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <h3 className="text-lg font-display font-bold text-white mb-3 leading-tight animate-text-reveal">
          {item.title}
          {isCompleted && <span className="ml-2 text-green-400">✓</span>}
        </h3>

        <p className="text-white/80 mb-4 text-sm leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {item.summary}
        </p>

        {isEditing && (
          <div className="mb-4 p-4 bg-[#1a1410]/50 rounded-lg border border-white/10">
            <label className="block text-sm font-medium text-white/80 mb-2">Due Date (optional)</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#1a1410]/70 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#f97316]/50"
            />
          </div>
        )}

        {item.due_date && !isEditing && (
          <div className="mb-4 flex items-center text-sm text-amber-300">
            <Calendar className="h-4 w-4 mr-2" />
            Due: {new Date(item.due_date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        )}

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
              {isEditing ? (
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full h-32 px-3 py-2 rounded-lg bg-[#1a1410]/70 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#f97316]/50 resize-none"
                  placeholder="Edit extracted text..."
                />
              ) : (
                <p 
                  className="text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: highlightText(item.extracted_text) }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;