import ResultCard from './ResultCard';
import WelcomeScreen from './WelcomeScreen';


const Dashboard = ({ items, onDelete, loading = false, onUpload }) => {
  // Show welcome screen when there are no items and not loading
  if (items.length === 0 && !loading) {
    return <WelcomeScreen onUpload={onUpload} loading={loading} />;
  }

  return (
    <div className="relative">
      {/* Items Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#1a1410] rounded-lg border border-[#faf5f0]/10 p-6 animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#faf5f0]/20 rounded-lg"></div>
                  <div>
                    <div className="w-16 h-5 bg-[#faf5f0]/20 rounded-full mb-1"></div>
                    <div className="w-20 h-3 bg-[#faf5f0]/20 rounded"></div>
                  </div>
                </div>
                <div className="w-6 h-6 bg-[#faf5f0]/20 rounded"></div>
              </div>
              <div className="w-3/4 h-5 bg-[#faf5f0]/20 rounded mb-3"></div>
              <div className="w-full h-4 bg-[#faf5f0]/20 rounded mb-2"></div>
              <div className="w-2/3 h-4 bg-[#faf5f0]/20 rounded mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="w-24 h-4 bg-[#faf5f0]/20 rounded"></div>
                <div className="w-full h-3 bg-[#faf5f0]/20 rounded"></div>
                <div className="w-4/5 h-3 bg-[#faf5f0]/20 rounded"></div>
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
  );
};

export default Dashboard;
