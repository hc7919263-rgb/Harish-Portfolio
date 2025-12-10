import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    Download,
    LogOut,
    Menu,
    Save,
    Search,
    Filter,
    Plus,
    X,
    Trash2,
    Edit2,
    Check,
    Briefcase,
    GraduationCap,
    Award,
    Users,
    User, // Added
    FileText,
    UploadCloud
} from 'lucide-react';

import { chatData, FAQ } from '../utils/chatData';
import { useData, Collaboration, Project, Academic, Certification, Activity } from '../context/DataContext';

// --- Components ---

const ProfileTab = () => {
    // @ts-ignore
    const { meta, updateMeta } = useData();
    const [aboutText, setAboutText] = useState(meta?.aboutText || '');
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [msg, setMsg] = useState('');

    React.useEffect(() => {
        if (meta?.aboutText && !aboutText) {
            setAboutText(meta.aboutText);
        }
    }, [meta]);

    const handleSaveText = () => {
        updateMeta('aboutText', aboutText);
        setMsg('Success: About text saved!');
        setTimeout(() => setMsg(''), 3000);
    };

    const handleProfileUpload = async () => {
        if (!profileFile) return;
        setUploading(true);

        const reader = new FileReader();
        reader.readAsDataURL(profileFile);
        reader.onload = async () => {
            const base64 = reader.result as string;
            try {
                const res = await fetch('http://localhost:3001/api/upload-profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileData: base64 })
                });
                if (res.ok) {
                    setMsg('Success: Profile Image Updated!');
                    setProfileFile(null);
                    // Force cache bust if we were doing generic image, 
                    // but browser might cache 'profile.jpg'. 
                    // This is simple implementation for now.
                    window.location.reload();
                } else {
                    setMsg('Error: Upload Failed');
                }
            } catch (e) {
                setMsg('Error: Server Unavailable');
            } finally {
                setUploading(false);
            }
        };
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-black mb-2">Profile Management</h2>
                    <p className="text-gray-500">Update your bio and profile image.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* About Content */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5" /> About Content
                    </h3>
                    <textarea
                        value={aboutText}
                        onChange={(e) => setAboutText(e.target.value)}
                        className="w-full h-64 p-4 rounded-xl border border-gray-200 focus:border-black focus:ring-0 resize-none font-mono text-sm leading-relaxed"
                        placeholder="Paste your About Me text here..."
                    />
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSaveText}
                            className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Save Content
                        </button>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5" /> Profile Image
                    </h3>

                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 rounded-full border-4 border-gray-100 overflow-hidden mb-6 relative group">
                            <img src="/assets/profile.jpg" alt="Current Profile" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                                Current
                            </div>
                        </div>

                        <div className="w-full">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
                                className="w-full mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            />
                            <button
                                onClick={handleProfileUpload}
                                disabled={!profileFile || uploading}
                                className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
                                    ${!profileFile || uploading ? 'bg-gray-300 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}
                                `}
                            >
                                <UploadCloud className="w-4 h-4" />
                                {uploading ? 'Uploading...' : 'Update Photo'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {msg && (
                <div className={`mt-8 px-6 py-4 rounded-xl font-bold text-center animate-in fade-in slide-in-from-bottom-2 ${msg.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {msg}
                </div>
            )}
        </div>
    );
};

