import { useState, useMemo } from 'react';
import { Search, Edit, Trash2, Tag, Plus, BarChart2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockBankQuestions } from '@/lib/mockData';
import { getDifficultyColor } from '@/lib/utils';
import { toast } from 'sonner';

const DIFF_CHART = [
  { difficulty: 'Easy', count: 8, fill: '#10B981' },
  { difficulty: 'Medium', count: 7, fill: '#F59E0B' },
  { difficulty: 'Hard', count: 4, fill: '#F97316' },
  { difficulty: 'Expert', count: 1, fill: '#EF4444' },
];

export function QuestionBank() {
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [questions, setQuestions] = useState(mockBankQuestions);

  const topics = Array.from(new Set(mockBankQuestions.map(q => q.topic)));
  const types = Array.from(new Set(mockBankQuestions.map(q => q.type)));

  const filtered = useMemo(() => {
    return questions.filter(q => {
      const matchSearch = q.question.toLowerCase().includes(search.toLowerCase());
      const matchTopic = topicFilter === 'all' || q.topic === topicFilter;
      const matchDiff = diffFilter === 'all' || q.difficulty === diffFilter;
      const matchType = typeFilter === 'all' || q.type === typeFilter;
      return matchSearch && matchTopic && matchDiff && matchType;
    });
  }, [questions, search, topicFilter, diffFilter, typeFilter]);

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map(q => q.id));
  };

  const handleBulkDelete = () => {
    setQuestions(prev => prev.filter(q => !selected.includes(q.id)));
    setSelected([]);
    toast.success(`Deleted ${selected.length} questions`);
  };

  const handleDelete = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    toast.success('Question deleted');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Question Bank</h1>
          <p className="text-muted-foreground mt-1">{questions.length} questions total</p>
        </div>
        <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
          <Plus className="w-4 h-4 mr-2" /> Add Question
        </Button>
      </div>

      {/* Difficulty Chart */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-5 h-5 text-violet-500" />
          <h3 className="font-display font-bold">Difficulty Distribution</h3>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={DIFF_CHART}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 280 / 0.3)" />
            <XAxis dataKey="difficulty" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: 'oklch(0.17 0.04 280)', border: '1px solid oklch(0.25 0.04 280)', borderRadius: '8px' }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {DIFF_CHART.map((entry, i) => (
                <rect key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <Select value={topicFilter} onValueChange={setTopicFilter}>
          <SelectTrigger className="h-10 w-36"><SelectValue placeholder="Topic" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {topics.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={diffFilter} onValueChange={setDiffFilter}>
          <SelectTrigger className="h-10 w-36"><SelectValue placeholder="Difficulty" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            {['Easy', 'Medium', 'Hard', 'Expert'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-10 w-36"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Action Toolbar */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 animate-fade-in-up">
          <span className="text-sm font-medium">{selected.length} selected</span>
          <Button size="sm" variant="destructive" className="h-8" onClick={handleBulkDelete}>
            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
          </Button>
          <Button size="sm" variant="outline" className="h-8">
            <Tag className="w-3.5 h-3.5 mr-1.5" /> Tag
          </Button>
          <Button size="sm" variant="ghost" className="h-8 ml-auto" onClick={() => setSelected([])}>
            Clear
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>Question</TableHead>
                <TableHead className="hidden sm:table-cell">Topic</TableHead>
                <TableHead className="hidden md:table-cell">Difficulty</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(q => (
                <TableRow key={q.id} className={selected.includes(q.id) ? 'bg-violet-500/5' : ''}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(q.id)}
                      onCheckedChange={() => toggleSelect(q.id)}
                    />
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm truncate">{q.question}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="text-xs">{q.topic}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className={`text-xs ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{q.type}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Tag className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm" variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(q.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
