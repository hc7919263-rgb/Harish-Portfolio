import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import DashboardOverview from '../components/admin/DashboardOverview';
import CreationsManager from '../components/admin/ProjectManager'; // Renamed for clarity in import if desired, but file is ProjectManager
import FoundationManager from '../components/admin/FoundationManager';
import ChatbotManager from '../components/admin/ChatbotManager';
import CollaborationManager from '../components/admin/CollaborationManager';
import SkillsManager from '../components/admin/SkillsManager';
import ResumeManager from '../components/admin/ResumeManager';
import ProfileSettings from '../components/admin/ProfileSettings';
import SystemSettings from '../components/admin/SystemSettings';

interface AdminPageProps {
    onNavigate: (page: any) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'creations' | 'foundation' | 'chatbot' | 'collaborations' | 'skills' | 'resume' | 'settings' | 'profile'>('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <DashboardOverview />;
            case 'creations': return <CreationsManager />;
            case 'foundation': return <FoundationManager />;
            case 'chatbot': return <ChatbotManager />;
            case 'collaborations': return <CollaborationManager />;
            case 'skills': return <SkillsManager />;
            case 'resume': return <ResumeManager />;
            case 'profile': return <ProfileSettings />;
            case 'settings': return <SystemSettings />;
            default: return <DashboardOverview />;
        }
    };

    return (
        <AdminLayout activeTab={activeTab} onTabChange={setActiveTab} onNavigate={onNavigate}>
            {renderContent()}
        </AdminLayout>
    );
};

export default AdminPage;
