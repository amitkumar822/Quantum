import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Calendar,
  BarChart2,
  Mail,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  UserCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserTable from "@/components/UserTable";
import { useSelector } from "react-redux";
import { useGetALlUsersQuery } from "@/redux/api/userApi";

const Dashboard = () => {
  // Fetch class details from the database using a query hook
  const { data: allUserDetails } = useGetALlUsersQuery();
  const users = allUserDetails?.data || [];

  const totalUsersAndAdmins = users.length;
  const totalAdmins = users.filter((user) => user.role === "ADMIN").length;
  const activeUsers = users.filter((user) => user.status === true).length;

  const { user } = useSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const metrics = [
    {
      title: "Total Users & Admins",
      value: totalUsersAndAdmins,
      change: "+12%",
      icon: <UserCircle2 className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Active Users",
      value: activeUsers,
      change: "+8%",
      icon: <UserCheck className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Total Admins",
      value: totalAdmins,
      change: "+23%",
      icon: <ShieldCheck className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 md:pt-16 pt-12 sidebar-thin">
      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-30 h-full bg-white border-r transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-20"} 
          ${mobileSidebarOpen ? "left-0" : "-left-full lg:left-0"}`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Sidebar header */}
          <div
            className={`flex items-center ${
              sidebarOpen ? "justify-between" : "justify-center"
            } mb-8`}
          >
            {sidebarOpen && (
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-lg mr-2">
                  <LayoutDashboard className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold">Quantum</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Sidebar navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {[
                {
                  icon: <LayoutDashboard className="h-5 w-5" />,
                  label: "Dashboard",
                },
                { icon: <FileText className="h-5 w-5" />, label: "Projects" },
                { icon: <Users className="h-5 w-5" />, label: "Team" },
                { icon: <Calendar className="h-5 w-5" />, label: "Calendar" },
                { icon: <Mail className="h-5 w-5" />, label: "Messages" },
                { icon: <Settings className="h-5 w-5" />, label: "Settings" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center p-3 rounded-lg transition-colors
                      ${
                        index === 0
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-gray-100"
                      }`}
                  >
                    <span className="flex items-center justify-center w-6">
                      {item.icon}
                    </span>
                    {sidebarOpen && <span className="ml-3">{item.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div
            className={`mt-auto pt-4 border-t ${
              !sidebarOpen && "flex justify-center"
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">
                  {user?.profile?.url ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user?.profile?.url}
                      alt=""
                    />
                  ) : (
                    <>
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </>
                  )}
                </span>
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="font-medium">{user?.name}</p>
                  <a
                    href={`mailto: ${user?.email}`}
                    className="text-sm text-gray-500"
                  >
                    {user?.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto px-4 lg:px-6 pb-6 sidebar-thin">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="items-center mb-3">
          <p className="text-gray-600 font-medium">
            Welcome back! Ready to manage your dashboard efficiently.
          </p>
        </div>

        {/* Metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {metric.title}
                </CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-green-500 mt-1">{metric.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <UserTable />
      </main>
    </div>
  );
};

export default Dashboard;
