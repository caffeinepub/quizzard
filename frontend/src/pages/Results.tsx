import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle, XCircle, Clock, Target, Sparkles, AlertCircle, Share2, RotateCcw, Play } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getGrade } from '@/lib/utils';

const SCORE = 85;
const TREND_DATA = [
  { quiz: 'Q1', score: 75 }, { quiz: 'Q2', score: 80 }, { quiz: 'Q3', score: 78 },
  { quiz: 'Q4', score: 85 }, { quiz: 'Q5', score: 85 },
];
const TOPIC_ANALYSIS = [
  { topic: 'Mathematics', score: 90, color: 'bg-emerald-500' },
  { topic: 'Science', score: 80, color: 'bg-amber-500' },
  { topic: 'History', score: 85, color: 'bg-violet-500' },
];
const RECOMMENDED = [
  { id: '4', title: 'Advanced Calculus', topic: 'Math', difficulty: 'Hard' },
  { id: '3', title: 'Biology Fundamentals', topic: 'Science', difficulty: 'Easy' },
  { id: '9', title: 'Ancient Civilizations', topic: 'History', difficulty: 'Medium' },
];

function ConfettiPiece({ style }: { style: React.CSSProperties }) {
  return <div className="confetti-piece rounded-sm" style={style} />;
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

export function Results() {
  const navigate = useNavigate();
  const animatedScore = useCountUp(SCORE);
  const grade = getGrade(SCORE);
  const showConfetti = SCORE >= 80;

  const confettiColors = ['#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const confettiPieces = Array.from({ length: 40 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${2 + Math.random() * 2}s`,
    background: confettiColors[i % confettiColors.length],
    width: `${6 + Math.random() * 8}px`,
    height: `${6 + Math.random() * 8}px`,
    transform: `rotate(${Math.random() * 360}deg)`,
  }));

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up relative">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {confettiPieces.map((style, i) => (
            <ConfettiPiece key={i} style={style} />
          ))}
        </div>
      )}

      {/* Score Display */}
      <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-2xl p-8 text-center">
        <p className="text-muted-foreground mb-2">Quiz Complete!</p>
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="font-display text-7xl font-bold gradient-primary-text">{animatedScore}%</span>
          <div className="text-left">
            <div className="text-4xl font-display font-bold text-amber-500">{grade}</div>
            <div className="text-sm text-muted-foreground">Grade</div>
          </div>
        </div>
        <p className="text-muted-foreground">
          {SCORE >= 90 ? 'Outstanding performance! 🎉' :
           SCORE >= 80 ? 'Great job! Keep it up! 🌟' :
           SCORE >= 70 ? 'Good effort! Room to improve 📚' :
           'Keep practicing! You\'ll get there 💪'}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: CheckCircle, label: 'Correct', value: '17', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { icon: XCircle, label: 'Incorrect', value: '3', color: 'text-rose-500', bg: 'bg-rose-500/10' },
          { icon: Clock, label: 'Time Taken', value: '8m 32s', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
          { icon: Target, label: 'Accuracy', value: '85%', color: 'text-violet-500', bg: 'bg-violet-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="font-display font-bold text-lg">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Topic Analysis */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-bold mb-4">Topic Analysis</h3>
        <div className="space-y-4">
          {TOPIC_ANALYSIS.map((t) => (
            <div key={t.topic}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{t.topic}</span>
                <span className="font-bold">{t.score}%</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${t.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${t.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Feedback */}
      <div className="bg-gradient-to-br from-violet-500/5 to-cyan-500/5 border border-violet-500/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-violet-500" />
          <h3 className="font-display font-bold">AI Feedback</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Great job! You showed strong understanding of Mathematics concepts, scoring 90%. Your History performance was solid at 85%.
          Consider reviewing Science topics where you scored 80% — particularly cellular biology and chemical reactions.
          Your overall accuracy of 85% puts you in the top 30% of learners on this topic!
        </p>
      </div>

      {/* Weak Areas */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <h3 className="font-display font-bold">Areas to Improve</h3>
        </div>
        <div className="space-y-3">
          {[
            { area: 'Science', rec: 'Review cellular biology and photosynthesis' },
            { area: 'History', rec: 'Study World War II timeline and key events' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">{item.area}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.rec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Trend */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-bold mb-4">Performance Trend</h3>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={TREND_DATA}>
            <XAxis dataKey="quiz" tick={{ fontSize: 11 }} />
            <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: 'oklch(0.17 0.04 280)', border: '1px solid oklch(0.25 0.04 280)', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={2} dot={{ fill: '#7C3AED', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recommended */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-bold mb-4">Recommended Next</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {RECOMMENDED.map((quiz) => (
            <div key={quiz.id} className="p-4 rounded-xl bg-gradient-to-br from-violet-500/5 to-indigo-500/5 border border-violet-500/20">
              <p className="font-semibold text-sm mb-1">{quiz.title}</p>
              <p className="text-xs text-muted-foreground mb-3">{quiz.topic}</p>
              <Button
                size="sm"
                className="w-full h-8 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 text-xs"
                onClick={() => navigate({ to: '/quiz/$id', params: { id: quiz.id } })}
              >
                <Play className="w-3 h-3 mr-1" /> Start
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex-1 h-11"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'My Quiz Result', text: `I scored ${SCORE}% on QuizAI!` });
            }
          }}
        >
          <Share2 className="w-4 h-4 mr-2" /> Share Result
        </Button>
        <Button
          className="flex-1 h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
          onClick={() => navigate({ to: '/quiz/$id', params: { id: '1' } })}
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Retake Quiz
        </Button>
      </div>
    </div>
  );
}
