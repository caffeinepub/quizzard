import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Users, FileText, TrendingUp, CheckCircle, FilePlus, Edit, Trash2, Database, Clock, Star, UserPlus } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockTeacherQuizzes, mockTopicScores, mockWeeklyPerformance, mockActivityFeed } from '@/lib/mockData';

export function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState(mockTeacherQuizzes);

  const handleDelete = (id: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your quizzes and track student progress</p>
        </div>
        <Link to="/create-quiz">
          <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0">
            <FilePlus className="w-4 h-4 mr-2" />
            Create Quiz
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Students', value: '156', change: '+12', color: 'text-violet-500', bg: 'bg-violet-500/10' },
          { icon: FileText, label: 'Quizzes Created', value: '23', change: '+3', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
          { icon: TrendingUp, label: 'Avg Score', value: '84%', change: '+2%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { icon: CheckCircle, label: 'Completion Rate', value: '92%', change: '+5%', color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5 hover:shadow-card-hover transition-all">
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

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Manage Quizzes Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-display font-bold">Manage Quizzes</h3>
              <Link to="/create-quiz">
                <Button size="sm" variant="outline" className="h-8">
                  <FilePlus className="w-3.5 h-3.5 mr-1.5" />
                  New Quiz
                </Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Subject</TableHead>
                    <TableHead className="hidden md:table-cell">Questions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">{quiz.title}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{quiz.subject}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{quiz.questions}</TableCell>
                      <TableCell>
                        <Badge variant={quiz.status === 'Published' ? 'default' : 'secondary'} className={quiz.status === 'Published' ? 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30' : ''}>
                          {quiz.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive" onClick={() => handleDelete(quiz.id)}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Charts */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-bold mb-4">Topic Scores</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={mockTopicScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 280 / 0.3)" />
                  <XAxis dataKey="topic" tick={{ fontSize: 11 }} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'oklch(0.17 0.04 280)', border: '1px solid oklch(0.25 0.04 280)', borderRadius: '8px' }} />
                  <Bar dataKey="score" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-bold mb-4">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={mockWeeklyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 280 / 0.3)" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'oklch(0.17 0.04 280)', border: '1px solid oklch(0.25 0.04 280)', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="score" stroke="#06B6D4" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Question Bank Summary */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-violet-400" />
              <h3 className="font-display font-bold">Question Bank</h3>
            </div>
            <div className="text-3xl font-display font-bold mb-1">145</div>
            <p className="text-muted-foreground text-sm mb-4">Total questions</p>
            <div className="space-y-2">
              {[
                { type: 'MCQ', count: 89, color: 'bg-violet-500' },
                { type: 'True/False', count: 32, color: 'bg-cyan-500' },
                { type: 'Fill-in-blanks', count: 24, color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-muted-foreground">{item.type}</span>
                  </div>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
            <Link to="/question-bank">
              <Button variant="outline" className="w-full mt-4 h-9 text-sm">
                Manage Question Bank
              </Button>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display font-bold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {mockActivityFeed.map((activity) => {
                const icons: Record<string, React.ElementType> = { check: CheckCircle, plus: FilePlus, trophy: Star, user: UserPlus, star: Star };
                const Icon = icons[activity.icon] || Clock;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.event}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
