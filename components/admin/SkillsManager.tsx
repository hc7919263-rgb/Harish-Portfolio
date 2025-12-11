import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const SkillsManager = () => {
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
        <div className="space-y-6 animate-fade-in relative z-10 w-full">
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

export default SkillsManager;
