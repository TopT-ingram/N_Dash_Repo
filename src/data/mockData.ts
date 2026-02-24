import type { Environment } from '@/store/filterStore';

// ─── Sprint / Release versions (new granular format) ───
export const SPRINT_RELEASES = [
  '26.1.1','26.1.2','26.1.3','26.1.4',
  '26.2.1','26.2.2','26.2.3','26.2.4',
  '26.3.1','26.3.2','26.3.3','26.3.4',
  '26.4.1','26.4.2','26.4.3','26.4.4',
];

// ─── KPI Data per sprint release ───
export interface KPIData {
  environment: Environment;
  count: number;
  trend: number;
  previousCount: number;
}

// Sprint-level KPI data — used for aggregated KPI cards
export const sprintKpiData: Record<string, KPIData[]> = {
  '26.1.1': [{ environment:'QA & IST',count:48,trend:-5.2,previousCount:51 },{ environment:'Regression',count:22,trend:8.3,previousCount:20 },{ environment:'UAT',count:14,trend:-3.0,previousCount:14 },{ environment:'Production',count:4,trend:-20.0,previousCount:5 }],
  '26.1.2': [{ environment:'QA & IST',count:55,trend:14.6,previousCount:48 },{ environment:'Regression',count:27,trend:22.7,previousCount:22 },{ environment:'UAT',count:18,trend:28.6,previousCount:14 },{ environment:'Production',count:6,trend:50.0,previousCount:4 }],
  '26.1.3': [{ environment:'QA & IST',count:42,trend:-23.6,previousCount:55 },{ environment:'Regression',count:19,trend:-29.6,previousCount:27 },{ environment:'UAT',count:11,trend:-38.9,previousCount:18 },{ environment:'Production',count:3,trend:-50.0,previousCount:6 }],
  '26.1.4': [{ environment:'QA & IST',count:61,trend:45.2,previousCount:42 },{ environment:'Regression',count:31,trend:63.2,previousCount:19 },{ environment:'UAT',count:20,trend:81.8,previousCount:11 },{ environment:'Production',count:7,trend:133.3,previousCount:3 }],
  '26.2.1': [{ environment:'QA & IST',count:38,trend:-37.7,previousCount:61 },{ environment:'Regression',count:17,trend:-45.2,previousCount:31 },{ environment:'UAT',count:10,trend:-50.0,previousCount:20 },{ environment:'Production',count:2,trend:-71.4,previousCount:7 }],
  '26.2.2': [{ environment:'QA & IST',count:72,trend:89.5,previousCount:38 },{ environment:'Regression',count:35,trend:105.9,previousCount:17 },{ environment:'UAT',count:23,trend:130.0,previousCount:10 },{ environment:'Production',count:9,trend:350.0,previousCount:2 }],
  '26.2.3': [{ environment:'QA & IST',count:44,trend:-38.9,previousCount:72 },{ environment:'Regression',count:21,trend:-40.0,previousCount:35 },{ environment:'UAT',count:13,trend:-43.5,previousCount:23 },{ environment:'Production',count:4,trend:-55.6,previousCount:9 }],
  '26.2.4': [{ environment:'QA & IST',count:58,trend:31.8,previousCount:44 },{ environment:'Regression',count:28,trend:33.3,previousCount:21 },{ environment:'UAT',count:17,trend:30.8,previousCount:13 },{ environment:'Production',count:5,trend:25.0,previousCount:4 }],
  '26.3.1': [{ environment:'QA & IST',count:33,trend:-43.1,previousCount:58 },{ environment:'Regression',count:15,trend:-46.4,previousCount:28 },{ environment:'UAT',count:9,trend:-47.1,previousCount:17 },{ environment:'Production',count:2,trend:-60.0,previousCount:5 }],
  '26.3.2': [{ environment:'QA & IST',count:67,trend:103.0,previousCount:33 },{ environment:'Regression',count:33,trend:120.0,previousCount:15 },{ environment:'UAT',count:21,trend:133.3,previousCount:9 },{ environment:'Production',count:8,trend:300.0,previousCount:2 }],
  '26.3.3': [{ environment:'QA & IST',count:50,trend:-25.4,previousCount:67 },{ environment:'Regression',count:24,trend:-27.3,previousCount:33 },{ environment:'UAT',count:15,trend:-28.6,previousCount:21 },{ environment:'Production',count:5,trend:-37.5,previousCount:8 }],
  '26.3.4': [{ environment:'QA & IST',count:78,trend:56.0,previousCount:50 },{ environment:'Regression',count:38,trend:58.3,previousCount:24 },{ environment:'UAT',count:25,trend:66.7,previousCount:15 },{ environment:'Production',count:10,trend:100.0,previousCount:5 }],
  '26.4.1': [{ environment:'QA & IST',count:41,trend:-47.4,previousCount:78 },{ environment:'Regression',count:20,trend:-47.4,previousCount:38 },{ environment:'UAT',count:12,trend:-52.0,previousCount:25 },{ environment:'Production',count:3,trend:-70.0,previousCount:10 }],
  '26.4.2': [{ environment:'QA & IST',count:53,trend:29.3,previousCount:41 },{ environment:'Regression',count:26,trend:30.0,previousCount:20 },{ environment:'UAT',count:16,trend:33.3,previousCount:12 },{ environment:'Production',count:6,trend:100.0,previousCount:3 }],
  '26.4.3': [{ environment:'QA & IST',count:36,trend:-32.1,previousCount:53 },{ environment:'Regression',count:16,trend:-38.5,previousCount:26 },{ environment:'UAT',count:10,trend:-37.5,previousCount:16 },{ environment:'Production',count:2,trend:-66.7,previousCount:6 }],
  '26.4.4': [{ environment:'QA & IST',count:62,trend:72.2,previousCount:36 },{ environment:'Regression',count:30,trend:87.5,previousCount:16 },{ environment:'UAT',count:19,trend:90.0,previousCount:10 },{ environment:'Production',count:7,trend:250.0,previousCount:2 }],
};

// Legacy kpiData kept for compatibility
export const kpiData: Record<string, KPIData[]> = sprintKpiData;

// ─── Per-sprint, per-environment bug counts (used for release-wise line charts) ───
export interface SprintEnvBugs {
  release: string;
  qaIst: number;
  regression: number;
  uat: number;
  production: number;
  performance: number;
}

export const sprintBugData: SprintEnvBugs[] = [
  { release:'26.1.1', qaIst:48, regression:22, uat:14, production:4, performance:9  },
  { release:'26.1.2', qaIst:55, regression:27, uat:18, production:6, performance:12 },
  { release:'26.1.3', qaIst:42, regression:19, uat:11, production:3, performance:7  },
  { release:'26.1.4', qaIst:61, regression:31, uat:20, production:7, performance:14 },
  { release:'26.2.1', qaIst:38, regression:17, uat:10, production:2, performance:6  },
  { release:'26.2.2', qaIst:72, regression:35, uat:23, production:9, performance:17 },
  { release:'26.2.3', qaIst:44, regression:21, uat:13, production:4, performance:8  },
  { release:'26.2.4', qaIst:58, regression:28, uat:17, production:5, performance:11 },
  { release:'26.3.1', qaIst:33, regression:15, uat:9,  production:2, performance:5  },
  { release:'26.3.2', qaIst:67, regression:33, uat:21, production:8, performance:15 },
  { release:'26.3.3', qaIst:50, regression:24, uat:15, production:5, performance:10 },
  { release:'26.3.4', qaIst:78, regression:38, uat:25, production:10,performance:19 },
  { release:'26.4.1', qaIst:41, regression:20, uat:12, production:3, performance:7  },
  { release:'26.4.2', qaIst:53, regression:26, uat:16, production:6, performance:12 },
  { release:'26.4.3', qaIst:36, regression:16, uat:10, production:2, performance:5  },
  { release:'26.4.4', qaIst:62, regression:30, uat:19, production:7, performance:14 },
];

// Manual vs Automation data per sprint release
export interface ManualVsAutoPoint {
  release: string;
  manual: number;
  automation: number;
}

export const manualVsAutoByRelease: ManualVsAutoPoint[] = sprintBugData.map((d, i) => ({
  release: d.release,
  manual: Math.round((d.qaIst + d.regression) * (0.55 - i * 0.01)),
  automation: Math.round((d.qaIst + d.regression) * (0.45 + i * 0.01)),
}));

// ─── Defect Trend Data (legacy, kept for DefectsPage) ───
export interface TrendPoint {
  date: string;
  count: number;
  release: string;
}

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const generateTrendData = (release: string, env: Environment): TrendPoint[] => {
  const d = sprintBugData.find(s => s.release === release);
  const base = d ? (env === 'QA & IST' ? d.qaIst : env === 'Regression' ? d.regression : env === 'UAT' ? d.uat : d.production) : 10;
  return MONTHS_SHORT.map((m, i) => ({ date: m, count: Math.max(1, base + (i % 3 === 0 ? -5 : i % 3 === 1 ? 3 : 1)), release }));
};

export const getTrendData = (releases: string[], env: Environment): TrendPoint[] => {
  return releases.flatMap(r => generateTrendData(r, env));
};

// ─── Domains ───
export const DOMAINS = ['Checkout','Payments','Catalog','Inventory','User Management','Search','Shipping','Notifications'];

// ─── Defects Data ───
export interface Defect {
  key: string;
  summary: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  domain: string;
  environment: Environment;
  rootCause: string;
  type: 'Functional' | 'Performance';
  detectionMethod: 'Manual' | 'Automation';
  createdDate: string;
  resolvedDate?: string;
}

const priorities: Defect['priority'][] = ['Critical','High','Medium','Low'];
const statuses: Defect['status'][] = ['Open','In Progress','Resolved','Closed'];
const rootCauses = ['Code Defect','Configuration','Data Issue','Integration','Environment','Requirements Gap'];
const summaries: Record<string, string[]> = {
  Checkout: ['Cart total miscalculation on discount apply','Checkout flow breaks on guest user','Payment redirect fails intermittently','Coupon code validation error','Order confirmation not sent after checkout'],
  Payments: ['Refund processing delay > 72h','Double charge on payment retry','Payment gateway timeout during peak hours','Currency conversion rounding error','Invoice PDF generation fails'],
  Catalog: ['Product images not loading on mobile','Category filter returns wrong results','Price display mismatch in cart vs PDP','Search results inconsistency on page 2+','Product description truncated incorrectly'],
  Inventory: ['Stock count sync delay after warehouse update','Warehouse allocation error on split order','Reorder point not triggering alert','Batch update failure for 500+ items','Negative inventory allowed on back-order'],
  'User Management': ['SSO login redirect loop on Safari','Password reset email delayed > 10 min','Role permission escalation via API','Session timeout too short at 5 min','Profile picture upload size limit not enforced'],
  Search: ['Fuzzy search not returning partial matches','Filter combination causes 500 error','Sort order resets on pagination','Autocomplete latency > 2s on slow network','Facet counts incorrect after filter apply'],
  Shipping: ['Tracking number not generated for international orders','Shipping cost calculation error for heavy items','Address validation fails on PO Box','Delivery estimate shows past date','Multi-package shipment not consolidated'],
  Notifications: ['Email notification delayed > 30 min','Push notification not received on Android 14','SMS delivery failure in EU region','Notification preferences reset after login','Duplicate notifications sent on order update'],
};

