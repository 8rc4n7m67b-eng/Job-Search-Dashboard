import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  RadarController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Line, Doughnut, Radar, Pie } from 'react-chartjs-2'
import {
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  UserPlus,
  Activity,
  Clock,
  AlertCircle,
  GitPullRequest,
  MessageSquare,
  Zap,
} from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  RadarController,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export const Route = createFileRoute('/')({
  component: Home,
})

// ─── Mock Data ────────────────────────────────────────────────────────────────

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']

const revenueData = {
  labels: months,
  datasets: [
    {
      label: 'This Year ($)',
      data: [42000, 58000, 51000, 73000, 68000, 89000, 82000, 97000, 91000, 112000, 104000, 138000],
      backgroundColor: 'rgba(99, 102, 241, 0.85)',
      borderRadius: 8,
    },
    {
      label: 'Last Year ($)',
      data: [31000, 44000, 38000, 55000, 49000, 67000, 61000, 75000, 70000, 88000, 80000, 103000],
      backgroundColor: 'rgba(196, 181, 253, 0.6)',
      borderRadius: 8,
    },
  ],
}

const userActivityData = {
  labels: weeks,
  datasets: [
    {
      label: 'Daily Active Users',
      data: [3200, 4100, 3800, 5200, 4700, 6100, 5800, 7300, 6900, 8100, 7700, 9200],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(16, 185, 129)',
      pointRadius: 5,
    },
    {
      label: 'New Signups',
      data: [420, 580, 510, 730, 680, 890, 820, 970, 910, 1120, 1040, 1380],
      borderColor: 'rgb(245, 158, 11)',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(245, 158, 11)',
      pointRadius: 5,
    },
  ],
}

const revenueDeptData = {
  labels: ['Engineering', 'Sales', 'Marketing', 'Support', 'Design', 'Operations'],
  datasets: [
    {
      data: [38, 27, 16, 9, 6, 4],
      backgroundColor: [
        'rgba(99, 102, 241, 0.9)',
        'rgba(16, 185, 129, 0.9)',
        'rgba(245, 158, 11, 0.9)',
        'rgba(239, 68, 68, 0.9)',
        'rgba(236, 72, 153, 0.9)',
        'rgba(20, 184, 166, 0.9)',
      ],
      borderWidth: 2,
      borderColor: '#fff',
    },
  ],
}

const teamPerformanceRadar = {
  labels: ['Velocity', 'Quality', 'Collaboration', 'Delivery', 'Innovation', 'Communication'],
  datasets: [
    {
      label: 'Team Alpha',
      data: [88, 92, 79, 85, 71, 90],
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: 'rgba(99, 102, 241, 1)',
      pointBackgroundColor: 'rgba(99, 102, 241, 1)',
      pointRadius: 5,
    },
    {
      label: 'Team Beta',
      data: [74, 85, 91, 78, 88, 82],
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: 'rgba(16, 185, 129, 1)',
      pointBackgroundColor: 'rgba(16, 185, 129, 1)',
      pointRadius: 5,
    },
    {
      label: 'Team Gamma',
      data: [81, 77, 86, 92, 80, 75],
      backgroundColor: 'rgba(245, 158, 11, 0.2)',
      borderColor: 'rgba(245, 158, 11, 1)',
      pointBackgroundColor: 'rgba(245, 158, 11, 1)',
      pointRadius: 5,
    },
  ],
}

const ticketStatusData = {
  labels: ['Resolved', 'In Progress', 'Open', 'Escalated'],
  datasets: [
    {
      data: [62, 19, 13, 6],
      backgroundColor: [
        'rgba(16, 185, 129, 0.9)',
        'rgba(99, 102, 241, 0.9)',
        'rgba(245, 158, 11, 0.9)',
        'rgba(239, 68, 68, 0.9)',
      ],
      borderWidth: 2,
      borderColor: '#fff',
    },
  ],
}

