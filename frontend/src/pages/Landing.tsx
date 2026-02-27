import { useState, useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Sparkles, TrendingUp, BarChart2, CheckCircle, ArrowRight,
  Star, Users, BookOpen, Brain, Play, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LandingHeader } from '@/components/layout/LandingHeader';

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function DemoQuiz() {
  const [selected, setSelected] = useState<number | null>(null);
  const options = ['Paris', 'London', 'Berlin', 'Madrid'];
  const correct = 0;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">Demo Question</Badge>
        <span className="text-white/50 text-sm">1 of 10</span>
      </div>
      <h3 className="text-white text-lg font-semibold mb-5">What is the capital of France?</h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`p-3 rounded-xl text-sm font-medium text-left transition-all duration-200 border ${
              selected === i
                ? selected === correct
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <span className="font-bold mr-2 text-white/40">{String.fromCharCode(65 + i)}.</span>
            {opt}
          </button>
        ))}
      </div>
      {selected !== null && (
        <p className={`mt-4 text-sm font-medium ${selected === correct ? 'text-emerald-400' : 'text-rose-400'}`}>
          {selected === correct ? '✓ Correct! Paris is the capital of France.' : '✗ Incorrect. The answer is Paris.'}
        </p>
      )}
    </div>
  );
}

function StatsSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const users = useCountUp(10000, 2000, started);
  const quizzes = useCountUp(50000, 2000, started);
  const accuracy = useCountUp(94, 1500, started);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStarted(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {[
        { value: `${users.toLocaleString()}+`, label: 'Active Users', icon: Users },
        { value: `${quizzes.toLocaleString()}+`, label: 'Quizzes Generated', icon: BookOpen },
        { value: `${accuracy}%`, label: 'Average Accuracy', icon: TrendingUp },
      ].map((stat, i) => (
        <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
          <stat.icon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
          <div className="text-4xl font-display font-bold text-white mb-1">{stat.value}</div>
          <div className="text-white/60 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export function Landing() {
  return (
    <div className="min-h-screen bg-[oklch(0.10_0.03_280)]">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated gradient background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[url('/assets/generated/gradient-bg.dim_1920x1080.png')] bg-cover bg-center opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              <Badge className="mb-6 bg-violet-500/20 text-violet-300 border-violet-500/30 text-sm px-4 py-1.5">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                AI-Powered Learning Platform
              </Badge>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                AI Quiz
                <span className="block gradient-cyan-text">Generator</span>
              </h1>
              <p className="text-white/70 text-lg sm:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
                Create intelligent quizzes in seconds. Adaptive difficulty, detailed analytics, and gamified learning for students and teachers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/quiz/$id" params={{ id: 'demo' }}>
                  <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 px-8 h-12 text-base font-semibold shadow-glow">
                    <Play className="w-5 h-5 mr-2" />
                    Start Quiz
                  </Button>
                </Link>
                <Link to="/generate">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white px-8 h-12 text-base font-semibold">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Quiz
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <img
                  src="/assets/generated/hero-brain.dim_1200x600.png"
                  alt="AI Brain"
                  className="w-full rounded-2xl opacity-80 animate-float"
                />
                <div className="absolute -bottom-4 left-4 right-4">
                  <DemoQuiz />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[oklch(0.12_0.03_280)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="gradient-primary-text">Learn Smarter</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Powered by AI, designed for results. Our platform adapts to your learning style.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI Question Generation',
                description: 'Generate high-quality quiz questions on any topic instantly using advanced AI. Supports MCQ, True/False, fill-in-blanks, and coding questions.',
                color: 'from-violet-500/20 to-indigo-500/20',
                iconColor: 'text-violet-400',
              },
              {
                icon: TrendingUp,
                title: 'Adaptive Difficulty',
                description: 'Our AI adjusts question difficulty in real-time based on your performance, ensuring you\'re always challenged at the right level.',
                color: 'from-cyan-500/20 to-teal-500/20',
                iconColor: 'text-cyan-400',
              },
              {
                icon: BarChart2,
                title: 'Detailed Analytics',
                description: 'Track your progress with comprehensive analytics. Identify weak areas, monitor improvement, and celebrate achievements.',
                color: 'from-emerald-500/20 to-green-500/20',
                iconColor: 'text-emerald-400',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl bg-gradient-to-br ${feature.color} border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 ${feature.iconColor}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[oklch(0.10_0.03_280)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              How It <span className="gradient-cyan-text">Works</span>
            </h2>
            <p className="text-white/60 text-lg">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-violet-500/50 to-cyan-500/50" />
            {[
              { step: '01', icon: Brain, title: 'Select Your Topic', desc: 'Choose any subject or paste your own content. Our AI understands context and generates relevant questions.' },
              { step: '02', icon: Sparkles, title: 'AI Generates Quiz', desc: 'Our advanced AI creates diverse, high-quality questions tailored to your chosen difficulty level.' },
              { step: '03', icon: TrendingUp, title: 'Take & Improve', desc: 'Complete the quiz, get instant feedback, and track your progress over time with detailed analytics.' },
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/30 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-violet-400" />
                </div>
                <div className="absolute top-0 right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 -translate-y-2 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  {i + 1}
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[oklch(0.12_0.03_280)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Trusted by <span className="gradient-primary-text">Thousands</span>
            </h2>
          </div>
          <StatsSection />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[oklch(0.10_0.03_280)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              What Our Users <span className="gradient-cyan-text">Say</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Sarah Chen', role: 'Student, MIT', quote: 'QuizAI helped me ace my finals! The adaptive difficulty kept me challenged without overwhelming me.', stars: 5 },
              { name: 'Prof. James Miller', role: 'Teacher, Stanford', quote: 'I create entire quiz sets in minutes. My students are more engaged than ever with the gamification features.', stars: 5 },
              { name: 'Marcus Johnson', role: 'Student, Harvard', quote: 'The AI feedback is incredibly detailed. It pinpoints exactly where I need to improve.', stars: 5 },
              { name: 'Dr. Emily Park', role: 'Teacher, Yale', quote: 'The analytics dashboard gives me insights I never had before. I can see exactly how each student is progressing.', stars: 5 },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[oklch(0.12_0.03_280)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Simple, Transparent <span className="gradient-primary-text">Pricing</span>
            </h2>
            <p className="text-white/60 text-lg">Start free, upgrade when you need more</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Free', price: '$0', period: '/month',
                features: ['10 AI-generated quizzes/month', 'Basic analytics', '5 question types', 'Community support'],
                cta: 'Get Started', highlight: false,
              },
              {
                name: 'Pro', price: '$9.99', period: '/month',
                features: ['Unlimited AI quizzes', 'Advanced analytics', 'All question types', 'Priority support', 'Custom branding', 'Export to PDF'],
                cta: 'Start Free Trial', highlight: true,
              },
              {
                name: 'Enterprise', price: 'Custom', period: '',
                features: ['Everything in Pro', 'Dedicated support', 'Custom integrations', 'SLA guarantee', 'Team management', 'API access'],
                cta: 'Contact Sales', highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 relative ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border-violet-500/50 shadow-glow'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 px-4">Most Popular</Badge>
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/50">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-white/70 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button
                    className={`w-full ${plan.highlight ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0' : 'border-white/20 text-white hover:bg-white/10'}`}
                    variant={plan.highlight ? 'default' : 'outline'}
                  >
                    {plan.cta}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[oklch(0.08_0.03_280)] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-white">QuizAI</span>
              </div>
              <p className="text-white/50 text-sm">AI-powered quiz platform for smarter learning.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'How It Works', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">© {new Date().getFullYear()} QuizAI. All rights reserved.</p>
            <p className="text-white/40 text-sm">
              Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'quizai')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
