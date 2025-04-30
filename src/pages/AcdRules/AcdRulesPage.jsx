import React from 'react';
import { Search, Plus, MoreVertical } from 'lucide-react';

// Mock data based on the image
const acdRules = [
  {
    id: 1,
    name: 'Business Hours Routing',
    description: 'Routes calls based on business hours schedule',
    condition: 'Time between 8:00-17:00...',
    action: 'Route to General Support...',
    priority: 'High',
    status: true
  },
  {
    id: 2,
    name: 'VIP Customer Routing',
    description: 'Identifies VIP customers and routes accordingly',
    condition: 'Customer Segment = VIP',
    action: 'Route to VIP Support Queue...',
    priority: 'Critical',
    status: true
  },
  {
    id: 3,
    name: 'Overflow to Spanish Queue',
    description: 'Routes Spanish-speaking customers to Spanish agents',
    condition: 'Language Preference = Spanish',
    action: 'Route to Spanish Support...',
    priority: 'Medium',
    status: false
  },
  {
    id: 4,
    name: 'After-Hours Routing',
    description: 'Routes calls during non-business hours',
    condition: 'Time outside 8:00-17:00 ...',
    action: 'Route to Voicemail System',
    priority: 'Medium',
    status: true
  },
  {
    id: 5,
    name: 'Technical Issue Escalation',
    description: 'Escalates technical issues based on keywords',
    condition: 'Keywords = "broken", "error"...',
    action: 'Route to Technical Support',
    priority: 'High',
    status: true
  }
];

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: 'bg-blue-100 text-blue-800',
    Critical: 'bg-red-100 text-red-800',
    Medium: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[priority]}`}>
      {priority}
    </span>
  );
};

const Switch = ({ checked }) => {
  return (
    <div className={`relative inline-flex h-6 w-11 items-center rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}>
      <span 
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${checked ? 'translate-x-6' : 'translate-x-1'}`} 
      />
    </div>
  );
};

const AcdRulesPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* {/ Page Header /} */}
      <h1 className="text-2xl font-bold mb-1">ACD Rules</h1>
      <p className="text-sm text-gray-500 mb-6">Manage automatic call distribution rules and conditions</p>
      
      {/* {/ Toolbar Section /} */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text"
            placeholder="Search rules..." 
            className="pl-10 w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Rule
        </button>
      </div>
      
      {/* {/ ACD Rules Table Section /} */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-1">ACD Rules</h2>
        <p className="text-sm text-gray-500 mb-4">Automatic Call Distribution rules determine how calls are routed</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {acdRules.map((rule) => (
                <tr key={rule.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{rule.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{rule.condition}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{rule.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityBadge priority={rule.priority} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Switch checked={rule.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcdRulesPage;