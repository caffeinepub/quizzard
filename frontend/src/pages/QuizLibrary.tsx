import { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search, Star, Play, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockQuizzes } from '@/lib/mockData';
import { getDifficultyColor } from '@/lib/utils';

const CATEGORIES = ['All', 'Math', 'Science', 'History', 'Technology', 'English', 'Geography'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert'];

export function QuizLibrary() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const featured = mockQuizzes.filter(q => q.featured);

  const filtered = useMemo(() => {
    return mockQuizzes.filter(q => {
      const matchSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.topic.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'All' || q.category === category;
      const matchDiff = selectedDifficulties.length === 0 || selectedDifficulties.includes(q.difficulty);
      return matchSearch && matchCategory && matchDiff;
    });
  }, [search, category, selectedDifficulties]);

  const toggleDifficulty = (d: string) => {
    setSelectedDifficulties(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Quiz Library</h1>
          <p className="text-muted-foreground mt-1">{mockQuizzes.length} quizzes available</p>
        </div>
      </div>

      {/* Featured Carousel */}
      <div>
        <h2 className="font-display font-bold mb-3">Featured Quizzes</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {featured.map(quiz => (
            <div
              key={quiz.id}
              className="flex-shrink-0 w-72 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-xl p-5"
            >
              <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 mb-3">Featured</Badge>
              <h3 className="font-display font-bold mb-1">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{quiz.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-medium">{quiz.rating}</span>
                </div>
                <Button
                  size="sm"
                  className="h-8 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0"
                  onClick={() => navigate({ to: '/quiz/$id', params: { id: quiz.id } })}
                >
                  <Play className="w-3.5 h-3.5 mr-1" /> Play
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search quizzes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <Button
          variant="outline"
          className="h-10 gap-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {selectedDifficulties.length > 0 && (
            <Badge className="bg-violet-500 text-white border-0 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {selectedDifficulties.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      {sidebarOpen && (
        <div className="bg-card border border-border rounded-xl p-5 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Filters</h3>
            <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  onClick={() => toggleDifficulty(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedDifficulties.includes(d)
                      ? 'bg-violet-500/20 border-violet-500/50 text-violet-600 dark:text-violet-400'
                      : 'border-border text-muted-foreground hover:border-violet-400'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          {selectedDifficulties.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 h-8 text-xs"
              onClick={() => setSelectedDifficulties([])}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* Category Tabs */}
      <Tabs value={category} onValueChange={setCategory}>
        <TabsList className="flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {CATEGORIES.map(cat => (
            <TabsTrigger key={cat} value={cat} className="text-xs sm:text-sm">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Quiz Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(quiz => (
          <div
            key={quiz.id}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <Badge variant="outline" className={`text-xs ${getDifficultyColor(quiz.difficulty)}`}>
                {quiz.difficulty}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-medium">{quiz.rating}</span>
              </div>
            </div>
            <h3 className="font-display font-bold mb-1">{quiz.title}</h3>
            <p className="text-sm text-muted-foreground mb-1">{quiz.topic}</p>
            <p className="text-xs text-muted-foreground mb-4">{quiz.questions} questions · {quiz.plays.toLocaleString()} plays</p>
            <Button
              className="w-full h-9 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 text-sm"
              onClick={() => navigate({ to: '/quiz/$id', params: { id: quiz.id } })}
            >
              <Play className="w-3.5 h-3.5 mr-1.5" /> Play Quiz
            </Button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No quizzes found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
