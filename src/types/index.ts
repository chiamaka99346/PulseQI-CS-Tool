export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  influence: 'high' | 'medium' | 'low';
  sentiment: 'positive' | 'neutral' | 'negative';
  engagementFrequency: 'high' | 'medium' | 'low';
  lastInteraction: string;
  type: 'champion' | 'decision_maker' | 'blocker' | 'inactive';
  email?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
  aiInsight: string;
  suggestedResponse: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  reasoning: string;
  timeline: string;
  owner: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  logo: string;
  arr: number;
  contractValue: number;
  renewalDate: string;
  lastLogin: string;
  openTickets: number;
  onboardingStatus: 'completed' | 'in_progress' | 'not_started';
  healthScore: number;
  healthTrend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'at_risk';
  csm: string;
  productUsage: number[];
  riskFlags: string[];
  stakeholders: Stakeholder[];
  timeline: TimelineEvent[];
  recommendations: Recommendation[];
  expansionSignals: string[];
  meetingNotes: string[];
  engagementScore: number;
  loginFrequency: number;
  supportTicketVolume: number;
  featureAdoption: number;
  emailResponsiveness: number;
  qbrAttendance: number;
  aiConfidenceScore: number;
  recentActivity: { date: string; text: string; type: string }[];
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  category: 'crm' | 'communication' | 'support' | 'analytics' | 'productivity';
  configFields?: { key: string; label: string; type: string; value: string }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  organization: string;
}

export interface AppSettings {
  darkMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  aiAutoBriefings: boolean;
  aiRiskAlerts: boolean;
  aiExpansionAlerts: boolean;
  defaultHealthModel: 'standard' | 'aggressive' | 'conservative';
  dataRetention: '30' | '90' | '180' | '365';
  timezone: string;
  language: string;
}
