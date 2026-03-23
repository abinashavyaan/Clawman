import { format, parseISO, isAfter, subDays, formatDistanceToNow } from 'date-fns';

export const agents = [
  {
    id: 'a1',
    name: 'Agent Alpha',
    emoji: '🤖',
    type: 'Code Agent',
    role: 'Lead Engineer',
    color: 'primary',
    status: 'active',
    tasksCompleted: 1240,
    accuracy: 99.2,
    skills: ['React', 'Node.js', 'Python', 'System Design'],
    currentActivity: 'Refactoring auth module',
    lastSeen: new Date().toISOString(),
  },
  {
    id: 'a2',
    name: 'Dispatch Bot',
    emoji: '📋',
    type: 'Coordinator',
    role: 'Operations Director',
    color: 'amber',
    status: 'idle',
    tasksCompleted: 8530,
    accuracy: 99.9,
    skills: ['Routing', 'Scheduling', 'Load Balancing'],
    currentActivity: 'Waiting for tasks',
    lastSeen: subDays(new Date(), 0).toISOString(),
  },
  {
    id: 'a3',
    name: 'Audit Bot',
    emoji: '🛡️',
    type: 'Quality Agent',
    role: 'Compliance Officer',
    color: 'cyan',
    status: 'active',
    tasksCompleted: 412,
    accuracy: 100,
    skills: ['Security', 'Testing', 'Code Review'],
    currentActivity: 'Scanning PR #402',
    lastSeen: new Date().toISOString(),
  }
];

export const tasks = [
  { id: 't1', title: 'Implement OAuth2 flow', status: 'doing', agentId: 'a1', progress: 65, priority: 'high' },
  { id: 't2', title: 'Review Q3 compliance report', status: 'todo', agentId: 'a3', progress: 0, priority: 'medium' },
  { id: 't3', title: 'Assign incoming support tickets', status: 'doing', agentId: 'a2', progress: 80, priority: 'urgent' },
  { id: 't4', title: 'Update dependencies', status: 'done', agentId: 'a1', progress: 100, priority: 'low' },
  { id: 't5', title: 'Security scan on main branch', status: 'needs_input', agentId: 'a3', progress: 40, priority: 'high' },
  { id: 't6', title: 'Optimize database queries', status: 'todo', agentId: 'a1', progress: 0, priority: 'medium' },
  { id: 't7', title: 'Generate weekly metrics', status: 'done', agentId: 'a2', progress: 100, priority: 'low' },
  { id: 't8', title: 'Fix memory leak in worker', status: 'doing', agentId: 'a1', progress: 30, priority: 'urgent' },
  { id: 't9', title: 'Audit new vendor API', status: 'todo', agentId: 'a3', progress: 0, priority: 'high' },
  { id: 't10', title: 'Rebalance server load', status: 'needs_input', agentId: 'a2', progress: 90, priority: 'medium' },
];

export const logs = [
  { id: 'l1', agentId: 'a1', category: 'observation', message: 'Detected unusual latency in API gateway.', timestamp: subDays(new Date(), 0).toISOString() },
  { id: 'l2', agentId: 'a2', category: 'general', message: 'Routed 450 requests to US-East region.', timestamp: subDays(new Date(), 0).toISOString() },
  { id: 'l3', agentId: 'a3', category: 'reminder', message: 'SSL certificate expires in 14 days.', timestamp: subDays(new Date(), 1).toISOString() },
  { id: 'l4', agentId: 'a1', category: 'fyi', message: 'Completed refactoring of user service.', timestamp: subDays(new Date(), 1).toISOString() },
  { id: 'l5', agentId: 'a3', category: 'observation', message: 'Found 3 vulnerable packages in package-lock.json.', timestamp: subDays(new Date(), 2).toISOString() },
  { id: 'l6', agentId: 'a2', category: 'general', message: 'Scaled up worker nodes due to high queue depth.', timestamp: subDays(new Date(), 2).toISOString() },
  { id: 'l7', agentId: 'a1', category: 'fyi', message: 'Deployed v2.4.1 to staging.', timestamp: subDays(new Date(), 3).toISOString() },
  { id: 'l8', agentId: 'a3', category: 'reminder', message: 'Quarterly access review is due next week.', timestamp: subDays(new Date(), 3).toISOString() },
];

