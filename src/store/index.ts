import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Account, Integration, User, AppSettings } from '../types';
import { seedAccounts, seedIntegrations, currentUser, defaultSettings } from '../data/seed';

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => boolean;
  signInWithGoogle: () => void;
  signOut: () => void;

  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedAccountId: string | null;
  setSelectedAccountId: (id: string | null) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Accounts
  accounts: Account[];
  addAccount: (account: Account) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;

  // Integrations
  integrations: Integration[];
  updateIntegration: (id: string, updates: Partial<Integration>) => void;
  connectIntegration: (id: string, config: Record<string, string>) => void;
  disconnectIntegration: (id: string) => void;

  // AI
  aiCopilotOpen: boolean;
  toggleAiCopilot: () => void;
  aiMessages: { role: 'user' | 'assistant'; content: string; timestamp: string }[];
  addAiMessage: (role: 'user' | 'assistant', content: string) => void;

  // Modals
  addAccountModalOpen: boolean;
  setAddAccountModalOpen: (open: boolean) => void;
  settingsModalOpen: boolean;
  setSettingsModalOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  healthFilter: string;
  setHealthFilter: (filter: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, _get) => ({
      // Auth
      isAuthenticated: false,
      user: null,
      signIn: (email: string, _password: string) => {
        if (email) {
          set({ isAuthenticated: true, user: currentUser });
          return true;
        }
        return false;
      },
      signInWithGoogle: () => {
        set({ isAuthenticated: true, user: currentUser });
      },
      signOut: () => {
        set({ isAuthenticated: false, user: null, currentPage: 'dashboard', selectedAccountId: null });
      },

      // Navigation
      currentPage: 'dashboard',
      setCurrentPage: (page: string) => set({ currentPage: page }),
      selectedAccountId: null,
      setSelectedAccountId: (id: string | null) => set({ selectedAccountId: id }),
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      // Accounts
      accounts: seedAccounts,
      addAccount: (account: Account) => set((s) => ({ accounts: [...s.accounts, account] })),
      updateAccount: (id: string, updates: Partial<Account>) =>
        set((s) => ({
          accounts: s.accounts.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        })),
      deleteAccount: (id: string) =>
        set((s) => ({ accounts: s.accounts.filter((a) => a.id !== id) })),

      // Settings
      settings: defaultSettings,
      updateSettings: (updates: Partial<AppSettings>) =>
        set((s) => ({ settings: { ...s.settings, ...updates } })),

      // Integrations
      integrations: seedIntegrations,
      updateIntegration: (id: string, updates: Partial<Integration>) =>
        set((s) => ({
          integrations: s.integrations.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        })),
      connectIntegration: (id: string, config: Record<string, string>) =>
        set((s) => ({
          integrations: s.integrations.map((i) =>
            i.id === id
              ? {
                  ...i,
                  status: 'connected' as const,
                  lastSync: new Date().toISOString(),
                  configFields: i.configFields?.map((f) =>
                    config[f.key] !== undefined ? { ...f, value: config[f.key] } : f
                  ),
                }
              : i
          ),
        })),
      disconnectIntegration: (id: string) =>
        set((s) => ({
          integrations: s.integrations.map((i) =>
            i.id === id
              ? { ...i, status: 'disconnected' as const, lastSync: undefined }
              : i
          ),
        })),

      // AI
      aiCopilotOpen: false,
      toggleAiCopilot: () => set((s) => ({ aiCopilotOpen: !s.aiCopilotOpen })),
      aiMessages: [
        {
          role: 'assistant',
          content: "Hi Chiamaka! I'm your PulseIQ AI assistant. I can help you understand account health, prepare for customer calls, draft recovery plans, and identify expansion opportunities. What would you like to know?",
          timestamp: new Date().toISOString(),
        },
      ],
      addAiMessage: (role: 'user' | 'assistant', content: string) =>
        set((s) => ({
          aiMessages: [...s.aiMessages, { role, content, timestamp: new Date().toISOString() }],
        })),

      // Modals
      addAccountModalOpen: false,
      setAddAccountModalOpen: (open: boolean) => set({ addAccountModalOpen: open }),
      settingsModalOpen: false,
      setSettingsModalOpen: (open: boolean) => set({ settingsModalOpen: open }),

      // Search
      searchQuery: '',
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      healthFilter: 'all',
      setHealthFilter: (filter: string) => set({ healthFilter: filter }),
    }),
    {
      name: 'pulseiq-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        settings: state.settings,
        integrations: state.integrations,
        accounts: state.accounts,
      }),
    }
  )
);
