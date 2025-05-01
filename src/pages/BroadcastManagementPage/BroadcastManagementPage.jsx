import React from 'react';
import { Search, Plus, Calendar, MoreVertical } from 'lucide-react';

// Mock data for broadcasts
const broadcasts = [
  {
    id: 1,
    name: 'Customer Satisfaction Survey',
    description: 'Post-call survey for support interactions',
    type: 'Voice',
    status: 'Scheduled',
    schedule: 'Apr 15, 2025, 02:30 PM',
    progress: { type: 'recipients', value: 250 }
  },
  {
    id: 2,
    name: 'System Maintenance Notification',
    description: 'Alert about upcoming system downtime',
    type: 'Sms',
    status: 'Active',
    schedule: 'Apr 11, 2025, 01:30 PM',
    progress: { type: 'progress', current: 324, total: 500 }
  },
  {
    id: 3,
    name: 'New Feature Announcement',
    description: 'Information about latest product features',
    type: 'Email',
    status: 'Completed',
    schedule: 'Apr 5, 2025, 04:00 PM',
    progress: { type: 'progress', current: 1000, total: 1000 }
  },
  {
    id: 4,
    name: 'Payment Reminder',
    description: 'Gentle reminder about upcoming payment',
    type: 'Sms',
    status: 'Draft',
    schedule: null,
    progress: { type: 'recipients', value: 150 }
  },
  {
    id: 5,
    name: 'Holiday Hours Announcement',
    description: 'Special holiday operating hours',
    type: 'Voice',
    status: 'Scheduled',
    schedule: 'Apr 20, 2025, 05:30 PM',
    progress: { type: 'recipients', value: 300 }
  }
];

// Custom UI Components to replace shadcn/ui imports
const Input = ({ className, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
);

const Button = ({ children, className, variant, size, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const variantStyles = variant === "ghost" 
    ? "hover:bg-gray-100 hover:text-gray-900 border-transparent" 
    : "bg-blue-600 text-white hover:bg-blue-700";
  const sizeStyles = size === "sm" 
    ? "text-xs px-2 py-1" 
    : "text-sm px-4 py-2";
    
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Progress = ({ value, className, ...props }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`} {...props}>
    <div
      className="bg-blue-600 h-2 rounded-full"
      style={{ width: `${value}%` }}
    />
  </div>
);

// Badge styling helper function
const getBadgeStyle = (type) => {
  switch (type) {
    case 'Voice':
      return 'bg-blue-100 text-blue-800';
    case 'Sms':
      return 'bg-gray-100 text-gray-800';
    case 'Email':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'Completed':
      return 'bg-gray-100 text-gray-800';
    case 'Draft':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function BroadcastManagementPage() {
  const [activeTab, setActiveTab] = React.useState('all');

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* {/ Page Header /} */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Broadcast Management</h1>
        <p className="text-sm text-gray-500">Create and manage automated communication broadcasts</p>
      </div>

      {/* {/ Toolbar Section /} */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            type="search" 
            placeholder="Search broadcasts..." 
            className="pl-10 w-full" 
          />
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" /> New Broadcast
        </Button>
      </div>

      {/* {/ Tabs Section /} */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {['All', 'Active', 'Scheduled', 'Completed', 'Draft'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === tab.toLowerCase() 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* {/ Tab Content /} */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Broadcasts</h2>
          <p className="text-sm text-gray-500">Manage automated communications campaigns</p>
        </div>
        
        {/* {/ Table /} */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b">
                <th className="text-xs text-gray-500 uppercase py-3 px-4">Name</th>
                <th className="text-xs text-gray-500 uppercase py-3 px-4">Type</th>
                <th className="text-xs text-gray-500 uppercase py-3 px-4">Status</th>
                <th className="text-xs text-gray-500 uppercase py-3 px-4">Schedule</th>
                <th className="text-xs text-gray-500 uppercase py-3 px-4">Progress</th>
                <th className="text-xs text-gray-500 uppercase py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {broadcasts.map((broadcast) => (
                <tr key={broadcast.id} className="border-b last:border-b-0">
                  <td className="py-4 px-4">
                    <div className="font-medium">{broadcast.name}</div>
                    <div className="text-sm text-gray-500">{broadcast.description}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getBadgeStyle(broadcast.type)}`}>
                      {broadcast.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadgeStyle(broadcast.status)}`}>
                      {broadcast.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {broadcast.schedule ? (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{broadcast.schedule}</span>
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {broadcast.progress.type === 'recipients' ? (
                      <div>{broadcast.progress.value} recipients</div>
                    ) : (
                      <div>
                        <Progress 
                          value={(broadcast.progress.current / broadcast.progress.total) * 100} 
                          className="h-2 mb-1"
                        />
                        <div className="text-xs">
                          {broadcast.progress.current} / {broadcast.progress.total} 
                          ({Math.round((broadcast.progress.current / broadcast.progress.total) * 100)}%)
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}