const DEFECT_TEMPLATES: Array<{
  domain: string; priority: Defect['priority']; status: Defect['status'];
  rootCause: string; type: Defect['type']; detectionMethod: Defect['detectionMethod'];
  summaryIdx: number; created: string; resolved?: string;
}> = [
  { domain:'Checkout', priority:'Critical', status:'Open', rootCause:'Code Defect', type:'Functional', detectionMethod:'Manual', summaryIdx:0, created:'2024-11-15' },
  { domain:'Checkout', priority:'High', status:'In Progress', rootCause:'Integration', type:'Functional', detectionMethod:'Automation', summaryIdx:1, created:'2024-11-18', resolved:'2024-11-28' },
  { domain:'Checkout', priority:'Medium', status:'Resolved', rootCause:'Data Issue', type:'Functional', detectionMethod:'Manual', summaryIdx:2, created:'2024-11-20', resolved:'2024-11-30' },
  { domain:'Checkout', priority:'Low', status:'Closed', rootCause:'Configuration', type:'Functional', detectionMethod:'Automation', summaryIdx:3, created:'2024-11-22', resolved:'2024-12-01' },
  { domain:'Checkout', priority:'High', status:'Open', rootCause:'Code Defect', type:'Functional', detectionMethod:'Manual', summaryIdx:4, created:'2024-11-25' },
  { domain:'Payments', priority:'Critical', status:'In Progress', rootCause:'Integration', type:'Functional', detectionMethod:'Manual', summaryIdx:0, created:'2024-11-14' },
  { domain:'Payments', priority:'Critical', status:'Open', rootCause:'Code Defect', type:'Functional', detectionMethod:'Automation', summaryIdx:1, created:'2024-11-16' },
  { domain:'Payments', priority:'High', status:'Resolved', rootCause:'Environment', type:'Functional', detectionMethod:'Manual', summaryIdx:2, created:'2024-11-19', resolved:'2024-11-29' },
  { domain:'Payments', priority:'Medium', status:'Closed', rootCause:'Data Issue', type:'Performance', detectionMethod:'Automation', summaryIdx:3, created:'2024-11-21', resolved:'2024-12-02' },
  { domain:'Payments', priority:'Low', status:'Open', rootCause:'Requirements Gap', type:'Functional', detectionMethod:'Manual', summaryIdx:4, created:'2024-11-23' },
  { domain:'Catalog', priority:'High', status:'Open', rootCause:'Code Defect', type:'Functional', detectionMethod:'Automation', summaryIdx:0, created:'2024-11-13' },
  { domain:'Catalog', priority:'Medium', status:'In Progress', rootCause:'Configuration', type:'Functional', detectionMethod:'Manual', summaryIdx:1, created:'2024-11-17' },
  { domain:'Catalog', priority:'Low', status:'Resolved', rootCause:'Data Issue', type:'Functional', detectionMethod:'Automation', summaryIdx:2, created:'2024-11-20', resolved:'2024-12-01' },
  { domain:'Catalog', priority:'High', status:'Closed', rootCause:'Integration', type:'Performance', detectionMethod:'Manual', summaryIdx:3, created:'2024-11-24', resolved:'2024-12-05' },
  { domain:'Catalog', priority:'Critical', status:'Open', rootCause:'Code Defect', type:'Functional', detectionMethod:'Automation', summaryIdx:4, created:'2024-11-26' },
  { domain:'Inventory', priority:'High', status:'Open', rootCause:'Integration', type:'Functional', detectionMethod:'Manual', summaryIdx:0, created:'2024-11-12' },
  { domain:'Inventory', priority:'Medium', status:'Resolved', rootCause:'Data Issue', type:'Functional', detectionMethod:'Automation', summaryIdx:1, created:'2024-11-15', resolved:'2024-11-27' },
  { domain:'Inventory', priority:'Low', status:'Closed', rootCause:'Configuration', type:'Functional', detectionMethod:'Manual', summaryIdx:2, created:'2024-11-18', resolved:'2024-11-30' },
  { domain:'Inventory', priority:'Critical', status:'In Progress', rootCause:'Code Defect', type:'Functional', detectionMethod:'Automation', summaryIdx:3, created:'2024-11-22' },
  { domain:'Inventory', priority:'High', status:'Open', rootCause:'Environment', type:'Performance', detectionMethod:'Manual', summaryIdx:4, created:'2024-11-27' },
  { domain:'User Management', priority:'Critical', status:'Open', rootCause:'Code Defect', type:'Functional', detectionMethod:'Manual', summaryIdx:0, created:'2024-11-11' },
  { domain:'User Management', priority:'High', status:'In Progress', rootCause:'Requirements Gap', type:'Functional', detectionMethod:'Automation', summaryIdx:1, created:'2024-11-14' },
  { domain:'User Management', priority:'Medium', status:'Resolved', rootCause:'Integration', type:'Functional', detectionMethod:'Manual', summaryIdx:2, created:'2024-11-17', resolved:'2024-11-28' },
  { domain:'User Management', priority:'Low', status:'Closed', rootCause:'Data Issue', type:'Functional', detectionMethod:'Automation', summaryIdx:3, created:'2024-11-20', resolved:'2024-12-01' },
  { domain:'User Management', priority:'High', status:'Open', rootCause:'Code Defect', type:'Functional', detectionMethod:'Manual', summaryIdx:4, created:'2024-11-25' },
  { domain:'Search', priority:'High', status:'Open', rootCause:'Code Defect', type:'Functional', detectionMethod:'Automation', summaryIdx:0, created:'2024-11-10' },
  { domain:'Search', priority:'Medium', status:'In Progress', rootCause:'Environment', type:'Performance', detectionMethod:'Manual', summaryIdx:1, created:'2024-11-13' },
  { domain:'Search', priority:'Critical', status:'Open', rootCause:'Code Defect', type:'Functional', detectionMethod:'Automation', summaryIdx:2, created:'2024-11-16' },
  { domain:'Search', priority:'Low', status:'Resolved', rootCause:'Configuration', type:'Functional', detectionMethod:'Manual', summaryIdx:3, created:'2024-11-19', resolved:'2024-11-30' },
  { domain:'Search', priority:'High', status:'Closed', rootCause:'Data Issue', type:'Functional', detectionMethod:'Automation', summaryIdx:4, created:'2024-11-22', resolved:'2024-12-03' },
  { domain:'Shipping', priority:'High', status:'Open', rootCause:'Integration', type:'Functional', detectionMethod:'Manual', summaryIdx:0, created:'2024-11-09' },
  { domain:'Shipping', priority:'Medium', status:'Resolved', rootCause:'Data Issue', type:'Functional', detectionMethod:'Automation', summaryIdx:1, created:'2024-11-12', resolved:'2024-11-24' },
  { domain:'Shipping', priority:'Low', status:'Closed', rootCause:'Configuration', type:'Functional', detectionMethod:'Manual', summaryIdx:2, created:'2024-11-15', resolved:'2024-11-27' },
  { domain:'Shipping', priority:'Critical', status:'In Progress', rootCause:'Code Defect', type:'Functional', detectionMethod:'Automation', summaryIdx:3, created:'2024-11-18' },
  { domain:'Shipping', priority:'High', status:'Open', rootCause:'Requirements Gap', type:'Functional', detectionMethod:'Manual', summaryIdx:4, created:'2024-11-23' },
  { domain:'Notifications', priority:'Medium', status:'Open', rootCause:'Integration', type:'Functional', detectionMethod:'Manual', summaryIdx:0, created:'2024-11-08' },
  { domain:'Notifications', priority:'Low', status:'Resolved', rootCause:'Environment', type:'Functional', detectionMethod:'Automation', summaryIdx:1, created:'2024-11-11', resolved:'2024-11-22' },
  { domain:'Notifications', priority:'High', status:'Closed', rootCause:'Data Issue', type:'Functional', detectionMethod:'Manual', summaryIdx:2, created:'2024-11-14', resolved:'2024-11-26' },
  { domain:'Notifications', priority:'Medium', status:'In Progress', rootCause:'Code Defect', type:'Functional', detectionMethod:'Automation', summaryIdx:3, created:'2024-11-17' },
  { domain:'Notifications', priority:'Low', status:'Open', rootCause:'Configuration', type:'Functional', detectionMethod:'Manual', summaryIdx:4, created:'2024-11-21' },
];

