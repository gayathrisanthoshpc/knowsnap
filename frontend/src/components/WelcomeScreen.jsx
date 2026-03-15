import { Upload, Sparkles, Zap, Brain, Play, Star, CheckCircle, Image as ImageIcon } from 'lucide-react';

const features = [
  {
    icon: ImageIcon,
    title: 'Smart OCR Processing',
    description: 'Extract text from screenshots with expert accuracy.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'AI-Powered Classification',
    description: 'Automatically sort into Tasks, Notes, Code, and Reminders.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Upload and see organized insights in seconds.',
    color: 'from-yellow-500 to-orange-500',
  },
];

const stats = [
  { number: '99%', label: 'Accuracy', icon: CheckCircle },
  { number: '< 5s', label: 'Processing', icon: Zap },
  { number: '4', label: 'Categories', icon: Star },
];

const WelcomeScreen = ({ loading }) => {

  return (
    <div className="relative min-h-[70vh] flex flex-col justify-center">
      {/* Enhanced Background orbs with morphing animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-[#f97316]/15 rounded-full blur-3xl animate-morph-bg" />
        <div className="absolute bottom-24 left-16 w-[420px] h-[420px] bg-[#f97316]/10 rounded-full blur-3xl animate-morph-bg" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-[380px] h-[380px] bg-[#f97316]/08 rounded-full blur-3xl animate-morph-bg transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-text-reveal">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 mb-6 animate-slide-up-bounce">
            <Sparkles className="w-4 h-4 text-[#f97316] mr-2 animate-rotate-scale" />
            <span className="text-sm font-medium text-[#faf5f0]/90">AI-Powered Screenshot Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#faf5f0] leading-tight animate-text-reveal" style={{ animationDelay: '0.2s' }}>
            Capture&nbsp;
            <span className="text-[#f97316] animate-glow-pulse">Knowledge</span>
            <span className="block animate-text-reveal" style={{ animationDelay: '0.4s' }}>from screenshots instantly</span>
          </h1>

          <p className="text-lg text-[#faf5f0]/70 mt-6 max-w-2xl mx-auto animate-text-reveal" style={{ animationDelay: '0.6s' }}>
            Upload a screenshot and KnowSnap will instantly extract text, classify content, and organize it into tasks, notes, code snippets, and reminders.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-text-reveal" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => document.getElementById('file-input')?.click()}
              disabled={loading}
              className="relative inline-flex items-center justify-center px-10 py-4 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold rounded-2xl shadow-2xl shadow-[#f97316]/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed btn-ripple animate-glow-pulse"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2 animate-bounce" />
                  CAPTURE NOW
                </>
              )}
            </button>

            <button className="inline-flex items-center justify-center px-10 py-4 bg-white/10 border border-white/10 hover:bg-white/15 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <Play className="w-5 h-5 mr-2 animate-pulse" />
              Watch Tour
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="bg-[#1a1410] rounded-2xl p-6 border border-[#faf5f0]/10 shadow-sm hover:shadow-2xl hover:shadow-[#f97316]/20 transition-all duration-500 hover:-translate-y-2 animate-stagger-fade-in feature-card-hover"
              style={{ animationDelay: `${idx * 200 + 1000}ms` }}
            >
              <div className="flex items-center justify-center mb-4">
                <stat.icon className="w-8 h-8 text-[#f97316] animate-scale-bounce" style={{ animationDelay: `${idx * 200 + 1200}ms` }} />
              </div>
              <div className="text-3xl font-bold text-[#faf5f0] mb-1 animate-count-up" style={{ animationDelay: `${idx * 200 + 1400}ms` }}>{stat.number}</div>
              <div className="text-sm text-[#faf5f0]/70 animate-fade-in" style={{ animationDelay: `${idx * 200 + 1600}ms` }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`bg-[#1a1410] rounded-2xl p-8 border border-[#faf5f0]/10 transition-all duration-500 hover:shadow-2xl hover:shadow-[#f97316]/20 animate-stagger-fade-in feature-card-hover group`}
              style={{ animationDelay: `${idx * 250 + 1400}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} mb-5 animate-rotate-scale group-hover:animate-pulse`} style={{ animationDelay: `${idx * 250 + 1600}ms` }}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#faf5f0] mb-3 animate-fade-in-up" style={{ animationDelay: `${idx * 250 + 1800}ms` }}>{feature.title}</h3>
              <p className="text-sm text-[#faf5f0]/70 leading-relaxed animate-fade-in" style={{ animationDelay: `${idx * 250 + 2000}ms` }}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1a1410] rounded-2xl p-8 border border-[#faf5f0]/10 animate-slide-up-bounce" style={{ animationDelay: '2s' }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold text-[#faf5f0] animate-text-reveal">Need a quick tip?</h3>
              <p className="text-sm text-[#faf5f0]/70 mt-2 animate-fade-in" style={{ animationDelay: '2.2s' }}>
                For best OCR results, use sharp screenshots and avoid glare or motion blur.
              </p>
            </div>
            <button
              onClick={() => document.getElementById('file-input')?.click()}
              className="inline-flex items-center px-8 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl animate-glow-pulse btn-ripple"
            >
              <Upload className="w-5 h-5 mr-2 animate-bounce" />
              Start capturing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
