import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData, Project } from '../../context/DataContext';

const ProjectManager = () => {
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
        <div className="animate-fade-in">
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

export default ProjectManager;
