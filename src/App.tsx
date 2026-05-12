import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Settings, LogOut, Search, Plus, ChevronLeft, ChevronRight, Bell, Sparkles, X, Send, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Minus, Upload, FileText, Link2, Wifi, WifiOff, Shield, Moon, Target, Activity, Eye, EyeOff, LogIn, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { useStore } from './store';
import { Integration } from './types';

function HealthGauge({ score, size = 120 }: { score: number; size?: number }) {
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width={size} height={size}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="75%" outerRadius="100%" data={[{ name: 's', value: score, fill: color }]} startAngle={90} endAngle={-270}>
          <RadialBar dataKey="value" cornerRadius={10} background={{ fill: '#f1f3f8' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>{score}</span>
        <span className="text-[10px] text-surface-400 font-medium">HEALTH</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s: Record<string, string> = { healthy: 'bg-success-100 text-green-700', warning: 'bg-warning-100 text-amber-700', at_risk: 'bg-danger-100 text-red-700' };
  const l: Record<string, string> = { healthy: 'Healthy', warning: 'Warning', at_risk: 'At Risk' };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s[status] || ''}`}>{l[status] || status}</span>;
}

function AuthScreen() {
  const [email, setEmail] = useState('chiamaka@pulseiq.io');
  const [password, setPassword] = useState('demo1234');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useStore();
  const go = (fn: () => void) => { setLoading(true); setTimeout(() => { fn(); setLoading(false); }, 800); };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-surface-50 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-lg shadow-brand-200 mb-4"><Activity className="w-7 h-7 text-white" /></div>
          <h1 className="text-2xl font-bold text-surface-900">Welcome to PulseIQ</h1>
          <p className="text-surface-500 mt-1">AI-Powered Customer Success Platform</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl shadow-surface-200/50 border border-surface-200/50 p-8">
          <form onSubmit={(e) => { e.preventDefault(); go(() => signIn(email, password)); }} className="space-y-4">
            <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm" /></div>
            <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Password</label><div className="relative"><input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm pr-10" /><button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl font-medium text-sm hover:from-brand-700 hover:to-brand-800 shadow-lg shadow-brand-200 disabled:opacity-50 flex items-center justify-center gap-2">{loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn className="w-4 h-4" /> Sign In</>}</button>
          </form>
          <div className="mt-6 flex items-center gap-3"><div className="flex-1 h-px bg-surface-200" /><span className="text-xs text-surface-400">or continue with</span><div className="flex-1 h-px bg-surface-200" /></div>
          <button onClick={() => go(signInWithGoogle)} disabled={loading} className="mt-4 w-full py-2.5 border border-surface-200 rounded-xl text-sm font-medium text-surface-700 hover:bg-surface-50 flex items-center justify-center gap-2"><svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Google</button>
        </div>
        <p className="text-center text-xs text-surface-400 mt-6">Demo credentials pre-filled. Click Sign In.</p>
      </motion.div>
    </div>
  );
}

function Sidebar() {
  const { currentPage, setCurrentPage, sidebarCollapsed, toggleSidebar, accounts, signOut, user, setSelectedAccountId } = useStore();
  const nav = [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }, { id: 'accounts', label: 'Accounts', icon: Users, badge: accounts.length }, { id: 'integrations', label: 'Integrations', icon: Link2 }, { id: 'settings', label: 'Settings', icon: Settings }];
  return (
    <motion.aside animate={{ width: sidebarCollapsed ? 72 : 260 }} transition={{ duration: 0.2 }} className="h-screen bg-white border-r border-surface-200 flex flex-col fixed left-0 top-0 z-30">
      <div className="p-4 flex items-center gap-3 border-b border-surface-100">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-200"><Activity className="w-5 h-5 text-white" /></div>
        {!sidebarCollapsed && <div><h1 className="font-bold text-surface-900 text-lg leading-tight">PulseIQ</h1><p className="text-[10px] text-surface-400 font-medium">Customer Success AI</p></div>}
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => { const Icon = item.icon; const active = currentPage === item.id; return (
          <button key={item.id} onClick={() => { setCurrentPage(item.id); setSelectedAccountId(null); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-brand-50 text-brand-700' : 'text-surface-500 hover:bg-surface-50 hover:text-surface-700'}`}>
            <Icon className="w-5 h-5 flex-shrink-0" />{!sidebarCollapsed && <span className="flex-1 text-left">{item.label}</span>}{!sidebarCollapsed && item.badge && <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-brand-100 text-brand-700' : 'bg-surface-100 text-surface-500'}`}>{item.badge}</span>}
          </button>); })}
      </nav>
      <div className="p-3 border-t border-surface-100 space-y-1">
        {!sidebarCollapsed && user && <div className="px-3 py-2 mb-2"><p className="text-xs font-medium text-surface-700 truncate">{user.name}</p><p className="text-[10px] text-surface-400 truncate">{user.email}</p></div>}
        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-500 hover:bg-red-50 hover:text-red-600 transition-all"><LogOut className="w-5 h-5 flex-shrink-0" />{!sidebarCollapsed && <span>Sign Out</span>}</button>
        <button onClick={toggleSidebar} className="w-full flex items-center justify-center px-3 py-2 rounded-xl text-surface-400 hover:bg-surface-50">{sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}</button>
      </div>
    </motion.aside>
  );
}

function Header() {
  const { searchQuery, setSearchQuery, toggleAiCopilot, user } = useStore();
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-surface-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3 flex-1 max-w-md"><div className="relative flex-1"><Search className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search accounts..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none" /></div></div>
      <div className="flex items-center gap-2">
        <button onClick={toggleAiCopilot} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 text-white text-sm font-medium hover:from-brand-700 hover:to-brand-800 shadow-md shadow-brand-200"><Sparkles className="w-4 h-4" />AI Copilot</button>
        <button className="p-2 rounded-xl hover:bg-surface-50 text-surface-400 relative"><Bell className="w-5 h-5" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" /></button>
        {user && <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold shadow-md">{user.avatar}</div>}
      </div>
    </header>
  );
}

