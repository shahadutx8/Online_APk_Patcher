import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Activity,
  LogOut,
  UploadCloud,
  Zap
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import CloudApkInjector from './components/CloudApkInjector';
import DynamicPayload from './components/DynamicPayload';

export default function App() {
  const [activeTab, setActiveTab] = useState('injector');

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight text-blue-400">DialogBox<span className="text-white">Admin</span></h1>
          <p className="text-xs text-slate-400 mt-1">Advanced MT Manager Controller</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Real-time Analytics" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<UploadCloud size={20} />} 
            label="Cloud APK Injector" 
            active={activeTab === 'injector'} 
            onClick={() => setActiveTab('injector')} 
          />
          <NavItem 
            icon={<Zap size={20} />} 
            label="OTA Payload Delivery" 
            active={activeTab === 'ota'} 
            onClick={() => setActiveTab('ota')} 
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
          <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors mt-2 text-sm font-medium">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === 'dashboard' && 'Real-time Analytics Dashboard'}
            {activeTab === 'injector' && 'Automated Web-based APK Patcher'}
            {activeTab === 'ota' && 'Dynamic Payload Execution'}
            {activeTab === 'settings' && 'System Settings'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm text-gray-500 font-medium">System Online</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'injector' && <CloudApkInjector />}
          {activeTab === 'ota' && <DynamicPayload />}
          
          {['settings'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Activity size={48} className="mb-4 opacity-20" />
              <p>Module in development...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
        active 
          ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