const ENV_OFFSETS: Record<Environment, number> = {
  'QA & IST': 0,
  'Regression': 15,
  'UAT': 27,
  'Production': 35,
};

const ENV_COUNTS: Record<Environment, number> = {
  'QA & IST': 39,
  'Regression': 12,
  'UAT': 8,
  'Production': 4,
};

const RELEASE_PREFIX: Record<string, string> = {
  'Release 24.12': 'R1212',
  'Release 24.11': 'R1211',
  'Release 24.10': 'R1210',
  'Release 24.9':  'R1209',
  'Release 24.8':  'R1208',
  'Release 24.7':  'R1207',
};

// Also map sprint releases for defect generation
SPRINT_RELEASES.forEach(r => {
  RELEASE_PREFIX[r] = 'S' + r.replace(/\./g,'');
});

const buildDefectsForReleaseEnv = (release: string, env: Environment): Defect[] => {
  const prefix = RELEASE_PREFIX[release] ?? 'R00';
  const offset = ENV_OFFSETS[env];
  const count = ENV_COUNTS[env];
  const templates = DEFECT_TEMPLATES.slice(offset, offset + count);
  const result: Defect[] = [];
  for (let i = 0; i < count; i++) {
    const t = templates[i % templates.length];
    const domainSumms = summaries[t.domain];
    result.push({
      key: `ING-${prefix}-${String(i + 1).padStart(3, '0')}`,
      summary: domainSumms[t.summaryIdx % domainSumms.length],
      priority: t.priority,
      status: t.status,
      domain: t.domain,
      environment: env,
      rootCause: t.rootCause,
      type: t.type,
      detectionMethod: t.detectionMethod,
      createdDate: t.created,
      resolvedDate: t.resolved,
    });
  }
  return result;
};

const environments: Environment[] = ['QA & IST','Regression','UAT','Production'];

export const allDefects: Record<string, Defect[]> = {};
[...['Release 24.12','Release 24.11','Release 24.10','Release 24.9','Release 24.8','Release 24.7'], ...SPRINT_RELEASES].forEach(rel => {
  allDefects[rel] = environments.flatMap(env => buildDefectsForReleaseEnv(rel, env));
});

export const getDefectsForRelease = (releases: string[]): Defect[] => {
  return releases.flatMap(r => allDefects[r] || []);
};

// ─── Executive Metrics ───
export interface ExecutiveMetric {
  label: string;
  value: string;
  trend: number;
  description: string;
}

export const executiveMetrics: ExecutiveMetric[] = [
  { label: 'Automation Coverage', value: '72.4%', trend: 3.2, description: 'Test automation coverage across all domains' },
  { label: 'MTTR', value: '4.2 days', trend: -12.5, description: 'Mean Time To Resolution for all defects' },
  { label: 'Critical Open', value: '8.3%', trend: -5.1, description: 'Percentage of critical defects still open' },
  { label: 'Open vs Closed', value: '45 / 212', trend: -8.7, description: 'Currently open vs total closed defects' },
];

// ─── Project-wise MTTR ───
export interface ProjectMTTR {
  project: string;
  mttr: number;
}

export const projectMTTRData: ProjectMTTR[] = [
  { project: 'XD Order', mttr: 5.2 },
  { project: 'XD Platform Core', mttr: 3.8 },
  { project: 'XD Subscription', mttr: 6.7 },
  { project: 'XD Catalog', mttr: 4.1 },
  { project: 'XD Payments', mttr: 7.3 },
  { project: 'XD Shipping', mttr: 3.2 },
  { project: 'XD Notifications', mttr: 2.9 },
  { project: 'XD Search', mttr: 4.8 },
];

// ─── Test Cases Data ───
export interface TestCaseStats {
  total: number;
  executed: number;
  passed: number;
  failed: number;
  blocked: number;
  notRun: number;
}

