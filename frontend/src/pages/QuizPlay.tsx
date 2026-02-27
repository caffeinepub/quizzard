import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Flag, ChevronLeft, ChevronRight, Zap, SkipForward, Clock, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockQuizQuestions } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const TIMER_SECONDS = 30;

export function QuizPlay() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<(number | null)[]>(new Array(mockQuizQuestions.length).fill(null));
  const [flagged, setFlagged] = useState<boolean[]>(new Array(mockQuizQuestions.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [score, setScore] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [powerUps, setPowerUps] = useState({ fiftyFifty: true, skip: true, extraTime: true });
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

  const question = mockQuizQuestions[currentQ];
  const total = mockQuizQuestions.length;

  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
    setHiddenOptions([]);
  }, [currentQ]);

  useEffect(() => {
    if (answered[currentQ] !== null) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQ, answered]);

  const handleSelect = (idx: number) => {
    if (answered[currentQ] !== null) return;
    setSelected(idx);
    const newAnswered = [...answered];
    newAnswered[currentQ] = idx;
    setAnswered(newAnswered);
    if (idx === question.correct) setScore(s => s + 10);
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setSelected(answered[currentQ + 1]);
    } else {
      navigate({ to: '/results' });
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(c => c - 1);
      setSelected(answered[currentQ - 1]);
    }
  };

  const handleFiftyFifty = () => {
    if (!powerUps.fiftyFifty) return;
    const wrongOptions = question.options
      .map((_, i) => i)
      .filter(i => i !== question.correct);
    const toHide = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
    setPowerUps(p => ({ ...p, fiftyFifty: false }));
  };

  const handleSkip = () => {
    if (!powerUps.skip) return;
    setPowerUps(p => ({ ...p, skip: false }));
    handleNext();
  };

  const handleExtraTime = () => {
    if (!powerUps.extraTime) return;
    setTimeLeft(t => t + 30);
    setPowerUps(p => ({ ...p, extraTime: false }));
  };

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (timerPercent / 100) * circumference;
  const timerColor = timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#f59e0b' : '#7C3AED';

  const getOptionStyle = (idx: number) => {
    if (hiddenOptions.includes(idx)) return 'opacity-20 pointer-events-none';
    if (answered[currentQ] === null) {
      return selected === idx
        ? 'border-violet-500 bg-violet-500/10'
        : 'border-border hover:border-violet-400 hover:bg-violet-500/5 cursor-pointer';
    }
    if (idx === question.correct) return 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
    if (answered[currentQ] === idx && idx !== question.correct) return 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400';
    return 'border-border opacity-60';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge className="bg-violet-500/20 text-violet-600 dark:text-violet-400 border-violet-500/30">
            {question.difficulty}
          </Badge>
          <Badge variant="outline">{question.topic}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
            <Zap className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-bold gradient-primary-text">{score}</span>
          </div>
          <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-muted transition-colors">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQ + 1} of {total}</span>
          <span>{Math.round(((currentQ) / total) * 100)}% complete</span>
        </div>
        <Progress value={((currentQ) / total) * 100} className="h-2" />
      </div>

      {/* Question Card */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        {/* Timer + Question */}
        <div className="flex items-start gap-4">
          {/* Circular Timer */}
          <div className="flex-shrink-0 relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/30" />
              <circle
                cx="32" cy="32" r="28" fill="none"
                stroke={timerColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-sm font-bold ${timeLeft <= 10 ? 'text-rose-500' : ''}`}>{timeLeft}</span>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Question {currentQ + 1}</p>
            <h2 className="font-display text-lg font-bold leading-snug">{question.question}</h2>
          </div>

          <button
            onClick={() => {
              const newFlagged = [...flagged];
              newFlagged[currentQ] = !newFlagged[currentQ];
              setFlagged(newFlagged);
            }}
            className={`p-2 rounded-lg transition-colors ${flagged[currentQ] ? 'text-rose-500 bg-rose-500/10' : 'text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10'}`}
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={cn(
                'p-4 rounded-xl border text-left text-sm font-medium transition-all duration-200',
                getOptionStyle(idx)
              )}
            >
              <span className="font-bold mr-2 text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          ))}
        </div>

        {/* Power-ups */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground mr-1">Power-ups:</span>
          <button
            onClick={handleFiftyFifty}
            disabled={!powerUps.fiftyFifty}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
              powerUps.fiftyFifty
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                : 'opacity-40 border-border text-muted-foreground cursor-not-allowed'
            )}
          >
            <Zap className="w-3.5 h-3.5" /> 50/50
          </button>
          <button
            onClick={handleSkip}
            disabled={!powerUps.skip}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
              powerUps.skip
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20'
                : 'opacity-40 border-border text-muted-foreground cursor-not-allowed'
            )}
          >
            <SkipForward className="w-3.5 h-3.5" /> Skip
          </button>
          <button
            onClick={handleExtraTime}
            disabled={!powerUps.extraTime}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
              powerUps.extraTime
                ? 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20'
                : 'opacity-40 border-border text-muted-foreground cursor-not-allowed'
            )}
          >
            <Clock className="w-3.5 h-3.5" /> +30s
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={currentQ === 0}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>
        <div className="flex gap-1">
          {mockQuizQuestions.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentQ(i); setSelected(answered[i]); }}
              className={cn(
                'w-7 h-7 rounded-full text-xs font-bold transition-all',
                i === currentQ ? 'bg-violet-600 text-white' :
                answered[i] !== null ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                flagged[i] ? 'bg-rose-500/20 text-rose-500' :
                'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
        >
          {currentQ === total - 1 ? 'Submit' : 'Next'}
          {currentQ < total - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}
