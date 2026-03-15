import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

const UploadZone = ({ onUpload, loading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
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
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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

  return (
    <div className="mb-8">
      <div className="max-w-lg mx-auto">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={!preview ? handleClick : undefined}
        >
          {preview ? (
            <div className="space-y-4">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-w-full h-40 object-contain mx-auto rounded-lg shadow-md"
              />
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={handleClick}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Choose different file
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="mx-auto h-16 w-16 text-gray-400" />
              <div>
                <p className="text-xl font-medium text-gray-900 mb-2">
                  Drop your screenshot here
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  or click to browse files (PNG, JPG, WebP)
                </p>
                <p className="text-xs text-gray-400">
                  Maximum file size: 10MB
                </p>
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
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium shadow-lg transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-3" />
                Analyzing Screenshot...
              </>
            ) : (
              <>
                <ImageIcon className="h-5 w-5 mr-3" />
                Analyze Screenshot
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadZone;