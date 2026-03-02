// React import not required with the new jsx transform when not referencing React directly
import { MapPin, Clock, CheckCircle } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    { type: 'Boiler Repair', location: 'Coalville (LE67)', time: '25 mins ago' },
    { type: 'Burst Pipe', location: 'Ashby-de-la-Zouch', time: '1 hour ago' },
    { type: 'Blocked Drain', location: 'Whitwick', time: '2 hours ago' },
    { type: 'Emergency Leak', location: 'Ibstock', time: '3 hours ago' },
  ];

  return (
    <section className="bg-slate-50 py-8 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></div>
          <span className="text-sm font-bold text-gold-700 uppercase tracking-wider">Live Activity Feed</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {activities.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-900 text-sm">{item.type}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gold-600 mt-1 font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;