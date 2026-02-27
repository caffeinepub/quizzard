import { useState, useEffect } from 'react';
import { Trophy, Clock, Medal } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockLeaderboard } from '@/lib/mockData';

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft('Ended'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

const nextMonday = (() => {
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay() + 1) % 7 || 7));
  d.setHours(0, 0, 0, 0);
  return d;
})();

const friendsLeaderboard = mockLeaderboard.slice(0, 5).map((u, i) => ({ ...u, rank: i + 1 }));

export function Leaderboard() {
  const countdown = useCountdown(nextMonday);
  const top3 = mockLeaderboard.slice(0, 3);

  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumHeights = ['h-24', 'h-32', 'h-20'];
  const podiumRanks = [2, 1, 3];
  const medalColors = ['text-gray-400', 'text-amber-400', 'text-orange-500'];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground mt-1">Compete with learners worldwide</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
          <Clock className="w-4 h-4 text-violet-500" />
          <span className="text-sm font-medium">Reset in: <span className="font-bold gradient-primary-text">{countdown}</span></span>
        </div>
      </div>

      {/* Podium */}
      <div className="bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-2xl p-8">
        <div className="flex items-end justify-center gap-4 mb-6">
          {podiumOrder.map((user, i) => (
            <div key={user.rank} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm border-2 border-white/20">
                {user.avatar}
              </div>
              <p className="text-xs font-semibold text-center max-w-[80px] truncate">{user.name.split(' ')[0]}</p>
              <p className="text-xs text-muted-foreground">{user.xp.toLocaleString()} XP</p>
              <div className={`w-20 ${podiumHeights[i]} rounded-t-xl flex items-start justify-center pt-2 ${
                podiumRanks[i] === 1 ? 'bg-amber-500/20 border border-amber-500/30' :
                podiumRanks[i] === 2 ? 'bg-gray-400/20 border border-gray-400/30' :
                'bg-orange-500/20 border border-orange-500/30'
              }`}>
                <Medal className={`w-5 h-5 ${medalColors[i]}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 text-sm text-muted-foreground">
          <span>🥈 2nd</span>
          <span>🥇 1st</span>
          <span>🥉 3rd</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="global">
        <TabsList>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Challenge</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="mt-4">
          <RankingTable data={mockLeaderboard} />
        </TabsContent>
        <TabsContent value="friends" className="mt-4">
          <RankingTable data={friendsLeaderboard} />
        </TabsContent>
        <TabsContent value="weekly" className="mt-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-xl p-6 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-cyan-500" />
              <h3 className="font-display font-bold">Weekly Challenge</h3>
            </div>
            <p className="text-muted-foreground text-sm">Complete the most quizzes this week to win 500 bonus XP!</p>
          </div>
          <RankingTable data={mockLeaderboard.slice(0, 7)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RankingTable({ data }: { data: typeof mockLeaderboard }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="hidden sm:table-cell text-right">XP</TableHead>
            <TableHead className="hidden md:table-cell text-right">Quizzes</TableHead>
            <TableHead className="text-right">Accuracy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow
              key={user.rank}
              className={user.isCurrentUser ? 'bg-violet-500/10 border-l-2 border-l-violet-500' : ''}
            >
              <TableCell>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  user.rank === 1 ? 'bg-amber-500/20 text-amber-500' :
                  user.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                  user.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : user.rank}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    {user.isCurrentUser && <p className="text-xs text-violet-500">You</p>}
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-right font-bold text-violet-500">
                {user.xp.toLocaleString()}
              </TableCell>
              <TableCell className="hidden md:table-cell text-right text-muted-foreground">
                {user.quizzes}
              </TableCell>
              <TableCell className="text-right">
                <span className={`font-semibold ${user.accuracy >= 90 ? 'text-emerald-500' : user.accuracy >= 80 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                  {user.accuracy}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
