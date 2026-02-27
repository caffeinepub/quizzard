import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import {
  Home, Sparkles, Library, Trophy, Award, BarChart2, User,
  FilePlus, Database, LayoutDashboard, X, ChevronRight, Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockUser } from '@/lib/mockData';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles?: string[];
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Sparkles, label: 'Generate Quiz', path: '/generate' },
  { icon: Library, label: 'Quiz Library', path: '/library' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: Award, label: 'Achievements', path: '/achievements' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const teacherItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Teacher Dashboard', path: '/teacher-dashboard', roles: ['teacher', 'admin'] },
  { icon: FilePlus, label: 'Create Quiz', path: '/create-quiz', roles: ['teacher', 'admin'] },
  { icon: Database, label: 'Question Bank', path: '/question-bank', roles: ['teacher', 'admin'] },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const userRole = mockUser.role;

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-64 z-50 flex flex-col transition-transform duration-300',
          'bg-[oklch(0.10_0.03_280)] border-r border-[oklch(0.22_0.04_280)]',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[oklch(0.22_0.04_280)]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-glow">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg">QuizAI</span>
          <button
            onClick={onClose}
            className="ml-auto lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-violet-600/30 to-indigo-600/20 text-white border border-violet-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon className={cn(
                  'w-5 h-5 transition-colors',
                  isActive(item.path) ? 'text-violet-400' : 'text-gray-500 group-hover:text-gray-300'
                )} />
                {item.label}
                {isActive(item.path) && (
                  <ChevronRight className="w-4 h-4 ml-auto text-violet-400" />
                )}
              </Link>
            ))}
          </div>

          {(userRole === 'teacher' || userRole === 'admin') && (
            <div className="mt-6">
              <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Teacher Tools</p>
              <div className="space-y-1">
                {teacherItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-cyan-600/30 to-teal-600/20 text-white border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <item.icon className={cn(
                      'w-5 h-5 transition-colors',
                      isActive(item.path) ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'
                    )} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* User info at bottom */}
        <div className="px-4 py-4 border-t border-[oklch(0.22_0.04_280)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{mockUser.name}</p>
              <p className="text-xs text-gray-400">Level {mockUser.level} · {mockUser.xp} XP</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
