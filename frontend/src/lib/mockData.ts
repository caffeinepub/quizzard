export const mockUser = {
  id: '1',
  name: 'Alex Morgan',
  email: 'alex@example.com',
  role: 'student' as 'student' | 'teacher' | 'admin',
  level: 12,
  xp: 3450,
  xpToNext: 4000,
  streak: 7,
  quizzesCompleted: 42,
  accuracy: 87,
  avatar: null,
  bio: 'Passionate learner exploring the world of knowledge through quizzes.',
};

export const mockQuizzes = [
  { id: '1', title: 'Advanced Mathematics', topic: 'Math', questions: 20, difficulty: 'Hard', rating: 4.8, plays: 1240, category: 'Math', featured: true, description: 'Test your advanced math skills' },
  { id: '2', title: 'World History 101', topic: 'History', questions: 15, difficulty: 'Medium', rating: 4.6, plays: 980, category: 'History', featured: true, description: 'Journey through world history' },
  { id: '3', title: 'Biology Fundamentals', topic: 'Science', questions: 25, difficulty: 'Easy', rating: 4.9, plays: 2100, category: 'Science', featured: true, description: 'Core biology concepts' },
  { id: '4', title: 'JavaScript Mastery', topic: 'Technology', questions: 30, difficulty: 'Expert', rating: 4.7, plays: 1560, category: 'Technology', featured: false, description: 'Master JavaScript programming' },
  { id: '5', title: 'English Literature', topic: 'English', questions: 18, difficulty: 'Medium', rating: 4.5, plays: 870, category: 'English', featured: false, description: 'Classic literature analysis' },
  { id: '6', title: 'Physics Principles', topic: 'Science', questions: 22, difficulty: 'Hard', rating: 4.4, plays: 760, category: 'Science', featured: false, description: 'Fundamental physics laws' },
  { id: '7', title: 'Geography Challenge', topic: 'Geography', questions: 20, difficulty: 'Easy', rating: 4.7, plays: 1890, category: 'Geography', featured: false, description: 'World geography quiz' },
  { id: '8', title: 'Chemistry Basics', topic: 'Science', questions: 15, difficulty: 'Medium', rating: 4.3, plays: 650, category: 'Science', featured: false, description: 'Basic chemistry concepts' },
  { id: '9', title: 'Ancient Civilizations', topic: 'History', questions: 25, difficulty: 'Medium', rating: 4.6, plays: 1120, category: 'History', featured: false, description: 'Explore ancient civilizations' },
  { id: '10', title: 'Algebra Essentials', topic: 'Math', questions: 20, difficulty: 'Easy', rating: 4.8, plays: 2340, category: 'Math', featured: false, description: 'Essential algebra skills' },
  { id: '11', title: 'Python Programming', topic: 'Technology', questions: 28, difficulty: 'Medium', rating: 4.9, plays: 3100, category: 'Technology', featured: false, description: 'Python programming fundamentals' },
  { id: '12', title: 'World Literature', topic: 'English', questions: 16, difficulty: 'Hard', rating: 4.4, plays: 540, category: 'English', featured: false, description: 'Global literary masterpieces' },
];

export const mockQuizQuestions = [
  {
    id: '1',
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correct: 0,
    type: 'MCQ',
    difficulty: 'Easy',
    topic: 'Geography',
  },
  {
    id: '2',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correct: 1,
    type: 'MCQ',
    difficulty: 'Easy',
    topic: 'Science',
  },
  {
    id: '3',
    question: 'What is the value of π (pi) to two decimal places?',
    options: ['3.14', '3.16', '3.12', '3.18'],
    correct: 0,
    type: 'MCQ',
    difficulty: 'Easy',
    topic: 'Math',
  },
  {
    id: '4',
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correct: 1,
    type: 'MCQ',
    difficulty: 'Easy',
    topic: 'English',
  },
  {
    id: '5',
    question: 'What is the chemical symbol for Gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correct: 2,
    type: 'MCQ',
    difficulty: 'Medium',
    topic: 'Science',
  },
  {
    id: '6',
    question: 'In which year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correct: 2,
    type: 'MCQ',
    difficulty: 'Medium',
    topic: 'History',
  },
  {
    id: '7',
    question: 'What is the square root of 144?',
    options: ['10', '11', '12', '13'],
    correct: 2,
    type: 'MCQ',
    difficulty: 'Easy',
    topic: 'Math',
  },
  {
    id: '8',
    question: 'Which programming language is known as the "language of the web"?',
    options: ['Python', 'Java', 'JavaScript', 'C++'],
    correct: 2,
    type: 'MCQ',
    difficulty: 'Easy',
    topic: 'Technology',
  },
  {
    id: '9',
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correct: 3,
    type: 'MCQ',
    difficulty: 'Easy',
    topic: 'Geography',
  },
  {
    id: '10',
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Apparatus'],
    correct: 2,
    type: 'MCQ',
    difficulty: 'Easy',
    topic: 'Science',
  },
];

