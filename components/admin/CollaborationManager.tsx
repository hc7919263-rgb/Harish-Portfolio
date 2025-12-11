import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData, Collaboration } from '../../context/DataContext';

const CollaborationManager = () => {
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
        <div className="animate-fade-in">
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

export default CollaborationManager;
