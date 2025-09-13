'use client';

import { useState, useMemo } from 'react';
import { Expense } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface ExportHubProps {
  expenses: Expense[];
  isOpen: boolean;
  onClose: () => void;
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  category: 'financial' | 'business' | 'personal';
  features: string[];
}

interface CloudIntegration {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'syncing';
  description: string;
  color: string;
}

interface ExportHistory {
  id: string;
  template: string;
  destination: string;
  timestamp: string;
  status: 'completed' | 'processing' | 'failed' | 'scheduled';
  recordCount: number;
  sharedWith?: string[];
}

const exportTemplates: ExportTemplate[] = [
  {
    id: 'tax-report',
    name: 'Tax Report',
    description: 'IRS-compliant expense report with deduction categories',
    icon: '📊',
    gradient: 'from-green-500 to-emerald-600',
    category: 'financial',
    features: ['Tax-compliant formatting', 'Deduction categories', 'YTD summaries'],
  },
  {
    id: 'monthly-summary',
    name: 'Monthly Summary',
    description: 'Comprehensive monthly expense breakdown and trends',
    icon: '📅',
    gradient: 'from-blue-500 to-indigo-600',
    category: 'business',
    features: ['Month-over-month trends', 'Category analysis', 'Budget insights'],
  },
  {
    id: 'category-analysis',
    name: 'Category Deep Dive',
    description: 'Detailed analysis of spending patterns by category',
    icon: '🎯',
    gradient: 'from-purple-500 to-violet-600',
    category: 'business',
    features: ['Pattern recognition', 'Spending insights', 'Optimization tips'],
  },
  {
    id: 'team-report',
    name: 'Team Expense Report',
    description: 'Shareable team expense overview for managers',
    icon: '👥',
    gradient: 'from-orange-500 to-red-500',
    category: 'business',
    features: ['Team collaboration', 'Manager dashboard', 'Approval workflow'],
  },
  {
    id: 'minimal-export',
    name: 'Simple Export',
    description: 'Clean, minimal export for personal use',
    icon: '📋',
    gradient: 'from-gray-500 to-slate-600',
    category: 'personal',
    features: ['Clean formatting', 'Essential data only', 'Quick download'],
  },
  {
    id: 'investor-deck',
    name: 'Investor Report',
    description: 'Professional financial overview for stakeholders',
    icon: '💼',
    gradient: 'from-cyan-500 to-teal-600',
    category: 'financial',
    features: ['Executive summary', 'Visual charts', 'Trend analysis'],
  },
];

const cloudIntegrations: CloudIntegration[] = [
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    icon: '📊',
    status: 'connected',
    description: 'Auto-sync to spreadsheets',
    color: 'bg-green-100 text-green-700 border-green-200',
  },
  {
    id: 'email',
    name: 'Email Reports',
    icon: '✉️',
    status: 'connected',
    description: 'Scheduled email delivery',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: '📦',
    status: 'disconnected',
    description: 'Cloud storage backup',
    color: 'bg-gray-100 text-gray-500 border-gray-200',
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    icon: '☁️',
    status: 'syncing',
    description: 'Microsoft cloud sync',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: '💬',
    status: 'connected',
    description: 'Team notifications',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    icon: '⚡',
    status: 'connected',
    description: 'Workflow automation',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
  },
];

const mockExportHistory: ExportHistory[] = [
  {
    id: '1',
    template: 'Monthly Summary',
    destination: 'Google Sheets',
    timestamp: '2 hours ago',
    status: 'completed',
    recordCount: 127,
    sharedWith: ['team@company.com', 'manager@company.com'],
  },
  {
    id: '2',
    template: 'Tax Report',
    destination: 'Email (tax@company.com)',
    timestamp: 'Yesterday',
    status: 'completed',
    recordCount: 89,
  },
  {
    id: '3',
    template: 'Category Analysis',
    destination: 'Dropbox',
    timestamp: '3 days ago',
    status: 'failed',
    recordCount: 156,
  },
  {
    id: '4',
    template: 'Team Report',
    destination: 'Slack + Email',
    timestamp: 'Dec 1, 2024',
    status: 'scheduled',
    recordCount: 0,
    sharedWith: ['team@company.com'],
  },
];