const weeklyOutputData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Commits',
      data: [42, 67, 55, 78, 61],
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      borderRadius: 6,
    },
    {
      label: 'PRs Merged',
      data: [8, 13, 10, 16, 11],
      backgroundColor: 'rgba(236, 72, 153, 0.8)',
      borderRadius: 6,
    },
    {
      label: 'Reviews',
      data: [15, 22, 19, 28, 21],
      backgroundColor: 'rgba(20, 184, 166, 0.8)',
      borderRadius: 6,
    },
  ],
}

// ─── KPI Cards ────────────────────────────────────────────────────────────────

const kpis = [
  { title: 'Total Revenue', value: '$1.24M', change: '+18.3%', positive: true, icon: DollarSign, color: 'from-indigo-500 to-violet-600' },
  { title: 'Active Users', value: '12,840', change: '+24.1%', positive: true, icon: Users, color: 'from-emerald-500 to-teal-600' },
  { title: 'Productivity', value: '94.2%', change: '+5.7%', positive: true, icon: TrendingUp, color: 'from-amber-500 to-orange-600' },
  { title: 'Tickets Resolved', value: '3,429', change: '+11.2%', positive: true, icon: CheckCircle, color: 'from-rose-500 to-pink-600' },
  { title: 'Satisfaction', value: '4.8 / 5', change: '+0.3', positive: true, icon: Star, color: 'from-yellow-400 to-amber-500' },
  { title: 'New Signups', value: '2,341', change: '+31.5%', positive: true, icon: UserPlus, color: 'from-sky-500 to-blue-600' },
]

// ─── Team Members ─────────────────────────────────────────────────────────────

const teamMembers = [
  { name: 'Aisha Okonkwo', role: 'Engineering Lead', tasks: 47, score: 98, status: 'active', avatar: 'AO' },
  { name: 'Marcus Reyes', role: 'Product Manager', tasks: 38, score: 94, status: 'active', avatar: 'MR' },
  { name: 'Sophie Laurent', role: 'UX Designer', tasks: 31, score: 91, status: 'active', avatar: 'SL' },
  { name: 'James Nakamura', role: 'Backend Engineer', tasks: 52, score: 96, status: 'active', avatar: 'JN' },
  { name: 'Priya Sharma', role: 'Data Analyst', tasks: 29, score: 89, status: 'away', avatar: 'PS' },
  { name: 'Luca Bianchi', role: 'DevOps Engineer', tasks: 41, score: 93, status: 'active', avatar: 'LB' },
]

const avatarColors = ['bg-indigo-500', 'bg-emerald-500', 'bg-pink-500', 'bg-amber-500', 'bg-sky-500', 'bg-teal-500']

// ─── Activity Feed ────────────────────────────────────────────────────────────

