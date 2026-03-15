import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white px-6">
          <div className="max-w-xl bg-[#111317] border border-white/10 rounded-2xl p-10 shadow-2xl shadow-black/50">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-sm text-white/70 mb-4">
              The app encountered an unexpected error. Try refreshing the page.
            </p>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 overflow-auto">
              <pre className="text-xs text-white/70 whitespace-pre-wrap">
{this.state.error?.toString()}
{this.state.info?.componentStack}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
