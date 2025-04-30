import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar/Sidebar";
import axios from "axios";
import SupervisorDashboardPage from "../pages/SupervisorDashboardPage/SupervisorDashboardPage";
import ReportingPage from "../pages/ReportingPage/ReportingPage";
import CallRecordingsPage from "../pages/CallRecordings/CallRecordingsPage";
import UserManagement from "../pages/UserManagement";
import QueueManagementPage from "../pages/QueueManagement/QueueManagementPage";
import AcdRulesPage from "../pages/AcdRules/AcdRulesPage";
import IvrBuilderPage from "../pages/IvrBuilder/IvrBuilderPage";
import DirectoryManagementPage from "../pages/DirectoryManagement/DirectoryManagementPage";
import AdminDashboardPage from "../pages/AdminDashboardPage/AdminDashboardPage";
import AgentDashboardPage from "../pages/AgentDashboard/AgentDashboard";

const SidebarLayout = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const { token, user } = useSelector((state) => state.auth);
  // const roleId = user?.roleId;
  let menuNames = [];
  const roleId = localStorage.getItem("roleId");

  const renderContent = () => {
    switch (selectedMenu) {
      case "Dashboard":

      if (selectedMenu === "Dashboard") {
        switch (roleId) {
          case "1":
            return <SupervisorDashboardPage />;
          case "2":
            return <AgentDashboardPage />;
          case "3":
            return <AdminDashboardPage />;
          // default:
          //   return <SupervisorDashboardPage />; 
        }
      }
        

      case "Reports":
        return <ReportingPage />;

      case "Call Recordings":
        return <CallRecordingsPage />;

      case "User Management":
        return <UserManagement />;

      case "Queue Management":
        return <QueueManagementPage />;

      case "AcdRules":
        return <AcdRulesPage />;

      case "IVR Builder":
        return <IvrBuilderPage />;

      case "Directory":
        return <DirectoryManagementPage />;

      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const roleId = localStorage.getItem("roleId");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:8080/api/menu/role/${roleId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        menuNames = response.data.map((item) => item.menuName);

        // console.log("Menu data received from backend:", response.data);
        if (response.data) {
          setMenus(response.data);
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <div className="flex">
      <div className="w-56 bg-white shadow-md sticky top-0 h-screen z-10">
        <Sidebar
          menus={menus}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
      <div className="flex-1 overflow-auto">
        {/* <Outlet /> */}
        {renderContent()}
      </div>
    </div>
  );
};

export default SidebarLayout;
