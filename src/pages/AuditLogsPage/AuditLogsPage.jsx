import { useState } from "react";
import {
  Search,
  ChevronDown,
  Upload,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { FiArrowLeft } from "react-icons/fi";
import { setSelectedMenu } from "@/redux/slices/menuSlice";


// Mock data for the table based on the image
const auditLogs = [
  {
    id: 1,
    timestamp: "Apr 11, 2025, 03:45:23 PM",
    user: "mailto:admin@example.com",
    action: "User Create",
    actionType: "blue",
    resource: "users/john.doe",
    status: "Success",
    ipAddress: "192.168.1.105",
  },
  {
    id: 2,
    timestamp: "Apr 11, 2025, 03:00:45 PM",
    user: "mailto:admin@example.com",
    action: "Queue Update",
    actionType: "purple",
    resource: "queues/support",
    status: "Success",
    ipAddress: "192.168.1.105",
  },
  {
    id: 3,
    timestamp: "Apr 11, 2025, 02:15:12 PM",
    user: "mailto:jane.smith@example.com",
    action: "IVR Update",
    actionType: "green",
    resource: "ivr/main-menu",
    status: "Success",
    ipAddress: "192.168.1.112",
  },
  {
    id: 4,
    timestamp: "Apr 10, 2025, 09:50:38 PM",
    user: "mailto:john.doe@example.com",
    action: "User Login",
    actionType: "gray",
    resource: "users/john.doe",
    status: "Failure",
    ipAddress: "203.0.113.45",
  },
  {
    id: 5,
    timestamp: "Apr 10, 2025, 08:25:20 PM",
    user: "mailto:admin@example.com",
    action: "System Update",
    actionType: "indigo",
    resource: "system/settings",
    status: "Success",
    ipAddress: "192.168.1.105",
  },
];

// Helper function to get badge colors based on action type
const getActionBadgeClasses = (actionType) => {
  const classes = {
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    green: "bg-green-100 text-green-800",
    gray: "bg-gray-100 text-gray-800",
    indigo: "bg-indigo-100 text-indigo-800",
  };
  return `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
    classes[actionType] || classes.gray
  }`;
};

// Helper function to get status badge colors
const getStatusBadgeClasses = (status) => {
  return status === "Success"
    ? "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
    : "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800";
};

const AuditLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);

  const totalResults = auditLogs.length;
  const resultsPerPage = 5;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackButtonClick = () => {
    // Dispatch action to change the selected menu to 'admin dashboard'
    dispatch(setSelectedMenu("Dashboard"));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6 gap-3 flex flex-col">
        {/* {/ Page Header /} */}
        <button
          onClick={handleBackButtonClick}
          className="text-gray-600 hover:text-gray-900 p-1 cursor-pointer"
          aria-label="Go back"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold mb-1">Audit Logs</h1>
        <p className="text-sm text-gray-500 mb-6">
          View and search system audit trails
        </p>

        {/* {/ Toolbar Section /} */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-auto flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="flex space-x-3 items-center w-full md:w-auto justify-end">
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option>All Types</option>
                <option>User Create</option>
                <option>Queue Update</option>
                <option>IVR Update</option>
                <option>User Login</option>
                <option>System Update</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Statuses</option>
                <option>Success</option>
                <option>Failure</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              <Upload className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* {/ Audit Logs Table Section /} */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-1">System Audit Logs</h2>
          <p className="text-sm text-gray-500 mb-4">
            Review system activity and security events
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-xs text-gray-500 uppercase border-b">
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Resource</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">IP Address</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-b last:border-b-0">
                    <td className="px-4 py-4">{log.timestamp}</td>
                    <td className="px-4 py-4">{log.user}</td>
                    <td className="px-4 py-4">
                      <span className={getActionBadgeClasses(log.actionType)}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-4">{log.resource}</td>
                    <td className="px-4 py-4">
                      <span className={getStatusBadgeClasses(log.status)}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">{log.ipAddress}</td>
                    <td className="px-4 py-4">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Info className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* {/ Pagination Section /} */}
          <div className="flex justify-between items-center pt-4 mt-2">
            <div className="text-sm text-gray-600">
              Showing 1 to {Math.min(resultsPerPage, totalResults)} of{" "}
              {totalResults} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`p-1 rounded-md ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-1 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPage;