export const testCasesByEnv: Record<Environment, TestCaseStats> = {
  'QA & IST':   { total: 1250, executed: 1100, passed: 980, failed: 85, blocked: 35, notRun: 150 },
  'Regression': { total: 890,  executed: 820,  passed: 760, failed: 42, blocked: 18, notRun: 70 },
  'UAT':        { total: 450,  executed: 380,  passed: 340, failed: 28, blocked: 12, notRun: 70 },
  'Production': { total: 200,  executed: 180,  passed: 168, failed: 8,  blocked: 4,  notRun: 20 },
};

export const performanceTCStats = { total: 320, executed: 294, passed: 276, failed: 12, blocked: 6, notRun: 26 };

export interface AutomationByDomain {
  domain: string;
  automated: number;
  notAutomated: number;
  notFeasible: number;
}

export const automationByDomain: AutomationByDomain[] = [
  { domain: 'Checkout',        automated: 180, notAutomated: 45, notFeasible: 15 },
  { domain: 'Payments',        automated: 150, notAutomated: 60, notFeasible: 20 },
  { domain: 'Catalog',         automated: 200, notAutomated: 30, notFeasible: 10 },
  { domain: 'Inventory',       automated: 120, notAutomated: 55, notFeasible: 25 },
  { domain: 'User Management', automated: 90,  notAutomated: 40, notFeasible: 10 },
  { domain: 'Search',          automated: 110, notAutomated: 35, notFeasible: 8  },
  { domain: 'Shipping',        automated: 85,  notAutomated: 50, notFeasible: 15 },
  { domain: 'Notifications',   automated: 70,  notAutomated: 30, notFeasible: 12 },
];

// ─── Release Board Data ───
export interface Ticket {
  key: string;
  summary: string;
  type: 'Story' | 'Bug';
  status: 'To Do' | 'In Progress' | 'In Review' | 'QA' | 'Done';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  assignee: string;
  hasFeatureFlag: boolean;
  requiresUAT: boolean;
  hasRollbackNotes: boolean;
  hasAcceptanceCriteria: boolean;
  hasReleaseNotes: boolean;
  readyToRelease: boolean;
}

const TICKET_TEMPLATES: Ticket[] = [
  { key:'', summary:'Implement multi-currency support', type:'Story', status:'Done', priority:'High', assignee:'John Smith', hasFeatureFlag:true, requiresUAT:true, hasRollbackNotes:true, hasAcceptanceCriteria:true, hasReleaseNotes:true, readyToRelease:true },
  { key:'', summary:'Add bulk order processing', type:'Story', status:'In Progress', priority:'High', assignee:'Sarah Johnson', hasFeatureFlag:false, requiresUAT:true, hasRollbackNotes:false, hasAcceptanceCriteria:true, hasReleaseNotes:true, readyToRelease:false },
  { key:'', summary:'Redesign checkout flow', type:'Story', status:'QA', priority:'Critical', assignee:'Mike Chen', hasFeatureFlag:true, requiresUAT:true, hasRollbackNotes:true, hasAcceptanceCriteria:true, hasReleaseNotes:false, readyToRelease:false },
  { key:'', summary:'Integrate new payment gateway', type:'Story', status:'In Review', priority:'Critical', assignee:'Emily Davis', hasFeatureFlag:true, requiresUAT:false, hasRollbackNotes:true, hasAcceptanceCriteria:true, hasReleaseNotes:true, readyToRelease:false },
  { key:'', summary:'Build inventory dashboard', type:'Story', status:'To Do', priority:'Medium', assignee:'Alex Wilson', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:true, hasReleaseNotes:false, readyToRelease:false },
  { key:'', summary:'Add product recommendations engine', type:'Story', status:'In Progress', priority:'Medium', assignee:'Lisa Brown', hasFeatureFlag:true, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:false, hasReleaseNotes:false, readyToRelease:false },
  { key:'', summary:'Implement SSO authentication', type:'Story', status:'Done', priority:'High', assignee:'David Lee', hasFeatureFlag:false, requiresUAT:true, hasRollbackNotes:true, hasAcceptanceCriteria:true, hasReleaseNotes:true, readyToRelease:true },
  { key:'', summary:'Add real-time push notifications', type:'Story', status:'QA', priority:'Medium', assignee:'Anna Taylor', hasFeatureFlag:true, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:true, hasReleaseNotes:false, readyToRelease:false },
  { key:'', summary:'Build executive reporting module', type:'Story', status:'To Do', priority:'Low', assignee:'John Smith', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:false, hasReleaseNotes:false, readyToRelease:false },
  { key:'', summary:'Optimize search with Elasticsearch', type:'Story', status:'In Progress', priority:'High', assignee:'Sarah Johnson', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:true, hasReleaseNotes:false, readyToRelease:false },
  { key:'', summary:'Add customer wishlist feature', type:'Story', status:'Done', priority:'Low', assignee:'Mike Chen', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:true, hasReleaseNotes:true, readyToRelease:true },
  { key:'', summary:'Implement real-time order tracking', type:'Story', status:'In Review', priority:'High', assignee:'Emily Davis', hasFeatureFlag:true, requiresUAT:true, hasRollbackNotes:true, hasAcceptanceCriteria:true, hasReleaseNotes:true, readyToRelease:false },
  { key:'', summary:'Fix cart calculation on discount', type:'Bug', status:'Done', priority:'Critical', assignee:'Alex Wilson', hasFeatureFlag:false, requiresUAT:true, hasRollbackNotes:false, hasAcceptanceCriteria:false, hasReleaseNotes:true, readyToRelease:true },
  { key:'', summary:'Resolve login redirect loop on Safari', type:'Bug', status:'In Progress', priority:'High', assignee:'Lisa Brown', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:false, hasReleaseNotes:false, readyToRelease:false },
  { key:'', summary:'Fix payment gateway timeout', type:'Bug', status:'QA', priority:'Critical', assignee:'David Lee', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:true, hasAcceptanceCriteria:false, hasReleaseNotes:true, readyToRelease:false },
  { key:'', summary:'Correct inventory sync delay', type:'Bug', status:'To Do', priority:'High', assignee:'Anna Taylor', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:false, hasReleaseNotes:false, readyToRelease:false },
  { key:'', summary:'Fix email notification delay', type:'Bug', status:'Done', priority:'Medium', assignee:'John Smith', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:false, hasReleaseNotes:false, readyToRelease:true },
  { key:'', summary:'Resolve search filter 500 crash', type:'Bug', status:'In Review', priority:'Critical', assignee:'Sarah Johnson', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:true, hasAcceptanceCriteria:false, hasReleaseNotes:false, readyToRelease:false },
  { key:'', summary:'Fix shipping cost calculation', type:'Bug', status:'Done', priority:'Medium', assignee:'Mike Chen', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:false, hasReleaseNotes:true, readyToRelease:true },
  { key:'', summary:'Correct user role permission bug', type:'Bug', status:'QA', priority:'High', assignee:'Emily Davis', hasFeatureFlag:false, requiresUAT:true, hasRollbackNotes:false, hasAcceptanceCriteria:false, hasReleaseNotes:false, readyToRelease:false },
  { key:'', summary:'Fix product image CDN loading issue', type:'Bug', status:'To Do', priority:'Low', assignee:'Alex Wilson', hasFeatureFlag:false, requiresUAT:false, hasRollbackNotes:false, hasAcceptanceCriteria:false, hasReleaseNotes:false, readyToRelease:false },
];

