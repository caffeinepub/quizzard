import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { GraduationCap, Users, Shield, Brain, Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type Role = 'student' | 'teacher' | 'admin';

const roles = [
  { id: 'student' as Role, icon: GraduationCap, label: 'Student', desc: 'Learn and take quizzes' },
  { id: 'teacher' as Role, icon: Users, label: 'Teacher', desc: 'Create and manage quizzes' },
  { id: 'admin' as Role, icon: Shield, label: 'Admin', desc: 'Full platform access' },
];

export function Signup() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !agreed) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    navigate({ to: selectedRole === 'teacher' || selectedRole === 'admin' ? '/teacher-dashboard' : '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.03_280)] flex items-center justify-center p-4">
      <div className="absolute inset-0 gradient-hero opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-lg animate-scale-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-white text-2xl">QuizAI</span>
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h1 className="font-display text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-white/60 mb-6">Choose your role to get started</p>

          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  'p-4 rounded-xl border text-center transition-all duration-200 relative',
                  selectedRole === role.id
                    ? 'bg-violet-600/20 border-violet-500/60 scale-105'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                )}
              >
                {selectedRole === role.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <role.icon className={cn(
                  'w-7 h-7 mx-auto mb-2 transition-colors',
                  selectedRole === role.id ? 'text-violet-400' : 'text-white/50'
                )} />
                <p className={cn('text-sm font-semibold', selectedRole === role.id ? 'text-white' : 'text-white/70')}>
                  {role.label}
                </p>
                <p className="text-xs text-white/40 mt-0.5 hidden sm:block">{role.desc}</p>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white/80 text-sm">Full Name</Label>
              <Input
                placeholder="Alex Morgan"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 text-sm">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 text-sm">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(!!v)}
                className="mt-0.5 border-white/20 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
              />
              <label htmlFor="terms" className="text-white/60 text-sm leading-relaxed cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-violet-400 hover:text-violet-300">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-violet-400 hover:text-violet-300">Privacy Policy</a>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading || !selectedRole || !agreed}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 h-11 font-semibold disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-white/50 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