function Dashboard() {
  const accounts = useStore((s) => s.accounts);
  const { setCurrentPage, setSelectedAccountId } = useStore();
  const healthy = accounts.filter((a) => a.status === 'healthy').length;
  const warning = accounts.filter((a) => a.status === 'warning').length;
  const atRisk = accounts.filter((a) => a.status === 'at_risk').length;
  const totalARR = accounts.reduce((s, a) => s + a.arr, 0);
  const avgHealth = Math.round(accounts.reduce((s, a) => s + a.healthScore, 0) / accounts.length);
  const expCount = accounts.filter((a) => a.expansionSignals.length > 0).length;
  const healthDist = [{ name: 'Healthy', value: healthy, fill: '#22c55e' }, { name: 'Warning', value: warning, fill: '#f59e0b' }, { name: 'At Risk', value: atRisk, fill: '#ef4444' }];
  const barData = accounts.map((a) => ({ name: a.name.split(' ')[0], arr: a.arr / 1000, health: a.healthScore }));
  const trend = [{ m: 'Jan', h: 76 }, { m: 'Feb', h: 74 }, { m: 'Mar', h: 78 }, { m: 'Apr', h: 72 }, { m: 'May', h: 75 }, { m: 'Jun', h: avgHealth }];
  const open = (id: string) => { setSelectedAccountId(id); setCurrentPage('account-detail'); };
  const kpis = [
    { label: 'Total ARR', value: `$${(totalARR / 1000).toFixed(0)}K`, icon: Target, color: 'bg-brand-50 text-brand-600', trend: '+12%', up: true },
    { label: 'Avg Health', value: `${avgHealth}`, icon: Activity, color: avgHealth >= 75 ? 'bg-success-100 text-green-600' : 'bg-warning-100 text-amber-600', trend: avgHealth >= 75 ? '+3' : '-2', up: avgHealth >= 75 },
    { label: 'At Risk', value: `${atRisk}`, icon: AlertTriangle, color: atRisk > 0 ? 'bg-danger-100 text-red-600' : 'bg-success-100 text-green-600', trend: atRisk > 0 ? 'Action needed' : 'All clear', up: atRisk === 0 },
    { label: 'Expansion', value: `${expCount}`, icon: TrendingUp, color: 'bg-brand-50 text-brand-600', trend: 'Opportunities', up: true },
  ];
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-surface-900">Dashboard</h2><p className="text-surface-500 text-sm mt-0.5">Portfolio overview</p></div><div className="text-sm text-surface-400">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => { const Icon = k.icon; return (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl p-5 border border-surface-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between"><div><p className="text-xs font-medium text-surface-400 uppercase tracking-wider">{k.label}</p><p className="text-2xl font-bold text-surface-900 mt-1">{k.value}</p></div><div className={`w-10 h-10 rounded-xl ${k.color} flex items-center justify-center`}><Icon className="w-5 h-5" /></div></div>
            <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${k.up ? 'text-green-600' : 'text-red-500'}`}>{k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{k.trend}</div>
          </motion.div>); })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm">
          <h3 className="font-semibold text-surface-900 mb-4">Portfolio Health Trend</h3>
          <ResponsiveContainer width="100%" height={220}><AreaChart data={trend}><defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4c6ef5" stopOpacity={0.15} /><stop offset="95%" stopColor="#4c6ef5" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f1f3f8" /><XAxis dataKey="m" tick={{ fontSize: 12, fill: '#9ca3b4' }} axisLine={false} tickLine={false} /><YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: '#9ca3b4' }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4e8f0' }} /><Area type="monotone" dataKey="h" stroke="#4c6ef5" fill="url(#hg)" strokeWidth={2.5} /></AreaChart></ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm">
          <h3 className="font-semibold text-surface-900 mb-4">Health Distribution</h3>
          <ResponsiveContainer width="100%" height={180}><PieChart><Pie data={healthDist} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">{healthDist.map((e, i) => <Cell key={i} fill={e.fill} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">{healthDist.map((d) => <div key={d.name} className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} /><span className="text-surface-500">{d.name} ({d.value})</span></div>)}</div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm">
        <h3 className="font-semibold text-surface-900 mb-4">ARR & Health by Account</h3>
        <ResponsiveContainer width="100%" height={220}><BarChart data={barData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f3f8" /><XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3b4' }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 12, fill: '#9ca3b4' }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4e8f0' }} /><Bar dataKey="arr" fill="#4c6ef5" radius={[6, 6, 0, 0]} name="ARR ($K)" /><Bar dataKey="health" fill="#22c55e" radius={[6, 6, 0, 0]} name="Health" /></BarChart></ResponsiveContainer>
      </div>
      <div><h3 className="font-semibold text-surface-900 mb-4">Account Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{accounts.map((a, i) => (
          <motion.button key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => open(a.id)} className="bg-white rounded-2xl p-5 border border-surface-200/50 shadow-sm hover:shadow-md transition-all text-left group">
            <div className="flex items-start justify-between mb-4"><div className="flex items-center gap-3"><div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm ${a.status === 'healthy' ? 'bg-gradient-to-br from-green-500 to-green-600' : a.status === 'warning' ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-gradient-to-br from-red-500 to-red-600'}`}>{a.logo}</div><div><h4 className="font-semibold text-surface-900 group-hover:text-brand-600 transition-colors">{a.name}</h4><p className="text-xs text-surface-400">{a.industry}</p></div></div><StatusBadge status={a.status} /></div>
            <div className="grid grid-cols-3 gap-3 text-center"><div><p className="text-lg font-bold text-surface-900">{a.healthScore}</p><p className="text-[10px] text-surface-400 font-medium">Health</p></div><div><p className="text-lg font-bold text-surface-900">${(a.arr / 1000).toFixed(0)}K</p><p className="text-[10px] text-surface-400 font-medium">ARR</p></div><div><p className="text-lg font-bold text-surface-900">{a.openTickets}</p><p className="text-[10px] text-surface-400 font-medium">Tickets</p></div></div>
          </motion.button>))}</div>
      </div>
    </div>
  );
}

