import { useState } from 'react';
import { Lock, Flame, Zap } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockAchievements, mockUser } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Learning', 'Streak', 'Social', 'Speed'];

function CalendarHeatmap() {
  const today = new Date();
  const days = Array.from({ length: 84 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (83 - i));
    const activity = Math.random();
    return {
      date: d,
      level: i > 77 ? 3 : activity > 0.7 ? 3 : activity > 0.5 ? 2 : activity > 0.3 ? 1 : 0,
    };
  });

  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const levelColors = [
    'bg-muted',
    'bg-violet-300 dark:bg-violet-800',
    'bg-violet-500 dark:bg-violet-600',
    'bg-violet-700 dark:bg-violet-400',
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                title={day.date.toLocaleDateString()}
                className={cn('w-3 h-3 rounded-sm transition-colors', levelColors[day.level])}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Achievements() {
  const [category, setCategory] = useState('All');

  const filtered = mockAchievements.filter(a =>
    category === 'All' || a.category === category
  );

  const earned = mockAchievements.filter(a => a.earned).length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Achievements</h1>
        <p className="text-muted-foreground mt-1">{earned} of {mockAchievements.length} achievements unlocked</p>
      </div>

      {/* Level Progress */}
      <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-display font-bold text-xl">
              {mockUser.level}
            </div>
            <div>
              <p className="font-display font-bold text-lg">Level {mockUser.level}</p>
              <p className="text-muted-foreground text-sm">Knowledge Master</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg gradient-primary-text">{mockUser.xp.toLocaleString()} XP</p>
            <p className="text-xs text-muted-foreground">{mockUser.xpToNext - mockUser.xp} to next level</p>
          </div>
        </div>
        <Progress value={(mockUser.xp / mockUser.xpToNext) * 100} className="h-3" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Level {mockUser.level}</span>
          <span>Level {mockUser.level + 1}</span>
        </div>
      </div>

      {/* Streak Tracker */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h3 className="font-display font-bold">Activity Streak</h3>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-500">{mockUser.streak} days</span>
          </div>
        </div>
        <CalendarHeatmap />
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {['bg-muted', 'bg-violet-300 dark:bg-violet-800', 'bg-violet-500', 'bg-violet-700 dark:bg-violet-400'].map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={category} onValueChange={setCategory}>
        <TabsList className="flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {CATEGORIES.map(cat => (
            <TabsTrigger key={cat} value={cat} className="text-xs sm:text-sm">{cat}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(badge => (
          <div
            key={badge.id}
            className={cn(
              'p-5 rounded-xl border text-center transition-all duration-200',
              badge.earned
                ? 'bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border-violet-500/30 hover:-translate-y-0.5 hover:shadow-card-hover'
                : 'bg-muted/30 border-border opacity-60'
            )}
          >
            <div className="relative inline-block mb-3">
              <span className="text-4xl">{badge.icon}</span>
              {!badge.earned && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-full">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
            <p className={cn('font-semibold text-sm mb-1', !badge.earned && 'text-muted-foreground')}>
              {badge.title}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
            {badge.earned && badge.earnedDate && (
              <Badge className="mt-2 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs">
                Earned
              </Badge>
            )}
            {!badge.earned && (
              <Badge variant="outline" className="mt-2 text-xs">Locked</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