export const councilSessions = [
  {
    id: 'c1',
    question: 'Should we migrate from REST to GraphQL for the public API?',
    status: 'active',
    messages: [
      { id: 'm1', agentId: 'a1', text: 'GraphQL will solve our over-fetching issues on mobile clients and provide a better DX for integrators.', timestamp: subDays(new Date(), 0).toISOString() },
      { id: 'm2', agentId: 'a3', text: 'I have concerns about the security implications. GraphQL endpoints are harder to rate-limit and protect against complex query attacks.', timestamp: subDays(new Date(), 0).toISOString() },
      { id: 'm3', agentId: 'a1', text: 'We can implement query depth limiting and cost analysis to mitigate those risks. The performance benefits outweigh the setup cost.', timestamp: subDays(new Date(), 0).toISOString() },
    ]
  },
  {
    id: 'c2',
    question: 'How to handle the upcoming surge in holiday traffic?',
    status: 'resolved',
    messages: [
      { id: 'm4', agentId: 'a2', text: 'Based on historical data, we need to pre-provision at least 50% more read replicas.', timestamp: subDays(new Date(), 5).toISOString() },
      { id: 'm5', agentId: 'a1', text: 'Agreed. I can write a script to automate the scaling based on real-time queue metrics rather than just a static increase.', timestamp: subDays(new Date(), 5).toISOString() },
      { id: 'm6', agentId: 'a2', text: 'Perfect. I will coordinate the deployment of that script during the next maintenance window.', timestamp: subDays(new Date(), 5).toISOString() },
    ]
  }
];

