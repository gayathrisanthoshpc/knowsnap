import React, { useState, useRef } from 'react';
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
    <div className="mb-8">
      <div className="max-w-lg mx-auto">
        <div
          className={`relative backdrop-blur-xl bg-white/10 border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer group ${
            isDragOver
              ? 'border-purple-400/60 bg-purple-500/10 shadow-2xl shadow-purple-500/20 scale-105'
              : 'border-white/30 hover:border-white/50 hover:bg-white/15'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={!preview ? handleClick : undefined}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>

          {preview ? (
            <div className="relative space-y-6">
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-48 object-contain mx-auto rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="absolute -top-2 -right-2 p-2 bg-red-500/80 hover:bg-red-600/80 backdrop-blur-xl rounded-full text-white transition-all duration-200 shadow-lg"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="backdrop-blur-xl bg-white/10 rounded-lg p-4 border border-white/20">
                  <p className="text-sm font-semibold text-white truncate">{selectedFile.name}</p>
                  <p className="text-xs text-white/70 mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type.split('/')[1].toUpperCase()}
                  </p>
                </div>

                <button
                  onClick={handleClick}
                  className="text-sm text-purple-300 hover:text-purple-200 underline transition-colors duration-200"
                >
                  Choose different file
                </button>
              </div>
            </div>
          ) : (
            <div className="relative space-y-6">
              <div className="relative">
                <div className={`p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 ${
                  isDragOver ? 'scale-110 bg-purple-500/20 border-purple-400/60' : ''
                }`}>
                  <Upload className={`mx-auto h-16 w-16 transition-all duration-300 ${
                    isDragOver ? 'text-purple-300 scale-110' : 'text-white/70 group-hover:text-white'
                  }`} />
                </div>

                {/* Floating sparkles */}
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-6 w-6 text-yellow-400 animate-bounce" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">
                  Drop your screenshot here
                </h3>
                <p className="text-white/70">
                  or click to browse files (PNG, JPG, WebP)
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-white/50">
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
            className="mt-8 w-full backdrop-blur-xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500/90 hover:to-pink-500/90 text-white py-4 px-8 rounded-2xl font-semibold shadow-2xl shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-purple-400/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center border border-white/20"
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