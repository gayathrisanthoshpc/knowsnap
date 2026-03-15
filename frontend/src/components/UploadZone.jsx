import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, X, Sparkles } from 'lucide-react';

const UploadZone = ({ onUpload, loading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    fileInputRef.current.value = '';
  };

  return (
    <div className="mb-8 animate-slide-up-bounce">
      <div className="max-w-lg mx-auto">
        <div
          className={`relative bg-[#0F0F0F] border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-500 cursor-pointer group hover:shadow-2xl hover:shadow-[#FF6044]/30 ${
            isDragOver
              ? 'border-[#FF6044]/60 bg-[#FF6044]/10 shadow-2xl shadow-[#FF6044]/20 scale-105 animate-glow-pulse'
              : 'border-white/20 hover:border-[#FF6044]/50 hover:bg-[#FF6044]/5'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={!preview ? handleClick : undefined}
        >
          {/* Enhanced Animated background elements */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-morph-bg"></div>
            <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-morph-bg" style={{ animationDelay: '3s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl animate-morph-bg transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '6s' }}></div>
          </div>

          {preview ? (
            <div className="relative space-y-6 animate-stagger-fade-in">
              <div className="relative animate-card-flip">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-48 object-contain mx-auto rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="absolute -top-2 -right-2 p-2 bg-red-500/80 hover:bg-red-600/80 backdrop-blur-xl rounded-full text-white transition-all duration-200 shadow-lg hover:scale-110 animate-pulse"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="bg-black/20 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors duration-300">
                  <p className="text-sm font-semibold text-white truncate">{selectedFile.name}</p>
                  <p className="text-xs text-white/70 mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type.split('/')[1].toUpperCase()}
                  </p>
                </div>

                <button
                  onClick={handleClick}
                  className="text-sm text-[#FF6044] hover:text-[#FF6044]/80 underline transition-colors duration-200 hover:scale-105 transform"
                >
                  Choose different file
                </button>
              </div>
            </div>
          ) : (
            <div className="relative space-y-6">
              <div className="relative">
                <div className={`p-6 rounded-2xl bg-[#FF6044]/10 border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#FF6044]/20 animate-scale-bounce ${
                  isDragOver ? 'scale-110 bg-[#FF6044]/20 border-[#FF6044]/60 animate-glow-pulse' : ''
                }`}>
                  <Upload className={`mx-auto h-16 w-16 transition-all duration-500 animate-bounce ${
                    isDragOver ? 'text-[#FF6044] scale-110 animate-rotate-scale' : 'text-white/70 group-hover:text-[#FF6044]'
                  }`} />
                </div>

                {/* Enhanced Floating sparkles */}
                <div className="absolute -top-2 -right-2 animate-float-particle">
                  <Sparkles className="h-6 w-6 text-yellow-400 animate-bounce" />
                </div>
                <div className="absolute -bottom-2 -left-2 animate-float-particle" style={{ animationDelay: '1s' }}>
                  <Sparkles className="h-4 w-4 text-blue-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white animate-text-reveal">
                  Drop your screenshot here
                </h3>
                <p className="text-white/70 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  or click to browse files (PNG, JPG, WebP)
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-white/50 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Maximum file size: 10MB</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {selectedFile && (
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-8 w-full bg-[#FF6044] hover:bg-[#FF6044]/90 text-white py-4 px-8 rounded-2xl font-semibold shadow-2xl shadow-[#FF6044]/30 transition-all duration-300 transform hover:scale-105 hover:shadow-[#FF6044]/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center border border-white/10"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-6 w-6 mr-3" />
                Analyzing Screenshot...
              </>
            ) : (
              <>
                <ImageIcon className="h-6 w-6 mr-3" />
                Analyze Screenshot
                <Sparkles className="h-5 w-5 ml-3 animate-pulse" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadZone;