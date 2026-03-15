import React, { useState, useEffect } from 'react';
import { Upload, Sparkles, Zap, Brain, ArrowRight, Play, Star, CheckCircle, Image as ImageIcon, FileText, Code, Calendar } from 'lucide-react';

const WelcomeScreen = ({ onUpload, loading }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: ImageIcon,
      title: "Smart OCR Processing",
      description: "Advanced text extraction from screenshots with 99% accuracy",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Classification",
      description: "Intelligent categorization into Tasks, Notes, Code, and Reminders",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Process screenshots in seconds with real-time feedback",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const stats = [
    { number: "99%", label: "Accuracy", icon: CheckCircle },
    { number: "< 5s", label: "Processing", icon: Zap },
    { number: "4", label: "Categories", icon: Star }
  ];

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      {/* Atmospheric background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#FF6044]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FF6044]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF6044]/8 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FF6044]/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 max-w-6xl mx-auto px-4 text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FF6044]/10 border border-[#FF6044]/20 mb-8">
            <Sparkles className="w-4 h-4 text-[#FF6044] mr-2 animate-pulse" />
            <span className="text-sm font-medium text-white/90">AI-Powered Screenshot Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Transform Screenshots into
            <span className="block text-[#FF6044] animate-pulse">
              Actionable Knowledge
            </span>
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed font-body">
            Upload any screenshot and watch as our AI extracts text, identifies content types,
            and organizes everything into tasks, notes, code snippets, and reminders.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => document.getElementById('file-input')?.click()}
              disabled={loading}
              className="group relative px-8 py-4 bg-[#FF6044] hover:bg-[#FF6044]/90 text-white font-semibold rounded-2xl shadow-2xl shadow-[#FF6044]/30 transition-all duration-300 transform hover:scale-105 hover:shadow-[#FF6044]/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                    Start with a Screenshot
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>

            <button className="group px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </div>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 hover:border-[#FF6044]/30 transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-center mb-3">
                <stat.icon className="w-8 h-8 text-[#FF6044]" />
              </div>
              <div className="text-3xl font-display font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-[#0F0F0F] rounded-2xl p-8 border border-white/10 transition-all duration-500 transform hover:scale-105 hover:border-[#FF6044]/30 ${
                  index === currentFeature ? 'ring-2 ring-[#FF6044]/50 shadow-2xl shadow-[#FF6044]/20' : ''
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="inline-flex p-4 rounded-2xl bg-[#FF6044]/10 mb-6">
                  <feature.icon className="w-8 h-8 text-[#FF6044]" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed font-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Types Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Smart Content Recognition</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: CheckCircle, label: "Tasks", color: "border-blue-400/30 bg-blue-500/10" },
              { icon: FileText, label: "Notes", color: "border-purple-400/30 bg-purple-500/10" },
              { icon: Code, label: "Code", color: "border-emerald-400/30 bg-emerald-500/10" },
              { icon: Calendar, label: "Reminders", color: "border-amber-400/30 bg-amber-500/10" }
            ].map((type, index) => (
              <div
                key={type.label}
                className={`bg-[#0F0F0F] rounded-xl p-6 border ${type.color} hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <type.icon className="w-8 h-8 text-white/90 mx-auto mb-3" />
                <div className="text-sm font-semibold text-white text-center">{type.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#0F0F0F] rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-display font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-white/80 mb-6 font-body">Join thousands of users who have transformed their screenshot workflow</p>
          <button
            onClick={() => document.getElementById('file-input')?.click()}
            className="inline-flex items-center px-6 py-3 bg-[#FF6044] hover:bg-[#FF6044]/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#FF6044]/30"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Your First Screenshot
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