const RELEASE_TICKET_COUNT: Record<string, number> = {
  'Release 24.12': 21, 'Release 24.11': 18, 'Release 24.10': 15,
  'Release 24.9': 14,  'Release 24.8': 19,  'Release 24.7': 13,
};
SPRINT_RELEASES.forEach((r, i) => { RELEASE_TICKET_COUNT[r] = 10 + (i % 5) * 2; });

const RELEASE_TICKET_PREFIX: Record<string, number> = {
  'Release 24.12': 2100, 'Release 24.11': 2200, 'Release 24.10': 2300,
  'Release 24.9': 2400,  'Release 24.8': 2500,  'Release 24.7': 2600,
};
SPRINT_RELEASES.forEach((r, i) => { RELEASE_TICKET_PREFIX[r] = 3000 + i * 100; });

export const releaseTickets: Record<string, Ticket[]> = {};
[...['Release 24.12','Release 24.11','Release 24.10','Release 24.9','Release 24.8','Release 24.7'], ...SPRINT_RELEASES].forEach(rel => {
  const count = RELEASE_TICKET_COUNT[rel] ?? 15;
  const base = RELEASE_TICKET_PREFIX[rel] ?? 9000;
  releaseTickets[rel] = TICKET_TEMPLATES.slice(0, count).map((t, i) => ({ ...t, key: `ING-${base + i}` }));
});

// ─── UAT Status Matrix ───
export interface UATMatrixRow {
  status: string;
  count: number;
}

export const uatStatusMatrix: UATMatrixRow[] = [
  { status: 'Blocked',                    count: 1 },
  { status: 'In QA',                      count: 1 },
  { status: 'PO Review',                  count: 6 },
  { status: 'Ready for Product Release',  count: 1 },
];

// ─── Bugs aggregation helpers ───
export const getBugsByDomain = (defects: Defect[]): { domain: string; count: number }[] => {
  const map: Record<string, number> = {};
  defects.forEach(d => { map[d.domain] = (map[d.domain] || 0) + 1; });
  return Object.entries(map).map(([domain, count]) => ({ domain, count })).sort((a, b) => b.count - a.count);
};

export const getBugsByPriority = (defects: Defect[]): { priority: string; count: number }[] => {
  const map: Record<string, number> = {};
  defects.forEach(d => { map[d.priority] = (map[d.priority] || 0) + 1; });
  return priorities.map(p => ({ priority: p, count: map[p] || 0 }));
};

