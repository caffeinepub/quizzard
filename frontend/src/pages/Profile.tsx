import { useState } from 'react';
import { FileQuestion, Target, Zap, CheckCircle, Trophy, Award, Key, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { mockUser } from '@/lib/mockData';
import { toast } from 'sonner';

const RECENT_ACTIVITY = [
  { id: '1', event: 'Completed "Advanced Mathematics" quiz', time: '2 hours ago', icon: CheckCircle, color: 'text-emerald-500' },
  { id: '2', event: 'Earned "Speed Demon" badge', time: '1 day ago', icon: Trophy, color: 'text-amber-500' },
  { id: '3', event: 'Reached Level 12', time: '2 days ago', icon: Award, color: 'text-violet-500' },
  { id: '4', event: 'Completed "World History 101" quiz', time: '3 days ago', icon: CheckCircle, color: 'text-emerald-500' },
  { id: '5', event: 'Earned "Week Warrior" badge', time: '5 days ago', icon: Trophy, color: 'text-amber-500' },
];

export function Profile() {
  const [form, setForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
    bio: mockUser.bio,
  });
  const [notifications, setNotifications] = useState({
    email: true,
    reminders: true,
    weekly: false,
  });

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  const handleAvatarUpload = () => {
    toast.info('Avatar upload feature coming soon!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Avatar + Stats */}
      <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
              AM
            </div>
            <button
              onClick={handleAvatarUpload}
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-display text-xl font-bold">{mockUser.name}</h2>
            <p className="text-muted-foreground text-sm">{mockUser.email}</p>
            <p className="text-muted-foreground text-sm mt-1">Level {mockUser.level} · {mockUser.streak} day streak 🔥</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-violet-500/20">
          {[
            { icon: FileQuestion, label: 'Quizzes Taken', value: mockUser.quizzesCompleted, color: 'text-violet-400' },
            { icon: Target, label: 'Avg Score', value: `${mockUser.accuracy}%`, color: 'text-cyan-400' },
            { icon: Zap, label: 'Total XP', value: mockUser.xp.toLocaleString(), color: 'text-amber-400' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
              <div className="font-display font-bold text-lg">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h3 className="font-display font-bold text-lg">Edit Profile</h3>
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
            className="resize-none"
            rows={3}
          />
        </div>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
        >
          Save Changes
        </Button>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-bold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {RECENT_ACTIVITY.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{item.event}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-display font-bold text-lg">Notification Preferences</h3>
        {[
          { key: 'email' as const, label: 'Email Notifications', desc: 'Receive quiz results and updates via email' },
          { key: 'reminders' as const, label: 'Quiz Reminders', desc: 'Daily reminders to maintain your streak' },
          { key: 'weekly' as const, label: 'Weekly Reports', desc: 'Weekly performance summary every Monday' },
        ].map((pref) => (
          <div key={pref.key} className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm">{pref.label}</p>
              <p className="text-xs text-muted-foreground">{pref.desc}</p>
            </div>
            <Switch
              checked={notifications[pref.key]}
              onCheckedChange={v => setNotifications(prev => ({ ...prev, [pref.key]: v }))}
            />
          </div>
        ))}
      </div>

      {/* Account Settings */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-3">
        <h3 className="font-display font-bold text-lg">Account Settings</h3>
        <Separator />
        <button
          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted transition-colors text-left"
          onClick={() => toast.info('Password change feature coming soon!')}
        >
          <Key className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Change Password</p>
            <p className="text-xs text-muted-foreground">Update your account password</p>
          </div>
        </button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-destructive/10 transition-colors text-left text-destructive">
              <Trash2 className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">Delete Account</p>
                <p className="text-xs opacity-70">Permanently delete your account and all data</p>
              </div>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Footer attribution */}
      <div className="text-center py-4 text-sm text-muted-foreground">
        Built with ❤️ using{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'quizai')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-500 hover:text-violet-400 transition-colors"
        >
          caffeine.ai
        </a>
        {' '}· © {new Date().getFullYear()} QuizAI
      </div>
    </div>
  );
}
