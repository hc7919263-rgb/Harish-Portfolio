import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Download } from 'lucide-react';

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

const DashboardOverview = () => {
    // --- Real-Time Analytics State ---
    const [stats, setStats] = useState({
        visitors: 0,
        activeUsers: 0,
        resumeDownloads: 0,
        avgSession: '2m 15s',
        queries: 12
    });

    // Mock Data
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/analytics');
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

        let csvContent = `Report Generated: ${date} ${time}\n\n`;
        csvContent += `--- Dashboard Overview ---\n`;
        csvContent += `Metric,Value\n`;
        csvContent += `Total Visitors,${stats.visitors}\n`;
        csvContent += `Active Users,${stats.activeUsers}\n`;
        csvContent += `Total Resume Downloads,${stats.resumeDownloads}\n`;
        csvContent += `Avg. Session,${stats.avgSession}\n`;
        csvContent += `Chatbot Queries,${stats.queries}\n\n`;

        csvContent += `--- Visitor Trends (Last 10 Days) ---\n`;
        csvContent += `Day,Visitors\n`;
        mockVisitorData.forEach(row => csvContent += `${row.name},${row.visitors}\n`);

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `admin_report_${Date.now()}.csv`);
        link.click();
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

export default DashboardOverview;
