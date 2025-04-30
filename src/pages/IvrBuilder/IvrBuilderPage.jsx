import React, { useState } from 'react';
import { Search, Plus, Edit, MoreVertical } from 'lucide-react';

const ivrFlows = [
  {
    id: 1,
    name: 'Main Menu IVR',
    description: 'Primary customer entry point',
    nodes: 12,
    status: 'Published',
    modified: 'Apr 10, 2025, 09:00 PM'
  },
  {
    id: 2,
    name: 'Technical Support IVR',
    description: 'Technical support troubleshooting flow',
    nodes: 8,
    status: 'Draft',
    modified: 'Apr 8, 2025, 04:50 PM'
  },
  {
    id: 3,
    name: 'Billing Department IVR',
    description: 'Payment and billing inquiries',
    nodes: 6,
    status: 'Published',
    modified: 'Apr 5, 2025, 03:15 PM'
  },
  {
    id: 4,
    name: 'After Hours IVR',
    description: 'Non-business hours call handling',
    nodes: 5,
    status: 'Published',
    modified: 'Apr 1, 2025, 09:45 PM'
  },
  {
    id: 5,
    name: 'Sales Department IVR',
    description: 'New sales and product inquiries',
    nodes: 9,
    status: 'Draft',
    modified: 'Mar 28, 2025, 07:50 PM'
  }
];

const StatusBadge = ({ status }) => {
  const styles = {
    Published: 'bg-blue-100 text-blue-800',
    Draft: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

const IvrFlowCard = ({ flow }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{flow.name}</h3>
        <StatusBadge status={flow.status} />
      </div>
      <div className="text-sm text-gray-600 mb-3">
        <p className="mb-1">{flow.description}</p>
        <p className="mb-1">Nodes: {flow.nodes}</p>
        <p>Modified: {flow.modified}</p>
      </div>
      <div className="flex justify-end items-center space-x-2 border-t pt-3 mt-3">
        <button className="flex items-center text-sm text-gray-700 hover:text-black">
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const TabButton = ({ active, children, onClick }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium ${
        active 
          ? 'bg-white text-gray-900 border-b-2 border-blue-500' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const IvrBuilderPage = () => {
  const [activeTab, setActiveTab] = useState('flows');

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* {/ Page Header /} */}
      <h1 className="text-2xl font-bold mb-1">IVR Builder</h1>
      <p className="text-sm text-gray-500 mb-6">Create and manage interactive voice response flows</p>
      
      {/* {/ Toolbar Section /} */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text"
            placeholder="Search IVR flows..." 
            className="pl-10 w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New IVR Flow
        </button>
      </div>
      
      {/* {/ Tabs Section /} */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <TabButton active={activeTab === 'flows'} onClick={() => setActiveTab('flows')}>
            IVR Flows
          </TabButton>
          <TabButton active={activeTab === 'templates'} onClick={() => setActiveTab('templates')}>
            Templates
          </TabButton>
        </div>
      </div>
      
      {/* {/ IVR Flows Content /} */}
      {activeTab === 'flows' && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-1">IVR Flows</h2>
          <p className="text-sm text-gray-500 mb-4">Manage your interactive voice response flows</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ivrFlows.map(flow => (
              <IvrFlowCard key={flow.id} flow={flow} />
            ))}
          </div>
        </div>
      )}
      
      {/* {/ Templates Content (not shown in the image but included for completeness) /} */}
      {activeTab === 'templates' && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-1">Templates</h2>
          <p className="text-sm text-gray-500 mb-4">Use pre-built templates to create IVR flows quickly</p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">No templates available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IvrBuilderPage;