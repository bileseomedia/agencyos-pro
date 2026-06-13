import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  KanbanSquare, 
  DollarSign, 
  MousePointerClick, 
  RefreshCw, 
  Database, 
  AlertCircle, 
  Plus, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Sparkles, 
  HelpCircle, 
  Trash2, 
  Lock, 
  LogOut, 
  User, 
  Sliders, 
  FileSpreadsheet, 
  Calendar, 
  Layers, 
  Globe, 
  Bell,
  Coins,
  Hourglass,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Search,
  X,
  BarChart3,
  Trophy,
  Settings,
  Download,
  Eye,
  Edit3,
  Filter,
  Award,
  Target,
  Zap,
  Shield,
  PieChart
} from 'lucide-react';

const STORAGE_KEY = 'agencyos_pro_data';
const TASK_PRESETS = [
  { id: 'pr_web', label: 'Bikin Web (60 Menit)', rate: 1000000, minutes: 60 },
  { id: 'pr_domain', label: 'Cari Domain (15 Menit)', rate: 50000, minutes: 15 },
  { id: 'pr_ads', label: 'Riset Iklan (30 Menit)', rate: 150000, minutes: 30 },
  { id: 'pr_design', label: 'Desain UI/UX (45 Menit)', rate: 400000, minutes: 45 }
];

const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