export const mockLeaderboard = [
  { rank: 1, name: 'Sarah Chen', xp: 12450, quizzes: 156, accuracy: 94, avatar: 'SC' },
  { rank: 2, name: 'Marcus Johnson', xp: 11200, quizzes: 142, accuracy: 91, avatar: 'MJ' },
  { rank: 3, name: 'Priya Patel', xp: 10800, quizzes: 138, accuracy: 93, avatar: 'PP' },
  { rank: 4, name: 'David Kim', xp: 9650, quizzes: 124, accuracy: 89, avatar: 'DK' },
  { rank: 5, name: 'Emma Wilson', xp: 8900, quizzes: 118, accuracy: 88, avatar: 'EW' },
  { rank: 6, name: 'James Rodriguez', xp: 7800, quizzes: 102, accuracy: 86, avatar: 'JR' },
  { rank: 7, name: 'Alex Morgan', xp: 3450, quizzes: 42, accuracy: 87, avatar: 'AM', isCurrentUser: true },
  { rank: 8, name: 'Lisa Thompson', xp: 3200, quizzes: 38, accuracy: 84, avatar: 'LT' },
  { rank: 9, name: 'Ryan Park', xp: 2900, quizzes: 35, accuracy: 82, avatar: 'RP' },
  { rank: 10, name: 'Nina Kowalski', xp: 2600, quizzes: 31, accuracy: 80, avatar: 'NK' },
];

