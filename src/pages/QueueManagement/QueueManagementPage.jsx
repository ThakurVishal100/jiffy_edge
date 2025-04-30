import React, { useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; 
import { Badge } from "@/components/ui/badge"; 
import { Progress } from "@/components/ui/progress"; 
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 


import { Search, Plus, MoreHorizontal } from 'lucide-react';

// --- Mock Data ---
// This data simulates the queue list fetched from an API
const mockQueues = [
    { id: 1, name: "Customer Support", status: "Active", agents: 12, callsWaiting: 5, avgWaitTime: "2:30", slaLevel: 87 },
    { id: 2, name: "Sales Inquiries", status: "Active", agents: 8, callsWaiting: 2, avgWaitTime: "1:15", slaLevel: 93 },
    { id: 3, name: "Technical Support", status: "Active", agents: 6, callsWaiting: 8, avgWaitTime: "4:45", slaLevel: 72 },
    { id: 4, name: "Billing Questions", status: "Paused", agents: 4, callsWaiting: 0, avgWaitTime: "0:00", slaLevel: 100 },
    { id: 5, name: "VIP Support", status: "Active", agents: 3, callsWaiting: 1, avgWaitTime: "0:45", slaLevel: 95 },
    // Add more mock queues if needed
];

// --- Helper Components ---

/**
 * Renders a status badge based on the queue's status.
 * @param {string} status - The queue status ("Active" or "Paused").
 */
const QueueStatusBadge = ({ status }) => {
    const isActive = status === 'Active';
    // Using blue for Active and gray for Paused as per screenshot
    const colorClasses = isActive
        ? "bg-blue-100 text-blue-800 border-blue-200"
        : "bg-gray-100 text-gray-800 border-gray-200";

    return (
        <Badge variant="outline" className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
            {status}
        </Badge>
    );
};

/**
 * Renders the SLA Level column with a conditionally colored progress bar.
 * @param {number} level - The SLA percentage value (0-100).
 */
const SlaLevelDisplay = ({ level }) => {
    let progressBarColorClass = 'bg-blue-600'; // Default: Blue for >= 90%
    if (level < 75) {
        progressBarColorClass = 'bg-red-600'; // Red for < 75%
    } else if (level < 90) {
        progressBarColorClass = 'bg-yellow-500'; // Yellow/Orange for 75%-89%
    }

    return (
        <div className="flex items-center space-x-2">
            {/* {/ Using shadcn Progress component /} */}
            <Progress value={level} className="w-20 h-1.5" indicatorClassName={progressBarColorClass} />
            <span className="text-xs font-medium text-gray-700 w-8 text-right">{level}%</span>
        </div>
    );
};


/**
 * Renders the action menu dropdown for a queue row.
 * @param {object} queue - The queue data object.
 */
const QueueActionsMenu = ({ queue }) => {
    // Placeholder action handlers
    const handleEdit = () => console.log("Edit queue:", queue.id);
    const handlePauseResume = () => console.log("Pause/Resume queue:", queue.id);
    const handleDelete = () => console.log("Delete queue:", queue.id);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700 data-[state=open]:bg-muted">
                    <span className="sr-only">Open queue menu</span> 
                    {/* {/ Screen reader text /} */}
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleEdit}>Edit Queue</DropdownMenuItem>
                <DropdownMenuItem onClick={handlePauseResume}>
                    {queue.status === 'Active' ? 'Pause Queue' : 'Resume Queue'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 hover:!text-red-600 focus:!text-red-600" onClick={handleDelete}>
                    Delete Queue
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};



const QueueManagementPage = () => {
    // State for the search input
    const [searchTerm, setSearchTerm] = useState("");

    // Placeholder handler for the "New Queue" button
    const handleNewQueue = () => console.log("New Queue button clicked");

    // Filter queues based on search term (simple example on name)
    const filteredQueues = mockQueues.filter(queue =>
        queue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Component Render ---
    return (
        // Main container for the page
        <div className="flex flex-col min-h-screen bg-gray-100 p-6 md:p-8">
            {/* {/ Page Header /} */}
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Queue Management</h1>
                <p className="text-sm text-gray-500">Manage call queues, routing, and agent assignments</p>
            </header>

            {/* {/ Toolbar Section: Search and Action Buttons /} */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                {/* {/ Search Input /} */}
                <div className="relative w-full md:w-auto md:flex-grow max-w-xs">
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search queues..."
                        className="pl-9 h-9" // Padding left for the icon
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* {/ Action Button /} */}
                <div className="flex">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleNewQueue}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Queue
                    </Button>
                </div>
            </div>

            {/* {/ Call Queues Table Section /} */}
            <Card className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                 {/* {/ Card Header /} */}
                 <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg font-semibold mb-1">Call Queues</CardTitle>
                    <CardDescription className="text-sm text-gray-500">Manage call queues and their configurations</CardDescription>
                </CardHeader>
                {/* {/ Card Content - Table /} */}
                <CardContent className="p-0">
                    {/* {/ Wrapper div for horizontal scrolling on small screens /} */}
                    <div className="overflow-x-auto">
                        {/* {/ Table component /} */}
                        <Table className="w-full text-sm text-left">
                            {/* {/ Table Header /} */}
                            <TableHeader>
                                <TableRow>
                                    {/* {/ Define Table Header Cells /} */}
                                    <TableHead className="py-2 px-3 text-xs text-gray-500 uppercase border-b whitespace-nowrap">Name</TableHead>
                                    <TableHead className="py-2 px-3 text-xs text-gray-500 uppercase border-b whitespace-nowrap">Status</TableHead>
                                    <TableHead className="py-2 px-3 text-xs text-gray-500 uppercase border-b whitespace-nowrap text-center">Agents</TableHead>
                                    <TableHead className="py-2 px-3 text-xs text-gray-500 uppercase border-b whitespace-nowrap text-center">Calls Waiting</TableHead>
                                    <TableHead className="py-2 px-3 text-xs text-gray-500 uppercase border-b whitespace-nowrap">Avg. Wait Time</TableHead>
                                    <TableHead className="py-2 px-3 text-xs text-gray-500 uppercase border-b whitespace-nowrap">SLA Level</TableHead>
                                    <TableHead className="py-2 px-3 text-xs text-gray-500 uppercase border-b text-center whitespace-nowrap">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            {/* {/ Table Body /} */}
                             <TableBody>
                                {/* {/ Map over the filtered queues data to create table rows /} */}
                                {filteredQueues.map((queue) => (
                                    <TableRow key={queue.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                        {/* {/ Define Table Data Cells for each queue /} */}
                                        <TableCell className="py-3 px-3 font-medium text-gray-800">{queue.name}</TableCell>
                                        <TableCell className="py-3 px-3">
                                            <QueueStatusBadge status={queue.status} />
                                        </TableCell>
                                        <TableCell className="py-3 px-3 text-gray-700 text-center">{queue.agents}</TableCell>
                                        <TableCell className="py-3 px-3 text-gray-700 text-center">{queue.callsWaiting}</TableCell>
                                        <TableCell className="py-3 px-3 text-gray-700">{queue.avgWaitTime}</TableCell>
                                        <TableCell className="py-3 px-3">
                                            <SlaLevelDisplay level={queue.slaLevel} />
                                        </TableCell>
                                        {/* {/ Actions Cell with Dropdown Menu /} */}
                                        <TableCell className="py-3 px-3 text-center">
                                            <QueueActionsMenu queue={queue} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* {/ Row shown if no queues match filter /} */}
                                {filteredQueues.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-4 px-3 text-center text-gray-500">
                                            No queues found matching your search criteria.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Export the component as the default export
export default QueueManagementPage;
