'use client';

import React, { useState } from 'react';
import { submitConsultation } from '@/utils/api';

export default function ConsultationPanel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const result = await submitConsultation(name, email, message);
    setLoading(false);
    
    if (result.success) {
      setStatus({ success: true, message: result.message || "Request sent successfully!" });
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus({ success: false, message: result.error || "Failed to send request. Please try again." });
    }
  };

  return (
    <div 
      id="consultation-sidebar" 
      className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col justify-between"
    >
      {/* Side-Panel Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
        <h3 className="text-xl font-bold text-white">Book a Consultation</h3>
        <button 
          onClick={() => {
            const panel = document.getElementById('consultation-sidebar');
            if (panel) panel.classList.add('translate-x-full');
          }}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          aria-label="Close panel"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Side-Panel Content / Form */}
      <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto space-y-6">
        {status && (
          <div className={`p-4 rounded-lg border text-sm ${status.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
            {status.message}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="client-name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Name</label>
          <input 
            id="client-name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g. John Doe"
            required 
            className="w-full bg-slate-950 border border-slate-850 focus:border-blue-500 rounded-lg p-3 text-slate-200 outline-none transition text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="client-email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
          <input 
            id="client-email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="name@company.com"
            required 
            className="w-full bg-slate-950 border border-slate-850 focus:border-blue-500 rounded-lg p-3 text-slate-200 outline-none transition text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="client-message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Project Scope / Message</label>
          <textarea 
            id="client-message"
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            rows={5}
            placeholder="Describe what you want to build..."
            required 
            className="w-full bg-slate-950 border border-slate-850 focus:border-blue-500 rounded-lg p-3 text-slate-200 outline-none transition text-sm resize-none"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/25 transition duration-300 text-sm flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span>Sending Request...</span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Submit Request</span>
            </>
          )}
        </button>
      </form>

      {/* Side-Panel Footer */}
      <div className="p-6 border-t border-slate-800 bg-slate-950/40 text-center text-xs text-slate-500">
        Secure transmission encrypted via SSL.
      </div>
    </div>
  );
}