function AccountsList() {
  const { accounts, healthFilter, setHealthFilter, searchQuery, setCurrentPage, setSelectedAccountId, setAddAccountModalOpen } = useStore();
  const filtered = accounts.filter((a) => (healthFilter === 'all' || a.status === healthFilter) && (!searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase())));
  const open = (id: string) => { setSelectedAccountId(id); setCurrentPage('account-detail'); };
  const filters = [{ key: 'all', label: 'All' }, { key: 'healthy', label: 'Healthy' }, { key: 'warning', label: 'Warning' }, { key: 'at_risk', label: 'At Risk' }];
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-surface-900">Accounts</h2><p className="text-surface-500 text-sm mt-0.5">{filtered.length} accounts</p></div><button onClick={() => setAddAccountModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl text-sm font-medium shadow-md shadow-brand-200"><Plus className="w-4 h-4" />Add Account</button></div>
      <div className="flex gap-2">{filters.map((f) => <button key={f.key} onClick={() => setHealthFilter(f.key)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${healthFilter === f.key ? 'bg-brand-600 text-white shadow-sm' : 'bg-white text-surface-500 border border-surface-200 hover:bg-surface-50'}`}>{f.label}</button>)}</div>
      <div className="bg-white rounded-2xl border border-surface-200/50 shadow-sm overflow-x-auto">
        <table className="w-full"><thead><tr className="border-b border-surface-100">{['Account', 'Health', 'ARR', 'Renewal', 'Status', 'Tickets', 'CSM'].map((h) => <th key={h} className="text-left text-xs font-medium text-surface-400 uppercase tracking-wider px-6 py-3">{h}</th>)}</tr></thead>
          <tbody>{filtered.map((a) => (
            <tr key={a.id} onClick={() => open(a.id)} className="border-b border-surface-50 hover:bg-surface-50 cursor-pointer transition-colors">
              <td className="px-6 py-4"><div className="flex items-center gap-3"><div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs ${a.status === 'healthy' ? 'bg-gradient-to-br from-green-500 to-green-600' : a.status === 'warning' ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-gradient-to-br from-red-500 to-red-600'}`}>{a.logo}</div><div><p className="font-medium text-surface-900 text-sm">{a.name}</p><p className="text-xs text-surface-400">{a.industry}</p></div></div></td>
              <td className="px-6 py-4"><div className="flex items-center gap-2"><span className={`font-bold text-sm ${a.healthScore >= 80 ? 'text-green-600' : a.healthScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{a.healthScore}</span>{a.healthTrend === 'up' ? <TrendingUp className="w-3 h-3 text-green-500" /> : a.healthTrend === 'down' ? <TrendingDown className="w-3 h-3 text-red-500" /> : <Minus className="w-3 h-3 text-surface-400" />}</div></td>
              <td className="px-6 py-4 text-sm font-medium text-surface-700">${(a.arr / 1000).toFixed(0)}K</td>
              <td className="px-6 py-4 text-sm text-surface-500">{new Date(a.renewalDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
              <td className="px-6 py-4"><StatusBadge status={a.status} /></td>
              <td className="px-6 py-4"><span className={`text-sm font-medium ${a.openTickets > 5 ? 'text-red-600' : a.openTickets > 2 ? 'text-amber-600' : 'text-surface-600'}`}>{a.openTickets}</span></td>
              <td className="px-6 py-4 text-sm text-surface-500">{a.csm}</td>
            </tr>))}</tbody></table>
      </div>
    </div>
  );
}

function AccountDetail() {
  const { accounts, selectedAccountId, setCurrentPage, setSelectedAccountId, updateAccount } = useStore();
  const account = accounts.find((a) => a.id === selectedAccountId);
  const [tab, setTab] = useState('overview');
  if (!account) return null;
  const usage = account.productUsage.map((v, i) => ({ m: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i], v }));
  const scores = [{ l: 'Engagement', v: account.engagementScore }, { l: 'Login Freq', v: account.loginFrequency }, { l: 'Feature Adopt', v: account.featureAdoption }, { l: 'Email Resp', v: account.emailResponsiveness }, { l: 'QBR Attend', v: account.qbrAttendance }, { l: 'Support', v: 100 - account.supportTicketVolume }];
  const gc = account.status === 'healthy' ? '#22c55e' : account.status === 'warning' ? '#f59e0b' : '#ef4444';
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <button onClick={() => { setCurrentPage('accounts'); setSelectedAccountId(null); }} className="flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700"><ChevronLeft className="w-4 h-4" />Back</button>
      <div className="flex items-start justify-between"><div className="flex items-center gap-4"><div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg ${account.status === 'healthy' ? 'bg-gradient-to-br from-green-500 to-green-600' : account.status === 'warning' ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-gradient-to-br from-red-500 to-red-600'} shadow-lg`}>{account.logo}</div><div><h2 className="text-2xl font-bold text-surface-900">{account.name}</h2><p className="text-surface-500 text-sm">{account.industry} • CSM: {account.csm}</p></div></div><StatusBadge status={account.status} /></div>
      <div className="flex gap-1 bg-surface-100 p-1 rounded-xl w-fit">{['overview','stakeholders','timeline','recommendations'].map((t) => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}>{t}</button>)}</div>
      {tab === 'overview' && <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{[{ l: 'ARR', v: `$${(account.arr/1000).toFixed(0)}K` },{ l: 'Renewal', v: new Date(account.renewalDate).toLocaleDateString('en-US',{month:'short',year:'numeric'}) },{ l: 'Last Login', v: new Date(account.lastLogin).toLocaleDateString('en-US',{month:'short',day:'numeric'}) },{ l: 'Tickets', v: `${account.openTickets}` },{ l: 'Onboarding', v: account.onboardingStatus==='completed'?'Done':'In Progress' },{ l: 'AI Score', v: `${account.aiConfidenceScore}%` }].map((k,i) => <div key={i} className="bg-white rounded-xl p-4 border border-surface-200/50 shadow-sm"><p className="text-[10px] font-medium text-surface-400 uppercase tracking-wider">{k.l}</p><p className="text-lg font-bold text-surface-900 mt-1">{k.v}</p></div>)}</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm flex flex-col items-center"><h3 className="font-semibold text-surface-900 mb-4">Health Score</h3><HealthGauge score={account.healthScore} size={140} /><div className="flex items-center gap-2 mt-4">{account.healthTrend==='up'?<TrendingUp className="w-4 h-4 text-green-500"/>:account.healthTrend==='down'?<TrendingDown className="w-4 h-4 text-red-500"/>:<Minus className="w-4 h-4 text-surface-400"/>}<span className="text-sm text-surface-500">{account.healthTrend==='up'?'Improving':account.healthTrend==='down'?'Declining':'Stable'}</span></div>{account.riskFlags.length>0 && <div className="mt-4 w-full space-y-2"><p className="text-xs font-medium text-surface-400 uppercase">Risk Flags</p>{account.riskFlags.map((f,i) => <div key={i} className="flex items-start gap-2 text-xs text-red-600 bg-red-50 rounded-lg p-2"><AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"/>{f}</div>)}</div>}</div>
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm"><h3 className="font-semibold text-surface-900 mb-4">Product Usage</h3><ResponsiveContainer width="100%" height={220}><AreaChart data={usage}><defs><linearGradient id="ug" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={gc} stopOpacity={0.15}/><stop offset="95%" stopColor={gc} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f1f3f8"/><XAxis dataKey="m" tick={{fontSize:11,fill:'#9ca3b4'}} axisLine={false} tickLine={false}/><YAxis domain={[0,100]} tick={{fontSize:11,fill:'#9ca3b4'}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:12,border:'1px solid #e4e8f0'}}/><Area type="monotone" dataKey="v" stroke={gc} fill="url(#ug)" strokeWidth={2.5}/></AreaChart></ResponsiveContainer></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm"><h3 className="font-semibold text-surface-900 mb-4">Score Breakdown</h3><div className="space-y-3">{scores.map((s) => <div key={s.l}><div className="flex justify-between text-sm mb-1"><span className="text-surface-600">{s.l}</span><span className="font-medium text-surface-900">{s.v}%</span></div><div className="h-2 bg-surface-100 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:`${s.v}%`}} transition={{duration:0.8}} className={`h-full rounded-full ${s.v>=80?'bg-green-500':s.v>=60?'bg-amber-500':'bg-red-500'}`}/></div></div>)}</div></div>
          <div className="space-y-6">
            {account.expansionSignals.length>0 && <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm"><h3 className="font-semibold text-surface-900 mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-brand-600"/>Expansion Signals</h3><div className="space-y-2">{account.expansionSignals.map((s,i) => <div key={i} className="flex items-start gap-2 text-sm text-surface-600 bg-brand-50 rounded-lg p-2.5"><Sparkles className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5"/>{s}</div>)}</div></div>}
            <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm"><h3 className="font-semibold text-surface-900 mb-3">Recent Activity</h3><div className="space-y-3">{account.recentActivity.map((a,i) => <div key={i} className="flex items-start gap-3"><div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.type==='ticket'?'bg-red-400':a.type==='meeting'?'bg-brand-400':a.type==='login'?'bg-green-400':'bg-surface-300'}`}/><div><p className="text-sm text-surface-700">{a.text}</p><p className="text-xs text-surface-400">{a.date}</p></div></div>)}</div></div>
          </div>
        </div>
      </div>}
      {tab === 'stakeholders' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{account.stakeholders.map((sh) => {
        const tc: Record<string,string> = {champion:'bg-green-100 text-green-700',decision_maker:'bg-brand-100 text-brand-700',blocker:'bg-red-100 text-red-700',inactive:'bg-surface-100 text-surface-500'};
        const tl: Record<string,string> = {champion:'Champion',decision_maker:'Decision Maker',blocker:'Blocker',inactive:'Inactive'};
        return <div key={sh.id} className="bg-white rounded-2xl p-5 border border-surface-200/50 shadow-sm"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-sm font-bold">{sh.name.split(' ').map(n=>n[0]).join('')}</div><div><p className="font-semibold text-surface-900 text-sm">{sh.name}</p><p className="text-xs text-surface-400">{sh.role}</p></div></div><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tc[sh.type]}`}>{tl[sh.type]}</span></div><div className="grid grid-cols-3 gap-2 text-center"><div><p className="text-xs text-surface-400">Influence</p><p className="text-sm font-medium capitalize text-surface-700">{sh.influence}</p></div><div><p className="text-xs text-surface-400">Sentiment</p><p className="text-sm">{sh.sentiment==='positive'?'😊':sh.sentiment==='negative'?'😟':'😐'}</p></div><div><p className="text-xs text-surface-400">Engagement</p><p className="text-sm font-medium capitalize text-surface-700">{sh.engagementFrequency}</p></div></div><div className="mt-3 pt-3 border-t border-surface-100 text-xs text-surface-400">Last: {new Date(sh.lastInteraction).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div></div>;
      })}</div>}
      {tab === 'timeline' && <div className="space-y-4">{account.timeline.map((ev) => {
        const sc: Record<string,string> = {info:'border-l-blue-400',warning:'border-l-amber-400',critical:'border-l-red-400',success:'border-l-green-400'};
        const sb: Record<string,string> = {info:'bg-blue-100 text-blue-700',warning:'bg-amber-100 text-amber-700',critical:'bg-red-100 text-red-700',success:'bg-green-100 text-green-700'};
        return <div key={ev.id} className={`bg-white rounded-2xl p-5 border border-surface-200/50 shadow-sm border-l-4 ${sc[ev.severity]}`}><div className="flex items-start justify-between mb-2"><div><h4 className="font-semibold text-surface-900 text-sm">{ev.title}</h4><p className="text-xs text-surface-400 mt-0.5">{ev.date}</p></div><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${sb[ev.severity]}`}>{ev.severity}</span></div><p className="text-sm text-surface-600 mb-3">{ev.description}</p><div className="bg-surface-50 rounded-xl p-3 space-y-2"><div className="flex items-start gap-2"><Sparkles className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5"/><p className="text-xs text-surface-600"><span className="font-medium text-brand-600">AI:</span> {ev.aiInsight}</p></div><div className="flex items-start gap-2"><Target className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5"/><p className="text-xs text-surface-600"><span className="font-medium text-green-600">Action:</span> {ev.suggestedResponse}</p></div></div></div>;
      })}</div>}
      {tab === 'recommendations' && <div className="space-y-4">{account.recommendations.map((rec) => {
        const pc: Record<string,string> = {high:'bg-red-100 text-red-700 border-red-200',medium:'bg-amber-100 text-amber-700 border-amber-200',low:'bg-green-100 text-green-700 border-green-200'};
        const stc: Record<string,string> = {pending:'bg-surface-100 text-surface-600',in_progress:'bg-brand-100 text-brand-700',completed:'bg-green-100 text-green-700'};
        const toggle = () => { const ns = rec.status==='pending'?'in_progress':rec.status==='in_progress'?'completed':'pending'; updateAccount(account.id, { recommendations: account.recommendations.map(r => r.id===rec.id?{...r,status:ns}:r) }); };
        return <div key={rec.id} className="bg-white rounded-2xl p-5 border border-surface-200/50 shadow-sm"><div className="flex items-start justify-between mb-3"><div className="flex-1"><div className="flex items-center gap-2 mb-1"><h4 className="font-semibold text-surface-900 text-sm">{rec.title}</h4><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize border ${pc[rec.priority]}`}>{rec.priority}</span></div><p className="text-sm text-surface-600">{rec.description}</p></div><button onClick={toggle} className={`px-2.5 py-1 rounded-lg text-[10px] font-medium capitalize ${stc[rec.status]} hover:opacity-80`}>{rec.status.replace('_',' ')}</button></div><div className="grid grid-cols-3 gap-3 text-xs"><div><p className="text-surface-400">Reasoning</p><p className="text-surface-600 mt-0.5">{rec.reasoning}</p></div><div><p className="text-surface-400">Timeline</p><p className="text-surface-600 mt-0.5">{rec.timeline}</p></div><div><p className="text-surface-400">Owner</p><p className="text-surface-600 mt-0.5">{rec.owner}</p></div></div></div>;
      })}</div>}
    </div>
  );
}