export const mockAchievements = [
  { id: '1', title: 'First Steps', description: 'Complete your first quiz', icon: '🎯', category: 'Learning', earned: true, earnedDate: '2024-01-15' },
  { id: '2', title: 'Speed Demon', description: 'Complete a quiz in under 2 minutes', icon: '⚡', category: 'Speed', earned: true, earnedDate: '2024-01-20' },
  { id: '3', title: 'Perfect Score', description: 'Get 100% on any quiz', icon: '🏆', category: 'Learning', earned: true, earnedDate: '2024-02-01' },
  { id: '4', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', category: 'Streak', earned: true, earnedDate: '2024-02-10' },
  { id: '5', title: 'Social Butterfly', description: 'Share 5 quiz results', icon: '🦋', category: 'Social', earned: true, earnedDate: '2024-02-15' },
  { id: '6', title: 'Knowledge Seeker', description: 'Complete 25 quizzes', icon: '📚', category: 'Learning', earned: true, earnedDate: '2024-02-20' },
  { id: '7', title: 'Month Master', description: 'Maintain a 30-day streak', icon: '📅', category: 'Streak', earned: false, earnedDate: null },
  { id: '8', title: 'Quiz Creator', description: 'Create your first quiz', icon: '✏️', category: 'Learning', earned: false, earnedDate: null },
  { id: '9', title: 'Top 10', description: 'Reach top 10 on leaderboard', icon: '🥇', category: 'Social', earned: false, earnedDate: null },
  { id: '10', title: 'Lightning Fast', description: 'Answer 10 questions in under 5 seconds each', icon: '💨', category: 'Speed', earned: false, earnedDate: null },
  { id: '11', title: 'Century Club', description: 'Complete 100 quizzes', icon: '💯', category: 'Learning', earned: false, earnedDate: null },
  { id: '12', title: 'Mentor', description: 'Help 10 friends with quizzes', icon: '🤝', category: 'Social', earned: false, earnedDate: null },
];

export const mockWeeklyPerformance = [
  { day: 'Mon', score: 72 },
  { day: 'Tue', score: 85 },
  { day: 'Wed', score: 78 },
  { day: 'Thu', score: 91 },
  { day: 'Fri', score: 88 },
  { day: 'Sat', score: 95 },
  { day: 'Sun', score: 87 },
];

export const mockRecentQuizzes = [
  { id: '1', title: 'Advanced Mathematics', score: 92, total: 20, date: '2024-02-26', topic: 'Math' },
  { id: '2', title: 'World History 101', score: 85, total: 15, date: '2024-02-25', topic: 'History' },
  { id: '3', title: 'Biology Fundamentals', score: 78, total: 25, date: '2024-02-24', topic: 'Science' },
  { id: '4', title: 'JavaScript Mastery', score: 95, total: 30, date: '2024-02-23', topic: 'Technology' },
  { id: '5', title: 'English Literature', score: 88, total: 18, date: '2024-02-22', topic: 'English' },
];

export const mockStudents = [
  { id: '1', name: 'Alice Johnson', quizzesTaken: 28, avgScore: 91, lastActive: '2024-02-26' },
  { id: '2', name: 'Bob Smith', quizzesTaken: 22, avgScore: 84, lastActive: '2024-02-25' },
  { id: '3', name: 'Carol Davis', quizzesTaken: 35, avgScore: 88, lastActive: '2024-02-26' },
  { id: '4', name: 'Dan Wilson', quizzesTaken: 18, avgScore: 76, lastActive: '2024-02-24' },
  { id: '5', name: 'Eve Martinez', quizzesTaken: 42, avgScore: 93, lastActive: '2024-02-26' },
  { id: '6', name: 'Frank Brown', quizzesTaken: 15, avgScore: 71, lastActive: '2024-02-23' },
  { id: '7', name: 'Grace Lee', quizzesTaken: 31, avgScore: 89, lastActive: '2024-02-25' },
  { id: '8', name: 'Henry Taylor', quizzesTaken: 24, avgScore: 82, lastActive: '2024-02-22' },
];

export const mockTeacherQuizzes = [
  { id: '1', title: 'Algebra Basics', subject: 'Math', questions: 20, status: 'Published', created: '2024-02-01' },
  { id: '2', title: 'Cell Biology', subject: 'Science', questions: 15, status: 'Published', created: '2024-02-05' },
  { id: '3', title: 'World War II', subject: 'History', questions: 25, status: 'Draft', created: '2024-02-10' },
  { id: '4', title: 'Grammar Rules', subject: 'English', questions: 18, status: 'Published', created: '2024-02-15' },
  { id: '5', title: 'Python Basics', subject: 'Technology', questions: 30, status: 'Published', created: '2024-02-20' },
];

export const mockTopicScores = [
  { topic: 'Math', score: 87 },
  { topic: 'Science', score: 82 },
  { topic: 'History', score: 90 },
  { topic: 'English', score: 85 },
  { topic: 'Geography', score: 78 },
];

export const mockPerformanceOverTime = [
  { week: 'W1', score: 75 },
  { week: 'W2', score: 78 },
  { week: 'W3', score: 82 },
  { week: 'W4', score: 79 },
  { week: 'W5', score: 85 },
  { week: 'W6', score: 88 },
  { week: 'W7', score: 84 },
  { week: 'W8', score: 90 },
  { week: 'W9', score: 87 },
  { week: 'W10', score: 92 },
];

export const mockQuestionTypeDistribution = [
  { name: 'MCQ', value: 60, color: '#7C3AED' },
  { name: 'True/False', value: 20, color: '#06B6D4' },
  { name: 'Fill-in-blanks', value: 15, color: '#10B981' },
  { name: 'Coding', value: 5, color: '#F59E0B' },
];

export const mockBankQuestions = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  question: [
    'What is the derivative of x²?',
    'Which element has atomic number 6?',
    'Who was the first US President?',
    'What is the speed of light?',
    'What is photosynthesis?',
    'Solve: 2x + 5 = 15',
    'What is the Pythagorean theorem?',
    'Name the largest planet in our solar system',
    'What year did the French Revolution begin?',
    'What is the formula for water?',
    'Who invented the telephone?',
    'What is Newton\'s first law?',
    'What is the capital of Japan?',
    'What is DNA?',
    'What is the boiling point of water?',
    'Who wrote "1984"?',
    'What is the area of a circle?',
    'What is the speed of sound?',
    'What is the largest continent?',
    'What is binary code?',
  ][i],
  topic: ['Math', 'Science', 'History', 'Science', 'Science', 'Math', 'Math', 'Science', 'History', 'Science', 'Technology', 'Science', 'Geography', 'Science', 'Science', 'English', 'Math', 'Science', 'Geography', 'Technology'][i],
  difficulty: ['Medium', 'Easy', 'Easy', 'Hard', 'Medium', 'Easy', 'Medium', 'Easy', 'Medium', 'Easy', 'Easy', 'Medium', 'Easy', 'Hard', 'Easy', 'Medium', 'Medium', 'Hard', 'Easy', 'Medium'][i],
  type: ['MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'Fill-in-blanks', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ', 'MCQ'][i],
}));

export const mockActivityFeed = [
  { id: '1', event: 'Student Alice completed "Algebra Basics"', time: '2 min ago', icon: 'check' },
  { id: '2', event: 'New quiz "Cell Biology" was published', time: '15 min ago', icon: 'plus' },
  { id: '3', event: 'Bob scored 95% on "World War II"', time: '1 hour ago', icon: 'trophy' },
  { id: '4', event: 'Carol joined your class', time: '2 hours ago', icon: 'user' },
  { id: '5', event: 'Quiz "Grammar Rules" reached 100 plays', time: '3 hours ago', icon: 'star' },
];
