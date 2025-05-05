import React, { useState } from "react";
import {
  Search,
  Upload,
  Download,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  MoveRight,
  Trash2,
  Mail,
  Pencil,
  Phone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const contacts = [
  {
    id: 1,
    name: "Alice Johnson",
    initials: "AJ",
    email: "mailto:alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    department: "Sales",
    location: "New York",
  },
  {
    id: 2,
    name: "Bob Smith",
    initials: "BS",
    email: "mailto:bob.smith@example.com",
    phone: "+1 (555) 234-5678",
    department: "Support",
    location: "Los Angeles",
  },
  {
    id: 3,
    name: "Carol Williams",
    initials: "CW",
    email: "mailto:carol@acmecorp.com",
    phone: "+1 (555) 345-6789",
    department: "Acme Corp",
    location: "",
  },
  {
    id: 4,
    name: "David Brown",
    initials: "DB",
    email: "mailto:david.brown@example.com",
    phone: "+1 (555) 456-7890",
    department: "Marketing",
    location: "Chicago",
  },
  {
    id: 5,
    name: "Eva Garcia",
    initials: "EG",
    email: "mailto:eva@suppliersinc.com",
    phone: "+1 (555) 567-8901",
    department: "Suppliers Inc",
    location: "",
  },
];

const Avatar = ({ initials }) => {
  return (
    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
      {initials}
    </div>
  );
};

const TabButton = ({ active, children, onClick }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium ${
        active
          ? "bg-white text-gray-900 border-b-2 border-blue-500"
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const DirectoryManagementPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* {/ Page Header /} */}
      <h1 className="text-2xl font-bold mb-1">Directory Management</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage internal and external contacts
      </p>

      {/* {/ Toolbar Section /} */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            className="pl-10 w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Contact
          </button>
        </div>
      </div>

      {/* {/ Tabs Section /} */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <TabButton
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          >
            All Contacts
          </TabButton>
          <TabButton
            active={activeTab === "internal"}
            onClick={() => setActiveTab("internal")}
          >
            Internal
          </TabButton>
          <TabButton
            active={activeTab === "external"}
            onClick={() => setActiveTab("external")}
          >
            External
          </TabButton>
        </div>
      </div>

      {/* {/ Directory Content /} */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold mb-1">Directory</h2>
        <p className="text-sm text-gray-500 mb-4">All contacts</p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Department
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Avatar initials={contact.initials} />
                      <div className="font-medium text-gray-900">
                        {contact.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contact.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contact.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contact.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        <DropdownMenuItem
                          onClick={() => handleView(row.id)}
                          className="flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" /> 
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleEdit(row.id)}
                          className="flex items-center gap-2"
                        >
                          <Phone className="w-4 h-4" /> 
                          Call
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDisable(row.id)}
                          className="flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" /> 
                          Email
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDelete(row.id)}
                          className="text-red-600 hover:text-red-600 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />{" "}
                          {/* for "Delete" */}
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default DirectoryManagementPage;