const getInitialData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved data', e);
    }
  }
  
  return {
    clients: [
      { id: 'c1', name: 'Budi Santoso', company: 'PT Maju Bersama', email: 'budi@majubersama.com', phone: '0812-3456-7890', website: 'https://majubersama.com', status: 'Aktif', totalDeal: 25000000, paidAmount: 15000000, clicks: 342, createdAt: '2026-01-15' },
      { id: 'c2', name: 'Siti Rahma', company: 'CV Berkah Abadi', email: 'siti@berkahabadi.co.id', phone: '0813-9876-5432', website: 'https://berkahabadi.co.id', status: 'Aktif', totalDeal: 18000000, paidAmount: 18000000, clicks: 128, createdAt: '2026-02-10' },
      { id: 'c3', name: 'Andi Wijaya', company: 'Toko Elektronik Kita', email: 'andi@tokokita.com', phone: '0857-1122-3344', website: 'https://tokokita.com', status: 'Kritis', totalDeal: 45000000, paidAmount: 10000000, clicks: 890, createdAt: '2026-01-20' }
    ],
    projects: [
      { id: 'p1', name: 'Rebranding & Web Corporate', clientId: 'c1', progress: 65, status: 'Sedang Berjalan', value: 25000000, month: '2026-06', createdAt: '2026-05-01' },
      { id: 'p2', name: 'Sistem Inventory Toko', clientId: 'c3', progress: 20, status: 'Harus Dikerjakan', value: 45000000, month: '2026-06', createdAt: '2026-05-15' },
      { id: 'p3', name: 'E-Commerce Website Update', clientId: 'c2', progress: 100, status: 'Selesai', value: 18000000, month: '2026-06', createdAt: '2026-04-10' }
    ],
    tasks: [
      { id: 't1', title: 'Setup Hosting & Domain Klien', projectId: 'p1', priority: 'Tinggi', status: 'Prioritas Utama', dueDate: '2026-06-20', assignedTo: 'Nasir', executorFee: 500000, timeSpent: 30, completedAt: null, taskType: 'Domain', createdAt: '2026-06-01' },
      { id: 't2', title: 'Desain Wireframe & UI/UX Landing Page', projectId: 'p1', priority: 'Sedang', status: 'Sedang Berjalan', dueDate: '2026-06-25', assignedTo: 'Nikita', executorFee: 400000, timeSpent: 45, completedAt: null, taskType: 'Desain', createdAt: '2026-06-02' },
      { id: 't3', title: 'Mencari Domain & Name Server Terbaik', projectId: 'p1', priority: 'Tinggi', status: 'Harus Dikerjakan', dueDate: '2026-06-18', assignedTo: null, executorFee: 50000, timeSpent: 15, completedAt: null, taskType: 'Domain', createdAt: '2026-06-05' },
      { id: 't4', title: 'Slicing Frontend & Integrasi Database', projectId: 'p3', priority: 'Tinggi', status: 'Selesai', dueDate: '2026-06-10', assignedTo: 'Nikita', executorFee: 1000000, timeSpent: 60, completedAt: '2026-06-12', taskType: 'Web', createdAt: '2026-06-01' }
    ],
    domains: [
      { id: 'd1', domainName: 'majubersama.com', expiryDate: '2026-07-15', provider: 'Niagahoster', clicks: 342, createdAt: '2026-01-01' },
      { id: 'd2', domainName: 'tokokita.com', expiryDate: '2026-06-28', provider: 'Domainesia', clicks: 890, createdAt: '2026-01-01' }
    ],
    team: [
      { id: 'tm1', name: 'Nasir', role: 'Maker', email: 'nasir@agency.com', phone: '08123456789', joinDate: '2025-01-01', totalTasksCompleted: 45, totalEarnings: 15000000 },
      { id: 'tm2', name: 'Nikita', role: 'Executor', email: 'nikita@agency.com', phone: '081298765432', joinDate: '2025-06-01', totalTasksCompleted: 32, totalEarnings: 12500000 },
      { id: 'tm3', name: 'Bambang', role: 'Executor', email: 'bambang@agency.com', phone: '081355577788', joinDate: '2026-01-15', totalTasksCompleted: 12, totalEarnings: 3500000 }
    ],
    activityLog: []
  };
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loginNameInput, setLoginNameInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [domains, setDomains] = useState([]);
  const [team, setTeam] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showToast, setShowToast] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, type: '', id: '', name: '' });
  const [newClient, setNewClient] = useState({ name: '', company: '', email: '', phone: '', website: '', status: 'Aktif', totalDeal: '', paidAmount: '' });
  const [newProject, setNewProject] = useState({ name: '', clientId: '', progress: 0, status: 'Harus Dikerjakan', value: '', month: new Date().toISOString().slice(0, 7) });
  const [newTask, setNewTask] = useState({ title: '', projectId: '', priority: 'Sedang', status: 'Harus Dikerjakan', dueDate: '', executorFee: 50000, timeSpent: 15, taskType: 'Domain' });
  const [newDomain, setNewDomain] = useState({ domainName: '', expiryDate: '', provider: '' });
  const [claimingTaskId, setClaimingTaskId] = useState(null);
  const [minutesSpentInput, setMinutesSpentInput] = useState('');
  const [claimRewardValue, setClaimRewardValue] = useState(0);

  useEffect(() => {
    const data = getInitialData();
    setClients(data.clients);
    setProjects(data.projects);
    setTasks(data.tasks);
    setDomains(data.domains);
    setTeam(data.team);
  }, []);

  useEffect(() => {
    if (clients.length || projects.length || tasks.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ clients, projects, tasks, domains, team }));
    }
  }, [clients, projects, tasks, domains, team]);

  const triggerToast = (message, type = 'success') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginNameInput.toLowerCase() === 'nasir' && loginPassword === 'admin123') {
      setUser({ name: 'Nasir', role: 'Maker' });
      triggerToast('Selamat Datang Nasir!');
    } else if (team.some(m => m.name.toLowerCase() === loginNameInput.toLowerCase())) {
      const member = team.find(m => m.name.toLowerCase() === loginNameInput.toLowerCase());
      setUser({ name: member.name, role: member.role });
      triggerToast(`Halo ${member.name}!`);
    } else {
      triggerToast('Username atau password salah!', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoginNameInput('');
    setLoginPassword('');
    triggerToast('Keluar sistem berhasil.', 'info');
  };

  const confirmDelete = (type, id, name) => {
    setDeleteConfirmation({ show: true, type, id, name });
  };

  const executeDelete = () => {
    const { type, id } = deleteConfirmation;
    switch (type) {
      case 'client': setClients(prev => prev.filter(c => c.id !== id)); break;
      case 'project': setProjects(prev => prev.filter(p => p.id !== id)); break;
      case 'task': setTasks(prev => prev.filter(t => t.id !== id)); break;
      case 'domain': setDomains(prev => prev.filter(d => d.id !== id)); break;
      default: break;
    }
    triggerToast(`${deleteConfirmation.name} berhasil dihapus`);
    setDeleteConfirmation({ show: false, type: '', id: '', name: '' });
  };

  const handleAddClientSubmit = (e) => {
    e.preventDefault();
    const added = { ...newClient, id: generateId(), totalDeal: Number(newClient.totalDeal) || 0, paidAmount: Number(newClient.paidAmount) || 0, clicks: 0 };
    setClients(prev => [...prev, added]);
    setShowAddClient(false);
    triggerToast(`Klien "${newClient.company}" ditambahkan!`);
    setNewClient({ name: '', company: '', email: '', phone: '', website: '', status: 'Aktif', totalDeal: '', paidAmount: '' });
  };

  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    const added = { ...newProject, id: generateId(), progress: Number(newProject.progress) || 0, value: Number(newProject.value) || 0 };
    setProjects(prev => [...prev, added]);
    setShowAddProject(false);
    triggerToast(`Proyek "${newProject.name}" ditambahkan!`);
    setNewProject({ name: '', clientId: clients[0]?.id || '', progress: 0, status: 'Harus Dikerjakan', value: '', month: new Date().toISOString().slice(0, 7) });
  };

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    const added = { ...newTask, id: generateId(), assignedTo: null, completedAt: null, executorFee: Number(newTask.executorFee) || 0, timeSpent: Number(newTask.timeSpent) || 15 };
    setTasks(prev => [...prev, added]);
    setShowAddTask(false);
    triggerToast(`Tugas "${newTask.title}" ditambahkan!`);
    setNewTask({ title: '', projectId: projects[0]?.id || '', priority: 'Sedang', status: 'Harus Dikerjakan', dueDate: '', executorFee: 50000, timeSpent: 15, taskType: 'Domain' });
  };

  const handleAddDomainSubmit = (e) => {
    e.preventDefault();
    const added = { ...newDomain, id: generateId(), clicks: 0 };
    setDomains(prev => [...prev, added]);
    setShowAddDomain(false);
    triggerToast(`Domain "${newDomain.domainName}" dipantau.`);
    setNewDomain({ domainName: '', expiryDate: '', provider: '' });
  };

  const handleClaimTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId && !t.assignedTo ? { ...t, assignedTo: user?.name, status: 'Sedang Berjalan' } : t));
    triggerToast(`Tugas diambil! Segera kerjakan.`);
  };

  const openCompleteTaskDialog = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.assignedTo === user?.name) {
      setClaimingTaskId(taskId);
      setMinutesSpentInput(String(task.timeSpent));
      setClaimRewardValue(task.executorFee);
    } else {
      triggerToast('Hanya yang mengerjakan yang bisa klaim!', 'error');
    }
  };

  const handleCompleteTaskSubmit = (e) => {
    e.preventDefault();
    const mins = Number(minutesSpentInput) || 15;
    setTasks(prev => prev.map(t => t.id === claimingTaskId ? { ...t, status: 'Selesai', timeSpent: mins, executorFee: claimRewardValue, completedAt: new Date().toISOString().slice(0, 10) } : t));
    setTeam(prev => prev.map(m => m.name === user?.name ? { ...m, totalTasksCompleted: (m.totalTasksCompleted || 0) + 1, totalEarnings: (m.totalEarnings || 0) + claimRewardValue } : m));
    triggerToast(`Kerja bagus! ${formatRupiah(claimRewardValue)} masuk akun Anda!`);
    setClaimingTaskId(null);
  };

  const handleProjectProgressChange = (projectId, val) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, progress: Number(val), status: val >= 100 ? 'Selesai' : val > 0 ? 'Sedang Berjalan' : 'Harus Dikerjakan' } : p));
  };

  const stats = useMemo(() => {
    const totalEarnings = clients.reduce((sum, c) => sum + Number(c.paidAmount || 0), 0);
    const totalExecutorFees = tasks.filter(t => t.status === 'Selesai').reduce((sum, t) => sum + Number(t.executorFee || 0), 0);
    return { totalEarnings, totalExecutorFees, profit: totalEarnings - totalExecutorFees, taskAvailableCount: tasks.filter(t => t.status !== 'Selesai').length, taskCompletedCount: tasks.filter(t => t.status === 'Selesai').length, totalClicks: clients.reduce((sum, c) => sum + Number(c.clicks || 0), 0) };
  }, [clients, tasks]);

  if (!user) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
        <div className={`${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} border rounded-2xl p-8 max-w-sm w-full`}>
          <div className="text-center mb-6">
            <div className="inline-flex p-3 bg-indigo-600/10 text-indigo-400 rounded-2xl mb-3"><Coins size={30} /></div>
            <h1 className="text-xl font-black">AgencyOS Pro</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" required placeholder="Nama" value={loginNameInput} onChange={(e) => setLoginNameInput(e.target.value)} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-300'}`} />
            <input type="password" required placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-300'}`} />
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg">Masuk</button>
          </form>
          <p className="text-xs text-center text-slate-500 mt-4">Demo: nasir / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      {showToast && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg ${showToast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'} text-white text-sm`}>
          {showToast.message}
        </div>
      )}

      {deleteConfirmation.show && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 max-w-sm w-full`}>
            <h3 className="text-lg font-bold mb-2">Konfirmasi Hapus</h3>
            <p className="mb-4">Hapus "{deleteConfirmation.name}"?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmation({ show: false, type: '', id: '', name: '' })} className="flex-1 py-2 bg-slate-600 rounded-lg">Batal</button>
              <button onClick={executeDelete} className="flex-1 py-2 bg-red-600 rounded-lg">Hapus</button>
            </div>
          </div>
        </div>
      )}

      <aside className={`fixed left-0 top-0 h-full ${sidebarCollapsed ? 'w-20' : 'w-64'} ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} border-r transition-all duration-300 z-20`}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          {!sidebarCollapsed && <div className="flex items-center gap-2"><Layers size={20} className="text-indigo-400" /><span className="font-bold">AgencyOS</span></div>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1 rounded hover:bg-slate-800"><ChevronDown size={16} /></button>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div><p className="text-xs text-slate-500">{user.name}</p><span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded">{user.role}</span></div>
            <button onClick={handleLogout} className="p-1 hover:text-red-400"><LogOut size={16} /></button>
          </div>
        </div>
        <nav className="px-3 space-y-1">
          {['dashboard', 'clients', 'projects', 'tasks', 'finance', 'domains'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${activeTab === tab ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-slate-800'} ${sidebarCollapsed ? 'justify-center' : ''}`}>
              {tab === 'dashboard' && <LayoutDashboard size={18} />}{tab === 'clients' && <Users size={18} />}{tab === 'projects' && <Sliders size={18} />}{tab === 'tasks' && <KanbanSquare size={18} />}{tab === 'finance' && <DollarSign size={18} />}{tab === 'domains' && <Globe size={18} />}
              {!sidebarCollapsed && <span>{tab === 'dashboard' ? 'Dashboard' : tab === 'clients' ? 'Klien' : tab === 'projects' ? 'Proyek' : tab === 'tasks' ? 'Task Board' : tab === 'finance' ? 'Keuangan' : 'Domain'}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} p-6`}>
        <div className="flex justify-between items-center mb-6">
          <div><h2 className="text-xl font-black">{activeTab === 'dashboard' && 'Dashboard'}{activeTab === 'clients' && 'Klien'}{activeTab === 'projects' && 'Proyek'}{activeTab === 'tasks' && 'Task Board'}{activeTab === 'finance' && 'Keuangan'}{activeTab === 'domains' && 'Domain'}</h2></div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg border border-slate-700">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-800 rounded-xl"><p className="text-xs text-slate-400">Laba Bersih</p><p className="text-2xl font-bold text-emerald-400">{formatRupiah(stats.profit)}</p></div>
            <div className="p-4 bg-slate-800 rounded-xl"><p className="text-xs text-slate-400">Fee Tim</p><p className="text-2xl font-bold text-amber-400">{formatRupiah(stats.totalExecutorFees)}</p></div>
            <div className="p-4 bg-slate-800 rounded-xl"><p className="text-xs text-slate-400">Tugas Tersedia</p><p className="text-2xl font-bold text-indigo-400">{stats.taskAvailableCount}</p></div>
            <div className="p-4 bg-slate-800 rounded-xl"><p className="text-xs text-slate-400">Total Klik</p><p className="text-2xl font-bold text-sky-400">{stats.totalClicks.toLocaleString()}</p></div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div>
            <div className="flex justify-end mb-4"><button onClick={() => setShowAddClient(true)} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-bold flex items-center gap-2"><Plus size={14} />Tambah Klien</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clients.map(c => (
                <div key={c.id} className="p-4 bg-slate-800 rounded-xl">
                  <div className="flex justify-between"><div><h4 className="font-bold">{c.company}</h4><p className="text-sm text-slate-400">{c.name}</p></div><span className="text-xs px-2 py-0.5 bg-emerald-500/20 rounded">{c.status}</span></div>
                  <p className="text-sm mt-2">Deal: {formatRupiah(c.totalDeal)}</p>
                  <button onClick={() => confirmDelete('client', c.id, c.company)} className="mt-2 text-red-400 text-sm">Hapus</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-end mb-4"><button onClick={() => setShowAddProject(true)} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-bold flex items-center gap-2"><Plus size={14} />Tambah Proyek</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(p => {
                const client = clients.find(c => c.id === p.clientId);
                return (<div key={p.id} className="p-4 bg-slate-800 rounded-xl"><h4 className="font-bold">{p.name}</h4><p className="text-sm text-slate-400">Klien: {client?.company}</p><div className="mt-2"><div className="bg-slate-700 rounded-full h-2"><div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${p.progress}%` }}></div></div><p className="text-right text-xs mt-1">{p.progress}%</p><input type="range" min="0" max="100" value={p.progress} onChange={(e) => handleProjectProgressChange(p.id, e.target.value)} className="w-full mt-2" /></div><button onClick={() => confirmDelete('project', p.id, p.name)} className="mt-2 text-red-400 text-sm">Hapus</button></div>);
              })}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <div className="flex justify-end mb-4"><button onClick={() => setShowAddTask(true)} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-bold flex items-center gap-2"><Plus size={14} />Tambah Tugas</button></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Harus Dikerjakan', 'Prioritas Utama', 'Sedang Berjalan', 'Selesai'].map(status => (
                <div key={status} className="p-3 bg-slate-800 rounded-xl"><div className="font-bold mb-2">{status} ({tasks.filter(t => t.status === status).length})</div>
                  {tasks.filter(t => t.status === status).map(t => (<div key={t.id} className="p-2 mb-2 bg-slate-700 rounded-lg"><p className="font-semibold text-sm">{t.title}</p><div className="flex justify-between mt-1 text-xs"><span className="text-emerald-400">{formatRupiah(t.executorFee)}</span><span>{t.timeSpent} menit</span></div>{t.status === 'Selesai' ? <div className="text-xs text-green-400 mt-1">✓ Selesai</div> : t.assignedTo ? (t.assignedTo === user.name ? <button onClick={() => openCompleteTaskDialog(t.id)} className="w-full mt-2 py-1 bg-emerald-600 rounded text-xs">Klaim</button> : <div className="text-xs text-slate-400 mt-1">Dikerjakan {t.assignedTo}</div>) : <button onClick={() => handleClaimTask(t.id)} className="w-full mt-2 py-1 bg-indigo-600 rounded text-xs">Ambil</button>}<button onClick={() => confirmDelete('task', t.id, t.title)} className="text-red-400 text-xs mt-1">Hapus</button></div>))}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="p-4 bg-slate-800 rounded-xl"><h3 className="font-bold mb-3">Laporan Tugas Selesai</h3>{tasks.filter(t => t.status === 'Selesai').map(t => (<div key={t.id} className="flex justify-between py-2 border-b border-slate-700"><div><p>{t.title}</p><p className="text-xs text-slate-400">oleh {t.assignedTo}</p></div><span className="font-bold text-emerald-400">{formatRupiah(t.executorFee)}</span></div>))}</div>
        )}

        {activeTab === 'domains' && (
          <div>
            <div className="flex justify-end mb-4"><button onClick={() => setShowAddDomain(true)} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-bold flex items-center gap-2"><Plus size={14} />Tambah Domain</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domains.map(d => (<div key={d.id} className="p-4 bg-slate-800 rounded-xl"><h4 className="font-bold font-mono">{d.domainName}</h4><p className="text-sm text-slate-400">{d.provider}</p><div className="flex justify-between mt-2"><span>Klik: {d.clicks}</span><span>Expiry: {d.expiryDate}</span></div><button onClick={() => confirmDelete('domain', d.id, d.domainName)} className="mt-2 text-red-400 text-sm">Hapus</button></div>))}
            </div>
          </div>
        )}
      </main>

      {showAddClient && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"><div className="bg-slate-800 rounded-xl p-6 w-full max-w-md"><h3 className="font-bold mb-4">Tambah Klien</h3><form onSubmit={handleAddClientSubmit} className="space-y-3"><input type="text" placeholder="Nama" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} className="w-full p-2 rounded bg-slate-700" required /><input type="text" placeholder="Perusahaan" value={newClient.company} onChange={e => setNewClient({...newClient, company: e.target.value})} className="w-full p-2 rounded bg-slate-700" required /><input type="email" placeholder="Email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="w-full p-2 rounded bg-slate-700" required /><input type="text" placeholder="Telepon" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} className="w-full p-2 rounded bg-slate-700" /><input type="number" placeholder="Total Deal" value={newClient.totalDeal} onChange={e => setNewClient({...newClient, totalDeal: e.target.value})} className="w-full p-2 rounded bg-slate-700" /><input type="number" placeholder="Sudah Dibayar" value={newClient.paidAmount} onChange={e => setNewClient({...newClient, paidAmount: e.target.value})} className="w-full p-2 rounded bg-slate-700" /><button type="submit" className="w-full py-2 bg-indigo-600 rounded-lg font-bold">Simpan</button></form></div></div>)}

      {showAddProject && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"><div className="bg-slate-800 rounded-xl p-6 w-full max-w-md"><h3 className="font-bold mb-4">Tambah Proyek</h3><form onSubmit={handleAddProjectSubmit} className="space-y-3"><input type="text" placeholder="Nama Proyek" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} className="w-full p-2 rounded bg-slate-700" required /><select value={newProject.clientId} onChange={e => setNewProject({...newProject, clientId: e.target.value})} className="w-full p-2 rounded bg-slate-700"><option value="">Pilih Klien</option>{clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}</select><input type="month" value={newProject.month} onChange={e => setNewProject({...newProject, month: e.target.value})} className="w-full p-2 rounded bg-slate-700" /><input type="number" placeholder="Nilai Proyek" value={newProject.value} onChange={e => setNewProject({...newProject, value: e.target.value})} className="w-full p-2 rounded bg-slate-700" /><button type="submit" className="w-full py-2 bg-indigo-600 rounded-lg font-bold">Simpan</button></form></div></div>)}

      {showAddTask && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"><div className="bg-slate-800 rounded-xl p-6 w-full max-w-md"><h3 className="font-bold mb-4">Tambah Tugas</h3><form onSubmit={handleAddTaskSubmit} className="space-y-3"><input type="text" placeholder="Judul Tugas" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="w-full p-2 rounded bg-slate-700" required /><select value={newTask.projectId} onChange={e => setNewTask({...newTask, projectId: e.target.value})} className="w-full p-2 rounded bg-slate-700"><option value="">Pilih Proyek</option>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><input type="number" placeholder="Fee (Rp)" value={newTask.executorFee} onChange={e => setNewTask({...newTask, executorFee: e.target.value})} className="w-full p-2 rounded bg-slate-700" /><input type="number" placeholder="Estimasi Menit" value={newTask.timeSpent} onChange={e => setNewTask({...newTask, timeSpent: e.target.value})} className="w-full p-2 rounded bg-slate-700" /><input type="date" placeholder="Due Date" value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})} className="w-full p-2 rounded bg-slate-700" /><button type="submit" className="w-full py-2 bg-indigo-600 rounded-lg font-bold">Simpan</button></form></div></div>)}

      {showAddDomain && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"><div className="bg-slate-800 rounded-xl p-6 w-full max-w-md"><h3 className="font-bold mb-4">Tambah Domain</h3><form onSubmit={handleAddDomainSubmit} className="space-y-3"><input type="text" placeholder="Domain Name" value={newDomain.domainName} onChange={e => setNewDomain({...newDomain, domainName: e.target.value})} className="w-full p-2 rounded bg-slate-700" required /><input type="date" placeholder="Expiry Date" value={newDomain.expiryDate} onChange={e => setNewDomain({...newDomain, expiryDate: e.target.value})} className="w-full p-2 rounded bg-slate-700" required /><input type="text" placeholder="Provider" value={newDomain.provider} onChange={e => setNewDomain({...newDomain, provider: e.target.value})} className="w-full p-2 rounded bg-slate-700" /><button type="submit" className="w-full py-2 bg-indigo-600 rounded-lg font-bold">Simpan</button></form></div></div>)}

      {claimingTaskId && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"><div className="bg-slate-800 rounded-xl p-6 w-full max-w-sm"><h3 className="font-bold mb-2">Klaim Uang</h3><div className="p-3 bg-emerald-500/20 rounded-lg text-center mb-4"><p className="text-xs">Komisi</p><p className="text-xl font-bold">{formatRupiah(claimRewardValue)}</p></div><form onSubmit={handleCompleteTaskSubmit}><input type="number" required min="1" value={minutesSpentInput} onChange={e => {setMinutesSpentInput(e.target.value); const mins = Number(e.target.value); const task = tasks.find(t => t.id === claimingTaskId); if(task) setClaimRewardValue(Math.round((mins / task.timeSpent) * task.executorFee));}} className="w-full p-2 rounded bg-slate-700 mb-4" placeholder="Durasi (menit)" /><button type="submit" className="w-full py-2 bg-emerald-600 rounded-lg font-bold">Klaim & Selesai</button></form></div></div>)}
    </div>
  );
}