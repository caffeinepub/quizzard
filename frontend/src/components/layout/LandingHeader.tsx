import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Brain, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">QuizAI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-white/70 hover:text-white text-sm font-medium transition-colors">How It Works</a>
            <a href="#pricing" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Pricing</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0">
                Sign Up Free
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-3">
            <a href="#features" className="block text-white/70 hover:text-white text-sm font-medium py-2">Features</a>
            <a href="#how-it-works" className="block text-white/70 hover:text-white text-sm font-medium py-2">How It Works</a>
            <a href="#pricing" className="block text-white/70 hover:text-white text-sm font-medium py-2">Pricing</a>
            <div className="flex gap-3 pt-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">Log In</Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