function SettingsPage() {
  const { settings, updateSettings, user } = useStore();
  const [saved, setSaved] = useState(false);
  const [sec, setSec] = useState('profile');
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const secs = [{ id: 'profile', l: 'Profile', i: Users }, { id: 'notifications', l: 'Notifications', i: Bell }, { id: 'ai', l: 'AI Settings', i: Sparkles }, { id: 'data', l: 'Data & Privacy', i: Shield }, { id: 'appearance', l: 'Appearance', i: Moon }];
  const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors ${on ? 'bg-brand-600' : 'bg-surface-200'}`}><div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${on ? 'translate-x-5.5' : 'translate-x-0.5'}`}/></button>;
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-surface-900">Settings</h2><p className="text-surface-500 text-sm mt-0.5">Manage your account and preferences</p></div>{saved && <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium"><CheckCircle className="w-4 h-4"/>Saved!</motion.div>}</div>
      <div className="flex gap-6"><div className="w-56 flex-shrink-0"><nav className="space-y-1">{secs.map((s) => { const Icon = s.i; return <button key={s.id} onClick={() => setSec(s.id)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${sec===s.id?'bg-brand-50 text-brand-700':'text-surface-500 hover:bg-surface-50'}`}><Icon className="w-4 h-4"/>{s.l}</button>; })}</nav></div>
        <div className="flex-1">
          {sec === 'profile' && <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm space-y-6"><h3 className="font-semibold text-surface-900">Profile Information</h3><div className="flex items-center gap-4"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xl font-bold shadow-lg">{user?.avatar}</div><div><p className="font-semibold text-surface-900">{user?.name}</p><p className="text-sm text-surface-500">{user?.role}</p><p className="text-xs text-surface-400">{user?.organization}</p></div></div><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-surface-700 mb-1.5">Full Name</label><input type="text" defaultValue={user?.name} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm"/></div><div><label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label><input type="email" defaultValue={user?.email} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm"/></div><div><label className="block text-sm font-medium text-surface-700 mb-1.5">Role</label><input type="text" defaultValue={user?.role} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm"/></div><div><label className="block text-sm font-medium text-surface-700 mb-1.5">Timezone</label><select value={settings.timezone} onChange={(e) => updateSettings({timezone:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 outline-none text-sm"><option>America/New_York</option><option>America/Chicago</option><option>America/Los_Angeles</option><option>Europe/London</option><option>Africa/Lagos</option></select></div></div><button onClick={save} className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 shadow-md shadow-brand-200">Save Changes</button></div>}
          {sec === 'notifications' && <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm space-y-6"><h3 className="font-semibold text-surface-900">Notification Preferences</h3>{[{k:'emailNotifications' as const,l:'Email Notifications',d:'Receive account updates via email'},{k:'pushNotifications' as const,l:'Push Notifications',d:'Real-time browser notifications'},{k:'weeklyDigest' as const,l:'Weekly Digest',d:'Weekly summary of health changes'}].map((item) => <div key={item.k} className="flex items-center justify-between py-3 border-b border-surface-100 last:border-0"><div><p className="font-medium text-surface-900 text-sm">{item.l}</p><p className="text-xs text-surface-400 mt-0.5">{item.d}</p></div><Toggle on={settings[item.k]} onChange={() => { updateSettings({[item.k]:!settings[item.k]}); save(); }}/></div>)}</div>}
          {sec === 'ai' && <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm space-y-6"><h3 className="font-semibold text-surface-900">AI Configuration</h3>{[{k:'aiAutoBriefings' as const,l:'Auto-generate Briefings',d:'Create briefings from imported data'},{k:'aiRiskAlerts' as const,l:'AI Risk Alerts',d:'Notify on churn risk patterns'},{k:'aiExpansionAlerts' as const,l:'AI Expansion Alerts',d:'Notify on expansion opportunities'}].map((item) => <div key={item.k} className="flex items-center justify-between py-3 border-b border-surface-100 last:border-0"><div><p className="font-medium text-surface-900 text-sm">{item.l}</p><p className="text-xs text-surface-400 mt-0.5">{item.d}</p></div><Toggle on={settings[item.k]} onChange={() => { updateSettings({[item.k]:!settings[item.k]}); save(); }}/></div>)}<div className="pt-4 border-t border-surface-100"><label className="block text-sm font-medium text-surface-700 mb-1.5">Default Health Model</label><select value={settings.defaultHealthModel} onChange={(e) => { updateSettings({defaultHealthModel:e.target.value as any}); save(); }} className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-surface-200 outline-none text-sm"><option value="standard">Standard</option><option value="aggressive">Aggressive</option><option value="conservative">Conservative</option></select></div></div>}
          {sec === 'data' && <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm space-y-6"><h3 className="font-semibold text-surface-900">Data & Privacy</h3><div><label className="block text-sm font-medium text-surface-700 mb-1.5">Data Retention</label><select value={settings.dataRetention} onChange={(e) => { updateSettings({dataRetention:e.target.value as any}); save(); }} className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-surface-200 outline-none text-sm"><option value="30">30 days</option><option value="90">90 days</option><option value="180">180 days</option><option value="365">1 year</option></select></div><div className="bg-surface-50 rounded-xl p-4"><p className="text-sm font-medium text-surface-700 mb-2">Data Export</p><p className="text-xs text-surface-400 mb-3">Download all data as JSON.</p><button className="px-4 py-2 border border-surface-200 rounded-xl text-sm font-medium text-surface-700 hover:bg-white">Export Data</button></div><div className="bg-red-50 rounded-xl p-4"><p className="text-sm font-medium text-red-700 mb-2">Danger Zone</p><p className="text-xs text-red-500 mb-3">Permanently delete all data.</p><button className="px-4 py-2 border border-red-200 rounded-xl text-sm font-medium text-red-600 hover:bg-red-100">Delete All Data</button></div></div>}
          {sec === 'appearance' && <div className="bg-white rounded-2xl p-6 border border-surface-200/50 shadow-sm space-y-6"><h3 className="font-semibold text-surface-900">Appearance</h3><div className="flex items-center justify-between py-3"><div><p className="font-medium text-surface-900 text-sm">Dark Mode</p><p className="text-xs text-surface-400 mt-0.5">Coming soon</p></div><Toggle on={settings.darkMode} onChange={() => { updateSettings({darkMode:!settings.darkMode}); save(); }}/></div><div><label className="block text-sm font-medium text-surface-700 mb-1.5">Language</label><select value={settings.language} onChange={(e) => { updateSettings({language:e.target.value}); save(); }} className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-surface-200 outline-none text-sm"><option>English</option><option>Spanish</option><option>French</option></select></div></div>}
        </div>
      </div>
    </div>
  );
}

function IntegrationsPage() {
  const { integrations, connectIntegration, disconnectIntegration } = useStore();
  const [sel, setSel] = useState<Integration | null>(null);
  const [cfg, setCfg] = useState<Record<string,string>>({});
  const [connecting, setConnecting] = useState(false);
  const [done, setDone] = useState(false);
  const [cat, setCat] = useState('all');
  const cats = [{k:'all',l:'All'},{k:'crm',l:'CRM'},{k:'communication',l:'Communication'},{k:'support',l:'Support'},{k:'analytics',l:'Analytics'},{k:'productivity',l:'Productivity'}];
  const filtered = cat === 'all' ? integrations : integrations.filter(i => i.category === cat);
  const connect = () => { if(!sel) return; setConnecting(true); setTimeout(() => { connectIntegration(sel.id, cfg); setConnecting(false); setDone(true); setTimeout(() => { setDone(false); setSel(null); setCfg({}); }, 1500); }, 1500); };
  const icons: Record<string,string> = {salesforce:'bg-blue-100 text-blue-600',hubspot:'bg-orange-100 text-orange-600',slack:'bg-purple-100 text-purple-600',zendesk:'bg-green-100 text-green-600',calendar:'bg-red-100 text-red-600',mixpanel:'bg-indigo-100 text-indigo-600'};
  const labels: Record<string,string> = {salesforce:'SF',hubspot:'HS',slack:'SL',zendesk:'ZD',calendar:'GC',mixpanel:'MP'};
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div><h2 className="text-2xl font-bold text-surface-900">Integrations</h2><p className="text-surface-500 text-sm mt-0.5">Connect your tools to sync data</p></div>
      <div className="flex gap-2">{cats.map((c) => <button key={c.k} onClick={() => setCat(c.k)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${cat===c.k?'bg-brand-600 text-white shadow-sm':'bg-white text-surface-500 border border-surface-200 hover:bg-surface-50'}`}>{c.l}</button>)}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.map((int) => (
        <motion.div key={int.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl p-5 border border-surface-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${icons[int.icon]||'bg-surface-100 text-surface-600'}`}>{labels[int.icon]||'??'}</div><div><h4 className="font-semibold text-surface-900 text-sm">{int.name}</h4><span className="text-[10px] text-surface-400 capitalize">{int.category}</span></div></div>{int.status==='connected'?<span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700"><Wifi className="w-3 h-3"/>Connected</span>:<span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface-100 text-surface-500"><WifiOff className="w-3 h-3"/>Off</span>}</div>
          <p className="text-xs text-surface-500 mb-4">{int.description}</p>
          {int.status==='connected'&&int.lastSync && <p className="text-[10px] text-surface-400 mb-3">Synced: {new Date(int.lastSync).toLocaleString()}</p>}
          <div className="flex gap-2">{int.status==='connected'?<><button onClick={() => connectIntegration(int.id,{})} className="flex-1 px-3 py-2 border border-surface-200 rounded-xl text-xs font-medium text-surface-600 hover:bg-surface-50 flex items-center justify-center gap-1"><RefreshCw className="w-3 h-3"/>Sync</button><button onClick={() => disconnectIntegration(int.id)} className="px-3 py-2 border border-red-200 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50">Disconnect</button></>:<button onClick={() => { setSel(int); setCfg({}); }} className="w-full px-3 py-2 bg-brand-600 text-white rounded-xl text-xs font-medium hover:bg-brand-700 flex items-center justify-center gap-1"><Link2 className="w-3 h-3"/>Connect</button>}</div>
        </motion.div>))}</div>
      <AnimatePresence>{sel && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => !connecting&&!done&&setSel(null)}>
          <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            {done ? <div className="text-center py-8"><motion.div initial={{scale:0}} animate={{scale:1}} className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-600"/></motion.div><h3 className="text-lg font-bold text-surface-900">Connected!</h3><p className="text-sm text-surface-500 mt-1">{sel.name} is now connected.</p></div>
            : connecting ? <div className="text-center py-8"><div className="w-12 h-12 border-3 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4"/><h3 className="text-lg font-bold text-surface-900">Connecting...</h3><p className="text-sm text-surface-500 mt-1">Establishing connection to {sel.name}</p></div>
            : <><div className="flex items-center justify-between mb-6"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${icons[sel.icon]||'bg-surface-100 text-surface-600'}`}>{labels[sel.icon]||'??'}</div><div><h3 className="font-bold text-surface-900">Connect {sel.name}</h3><p className="text-xs text-surface-400">{sel.description}</p></div></div><button onClick={() => setSel(null)} className="p-1 hover:bg-surface-100 rounded-lg"><X className="w-5 h-5 text-surface-400"/></button></div><div className="space-y-4">{sel.configFields?.map((f) => <div key={f.key}><label className="block text-sm font-medium text-surface-700 mb-1.5">{f.label}</label><input type={f.type} defaultValue={f.value} onChange={(e) => setCfg(p => ({...p,[f.key]:e.target.value}))} placeholder={`Enter ${f.label.toLowerCase()}`} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm"/></div>)}</div><button onClick={connect} className="w-full mt-6 py-2.5 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl font-medium text-sm shadow-lg shadow-brand-200 flex items-center justify-center gap-2"><Link2 className="w-4 h-4"/>Connect</button></>}
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}

function AICopilot() {
  const { aiCopilotOpen, toggleAiCopilot, aiMessages, addAiMessage } = useStore();
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [aiMessages]);
  const gen = (q: string): string => {
    const accts = useStore.getState().accounts;
    const l = q.toLowerCase();
    const avg = Math.round(accts.reduce((s,a) => s+a.healthScore, 0) / accts.length);
    if (l.includes('risk') || l.includes('at risk')) { const ar = accts.filter(a => a.status==='at_risk'); return `**${ar.length} account(s)** at risk:\n\n${ar.map(a => `• **${a.name}** (Health: ${a.healthScore}) — ${a.riskFlags[0]||'Multiple risks'}`).join('\n')}\n\nPrioritize ${ar[0]?.name||'at-risk account'} for intervention.`; }
    if (l.includes('summar') || l.includes('last 30')) return `Last 30 days summary:\n\n• **NexFreight Solutions**: Stable at 82. API milestone reached.\n• **VitalCare Health**: Declined to 58. Data export bug unresolved.\n• **Quantum Insights**: Excellent at 91. Expansion signals.\n• **BrightPath Learning**: Improving at 72. Onboarding progressing.\n\nOverall: **${avg}**. Key concern: VitalCare.`;
    if (l.includes('renewal')) { const nr = [...accts].sort((a,b) => new Date(a.renewalDate).getTime()-new Date(b.renewalDate).getTime())[0]; return `Next renewal: **${nr.name}** on ${new Date(nr.renewalDate).toLocaleDateString()}.\n\nChecklist:\n1. Executive alignment meeting\n2. ROI summary\n3. Resolve open tickets\n4. Confirm stakeholder engagement\n5. Draft renewal proposal\n\nHealth: ${nr.healthScore}. ${nr.healthScore>=80?'Strong position.':nr.healthScore>=60?'Needs attention.':'Critical.'}`; }
    if (l.includes('recovery') || l.includes('plan')) return `**30-Day Recovery Plan — VitalCare:**\n\n**Week 1:** Escalate data export bug. Daily updates.\n**Week 2:** Resolve tickets. ROI presentation.\n**Week 3:** QBR make-up. Training sessions.\n**Week 4:** Measure recovery. 90-day plan.`;
    if (l.includes('expansion')) { const ws = accts.filter(a => a.expansionSignals.length>0); return `**${ws.length} accounts** with expansion ops:\n\n${ws.map(a => `**${a.name}** (Health: ${a.healthScore})\n${a.expansionSignals.map(s => `  • ${s}`).join('\n')}`).join('\n\n')}\n\nPrioritize Quantum Insights Corp.`; }
    if (l.includes('executive') || l.includes('summary')) return `**Executive Summary**\n\n📊 Health: ${avg}/100\n💰 ARR: $${(accts.reduce((s,a) => s+a.arr, 0)/1000).toFixed(0)}K\n✅ Healthy: ${accts.filter(a => a.status==='healthy').length}\n⚠️ At Risk: ${accts.filter(a => a.status==='at_risk').length}\n📈 Expansion: ${accts.filter(a => a.expansionSignals.length>0).length}`;
    return `Based on your portfolio:\n\n• Health: **${avg}**\n• **${accts.filter(a => a.status==='at_risk').length}** at risk\n• **${accts.filter(a => a.expansionSignals.length>0).length}** expansion potential\n\nTry: "Why is VitalCare at risk?" or "Draft a recovery plan"`;
  };
  const send = () => { if (!input.trim()) return; const q = input.trim(); addAiMessage('user', q); setInput(''); setThinking(true); setTimeout(() => { addAiMessage('assistant', gen(q)); setThinking(false); }, 1200); };
  const prompts = ['Why is VitalCare at risk?', 'Summarize the last 30 days', 'Draft a recovery plan', 'Generate executive summary'];
  return (
    <AnimatePresence>{aiCopilotOpen && (<>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={toggleAiCopilot}/>
      <motion.div initial={{x:400,opacity:0}} animate={{x:0,opacity:1}} exit={{x:400,opacity:0}} transition={{type:'spring',damping:25}} className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col">
        <div className="p-4 border-b border-surface-100 flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white"/></div><div><h3 className="font-bold text-surface-900 text-sm">AI Copilot</h3><p className="text-[10px] text-surface-400">PulseIQ AI</p></div></div><button onClick={toggleAiCopilot} className="p-1.5 hover:bg-surface-100 rounded-lg"><X className="w-5 h-5 text-surface-400"/></button></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">{aiMessages.map((m,i) => <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role==='user'?'bg-brand-600 text-white rounded-br-md':'bg-surface-50 text-surface-700 rounded-bl-md border border-surface-100'}`}><div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{__html:m.content.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br/>')}}/></div></motion.div>)}
          {thinking && <div className="flex justify-start"><div className="bg-surface-50 rounded-2xl rounded-bl-md px-4 py-3 border border-surface-100"><div className="flex gap-1"><div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{animationDelay:'0ms'}}/><div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{animationDelay:'150ms'}}/><div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{animationDelay:'300ms'}}/></div></div></div>}
          <div ref={endRef}/></div>
        {aiMessages.length<=1 && <div className="px-4 pb-2 flex flex-wrap gap-1.5">{prompts.map((p) => <button key={p} onClick={() => setInput(p)} className="px-2.5 py-1 bg-surface-50 border border-surface-200 rounded-lg text-xs text-surface-600 hover:bg-surface-100">{p}</button>)}</div>}
        <div className="p-4 border-t border-surface-100"><div className="flex gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key==='Enter'&&send()} placeholder="Ask about your accounts..." className="flex-1 px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm"/><button onClick={send} disabled={!input.trim()} className="px-3 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-40"><Send className="w-4 h-4"/></button></div></div>
      </motion.div>
    </>)}</AnimatePresence>
  );
}

