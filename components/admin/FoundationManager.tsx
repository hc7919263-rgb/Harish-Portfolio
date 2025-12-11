import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const FoundationManager = () => {
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
        <div className="animate-fade-in">
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
};

export default FoundationManager;
