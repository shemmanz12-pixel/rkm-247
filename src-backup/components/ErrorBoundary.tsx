import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 p-6 flex flex-col items-center justify-center text-slate-900 font-sans">
          <div className="max-w-4xl w-full">
            <div className="flex items-center gap-4 mb-6 text-red-600">
               <AlertTriangle className="w-12 h-12" />
               <h1 className="text-4xl font-black uppercase tracking-tight">Website Crashed</h1>
            </div>
            
            <p className="text-xl mb-8 font-bold text-gray-700">
              Don't panic. The "Fault Finder" has caught the error. 
              The error is likely in the file listed below:
            </p>
            
            <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-red-100 overflow-hidden">
               <h2 className="font-black text-red-600 mb-2 uppercase tracking-wider text-sm">Error Message</h2>
               <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 font-mono text-sm text-red-900 break-words">
                 {this.state.error?.toString()}
               </div>
               
               <h2 className="font-black text-slate-900 mb-2 uppercase tracking-wider text-sm">Where it happened (Stack Trace)</h2>
               <div className="bg-slate-900 text-gold-400 p-6 rounded-xl text-xs font-mono overflow-auto max-h-[400px] leading-relaxed">
                 {this.state.errorInfo?.componentStack}
               </div>
            </div>
            
            <div className="mt-8 text-center">
                <button 
                    onClick={() => window.location.reload()} 
                    className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all shadow-lg"
                >
                    Try Reloading Page
                </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;