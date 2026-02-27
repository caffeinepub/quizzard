import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Check, ChevronRight, ChevronLeft, Plus, Trash2, GripVertical, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const STEPS = ['Quiz Details', 'Add Questions', 'Review & Publish'];
const SUBJECTS = ['Mathematics', 'Science', 'History', 'English', 'Technology', 'Geography'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert'];
const QUESTION_TYPES = ['MCQ', 'True/False', 'Fill-in-blanks'];

interface QuestionData {
  id: string;
  text: string;
  options: string[];
  correct: string;
  type: string;
  difficulty: string;
}

const BANK_QUESTIONS = [
  { id: 'b1', text: 'What is the derivative of x²?', topic: 'Math', difficulty: 'Medium' },
  { id: 'b2', text: 'What is the capital of France?', topic: 'Geography', difficulty: 'Easy' },
  { id: 'b3', text: 'Who wrote Romeo and Juliet?', topic: 'English', difficulty: 'Easy' },
  { id: 'b4', text: 'What is Newton\'s first law?', topic: 'Science', difficulty: 'Medium' },
  { id: 'b5', text: 'What is the speed of light?', topic: 'Science', difficulty: 'Hard' },
];

export function CreateQuiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState({ title: '', description: '', subject: '', difficulty: 'Medium' });
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [bankSearch, setBankSearch] = useState('');

  const addQuestion = () => {
    setQuestions(prev => [...prev, {
      id: Date.now().toString(),
      text: '',
      options: ['', '', '', ''],
      correct: '0',
      type: 'MCQ',
      difficulty: 'Medium',
    }]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, field: keyof QuestionData, value: string | string[]) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (qId: string, optIdx: number, value: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id !== qId) return q;
      const opts = [...q.options];
      opts[optIdx] = value;
      return { ...q, options: opts };
    }));
  };

  const addFromBank = (bq: typeof BANK_QUESTIONS[0]) => {
    setQuestions(prev => [...prev, {
      id: Date.now().toString(),
      text: bq.text,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: '0',
      type: 'MCQ',
      difficulty: bq.difficulty,
    }]);
  };

  const handlePublish = () => {
    toast.success('Quiz published successfully!', { description: 'Your quiz is now live.' });
    navigate({ to: '/teacher-dashboard' });
  };

  const filteredBank = BANK_QUESTIONS.filter(q =>
    q.text.toLowerCase().includes(bankSearch.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Create Quiz</h1>
        <p className="text-muted-foreground mt-1">Build your quiz step by step</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all',
              i < step ? 'bg-emerald-500 text-white' :
              i === step ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white' :
              'bg-muted text-muted-foreground'
            )}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={cn('text-sm font-medium hidden sm:block', i === step ? 'text-foreground' : 'text-muted-foreground')}>
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <div className={cn('flex-1 h-0.5 mx-2', i < step ? 'bg-emerald-500' : 'bg-border')} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Quiz Details */}
      {step === 0 && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-display font-bold text-lg">Quiz Details</h2>
          <div className="space-y-2">
            <Label>Quiz Title *</Label>
            <Input
              placeholder="e.g. Advanced Mathematics Quiz"
              value={details.title}
              onChange={e => setDetails({ ...details, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe what this quiz covers..."
              value={details.description}
              onChange={e => setDetails({ ...details, description: e.target.value })}
              className="resize-none"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={details.subject} onValueChange={v => setDetails({ ...details, subject: v })}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Default Difficulty</Label>
              <Select value={details.difficulty} onValueChange={v => setDetails({ ...details, difficulty: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Add Questions */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg">{questions.length} Question{questions.length !== 1 ? 's' : ''}</h2>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-1.5" /> Question Bank
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Question Bank</DialogTitle>
                  </DialogHeader>
                  <Input
                    placeholder="Search questions..."
                    value={bankSearch}
                    onChange={e => setBankSearch(e.target.value)}
                    className="mb-3"
                  />
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {filteredBank.map(q => (
                      <div key={q.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{q.text}</p>
                          <p className="text-xs text-muted-foreground">{q.topic} · {q.difficulty}</p>
                        </div>
                        <Button size="sm" className="h-8 flex-shrink-0" onClick={() => addFromBank(q)}>
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={addQuestion} className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0" size="sm">
                <Plus className="w-4 h-4 mr-1.5" /> Add Question
              </Button>
            </div>
          </div>

          {questions.length === 0 && (
            <div className="text-center py-16 bg-card border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground mb-3">No questions yet</p>
              <Button onClick={addQuestion} variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add First Question
              </Button>
            </div>
          )}

          {questions.map((q, qi) => (
            <div key={q.id} className="bg-card border border-border rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                <span className="font-bold text-sm text-muted-foreground">Q{qi + 1}</span>
                <div className="flex gap-2 ml-auto">
                  <Select value={q.type} onValueChange={v => updateQuestion(q.id, 'type', v)}>
                    <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {QUESTION_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={q.difficulty} onValueChange={v => updateQuestion(q.id, 'difficulty', v)}>
                    <SelectTrigger className="h-8 w-28 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive" onClick={() => removeQuestion(q.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="Enter your question..."
                value={q.text}
                onChange={e => updateQuestion(q.id, 'text', e.target.value)}
                className="resize-none"
              />
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Answer Options (select correct answer)</Label>
                <RadioGroup value={q.correct} onValueChange={v => updateQuestion(q.id, 'correct', v)}>
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-3">
                      <RadioGroupItem value={String(oi)} id={`${q.id}-${oi}`} />
                      <Input
                        placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                        value={opt}
                        onChange={e => updateOption(q.id, oi, e.target.value)}
                        className="h-9 flex-1"
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 3: Review */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display font-bold text-lg mb-4">Review Quiz</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Title</span>
                <span className="font-medium">{details.title || '(untitled)'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Subject</span>
                <span className="font-medium">{details.subject || '(none)'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Difficulty</span>
                <Badge variant="outline">{details.difficulty}</Badge>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Questions</span>
                <span className="font-medium">{questions.length}</span>
              </div>
            </div>
          </div>
          {questions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Questions Preview</h3>
              {questions.map((q, i) => (
                <div key={q.id} className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm font-medium">{i + 1}. {q.text || '(empty question)'}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{q.type}</Badge>
                    <Badge variant="outline" className="text-xs">{q.difficulty}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 0}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => setStep(s => s + 1)}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handlePublish}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0"
          >
            <Check className="w-4 h-4 mr-2" /> Publish Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
