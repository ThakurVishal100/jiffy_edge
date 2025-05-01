import { useState } from 'react';
import { 
  Settings, 
  Save, 
  Database, 
  Trash2, 
  Archive, 
  CheckCircle, 
  ChevronDown 
} from 'lucide-react';

const SystemSettingsPage = () => {
  // State for form fields
  const [companyName, setCompanyName] = useState('Contact Center Inc.');
  const [supportEmail, setSupportEmail] = useState('support@contactcenter.com');
  const [supportPhone, setSupportPhone] = useState('+1 (555) 123-4567');
  const [timezone, setTimezone] = useState('Eastern Time (ET)');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [systemLanguage, setSystemLanguage] = useState('English (US)');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('General');
  
  // Save settings handler
  const handleSaveSettings = () => {
    console.log('Settings saved');
    // Implementation for saving settings would go here
  };
  
  // Clear cache handler
  const handleClearCache = () => {
    console.log('Cache cleared');
    // Implementation for clearing cache would go here
  };
  
  // Backup now handler
  const handleBackupNow = () => {
    console.log('Backup started');
    // Implementation for starting backup would go here
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        {/* {/ Page Header /} */}
        <h1 className="text-2xl font-bold mb-1">System Settings</h1>
        <p className="text-sm text-gray-500 mb-6">Configure global system preferences and parameters</p>
        
        {/* {/ Tabs /} */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['General', 'Call Settings', 'Notifications'].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* {/ Tab Content - General /} */}
        {activeTab === 'General' && (
          <div>
            {/* {/ General Settings Card /} */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex items-center mb-4">
                <Settings className="h-5 w-5 text-gray-600" />
                <div className="ml-2">
                  <h2 className="text-lg font-semibold">General Settings</h2>
                  <p className="text-sm text-gray-500">Configure basic system settings and preferences</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* {/ Company Name /} */}
                <div>
                  <label htmlFor="company-name" className="block mb-2 text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                
                {/* {/ Support Email /} */}
                <div>
                  <label htmlFor="support-email" className="block mb-2 text-sm font-medium text-gray-700">
                    Support Email
                  </label>
                  <input
                    id="support-email"
                    type="email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                  />
                </div>
                
                {/* {/ Support Phone /} */}
                <div>
                  <label htmlFor="support-phone" className="block mb-2 text-sm font-medium text-gray-700">
                    Support Phone
                  </label>
                  <input
                    id="support-phone"
                    type="tel"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                  />
                </div>
                
                {/* {/ Timezone /} */}
                <div>
                  <label htmlFor="timezone" className="block mb-2 text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <div className="relative">
                    <select
                      id="timezone"
                      className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option>Eastern Time (ET)</option>
                      <option>Pacific Time (PT)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>GMT</option>
                      <option>UTC</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* {/ Date Format /} */}
                <div>
                  <label htmlFor="date-format" className="block mb-2 text-sm font-medium text-gray-700">
                    Date Format
                  </label>
                  <div className="relative">
                    <select
                      id="date-format"
                      className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                    >
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY/MM/DD</option>
                      <option>MM-DD-YYYY</option>
                      <option>DD-MM-YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* {/ System Language /} */}
                <div>
                  <label htmlFor="system-language" className="block mb-2 text-sm font-medium text-gray-700">
                    System Language
                  </label>
                  <div className="relative">
                    <select
                      id="system-language"
                      className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={systemLanguage}
                      onChange={(e) => setSystemLanguage(e.target.value)}
                    >
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* {/ Maintenance Mode Toggle /} */}
              <div className="flex justify-between items-center border-t pt-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-700">Maintenance Mode</h3>
                  <p className="text-sm text-gray-600">When enabled, the system will be unavailable to regular users.</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={maintenanceMode}
                    onChange={() => setMaintenanceMode(!maintenanceMode)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              
              {/* {/ Save Button /} */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </button>
              </div>
            </div>
            
            {/* {/ System Maintenance Card /} */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <Database className="h-5 w-5 text-gray-600" />
                <div className="ml-2">
                  <h2 className="text-lg font-semibold">System Maintenance</h2>
                  <p className="text-sm text-gray-500">Manage system cache and backups</p>
                </div>
              </div>
              
              {/* {/ System Cache /} */}
              <div className="flex justify-between items-center py-4 border-b">
                <div>
                  <h3 className="font-medium text-gray-700">System Cache</h3>
                  <p className="text-sm text-gray-600">Clear system cache to resolve performance issues</p>
                </div>
                <button
                  onClick={handleClearCache}
                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cache
                </button>
              </div>
              
              {/* {/ System Backup /} */}
              <div className="flex justify-between items-center py-4 border-b">
                <div>
                  <h3 className="font-medium text-gray-700">System Backup</h3>
                  <p className="text-sm text-gray-600">Backup all system data including configurations</p>
                </div>
                <button
                  onClick={handleBackupNow}
                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Backup Now
                </button>
              </div>
              
              {/* {/ Last Backup Info /} */}
              <div className="flex items-start pt-4">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="ml-2">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last Automated Backup:</span> April 10, 2025 at 02:00 AM
                  </div>
                  <p className="text-xs text-gray-500">
                    System backups are automatically performed daily at 2 AM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* {/ Other tabs would be implemented here /} */}
        {activeTab === 'Call Settings' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Call Settings Content</h2>
            <p className="text-gray-500">Call settings configuration would appear here.</p>
          </div>
        )}
        
        {activeTab === 'Notifications' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Notifications Content</h2>
            <p className="text-gray-500">Notification settings configuration would appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemSettingsPage;