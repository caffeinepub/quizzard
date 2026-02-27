import { Link, useNavigate } from '@tanstack/react-router';
import { Flame, CheckCircle, Target, Zap, ArrowRight, Sparkles, Play, RotateCcw } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockUser, mockWeeklyPerformance, mockRecentQuizzes, mockLeaderboard, mockQuizzes } from '@/lib/mockData';
import { getDifficultyColor } from '@/lib/utils';

export function StudentDashboard() {
  const navigate = useNavigate();
  const topLeaderboard = mockLeaderboard.slice(0, 5);
  const recommended = mockQuizzes.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            Welcome back, <span className="gradient-primary-text">{mockUser.name.split(' ')[0]}!</span> 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Level {mockUser.level} · {mockUser.xp.toLocaleString()} XP · {mockUser.streak} day streak 🔥
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/generate">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Quiz
            </Button>
          </Link>
          <Link to="/library">
            <Button variant="outline">
              Browse Library
            </Button>
          </Link>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Flame, label: 'Day Streak', value: `${mockUser.streak}`, unit: 'days', color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { icon: CheckCircle, label: 'Quizzes Done', value: `${mockUser.quizzesCompleted}`, unit: 'total', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { icon: Target, label: 'Accuracy', value: `${mockUser.accuracy}%`, unit: 'avg', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
          { icon: Zap, label: 'Total XP', value: mockUser.xp.toLocaleString(), unit: 'points', color: 'text-violet-500', bg: 'bg-violet-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 hover:shadow-card-hover transition-all">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-display font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue Last Quiz */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30 mb-2">Continue Learning</Badge>
                <h3 className="font-display text-lg font-bold">Advanced Mathematics</h3>
                <p className="text-muted-foreground text-sm mt-1">Question 7 of 20 · 65% complete</p>
              </div>
              <Button
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
                onClick={() => navigate({ to: '/quiz/$id', params: { id: 'last' } })}
              >
                <Play className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
            <Progress value={65} className="h-2" />
          </div>

          {/* Weekly Performance Chart */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-display font-bold mb-4">Weekly Performance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={mockWeeklyPerformance}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 280 / 0.3)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: 'oklch(0.17 0.04 280)', border: '1px solid oklch(0.25 0.04 280)', borderRadius: '8px' }}
                  labelStyle={{ color: 'white' }}
                />
                <Area type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={2} fill="url(#scoreGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Quizzes */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold">Recent Quizzes</h3>
              <Link to="/library" className="text-violet-500 hover:text-violet-400 text-sm flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {mockRecentQuizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center">
                      <Target className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{quiz.title}</p>
                      <p className="text-xs text-muted-foreground">{quiz.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-sm">{Math.round((quiz.score / quiz.total) * 100)}%</p>
                      <p className="text-xs text-muted-foreground">{quiz.score}/{quiz.total}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-3"
                      onClick={() => navigate({ to: '/quiz/$id', params: { id: quiz.id } })}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Level Progress */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold">Level Progress</h3>
              <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30">Lv. {mockUser.level}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>{mockUser.xp.toLocaleString()} XP</span>
              <span>{mockUser.xpToNext.toLocaleString()} XP</span>
            </div>
            <Progress value={(mockUser.xp / mockUser.xpToNext) * 100} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">{mockUser.xpToNext - mockUser.xp} XP to Level {mockUser.level + 1}</p>
          </div>

          {/* Leaderboard Widget */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold">Leaderboard</h3>
              <Link to="/leaderboard" className="text-violet-500 hover:text-violet-400 text-sm flex items-center gap-1">
                Full <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {topLeaderboard.map((user) => (
                <div key={user.rank} className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${user.isCurrentUser ? 'bg-violet-500/10 border border-violet-500/20' : 'hover:bg-muted/50'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.rank === 1 ? 'bg-amber-500/20 text-amber-500' :
                    user.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                    user.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-violet-500">{user.xp.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommended */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <h3 className="font-display font-bold">AI Recommended</h3>
            </div>
            <div className="space-y-3">
              {recommended.map((quiz) => (
                <div key={quiz.id} className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{quiz.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={`text-xs px-1.5 py-0 ${getDifficultyColor(quiz.difficulty)}`}>
                          {quiz.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{quiz.questions}Q</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="h-7 px-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 text-xs"
                      onClick={() => navigate({ to: '/quiz/$id', params: { id: quiz.id } })}
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