const SettingsTab = () => {
    // @ts-ignore
    const { meta, updateMeta } = useData();
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDesc, setSeoDesc] = useState('');
    const [msg, setMsg] = useState('');

    React.useEffect(() => {
        if (meta) {
            setMaintenanceMode(!!meta.maintenanceMode);
            setSeoTitle(meta.seoTitle || '');
            setSeoDesc(meta.seoDesc || '');
        }
    }, [meta]);

    const handleSave = () => {
        updateMeta('maintenanceMode', maintenanceMode);
        updateMeta('seoTitle', seoTitle);
        updateMeta('seoDesc', seoDesc);
        setMsg('Success: System settings saved!');
        setTimeout(() => setMsg(''), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-black mb-2">System Settings</h2>
                    <p className="text-gray-500">Configure global application settings.</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Application Control */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Settings className="w-5 h-5" /> Application Control
                    </h3>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div>
                            <p className="font-bold text-gray-900">Maintenance Mode</p>
                            <p className="text-sm text-gray-500">Temporarily disable public access to the portfolio.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={maintenanceMode}
                                onChange={(e) => setMaintenanceMode(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                    </div>
                </div>

                {/* SEO Configuration */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Search className="w-5 h-5" /> SEO Configuration
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Site Title</label>
                            <input
                                type="text"
                                value={seoTitle}
                                onChange={(e) => setSeoTitle(e.target.value)}
                                placeholder="Harish Chavan - Portfolio"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black focus:ring-0 transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
                            <input
                                type="text"
                                value={seoDesc}
                                onChange={(e) => setSeoDesc(e.target.value)}
                                placeholder="Business Analytics Student & Developer..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black focus:ring-0 transition-all font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Action */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all transform hover:-translate-y-1 flex items-center gap-2 shadow-lg"
                    >
                        <Save className="w-5 h-5" /> Save Changes
                    </button>
                </div>
            </div>

            {msg && (
                <div className={`mt-8 px-6 py-4 rounded-xl font-bold text-center animate-in fade-in slide-in-from-bottom-2 ${msg.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {msg}
                </div>
            )}
        </div>
    );
};
const ResumeTab = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setMessage('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64 = reader.result as string;

            try {
                const res = await fetch('http://localhost:3001/api/upload-resume', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fileData: base64,
                        fileName: file.name
                    })
                });

                if (res.ok) {
                    setMessage('Success: Resume Updated!');
                    setFile(null);
                } else {
                    setMessage('Error: Upload Failed');
                }
            } catch (err) {
                setMessage('Error: Server unavailable');
            } finally {
                setUploading(false);
            }
        };
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-black mb-2">Resume Management</h2>
                    <p className="text-gray-500">Update your public resume (PDF).</p>
                </div>
            </div>

            <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-300 text-center hover:border-gray-400 transition-colors">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UploadCloud className="w-10 h-10 text-blue-600" />
                </div>

                <h3 className="text-xl font-bold mb-2">Upload New Resume</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Select a PDF file to replace the current version. This will immediately update the download link on your site.</p>

                <div className="flex flex-col items-center gap-4">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />

                    {file && (
                        <div className="mt-4 animate-in fade-in slide-in-from-bottom-2">
                            <p className="text-sm font-medium text-gray-700 mb-4">{file.name}</p>
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all
                                    ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 hover:scale-105 active:scale-95'}
                                `}
                            >
                                {uploading ? 'Uploading...' : 'Confirm Update'}
                            </button>
                        </div>
                    )}

                    {message && (
                        <div className={`mt-6 px-4 py-2 rounded-lg font-medium ${message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-10 bg-gray-50 p-6 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm">
                        <FileText className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">Current File</p>
                        <p className="text-sm text-gray-500">public/assets/resume.pdf</p>
                    </div>
                </div>
                <a href="/assets/resume.pdf" target="_blank" className="text-sm font-bold text-blue-600 hover:underline">Preview</a>
            </div>
        </div>
    );
};

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

const KPICard = ({ title, value, change, trend }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                {change}
            </span>
        </div>
        <p className="text-3xl font-black text-black">{value}</p>
    </div>
);

// --- Content Sections ---

const OverviewTab = () => {
    // --- Real-Time Analytics State ---
    const [stats, setStats] = useState({
        visitors: 0,
        activeUsers: 0,
        resumeDownloads: 0,
        avgSession: '2m 15s',
        queries: 12
    });

    // Mock Data for Charts (Requested 10 entries)
    const mockVisitorData = [
        { name: 'Day 1', visitors: 120 },
        { name: 'Day 2', visitors: 132 },
        { name: 'Day 3', visitors: 101 },
        { name: 'Day 4', visitors: 134 },
        { name: 'Day 5', visitors: 90 },
        { name: 'Day 6', visitors: 230 },
        { name: 'Day 7', visitors: 210 },
        { name: 'Day 8', visitors: 180 },
        { name: 'Day 9', visitors: 250 },
        { name: 'Day 10', visitors: 300 },
    ];

    const mockDeviceData = [
        { name: 'Desktop', value: 65 },
        { name: 'Mobile', value: 30 },
        { name: 'Tablet', value: 5 },
    ];

    const mockContactData = [
        { name: 'Day 1', submissions: 2 },
        { name: 'Day 2', submissions: 4 },
        { name: 'Day 3', submissions: 1 },
        { name: 'Day 4', submissions: 5 },
        { name: 'Day 5', submissions: 3 },
        { name: 'Day 6', submissions: 8 },
        { name: 'Day 7', submissions: 6 },
        { name: 'Day 8', submissions: 4 },
        { name: 'Day 9', submissions: 7 },
        { name: 'Day 10', submissions: 9 },
    ];

    const mockChatbotData = [
        { name: 'Projects', value: 45, color: '#0088FE' },
        { name: 'Skills', value: 25, color: '#00C49F' },
        { name: 'Contact', value: 15, color: '#FFBB28' },
        { name: 'Other', value: 15, color: '#FF8042' },
    ];

    // Fetch Live Data
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/analytics');
                const data = await res.json();

                setStats(prev => ({
                    ...prev,
                    visitors: data.totalVisitors || 0,
                    activeUsers: data.activeUsers || 0,
                    resumeDownloads: data.resumeDownloads || 0,
                }));
            } catch (e) {
                console.error("Dashboard Sync Error");
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000); // Fast polling for "Real Time" feel
        return () => clearInterval(interval);
    }, []);

    const handleDownloadReport = () => {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        // 1. Overview Section
        let csvContent = `Report Generated: ${date} ${time}\n\n`;
        csvContent += `--- Dashboard Overview ---\n`;
        csvContent += `Metric,Value\n`;
        csvContent += `Total Visitors,${stats.visitors}\n`;
        csvContent += `Active Users,${stats.activeUsers}\n`;
        csvContent += `Total Resume Downloads,${stats.resumeDownloads}\n`;
        csvContent += `Avg. Session,${stats.avgSession}\n`;
        csvContent += `Chatbot Queries,${stats.queries}\n\n`;

        // 2. Visitor Trends
        csvContent += `--- Visitor Trends (Last 10 Days) ---\n`;
        csvContent += `Day,Visitors\n`;
        mockVisitorData.forEach(row => {
            csvContent += `${row.name},${row.visitors}\n`;
        });
        csvContent += `\n`;

        // 3. Device Usage
        csvContent += `--- Device Usage ---\n`;
        csvContent += `Device,Percentage\n`;
        mockDeviceData.forEach(row => {
            csvContent += `${row.name},${row.value}%\n`;
        });
        csvContent += `\n`;

        // 4. Form Submissions
        csvContent += `--- Form Submissions ---\n`;
        csvContent += `Day,Submissions\n`;
        mockContactData.forEach(row => {
            csvContent += `${row.name},${row.submissions}\n`;
        });
        csvContent += `\n`;

        // 5. Chatbot Breakdown
        csvContent += `--- Chatbot Breakdown ---\n`;
        csvContent += `Category,Value\n`;
        mockChatbotData.forEach(row => {
            csvContent += `${row.name},${row.value}\n`;
        });

        // Trigger Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `admin_report_${Date.now()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-black mb-2">Dashboard Overview</h2>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${stats.activeUsers > 0 ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${stats.activeUsers > 0 ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        </span>
                        <p className={`${stats.activeUsers > 0 ? 'text-green-600' : 'text-gray-500'} font-bold text-sm`}>
                            {stats.activeUsers > 0 ? 'Live System Active' : 'System Offline'} • {stats.activeUsers} users online
                        </p>
                    </div>
                </div>
                <button onClick={handleDownloadReport} className="hidden md:flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors">
                    <Download className="w-4 h-4" /> Download Report
                </button>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <KPICard title="Total Visitors" value={stats.visitors.toLocaleString()} change="+12%" trend="up" />
                <KPICard title="Total Resume Download" value={stats.resumeDownloads} change="All Time" trend="up" />
                <KPICard title="Avg. Session" value={stats.avgSession} change="+5%" trend="up" />
                <KPICard title="Chatbot Queries" value={stats.queries} change="+2" trend="up" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Main Trend Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6">Visitor Trends (Last 10 Days)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockVisitorData}>
                                <defs>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000000" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#000' }}
                                />
                                <Area type="monotone" dataKey="visitors" stroke="#000000" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Device/Secondary Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6">Device Usage</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockDeviceData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }} />
                                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="value" fill="#000000" radius={[0, 4, 4, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Form Submissions (Line Chart) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6">Form Submissions</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockContactData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#000' }}
                                />
                                <Line type="monotone" dataKey="submissions" stroke="#000000" strokeWidth={3} dot={{ r: 4, fill: '#000' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chatbot Queries (Pie Chart) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6">Chatbot Queries</h3>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={mockChatbotData}
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
                                        const RADIAN = Math.PI / 180;
                                        const radius = outerRadius + 25; // Push label out
                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill="#374151"
                                                textAnchor={x > cx ? 'start' : 'end'}
                                                dominantBaseline="central"
                                                className="text-xs font-bold"
                                                style={{ fontSize: '10px' }}
                                            >
                                                {`${name} (${(percent * 100).toFixed(0)}%)`}
                                            </text>
                                        );
                                    }}
                                    labelLine={true}
                                >
                                    {mockChatbotData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChatbotTab = () => {
    const { faqs, addFaq, updateFaq, deleteFaq } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

    // Form State
    const [formData, setFormData] = useState({ question: '', answer: '', category: 'Projects' });

    const filteredFAQs = faqs.filter(f =>
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenAdd = () => {
        setEditingFaq(null);
        setFormData({ question: '', answer: '', category: 'Projects' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (faq: FAQ) => {
        setEditingFaq(faq);
        setFormData({ question: faq.question, answer: faq.answer, category: faq.category });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this FAQ?')) {
            deleteFaq(id);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingFaq) {
            // Edit
            updateFaq(editingFaq.id, { ...editingFaq, ...formData });
        } else {
            // Add
            const newFaq: FAQ = {
                id: `new_${Date.now()}`,
                ...formData
            };
            addFaq(newFaq);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Chatbot Manager</h2>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <button
                        onClick={handleOpenAdd}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add New
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Question</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Answer Preview</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredFAQs.map((faq) => (
                            <tr key={faq.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-3 md:px-6 py-3 md:py-4 text-sm font-medium text-gray-900">{faq.question}</td>
                                <td className="px-3 md:px-6 py-3 md:py-4">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                        {faq.category}
                                    </span>
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-sm text-gray-500 max-w-xs truncate" title={faq.answer}>
                                    {faq.answer}
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-right">
                                    <div className="flex justify-end gap-2 transition-opacity">
                                        <button onClick={() => handleOpenEdit(faq)} className="p-1 hover:bg-gray-200 rounded text-blue-600" title="Edit">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(faq.id)} className="p-1 hover:bg-gray-200 rounded text-red-600" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredFAQs.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-sm">No FAQs found.</div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="Projects">Projects</option>
                                    <option value="Skills">Skills</option>
                                    <option value="About">About</option>
                                    <option value="Contact">Contact</option>
                                    <option value="Foundation">Foundation</option>
                                    <option value="Legal">Legal</option>
                                    <option value="Collaboration">Collaboration</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="e.g. What is your hourly rate?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                                    placeholder="The answer to display..."
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800"
                                >
                                    {editingFaq ? 'Update FAQ' : 'Create FAQ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const CreationsTab = () => {
    const { projects, addProject, updateProject, deleteProject } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<Project>({
        title: '', description: '', url: '', skills: [], category: 'Projects'
    });

    const handleOpenAdd = () => {
        setEditingIndex(null);
        setFormData({ title: '', description: '', url: '', skills: [], category: 'Projects', featured: false });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (index: number, project: Project) => {
        setEditingIndex(index);
        setFormData(project);
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        if (confirm('Delete this project?')) deleteProject(index);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingIndex !== null) {
            updateProject(editingIndex, formData);
        } else {
            addProject(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Creations Manager</h2>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                    <Plus className="w-4 h-4" /> Add Project
                </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {projects.map((p, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-3 md:px-6 py-3 md:py-4 text-sm font-medium text-gray-900">
                                    {p.title}
                                    {p.featured && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full border border-yellow-200">★ Top</span>}
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                        {p.category}
                                    </span>
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === 'coming-soon' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {p.status || 'Active'}
                                    </span>
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-right">
                                    <div className="flex justify-end gap-2 transition-opacity">
                                        <button onClick={() => handleOpenEdit(i, p)} className="p-1 hover:bg-gray-200 rounded text-blue-600"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(i)} className="p-1 hover:bg-gray-200 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">{editingIndex !== null ? 'Edit Project' : 'Add New Project'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.skills.join(', ')}
                                    onChange={e => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
                                    placeholder="Python, React, Data Analysis"
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                                <input
                                    type="url"
                                    value={formData.url}
                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                    placeholder="https://github.com/..."
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })} className="w-full px-4 py-2 border rounded-lg">
                                    <option value="Projects">Projects</option>
                                    <option value="Handbooks">Handbooks</option>
                                    <option value="Blogs">Blogs</option>
                                    <option value="Case Studies">Case Studies</option>
                                    <option value="Research papers">Research papers</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select value={formData.status || ''} onChange={e => setFormData({ ...formData, status: e.target.value as any })} className="w-full px-4 py-2 border rounded-lg">
                                    <option value="">Active</option>
                                    <option value="coming-soon">Coming Soon</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.featured || false}
                                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                />
                                <label htmlFor="featured" className="text-sm font-medium text-gray-700 select-none">
                                    Featured (Show in Top Creations)
                                </label>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const FoundationTab = () => {
    const { foundation, addAcademic, updateAcademic, deleteAcademic, addCertification, updateCertification, deleteCertification, addActivity, updateActivity, deleteActivity } = useData();
    const [subTab, setSubTab] = useState<'academic' | 'certifications' | 'activities'>('academic');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<any>({});

    const handleOpenAdd = () => {
        setEditingIndex(null);
        setFormData({});
        setIsModalOpen(true);
    };

    const handleOpenEdit = (index: number, item: any) => {
        setEditingIndex(index);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        if (!confirm('Delete this item?')) return;
        if (subTab === 'academic') deleteAcademic(index);
        else if (subTab === 'certifications') deleteCertification(index);
        else deleteActivity(index);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (subTab === 'academic') {
            editingIndex !== null ? updateAcademic(editingIndex, formData) : addAcademic(formData);
        } else if (subTab === 'certifications') {
            editingIndex !== null ? updateCertification(editingIndex, formData) : addCertification(formData);
        } else {
            editingIndex !== null ? updateActivity(editingIndex, formData) : addActivity(formData);
        }
        setIsModalOpen(false);
    };

    const getCurrentList = () => {
        if (subTab === 'academic') return foundation.academic;
        if (subTab === 'certifications') return foundation.certifications;
        return foundation.activities;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Foundation Manager</h2>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
                        {['academic', 'certifications', 'activities'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSubTab(tab as any)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${subTab === tab ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <Plus className="w-4 h-4" /> Add Item
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">

                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title/Role</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Organization/Inst.</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Year</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {getCurrentList().map((item: any, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-3 md:px-6 py-3 md:py-4 text-sm font-medium text-gray-900">{item.title || item.degree || item.role}</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-sm text-gray-500">{item.issuer || item.institution || item.organization}</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-sm text-gray-500">{item.year}</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-right">
                                    <div className="flex justify-end gap-2 transition-opacity">
                                        <button onClick={() => handleOpenEdit(i, item)} className="p-1 hover:bg-gray-200 rounded text-blue-600"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(i)} className="p-1 hover:bg-gray-200 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Dynamic Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold capitalize">{editingIndex !== null ? 'Edit Item' : 'Add Item'} ({subTab})</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            {subTab === 'academic' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                        <input required value={formData.degree || ''} onChange={e => setFormData({ ...formData, degree: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. MBA in Business Analytics" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                                        <input required value={formData.institution || ''} onChange={e => setFormData({ ...formData, institution: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. University Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                        <input required value={formData.year || ''} onChange={e => setFormData({ ...formData, year: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. 2023 - 2025" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea rows={3} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="Brief details..." />
                                    </div>
                                </>
                            )}
                            {subTab === 'certifications' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Title</label>
                                        <input required value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. AWS Certified Cloud Practitioner" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                                        <input required value={formData.issuer || ''} onChange={e => setFormData({ ...formData, issuer: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Amazon Web Services" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                        <input required value={formData.year || ''} onChange={e => setFormData({ ...formData, year: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. 2024" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Credential Link (Optional)</label>
                                        <input type="url" value={formData.url || ''} onChange={e => setFormData({ ...formData, url: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Image URL (Optional)</label>
                                        <input value={formData.image || ''} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="/assets/certificate.png" />
                                        <p className="text-xs text-gray-400 pl-1 mt-1">Place file in public/assets/ first</p>
                                    </div>
                                </>
                            )}
                            {subTab === 'activities' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                        <input required value={formData.role || ''} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Volunteer" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                                        <input required value={formData.organization || ''} onChange={e => setFormData({ ...formData, organization: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Non-Profit Org" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                        <input required value={formData.year || ''} onChange={e => setFormData({ ...formData, year: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. 2023" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea rows={3} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="Key contributions..." />
                                    </div>
                                </>
                            )}
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const CollaborationTab = () => {
    const { collaborations, addCollaboration, updateCollaboration, deleteCollaboration } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Collaboration>>({ name: '', role: '', imageUrl: '', url: '' });

    const handleOpenAdd = () => {
        setEditingId(null);
        setFormData({ name: '', role: '', imageUrl: '', url: '' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (collab: Collaboration) => {
        setEditingId(collab.id);
        setFormData(collab);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this collaboration?')) deleteCollaboration(id);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...formData, name: formData.name!, imageUrl: formData.imageUrl || '' } as Collaboration;
        if (editingId) {
            updateCollaboration(editingId, { ...payload, id: editingId });
        } else {
            addCollaboration({ ...payload, id: `collab_${Date.now()}` });
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Collaboration Manager</h2>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                    <Plus className="w-4 h-4" /> Add Partner
                </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Partner</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role/Description</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {collaborations.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-3 md:px-6 py-3 md:py-4">
                                    <div className="flex items-center gap-3">
                                        {c.imageUrl && <img src={c.imageUrl} alt={c.name} className="w-8 h-8 rounded-full border border-gray-200 object-cover" />}
                                        <span className="font-medium text-gray-900">{c.name}</span>
                                    </div>
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-sm text-gray-500">{c.role}</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-right">
                                    <div className="flex justify-end gap-2 transition-opacity">
                                        <button onClick={() => handleOpenEdit(c)} className="p-1 hover:bg-gray-200 rounded text-blue-600"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(c.id)} className="p-1 hover:bg-gray-200 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {collaborations.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No collaborations listed yet.</div>}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">{editingId ? 'Edit Partner' : 'Add Partner'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. John Doe, Tech Corp" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Description</label>
                                <input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Collaborated on AI Project" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="/assets/partner.png" />
                                <p className="text-xs text-gray-400 pl-1">Place file in public/assets/ first</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL (Optional)</label>
                                <input type="url" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};





const SkillsTab = () => {
    const { skills, addSkill, updateSkill, deleteSkill } = useData();
    const [activeType, setActiveType] = useState<'technical' | 'soft'>('technical');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: '', percentage: 0 });

    const handleOpenAdd = () => {
        setEditingIndex(null);
        setFormData({ name: '', percentage: 0 });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (index: number, skill: any) => {
        setEditingIndex(index);
        setFormData(skill);
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        if (confirm('Delete this skill?')) {
            deleteSkill(activeType, index);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingIndex !== null) {
            updateSkill(activeType, editingIndex, formData);
        } else {
            addSkill(activeType, formData);
        }
        setIsModalOpen(false);
    };

    const skillList = skills[activeType];

    return (
        <div className="space-y-6 animate-fade-in relative z-10">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black mb-2">My Skills</h2>
                    <p className="text-gray-500">Manage technical and soft skills.</p>
                </div>
                <button onClick={handleOpenAdd} className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <Plus className="w-5 h-5" /> Add Skill
                </button>
            </div>

            {/* Sub Tabs */}
            <div className="flex gap-2 bg-white p-2 rounded-xl border border-gray-100 w-fit">
                {['technical', 'soft'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveType(tab as any)}
                        className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeType === tab ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Skill Name</th>
                            <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Proficiency</th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {skillList.map((item, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="font-bold text-gray-800">{item.name}</div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full text-xs">{item.percentage}%</span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex justify-end gap-2 transition-opacity">
                                        <button onClick={() => handleOpenEdit(i, item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(i)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {skillList.length === 0 && <div className="p-12 text-center text-gray-400">No skills found.</div>}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">{editingIndex !== null ? 'Edit Skill' : 'Add Skill'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Skill Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Percentage (0-100)</label>
                                <input required type="number" min="0" max="100" value={formData.percentage} onChange={e => setFormData({ ...formData, percentage: parseInt(e.target.value) })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main Page ---

interface AdminPageProps {
    onNavigate: (page: any) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'creations' | 'foundation' | 'chatbot' | 'collaborations' | 'skills' | 'resume' | 'settings' | 'profile'>('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab />;
            case 'creations': return <CreationsTab />;
            case 'foundation': return <FoundationTab />;
            case 'chatbot': return <ChatbotTab />;
            case 'collaborations': return <CollaborationTab />;
            case 'skills': return <SkillsTab />;
            case 'resume': return <ResumeTab />;
            case 'profile': return <ProfileTab />;
            case 'settings': return <SettingsTab />;
            default: return <OverviewTab />;
        }
    };

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
                    <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <SidebarItem icon={Briefcase} label="Creations" active={activeTab === 'creations'} onClick={() => setActiveTab('creations')} />
                    <SidebarItem icon={GraduationCap} label="Foundation" active={activeTab === 'foundation'} onClick={() => setActiveTab('foundation')} />
                    <SidebarItem icon={MessageSquare} label="Chatbot" active={activeTab === 'chatbot'} onClick={() => setActiveTab('chatbot')} />
                    <SidebarItem icon={Users} label="Collaborations" active={activeTab === 'collaborations'} onClick={() => setActiveTab('collaborations')} />
                    <SidebarItem icon={Award} label="Skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
                    <SidebarItem icon={FileText} label="Resume" active={activeTab === 'resume'} onClick={() => setActiveTab('resume')} />
                    <SidebarItem icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                    <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
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
                    {renderContent()}
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

export default AdminPage;