export const getBugsByRootCause = (defects: Defect[]): { cause: string; count: number }[] => {
  const map: Record<string, number> = {};
  defects.forEach(d => { map[d.rootCause] = (map[d.rootCause] || 0) + 1; });
  return Object.entries(map).map(([cause, count]) => ({ cause, count })).sort((a, b) => b.count - a.count);
};

export const getFunctionalVsPerformance = (defects: Defect[]): { name: string; value: number }[] => {
  let functional = 0, performance = 0;
  defects.forEach(d => { if (d.type === 'Functional') functional++; else performance++; });
  return [{ name: 'Functional', value: functional }, { name: 'Performance', value: performance }];
};

export const getManualVsAutomation = (defects: Defect[]): { name: string; value: number }[] => {
  let manual = 0, automation = 0;
  defects.forEach(d => { if (d.detectionMethod === 'Manual') manual++; else automation++; });
  return [{ name: 'Manual', value: manual }, { name: 'Automation', value: automation }];
};

// ─── Status x Priority Matrix ───
export const getStatusPriorityMatrix = (tickets: Ticket[]) => {
  const ticketStatuses: Ticket['status'][] = ['To Do','In Progress','In Review','QA','Done'];
  return ticketStatuses.map(status => {
    const row: Record<string, number | string> = { status };
    priorities.forEach(p => { row[p] = tickets.filter(t => t.status === status && t.priority === p).length; });
    row['Total'] = tickets.filter(t => t.status === status).length;
    return row;
  });
};

// ─── Stories & Tasks Data ───
export interface StoryTask {
  key: string;
  summary: string;
  type: 'Story' | 'Task' | 'Bug';
  status: 'Dev' | 'QA' | 'Open' | 'Done' | 'Other' | 'In Progress' | 'Blocked' | 'Closed';
  priority: 'P1/High' | 'P2' | 'P3/Low';
  assignee: string;
  storyPoints: number;
}

const storyStatuses: StoryTask['status'][] = ['Dev','QA','Open','Done','Other'];
const taskStatuses: StoryTask['status'][] = ['Open','In Progress','Blocked','Closed'];
const taskPriorities: StoryTask['priority'][] = ['P1/High','P2','P3/Low'];
const stAssignees = ['John Smith','Sarah Johnson','Mike Chen','Emily Davis','Alex Wilson','Lisa Brown','David Lee','Anna Taylor'];

const STORY_TASK_DATA: StoryTask[] = [
  ...Array.from({length:221}, (_,i) => ({
    key:`ST-${1000+i}`, summary:`Story ${i+1}: Feature implementation`, type:'Story' as const,
    status: storyStatuses[i % storyStatuses.length],
    priority: taskPriorities[i % taskPriorities.length],
    assignee: stAssignees[i % stAssignees.length],
    storyPoints: [1,2,3,5,8,13][i % 6],
  })),
  ...Array.from({length:523}, (_,i) => ({
    key:`TK-${2000+i}`, summary:`Task ${i+1}: Implementation task`, type:'Task' as const,
    status: taskStatuses[i % taskStatuses.length],
    priority: taskPriorities[i % taskPriorities.length],
    assignee: stAssignees[i % stAssignees.length],
    storyPoints: [1,2,3][i % 3],
  })),
  ...Array.from({length:33}, (_,i) => ({
    key:`BG-${3000+i}`, summary:`Bug ${i+1}: Defect report`, type:'Bug' as const,
    status: ['Open','In Progress','Done','Closed'][i % 4] as StoryTask['status'],
    priority: taskPriorities[i % taskPriorities.length],
    assignee: stAssignees[i % stAssignees.length],
    storyPoints: 0,
  })),
];

export const storiesTasksData = STORY_TASK_DATA;

// ─── Trends Data (sprint-level) ───
export interface TrendMetric {
  release: string;
  storyPoints: number;
  defectDensity: number;
  automationCoverage: number;
  ftr: number;  // First Time Right %
  mttr: number; // days
}

export const sprintTrendData: TrendMetric[] = SPRINT_RELEASES.map((r, i) => ({
  release: r,
  storyPoints: 42 + (i * 3) + (i % 3 === 0 ? -8 : i % 3 === 1 ? 5 : 2),
  defectDensity: parseFloat((4.2 - i * 0.15 + (i % 4 === 0 ? 0.8 : 0)).toFixed(2)),
  automationCoverage: Math.min(95, 62 + i * 2.1),
  ftr: parseFloat((78 + i * 0.9 + (i % 3 === 0 ? -2 : 1)).toFixed(1)),
  mttr: parseFloat((6.5 - i * 0.25 + (i % 5 === 0 ? 0.5 : 0)).toFixed(1)),
}));
