import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Sparkles, Upload, Mic, ChevronDown, ChevronUp, Play, Loader2,
  FileText, Code, CheckSquare, AlignLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getDifficultyColor } from '@/lib/utils';

const TOPIC_SUGGESTIONS = ['Mathematics', 'Science', 'History', 'Technology', 'Literature', 'Geography', 'Biology', 'Physics'];
const DIFFICULTIES = [
  { label: 'Easy', color: 'text-emerald-500 border-emerald-500/50 bg-emerald-500/10' },
  { label: 'Medium', color: 'text-amber-500 border-amber-500/50 bg-amber-500/10' },
  { label: 'Hard', color: 'text-orange-500 border-orange-500/50 bg-orange-500/10' },
  { label: 'Expert', color: 'text-rose-500 border-rose-500/50 bg-rose-500/10' },
];
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Hindi', 'Portuguese', 'Russian', 'Korean', 'Italian'];

const MOCK_GENERATED = [
  { q: 'What is the derivative of x²?', type: 'MCQ', difficulty: 'Medium', options: ['x', '2x', 'x²', '2x²'] },
  { q: 'The speed of light is approximately 3×10⁸ m/s.', type: 'True/False', difficulty: 'Easy', options: ['True', 'False'] },
  { q: 'What data structure uses LIFO (Last In, First Out) ordering?', type: 'MCQ', difficulty: 'Medium', options: ['Queue', 'Stack', 'Tree', 'Graph'] },
];

export function GenerateQuiz() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState([10]);
  const [language, setLanguage] = useState('English');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [questionTypes, setQuestionTypes] = useState({
    mcq: true, truefalse: true, fillinblanks: false, coding: false,
  });

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setGenerated(false);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    setGenerated(true);
  };

  const toggleType = (key: keyof typeof questionTypes) => {
    setQuestionTypes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold">
          <span className="gradient-primary-text">AI Quiz</span> Generator
        </h1>
        <p className="text-muted-foreground mt-1">Generate intelligent quizzes on any topic in seconds</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        {/* Topic Input */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Topic or Subject</Label>
          <Input
            placeholder="e.g. Photosynthesis, World War II, JavaScript..."
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="h-11"
          />
          <div className="flex flex-wrap gap-2">
            {TOPIC_SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setTopic(s)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Difficulty Level</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DIFFICULTIES.map(d => (
              <button
                key={d.label}
                onClick={() => setDifficulty(d.label)}
                className={`py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  difficulty === d.label
                    ? `${d.color} scale-105 shadow-sm`
                    : 'border-border text-muted-foreground hover:border-border/80'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Types */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Question Types</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'mcq' as const, label: 'Multiple Choice', icon: CheckSquare },
              { key: 'truefalse' as const, label: 'True / False', icon: AlignLeft },
              { key: 'fillinblanks' as const, label: 'Fill in Blanks', icon: FileText },
              { key: 'coding' as const, label: 'Coding Questions', icon: Code },
            ].map(({ key, label, icon: Icon }) => (
              <label
                key={key}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  questionTypes[key] ? 'border-violet-500/50 bg-violet-500/5' : 'border-border hover:border-border/80'
                }`}
              >
                <Checkbox
                  checked={questionTypes[key]}
                  onCheckedChange={() => toggleType(key)}
                  className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                />
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question Count Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Number of Questions</Label>
            <span className="text-2xl font-display font-bold gradient-primary-text">{questionCount[0]}</span>
          </div>
          <Slider
            min={5} max={50} step={5}
            value={questionCount}
            onValueChange={setQuestionCount}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5</span><span>50</span>
          </div>
        </div>

        {/* Language */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(l => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Options */}
        <div className="border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="w-full flex items-center justify-between p-4 text-sm font-semibold hover:bg-muted/50 transition-colors"
          >
            Advanced Options
            {advancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {advancedOpen && (
            <div className="p-4 border-t border-border space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Upload PDF (extract questions from document)</Label>
                <Button variant="outline" className="w-full h-10 border-dashed">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload PDF
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Generate from Text</Label>
                <Textarea
                  placeholder="Paste your text content here and we'll generate questions from it..."
                  className="min-h-[100px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Voice Input</Label>
                <Button variant="outline" className="w-full h-10">
                  <Mic className="w-4 h-4 mr-2" />
                  Start Voice Input
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={generating || !topic.trim()}
          className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 text-base font-semibold disabled:opacity-50"
        >
          {generating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Quiz
            </>
          )}
        </Button>
      </div>

      {/* Preview */}
      {generated && (
        <div className="space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Generated Preview</h2>
            <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
              {questionCount[0]} questions ready
            </Badge>
          </div>
          {MOCK_GENERATED.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-violet-500/5 to-indigo-500/5 border border-violet-500/20 rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-xs font-bold text-violet-500 bg-violet-500/10 px-2 py-0.5 rounded-full">Q{i + 1}</span>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">{item.type}</Badge>
                  <Badge variant="outline" className={`text-xs ${getDifficultyColor(item.difficulty)}`}>{item.difficulty}</Badge>
                </div>
              </div>
              <p className="font-medium mb-3">{item.q}</p>
              <div className="grid grid-cols-2 gap-2">
                {item.options.map((opt, j) => (
                  <div key={j} className="text-xs px-3 py-2 rounded-lg bg-muted/50 text-muted-foreground">
                    {String.fromCharCode(65 + j)}. {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button
            onClick={() => navigate({ to: '/quiz/$id', params: { id: 'generated' } })}
            className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 text-base font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
