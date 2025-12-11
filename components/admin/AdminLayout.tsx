import React, { useState } from 'react';
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    Briefcase,
    GraduationCap,
    Award,
    Users,
    User,
    FileText
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    onTabChange: (tab: any) => void;
    onNavigate: (page: any) => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'
            }`}
    >
        <Icon className="w-5 h-5" />
        <span className="font-medium text-sm">{label}</span>
    </button>
);

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, onTabChange, onNavigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 bg-white w-64 border-r border-gray-100 p-6 transform transition-transform z-30
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <h1 className="text-xl font-black tracking-tighter">ADMIN<span className="text-gray-400">.Panel</span></h1>
                </div>

                <nav className="space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => { onTabChange('overview'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={Briefcase} label="Creations" active={activeTab === 'creations'} onClick={() => { onTabChange('creations'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={GraduationCap} label="Foundation" active={activeTab === 'foundation'} onClick={() => { onTabChange('foundation'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={MessageSquare} label="Chatbot" active={activeTab === 'chatbot'} onClick={() => { onTabChange('chatbot'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={Users} label="Collaborations" active={activeTab === 'collaborations'} onClick={() => { onTabChange('collaborations'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={Award} label="Skills" active={activeTab === 'skills'} onClick={() => { onTabChange('skills'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={FileText} label="Resume" active={activeTab === 'resume'} onClick={() => { onTabChange('resume'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => { onTabChange('profile'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => { onTabChange('settings'); setIsMobileMenuOpen(false); }} />
                </nav>

                <button
                    onClick={() => {
                        onNavigate('home');
                        window.location.reload();
                    }}
                    className="absolute bottom-8 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Exit to Portfolio</span>
                </button>
            </aside>

            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 p-4 md:hidden z-20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="font-bold">Admin</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 ml-0 md:ml-64 p-8 md:p-12 mt-16 md:mt-0 transition-all">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
