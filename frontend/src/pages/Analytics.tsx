import { useState } from 'react';
import { TrendingUp, CheckCircle, Users, ArrowUp, Download } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockPerformanceOverTime, mockTopicScores, mockQuestionTypeDistribution, mockStudents } from '@/lib/mockData';
import { toast } from 'sonner';

export function Analytics() {
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-02-27');

  const handleExport = () => {
    toast.info('CSV export feature coming soon!');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track performance and learning outcomes</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Date Range Picker */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-card border border-border rounded-xl">
        <span className="text-sm font-medium text-muted-foreground">Date Range:</span>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
          <span className="text-muted-foreground">to</span>
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
        </div>
        <Button size="sm" className="h-9 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
          Apply
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: 'Avg Score', value: '84%', change: '+2%', color: 'text-violet-500', bg: 'bg-violet-500/10' },
          { icon: CheckCircle, label: 'Completion Rate', value: '92%', change: '+5%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { icon: Users, label: 'Total Attempts', value: '1,234', change: '+89', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
          { icon: ArrowUp, label: 'Improvement Rate', value: '+12%', change: '+3%', color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-display font-bold">{stat.value}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className="text-xs text-emerald-500 font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display font-bold mb-4">Performance Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockPerformanceOverTime}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 280 / 0.3)" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'oklch(0.17 0.04 280)', border: '1px solid oklch(0.25 0.04 280)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={2} dot={{ fill: '#7C3AED', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display font-bold mb-4">Scores by Topic</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockTopicScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 280 / 0.3)" />
              <XAxis dataKey="topic" tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'oklch(0.17 0.04 280)', border: '1px solid oklch(0.25 0.04 280)', borderRadius: '8px' }} />
              <Bar dataKey="score" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart + Student Table */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display font-bold mb-4">Question Type Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={mockQuestionTypeDistribution}
                cx="50%" cy="50%"
                innerRadius={50} outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {mockQuestionTypeDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'oklch(0.17 0.04 280)', border: '1px solid oklch(0.25 0.04 280)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {mockQuestionTypeDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-display font-bold">Student Progress</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-right">Quizzes</TableHead>
                  <TableHead className="text-right">Avg Score</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStudents.map(student => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{student.quizzesTaken}</TableCell>
                    <TableCell className="text-right">
                      <span className={`font-semibold ${student.avgScore >= 90 ? 'text-emerald-500' : student.avgScore >= 80 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                        {student.avgScore}%
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-muted-foreground text-sm">
                      {student.lastActive}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
