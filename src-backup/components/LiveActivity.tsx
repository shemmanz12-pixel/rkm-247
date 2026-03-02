import React, { useState, useEffect } from 'react';
import { Bell, MapPin, CheckCircle } from 'lucide-react';

const recentJobs = [
  { service: "Plumbing Repair", location: "Coalville", time: "12 mins ago" },
  { service: "Blocked Drain Cleared", location: "Ashby-de-la-Zouch", time: "28 mins ago" },
  { service: "Emergency Leak Fix", location: "Coleorton", time: "45 mins ago" },
  { service: "Radiator Repair", location: "Whitwick", time: "1 hour ago" },
  { service: "Tap Replacement", location: "Ibstock", time: "1 hour ago" },
];

const LiveActivity = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentJobs.length);
    }, 4000); // Changes every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const job = recentJobs[currentIndex];

  return (
    <div className="bg-slate-900 text-white border-y border-slate-800 py-3 overflow-hidden">
      <div className="container mx-auto px-4 flex items-center justify-center sm:justify-between">
        
        {/* Left Side: Live Indicator (NOW GOLD) */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6892C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A6892C]"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#A6892C]">Live Activity</span>
        </div>

        {/* Center: The Cycling Job */}
        <div className="flex items-center gap-2 text-sm animate-fade-in transition-all duration-500">
          <CheckCircle className="w-4 h-4 text-[#A6892C]" />
          <span className="font-medium text-slate-300">Job Complete:</span>
          <span className="font-bold text-white">{job.service}</span>
          <span className="hidden sm:inline text-slate-400">in</span>
          <span className="font-bold text-[#A6892C] flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {job.location}
          </span>
          <span className="text-xs text-slate-500 ml-2">({job.time})</span>
        </div>

        {/* Right Side: Techs Active */}
        <div className="hidden sm:block text-xs font-semibold text-slate-400">
          Plumbing Engineers Active: <span className="text-white">2</span>
        </div>

      </div>
    </div>
  );
};

export default LiveActivity;