const activities = [
  { icon: GitPullRequest, color: 'text-indigo-500 bg-indigo-50', message: 'James merged PR #482 — Auth refresh tokens', time: '2 min ago' },
  { icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50', message: 'Ticket #1204 resolved by Aisha — API rate limiting', time: '14 min ago' },
  { icon: UserPlus, color: 'text-sky-500 bg-sky-50', message: '38 new users signed up in the last hour', time: '1 hr ago' },
  { icon: AlertCircle, color: 'text-rose-500 bg-rose-50', message: 'Escalation #88 assigned to Luca — infra latency spike', time: '2 hr ago' },
  { icon: MessageSquare, color: 'text-amber-500 bg-amber-50', message: 'Priya posted Q3 data analysis report', time: '3 hr ago' },
  { icon: Zap, color: 'text-pink-500 bg-pink-50', message: 'Deploy pipeline completed in 1m 42s — production', time: '4 hr ago' },
  { icon: Star, color: 'text-yellow-500 bg-yellow-50', message: 'Customer ACME Corp gave a 5-star rating', time: '5 hr ago' },
  { icon: Activity, color: 'text-teal-500 bg-teal-50', message: 'Weekly sprint velocity improved by 12%', time: '6 hr ago' },
]

// ─── Chart Options ────────────────────────────────────────────────────────────

const baseOptions = {
  responsive: true,
  plugins: { legend: { position: 'top' as const } },
}

const noLegend = { ...baseOptions, plugins: { legend: { display: false } } }

// ─── Component ────────────────────────────────────────────────────────────────

function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-600 uppercase tracking-widest">Live</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Team Dashboard</h1>
          <p className="text-gray-500 mt-1">Internal metrics, performance, and activity — updated in real time</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div
              key={kpi.title}
              className="rounded-2xl overflow-hidden shadow-md"
            >
              <div className={`bg-gradient-to-br ${kpi.color} p-4 text-white`}>
                <kpi.icon className="w-5 h-5 mb-2 opacity-90" />
                <p className="text-2xl font-extrabold leading-tight">{kpi.value}</p>
                <p className="text-xs font-semibold opacity-80 mt-1">{kpi.title}</p>
              </div>
              <div className="bg-white px-4 py-2 text-xs font-semibold text-emerald-600">
                {kpi.change} vs last period
              </div>
            </div>
          ))}
        </div>

        {/* Row 1: Revenue Bar + User Activity Line */}
        {mounted && (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Monthly Revenue</h2>
                  <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full">YoY</span>
                </div>
                <Bar
                  data={revenueData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'top' } },
                    scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }, x: { grid: { display: false } } },
                  }}
                />
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">User Activity</h2>
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 rounded-full">12 Weeks</span>
                </div>
                <Line
                  data={userActivityData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'top' } },
                    scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }, x: { grid: { display: false } } },
                  }}
                />
              </div>
            </div>

            {/* Row 2: Radar + Doughnut + Pie */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-2xl shadow-md p-6 md:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Team Performance</h2>
                  <span className="text-xs bg-violet-100 text-violet-700 font-semibold px-3 py-1 rounded-full">Radar</span>
                </div>
                <Radar
                  data={teamPerformanceRadar}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                    scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 25 } } },
                  }}
                />
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Revenue by Dept</h2>
                  <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-3 py-1 rounded-full">Doughnut</span>
                </div>
                <div className="max-w-xs mx-auto">
                  <Doughnut
                    data={revenueDeptData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: 'bottom' } },
                      cutout: '65%',
                    }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Ticket Status</h2>
                  <span className="text-xs bg-rose-100 text-rose-700 font-semibold px-3 py-1 rounded-full">Pie</span>
                </div>
                <div className="max-w-xs mx-auto">
                  <Pie
                    data={ticketStatusData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: 'bottom' } },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Weekly Output Bar + Team Table + Activity Feed */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Grouped Bar */}
              <div className="bg-white rounded-2xl shadow-md p-6 xl:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Weekly Output</h2>
                  <span className="text-xs bg-teal-100 text-teal-700 font-semibold px-3 py-1 rounded-full">This Week</span>
                </div>
                <Bar
                  data={weeklyOutputData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'top' } },
                    scales: {
                      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                      x: { grid: { display: false } },
                    },
                  }}
                />
              </div>

              {/* Team Table */}
              <div className="bg-white rounded-2xl shadow-md p-6 xl:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Team Members</h2>
                  <span className="text-xs bg-sky-100 text-sky-700 font-semibold px-3 py-1 rounded-full">{teamMembers.length} people</span>
                </div>
                <div className="space-y-3">
                  {teamMembers.map((member, i) => (
                    <div key={member.name} className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{member.name}</p>
                        <p className="text-xs text-gray-500 truncate">{member.role}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-gray-800">{member.score}<span className="text-xs text-gray-400">/100</span></p>
                        <div className="flex items-center gap-1 justify-end">
                          <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                          <p className="text-xs text-gray-400 capitalize">{member.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-white rounded-2xl shadow-md p-6 xl:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Activity Feed</h2>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-600 font-semibold">Live</span>
                  </div>
                </div>
                <div className="space-y-3 overflow-y-auto max-h-80">
                  {activities.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-lg flex-shrink-0 ${item.color}`}>
                        <item.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700 leading-snug">{item.message}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-400">{item.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