export const meetings = [
  {
    id: 'mtg1',
    type: 'meeting',
    title: 'Weekly Standup with Engineering',
    date: new Date().toISOString(),
    duration_minutes: 30,
    duration_display: '30m',
    attendees: ['Alice', 'Bob', 'Charlie'],
    summary: 'Discussed sprint progress. Backend API 80% complete. Frontend is waiting on the new design assets. No major blockers reported.',
    action_items: [
      { task: 'Review PR #42', assignee: 'Alice', done: false },
      { task: 'Update docs', assignee: 'Bob', done: true }
    ],
    ai_insights: '30 min meeting with 3 attendees. Sentiment was generally positive.',
    meeting_type: 'standup',
    sentiment: 'positive',
    has_external_participants: false,
    external_domains: [],
  },
  {
    id: 'mtg2',
    type: 'meeting',
    title: 'Acme Corp Sales Pitch',
    date: subDays(new Date(), 1).toISOString(),
    duration_minutes: 45,
    duration_display: '45m',
    attendees: ['David', 'Eve', 'Frank (Acme)'],
    summary: 'Presented the new enterprise tier features. Client was very interested in the SLA guarantees. They requested a custom pricing quote for 500 seats.',
    action_items: [
      { task: 'Draft custom pricing proposal', assignee: 'David', done: false },
      { task: 'Send follow-up email with case studies', assignee: 'Eve', done: false }
    ],
    ai_insights: 'Client showed high engagement during the security portion.',
    meeting_type: 'sales',
    sentiment: 'positive',
    has_external_participants: true,
    external_domains: ['acme.com'],
  },
  {
    id: 'mtg3',
    type: 'meeting',
    title: 'Q3 Roadmap Planning',
    date: subDays(new Date(), 2).toISOString(),
    duration_minutes: 120,
    duration_display: '2h',
    attendees: ['Alice', 'David', 'Grace', 'Heidi'],
    summary: 'Finalized the top 3 priorities for Q3: 1. Mobile App MVP, 2. SOC2 Compliance, 3. Self-serve onboarding. Allocated engineering resources accordingly.',
    action_items: [
      { task: 'Create epic for Mobile App', assignee: 'Alice', done: true },
      { task: 'Schedule kickoff for SOC2', assignee: 'Grace', done: false }
    ],
    ai_insights: 'Longest meeting this week. Clear alignment achieved.',
    meeting_type: 'planning',
    sentiment: 'neutral',
    has_external_participants: false,
    external_domains: [],
  },
  {
    id: 'mtg4',
    type: 'meeting',
    title: '1-on-1: Alice & Bob',
    date: subDays(new Date(), 3).toISOString(),
    duration_minutes: 30,
    duration_display: '30m',
    attendees: ['Alice', 'Bob'],
    summary: 'Discussed Bob\'s career progression. He is interested in taking on more architectural responsibilities. Set goals for the next quarter.',
    action_items: [
      { task: 'Find a mentorship opportunity for Bob', assignee: 'Alice', done: false }
    ],
    ai_insights: 'Focus on career growth and architecture.',
    meeting_type: '1-on-1',
    sentiment: 'positive',
    has_external_participants: false,
    external_domains: [],
  },
  {
    id: 'mtg5',
    type: 'meeting',
    title: 'Vendor Review: Cloudflare',
    date: subDays(new Date(), 4).toISOString(),
    duration_minutes: 60,
    duration_display: '1h',
    attendees: ['Charlie', 'Grace', 'Ivan (Cloudflare)'],
    summary: 'Reviewed current usage and pricing. Discussed upgrading to the Enterprise plan for better DDoS protection and dedicated support.',
    action_items: [
      { task: 'Analyze cost impact of Enterprise plan', assignee: 'Charlie', done: false }
    ],
    ai_insights: 'Potential cost increase identified. Needs further analysis.',
    meeting_type: 'external',
    sentiment: 'neutral',
    has_external_participants: true,
    external_domains: ['cloudflare.com'],
  },
  {
    id: 'mtg6',
    type: 'meeting',
    title: 'All-Hands',
    date: subDays(new Date(), 5).toISOString(),
    duration_minutes: 60,
    duration_display: '1h',
    attendees: ['Everyone'],
    summary: 'Company update from the CEO. Celebrated Q2 milestones. Welcomed 5 new hires. Q&A session at the end covered return-to-office policy.',
    action_items: [],
    ai_insights: 'High attendance. Positive reactions to milestones.',
    meeting_type: 'team',
    sentiment: 'positive',
    has_external_participants: false,
    external_domains: [],
  },
  {
    id: 'mtg7',
    type: 'meeting',
    title: 'Frontend Sync',
    date: subDays(new Date(), 6).toISOString(),
    duration_minutes: 30,
    duration_display: '30m',
    attendees: ['Bob', 'Heidi', 'Judy'],
    summary: 'Aligned on the new component library strategy. Decided to adopt Tailwind CSS for all new projects. Assigned migration tasks.',
    action_items: [
      { task: 'Setup Tailwind in the main repo', assignee: 'Bob', done: true },
      { task: 'Create migration guide', assignee: 'Heidi', done: false }
    ],
    ai_insights: 'Technical decision made: Tailwind CSS.',
    meeting_type: 'standup',
    sentiment: 'positive',
    has_external_participants: false,
    external_domains: [],
  },
  {
    id: 'mtg8',
    type: 'meeting',
    title: 'Candidate Interview: Senior Backend',
    date: subDays(new Date(), 7).toISOString(),
    duration_minutes: 60,
    duration_display: '1h',
    attendees: ['Alice', 'Charlie', 'Kevin (Candidate)'],
    summary: 'Technical interview covering system design and database optimization. Candidate showed strong knowledge of PostgreSQL but struggled slightly with distributed caching concepts.',
    action_items: [
      { task: 'Submit interview feedback', assignee: 'Alice', done: true },
      { task: 'Submit interview feedback', assignee: 'Charlie', done: true }
    ],
    ai_insights: 'Mixed technical performance. Strong DB skills.',
    meeting_type: '1-on-1', // Reusing type for simplicity
    sentiment: 'neutral',
    has_external_participants: true,
    external_domains: ['gmail.com'],
  }
];
