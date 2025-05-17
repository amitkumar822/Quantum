import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Calendar, 
  BarChart2, 
  Mail, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Plus,
  Download,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sample data
  const projects = [
    { name: 'Website Redesign', progress: 85, status: 'In Progress', team: 5 },
    { name: 'Mobile App', progress: 45, status: 'In Progress', team: 3 },
    { name: 'Marketing Campaign', progress: 100, status: 'Completed', team: 8 },
    { name: 'API Integration', progress: 30, status: 'In Progress', team: 2 }
  ];

  const activities = [
    { user: 'Alex Johnson', action: 'completed the homepage design', time: '2 hours ago' },
    { user: 'Sarah Miller', action: 'reviewed the analytics dashboard', time: '4 hours ago' },
    { user: 'Michael Chen', action: 'deployed the new API endpoints', time: '1 day ago' },
    { user: 'Emma Wilson', action: 'started the mobile app development', time: '2 days ago' }
  ];

  const metrics = [
    { title: 'Total Projects', value: '24', change: '+12%', icon: <FileText className="h-5 w-5" /> },
    { title: 'Active Users', value: '1,243', change: '+8%', icon: <Users className="h-5 w-5" /> },
    { title: 'Tasks Completed', value: '89', change: '+23%', icon: <BarChart2 className="h-5 w-5" /> },
    { title: 'Revenue', value: '$48,290', change: '+15%', icon: <BarChart2 className="h-5 w-5" /> }
  ];

  return (
    <div className="flex h-screen bg-gray-50 pt-16">
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
          ${sidebarOpen ? 'w-64' : 'w-20'} 
          ${mobileSidebarOpen ? 'left-0' : '-left-full lg:left-0'}`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Sidebar header */}
          <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} mb-8`}>
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
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          </div>

          {/* Sidebar navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {[
                { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
                { icon: <FileText className="h-5 w-5" />, label: 'Projects' },
                { icon: <Users className="h-5 w-5" />, label: 'Team' },
                { icon: <Calendar className="h-5 w-5" />, label: 'Calendar' },
                { icon: <Mail className="h-5 w-5" />, label: 'Messages' },
                { icon: <Settings className="h-5 w-5" />, label: 'Settings' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`flex items-center p-3 rounded-lg transition-colors
                      ${index === 0 ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-100'}`}
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
          <div className={`mt-auto pt-4 border-t ${!sidebarOpen && 'flex justify-center'}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">AD</span>
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="font-medium">Admin User</p>
                  <p className="text-sm text-gray-500">admin@quantum.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
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

        {/* Dashboard header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Welcome back! Here's what's happening with your projects.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button>
              <Plus className="h-5 w-5 mr-2" /> New Project
            </Button>
          </div>
        </div>

        {/* Metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
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

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Projects</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projects.map((project, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{project.name}</h3>
                        <p className="text-sm text-gray-500">
                          {project.status} • {project.team} team members
                        </p>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full 
                              ${project.progress === 100 ? 'bg-green-500' : 'bg-primary'}`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Team Members</CardTitle>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Alex Johnson', role: 'Lead Developer', avatar: 'AJ' },
                    { name: 'Sarah Miller', role: 'UI/UX Designer', avatar: 'SM' },
                    { name: 'Michael Chen', role: 'Backend Engineer', avatar: 'MC' },
                    { name: 'Emma Wilson', role: 'Project Manager', avatar: 'EW' }
                  ].map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">{member.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Member
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;