function AddAccountModal() {
  const { addAccountModalOpen, setAddAccountModalOpen, addAccount } = useStore();
  const [tab, setTab] = useState<'paste'|'import'>('paste');
  const [text, setText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [drag, setDrag] = useState(false);
  const [fname, setFname] = useState('');
  const parse = () => { setParsing(true); setTimeout(() => { setParsing(false); setParsed(true); }, 2000); };
  const create = () => { addAccount({ id: `acc-${Date.now()}`, name: 'New Account', industry: 'Technology', logo: 'NA', arr: 100000, contractValue: 100000, renewalDate: '2027-01-01', lastLogin: new Date().toISOString().split('T')[0], openTickets: 0, onboardingStatus: 'not_started', healthScore: 75, healthTrend: 'stable', status: 'healthy', csm: 'Chiamaka Anumba', productUsage: [60,65,70,72,75,75,75,75,75,75,75,75], riskFlags: [], stakeholders: [], timeline: [], recommendations: [], expansionSignals: [], meetingNotes: [], engagementScore: 70, loginFrequency: 75, supportTicketVolume: 20, featureAdoption: 65, emailResponsiveness: 80, qbrAttendance: 75, aiConfidenceScore: 75, recentActivity: [] }); setAddAccountModalOpen(false); setText(''); setParsed(false); };
  return (
    <AnimatePresence>{addAccountModalOpen && (
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setAddAccountModalOpen(false)}>
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
          <div className="p-6 border-b border-surface-100 flex items-center justify-between"><div><h3 className="text-lg font-bold text-surface-900">Add New Account</h3><p className="text-sm text-surface-400 mt-0.5">Import data for AI analysis</p></div><button onClick={() => setAddAccountModalOpen(false)} className="p-1.5 hover:bg-surface-100 rounded-lg"><X className="w-5 h-5 text-surface-400"/></button></div>
          <div className="px-6 pt-4"><div className="flex gap-1 bg-surface-100 p-1 rounded-xl"><button onClick={() => { setTab('paste'); setParsed(false); }} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${tab==='paste'?'bg-white text-surface-900 shadow-sm':'text-surface-500'}`}><FileText className="w-4 h-4"/>Paste</button><button onClick={() => { setTab('import'); setParsed(false); }} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${tab==='import'?'bg-white text-surface-900 shadow-sm':'text-surface-500'}`}><Upload className="w-4 h-4"/>Import</button></div></div>
          <div className="p-6">{tab==='paste'?<textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste account notes, CRM exports, emails..." className="w-full h-48 px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm resize-none"/>:<div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if(f) { setFname(f.name); parse(); } }} className={`border-2 border-dashed rounded-2xl p-8 text-center ${drag?'border-brand-400 bg-brand-50':'border-surface-200'}`}><Upload className={`w-10 h-10 mx-auto mb-3 ${drag?'text-brand-500':'text-surface-300'}`}/><p className="text-sm font-medium text-surface-700">Drop files or click to browse</p><p className="text-xs text-surface-400 mt-1">CSV, TXT, DOCX, PDF, JSON</p><input type="file" className="hidden" id="fu" accept=".csv,.txt,.docx,.pdf,.json" onChange={(e) => { const f = e.target.files?.[0]; if(f) { setFname(f.name); parse(); } }}/><label htmlFor="fu" className="mt-3 inline-block px-4 py-2 bg-surface-100 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-200 cursor-pointer">Choose File</label>{fname && <p className="text-xs text-brand-600 mt-2 font-medium">{fname}</p>}</div>}</div>
          {parsing && <div className="mx-6 mb-4 bg-brand-50 rounded-xl p-4 flex items-center gap-3"><div className="w-5 h-5 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin"/><div><p className="text-sm font-medium text-brand-700">AI parsing data...</p><p className="text-xs text-brand-500">Extracting account details</p></div></div>}
          {parsed && <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mx-6 mb-4 bg-green-50 rounded-xl p-4"><div className="flex items-center gap-2 text-green-700"><CheckCircle className="w-4 h-4"/><p className="text-sm font-medium">AI Parsing Complete</p></div><div className="grid grid-cols-2 gap-2 text-xs text-green-600 mt-2"><span>✓ Company extracted</span><span>✓ Industry identified</span><span>✓ Stakeholders found</span><span>✓ Risks detected</span></div></motion.div>}
          <div className="px-6 pb-6 flex gap-3"><button onClick={() => setAddAccountModalOpen(false)} className="flex-1 px-4 py-2.5 border border-surface-200 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-50">Cancel</button>{parsed?<button onClick={create} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-sm font-medium shadow-md flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4"/>Create</button>:<button onClick={parse} disabled={!text&&!fname} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl text-sm font-medium shadow-md shadow-brand-200 disabled:opacity-40 flex items-center justify-center gap-2"><Sparkles className="w-4 h-4"/>Parse with AI</button>}</div>
        </motion.div>
      </motion.div>
    )}</AnimatePresence>
  );
}

export default function App() {
  const { isAuthenticated, currentPage, sidebarCollapsed } = useStore();
  if (!isAuthenticated) return <AuthScreen />;
  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar />
      <div className={`transition-all duration-200 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'}`}>
        <Header />
        <main className="min-h-[calc(100vh-64px)]">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'accounts' && <AccountsList />}
          {currentPage === 'account-detail' && <AccountDetail />}
          {currentPage === 'settings' && <SettingsPage />}
          {currentPage === 'integrations' && <IntegrationsPage />}
        </main>
      </div>
      <AICopilot />
      <AddAccountModal />
    </div>
  );
}