export default function ExportHub({ expenses, isOpen, onClose }: ExportHubProps) {
  const [activeTab, setActiveTab] = useState<'templates' | 'integrations' | 'history' | 'automation'>('templates');
  const [, setSelectedTemplate] = useState<ExportTemplate | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareableLink] = useState('https://app.expensetracker.io/share/a8b2c9d1e4f7');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const handleTemplateExport = async (template: ExportTemplate, destination: string) => {
    setIsProcessing(true);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate different export actions based on destination
    if (destination === 'google-sheets') {
      // Mock Google Sheets integration
      console.log(`Exporting ${template.name} to Google Sheets...`);
    } else if (destination === 'email') {
      // Mock email export
      console.log(`Emailing ${template.name} report...`);
    } else if (destination === 'share') {
      // Mock sharing functionality
      setShareModalOpen(true);
    }

    setIsProcessing(false);
  };

  const generateQRCode = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareableLink)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
                🚀
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Export Hub</h2>
                <p className="text-gray-600">Share, automate, and collaborate with your expense data</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full border">
                <span className="font-medium">{expenses.length}</span> expenses • <span className="font-medium">{formatCurrency(totalExpenses)}</span> total
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-100">
          <div className="px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'templates', label: 'Export Templates', icon: '📋', count: exportTemplates.length },
                { id: 'integrations', label: 'Integrations', icon: '🔗', count: cloudIntegrations.filter(i => i.status === 'connected').length },
                { id: 'history', label: 'Export History', icon: '📈', count: mockExportHistory.length },
                { id: 'automation', label: 'Automation', icon: '⚙️', count: 3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'templates' | 'integrations' | 'history' | 'automation')}
                  className={`relative py-4 px-1 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {activeTab === 'templates' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Export Template</h3>
                <p className="text-gray-600">Pre-configured reports designed for different use cases and audiences</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exportTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="group relative bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className={`h-3 bg-gradient-to-r ${template.gradient}`}></div>
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{template.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {template.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{template.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {template.features.slice(0, 2).map((feature, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTemplateExport(template, 'google-sheets');
                          }}
                          disabled={isProcessing}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {isProcessing ? 'Processing...' : 'Export to Sheets'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTemplateExport(template, 'share');
                          }}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Share"
                        >
                          🔗
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cloud Integrations</h3>
                <p className="text-gray-600">Connect your favorite tools and services for seamless data flow</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cloudIntegrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${integration.color}`}>
                        {integration.status === 'connected' && '● Connected'}
                        {integration.status === 'disconnected' && '○ Disconnected'}
                        {integration.status === 'syncing' && '● Syncing...'}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {integration.status === 'connected' ? (
                        <>
                          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 px-4 rounded-lg font-medium transition-colors">
                            Configure
                          </button>
                          <button className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm">
                            Disconnect
                          </button>
                        </>
                      ) : integration.status === 'syncing' ? (
                        <div className="flex-1 bg-yellow-100 text-yellow-700 text-sm py-2 px-4 rounded-lg font-medium text-center">
                          <span className="inline-block animate-spin rounded-full h-3 w-3 border-b-2 border-yellow-700 mr-2"></span>
                          Syncing...
                        </div>
                      ) : (
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg font-medium transition-colors">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Integration Stats */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">Integration Stats</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {cloudIntegrations.filter(i => i.status === 'connected').length}
                    </div>
                    <div className="text-sm text-gray-600">Active Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">47</div>
                    <div className="text-sm text-gray-600">Exports This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">12.4K</div>
                    <div className="text-sm text-gray-600">Records Synced</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Export History</h3>
                  <p className="text-gray-600">Track all your exports and their delivery status</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Clear History
                </button>
              </div>

              <div className="space-y-4">
                {mockExportHistory.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'processing' ? 'bg-yellow-500 animate-pulse' :
                          item.status === 'failed' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`}></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.template}</h4>
                          <p className="text-sm text-gray-600">
                            Exported to {item.destination} • {item.timestamp}
                            {item.recordCount > 0 && ` • ${item.recordCount} records`}
                          </p>
                          {item.sharedWith && (
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="text-xs text-gray-500">Shared with:</span>
                              {item.sharedWith.map((email, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                                  {email}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'completed' ? 'bg-green-100 text-green-700' :
                          item.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                          item.status === 'failed' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                        {item.status === 'completed' && (
                          <button className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded-md hover:bg-blue-50 text-sm">
                            Re-export
                          </button>
                        )}
                        {item.status === 'failed' && (
                          <button className="text-red-600 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50 text-sm">
                            Retry
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'automation' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automation & Scheduling</h3>
                <p className="text-gray-600">Set up automatic exports and recurring reports</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Scheduled Exports */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-purple-600 mr-2">⏰</span>
                    Scheduled Exports
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Monthly Tax Report</span>
                        <span className="text-green-600 text-sm font-medium">● Active</span>
                      </div>
                      <p className="text-sm text-gray-600">Every 1st of month to tax@company.com</p>
                      <div className="mt-2 text-xs text-gray-500">Next: Jan 1, 2025 at 9:00 AM</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Weekly Team Summary</span>
                        <span className="text-gray-400 text-sm font-medium">○ Paused</span>
                      </div>
                      <p className="text-sm text-gray-600">Every Friday to Slack #expenses</p>
                      <div className="mt-2 text-xs text-gray-500">Paused by user</div>
                    </div>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      + Create New Schedule
                    </button>
                  </div>
                </div>

                {/* Smart Triggers */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-green-600 mr-2">🤖</span>
                    Smart Triggers
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Budget Threshold Alert</span>
                        <span className="text-green-600 text-sm font-medium">● Active</span>
                      </div>
                      <p className="text-sm text-gray-600">Export when monthly spend {'>'}$5,000</p>
                      <div className="mt-2 text-xs text-gray-500">Triggered 3 times this year</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">New Team Member</span>
                        <span className="text-green-600 text-sm font-medium">● Active</span>
                      </div>
                      <p className="text-sm text-gray-600">Auto-share onboarding report</p>
                      <div className="mt-2 text-xs text-gray-500">Last triggered: Dec 15, 2024</div>
                    </div>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      + Add Smart Trigger
                    </button>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-100">
                <h4 className="font-semibold text-gray-900 mb-4">Automation Analytics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">23</div>
                    <div className="text-sm text-gray-600">Auto Exports</div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">4.2hrs</div>
                    <div className="text-sm text-gray-600">Time Saved</div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.2%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                    <div className="text-xs text-gray-500">Last 30 days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">7</div>
                    <div className="text-sm text-gray-600">Active Rules</div>
                    <div className="text-xs text-gray-500">Currently</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Processing Export...</div>
              <div className="text-sm text-gray-600">Preparing your data for export</div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {shareModalOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="text-4xl mb-4">🔗</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Export</h3>

                <div className="mb-6">
                  <img
                    src={generateQRCode()}
                    alt="QR Code"
                    className="mx-auto mb-4 border border-gray-200 rounded-lg"
                  />
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm font-mono text-gray-700 break-all">
                    {shareableLink}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareableLink);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => setShareModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}