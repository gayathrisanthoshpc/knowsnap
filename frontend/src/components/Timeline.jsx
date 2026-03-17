import { useState, useEffect } from 'react';
import { Clock, Upload, Edit3, Tag, CheckSquare, Calendar } from 'lucide-react';
import axios from 'axios';

const actionIcons = {
  UPLOAD: Upload,
  EDIT: Edit3,
  CATEGORY_CHANGE: Tag,
  COMPLETED: CheckSquare,
  UNCOMPLETED: CheckSquare,
  DUE_DATE_SET: Calendar,
};

const actionColors = {
  UPLOAD: 'text-blue-400',
  EDIT: 'text-green-400',
  CATEGORY_CHANGE: 'text-purple-400',
  COMPLETED: 'text-emerald-400',
  UNCOMPLETED: 'text-orange-400',
  DUE_DATE_SET: 'text-amber-400',
};

const Timeline = () => {
  const [timelineEntries, setTimelineEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/timeline`);
      setTimelineEntries(response.data);
    } catch (error) {
      console.error('Failed to fetch timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAction = (entry) => {
    const { action, old_value, new_value, item_title, item_type } = entry;

    switch (action) {
      case 'UPLOAD':
        return `Uploaded ${item_type.toLowerCase()}: "${item_title}"`;
      case 'EDIT':
        return `Edited text in "${item_title}"`;
      case 'CATEGORY_CHANGE':
        return `Changed category from ${old_value} to ${new_value} for "${item_title}"`;
      case 'COMPLETED':
        return `Marked "${item_title}" as completed`;
      case 'UNCOMPLETED':
        return `Marked "${item_title}" as incomplete`;
      case 'DUE_DATE_SET':
        const dateStr = new_value ? new Date(new_value).toLocaleDateString() : 'cleared';
        return `Set due date to ${dateStr} for "${item_title}"`;
      default:
        return `${action} on "${item_title}"`;
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1a1410] rounded-lg border border-[#faf5f0]/10 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-6 h-6 bg-[#faf5f0]/20 rounded animate-pulse"></div>
          <div className="w-32 h-4 bg-[#faf5f0]/20 rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3 animate-pulse">
              <div className="w-2 h-2 bg-[#faf5f0]/20 rounded-full mt-2"></div>
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-3 bg-[#faf5f0]/20 rounded"></div>
                <div className="w-1/2 h-2 bg-[#faf5f0]/20 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1410] rounded-lg border border-[#faf5f0]/10 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-[#f97316]/10 rounded-lg flex items-center justify-center">
          <Clock className="w-4 h-4 text-[#f97316]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#faf5f0]">Recent Activity</h3>
          <p className="text-sm text-[#faf5f0]/60">Your latest actions and updates</p>
        </div>
      </div>

      {timelineEntries.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-[#faf5f0]/20 mx-auto mb-3" />
          <p className="text-[#faf5f0]/60">No recent activity</p>
          <p className="text-sm text-[#faf5f0]/40">Upload some screenshots to see your timeline</p>
        </div>
      ) : (
        <div className="space-y-4">
          {timelineEntries.map((entry, index) => {
            const ActionIcon = actionIcons[entry.action] || Clock;
            const colorClass = actionColors[entry.action] || 'text-[#faf5f0]/60';

            return (
              <div
                key={entry.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#faf5f0]/5 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colorClass.replace('text-', 'bg-')}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <ActionIcon className={`w-3 h-3 ${colorClass} flex-shrink-0`} />
                    <p className="text-sm text-[#faf5f0]/80 truncate">
                      {formatAction(entry)}
                    </p>
                  </div>
                  <p className="text-xs text-[#faf5f0]/40">
                    {new Date(entry.created_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {timelineEntries.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[#faf5f0]/10">
          <button
            onClick={fetchTimeline}
            className="w-full py-2 px-4 rounded-lg bg-[#f97316]/10 hover:bg-[#f97316]/20 text-[#f97316] text-sm font-medium transition-colors"
          >
            Refresh Timeline
          </button>
        </div>
      )}
    </div>
  );
};

export default Timeline;