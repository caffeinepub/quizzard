# Specification

## Summary
**Goal:** Build a comprehensive AI Quiz Platform frontend with 15+ pages, a consistent design system, mock data throughout, and full routing — no real backend or AI integration required.

**Planned changes:**
- **Landing Page (/):** Animated gradient hero with CTA buttons, features section, "How It Works" steps, demo quiz preview, stats, testimonials, pricing tiers, and footer.
- **Auth Pages:** Login (`/login`) with email/password form and Google button (UI only); Signup (`/signup`) with animated role selection cards (Student/Teacher/Admin), name/email/password fields, and terms checkbox.
- **Student Dashboard (`/dashboard`):** Welcome header with XP level, continue quiz card, recent quizzes, AI-recommended quizzes, performance stats, leaderboard widget, weekly line chart (Recharts), and quick actions — all with mock data.
- **Teacher/Admin Dashboard (`/teacher-dashboard`):** KPI stat cards, create quiz action, quiz management table with edit/delete, student performance overview, bar and line charts (Recharts), question bank summary, and activity feed — mock data.
- **AI Quiz Generator (`/generate`):** Topic input with suggestion chips, difficulty selector, question type checkboxes, question count slider (5–50), language dropdown, advanced options accordion (PDF upload UI, textarea, voice button UI), Generate button with loading state, and generated question preview cards.
- **Quiz Playing Interface (`/quiz/:id`):** Distraction-free layout, dark mode toggle, countdown timer with circular SVG progress (turns red under 10s), answer option cards, progress bar, Previous/Next navigation, flag button, live score, power-ups bar (50/50, Skip, Extra Time), adaptive difficulty badge, and smooth animations — mock data.
- **Results Page (`/results`):** Animated score counter, letter grade, stats row, topic analysis progress bars, AI feedback section, weak areas recommendations, mini performance trend chart, recommended next quizzes, Share/Retake buttons, and confetti animation for scores ≥ 80%.
- **Quiz Library (`/library`):** Featured carousel, category tabs, search bar, filter sidebar (subject, difficulty, popularity), and quiz cards grid with title, topic, question count, star rating, difficulty badge, and play button — at least 10 mock quizzes.
- **Leaderboard (`/leaderboard`):** Top-3 podium with gold/silver/bronze medals, global ranking table (rank, avatar, name, XP, quizzes, accuracy), current user highlighted, Friends/Weekly tabs, and weekly challenge countdown timer — at least 10 mock users.
- **Achievements (`/achievements`):** Badges grid with earned/locked states, streak calendar heatmap, XP level progress bar, and category filter tabs (Learning, Streak, Social, Speed) — at least 12 mock badges.
- **Manual Quiz Creator (`/create-quiz`):** Multi-step form (Quiz Details → Add Questions → Review & Publish) with step indicator, drag-handle reordering, question bank search, and Import CSV button (UI only).
- **Question Bank (`/question-bank`):** Searchable, filterable table with at least 20 mock questions, edit/delete/tag actions, bulk checkboxes with bulk-action toolbar, Add to Quiz button, and difficulty distribution chart (Recharts).
- **Analytics Dashboard (`/analytics`):** Date range picker, four KPI cards, line/bar/pie Recharts charts, student progress table, and Export CSV button (UI only) — mock data.
- **Pricing Page (`/pricing`):** Three tier cards (Free, Pro $9.99/mo, Enterprise), monthly/annual billing toggle with 20% discount, feature comparison table, and FAQ accordion.
- **Profile Page (`/profile`):** Avatar with upload button (UI only), editable profile form, stats summary, recent activity feed, notification preference toggles, and account settings links.
- **Global Navigation:** Persistent dark sidebar for authenticated pages with Lucide icons and role-based items (student vs teacher); top navbar with avatar, notifications bell, and XP display; separate landing page header with Login/Signup CTAs; hamburger menu for mobile.
- **Design System:** Purple/violet gradient (#7C3AED → #4F46E5) with cyan/teal accents, rounded-xl cards with subtle shadows, micro-animations, loading skeleton states, toast notifications, and full mobile responsiveness.
- **Routing:** React Router connecting all 15+ routes.
- All data is mock/static; no real auth, AI, or payment integration.

**User-visible outcome:** Users can explore a fully interactive, multi-page quiz platform with a cohesive design — browsing the landing page, signing up with role selection, navigating dashboards, generating and playing mock quizzes, viewing results with confetti, browsing the quiz library and leaderboard, managing a question bank, and reviewing analytics — all with realistic mock data and smooth UI interactions.
