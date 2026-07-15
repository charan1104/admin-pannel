import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  BarChart3 
} from 'lucide-react';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, active: true },
    { name: 'User Management', icon: <Users size={20} />, active: false },
    { name: 'Settings', icon: <Settings size={20} />, active: false },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar for desktop / mobile overlay */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="text-blue-500" size={26} />
            <span className="text-xl font-bold tracking-wide">AdminPanel</span>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${item.active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-rose-400 hover:bg-rose-950/30 transition-colors mt-auto"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content Arena */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between px-6 h-16 bg-white border-b border-slate-200 shadow-sm">
          <button className="text-slate-500 hover:text-slate-700 lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="text-sm font-semibold text-slate-700 lg:ml-0 ml-4">Welcome back, Admin</div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">A</div>
          </div>
        </header>

        {/* Dashboard Dynamic View Body */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
            <p className="text-slate-500 text-sm">Here is a snapshot of your system performance.</p>
          </div>

          {/* Quick Metrics Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users size={24} /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Users</p>
                <p className="text-2xl font-bold text-slate-800">1,248</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><BarChart3 size={24} /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Active Sessions</p>
                <p className="text-2xl font-bold text-slate-800">84</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><ShieldCheck size={24} /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">System Status</p>
                <p className="text-2xl font-bold text-emerald-600">Healthy</p>
              </div>
            </div>
          </div>

          {/* Dummy visual space placeholder for future graphs/data */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[300px] flex items-center justify-center text-slate-400">
            Analytics visualization charts will sit here.
          </div>
        </main>
      </div>
    </div>
  );
}