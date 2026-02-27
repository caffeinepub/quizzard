import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { GenerateQuiz } from './pages/GenerateQuiz';
import { QuizPlay } from './pages/QuizPlay';
import { Results } from './pages/Results';
import { QuizLibrary } from './pages/QuizLibrary';
import { Leaderboard } from './pages/Leaderboard';
import { Achievements } from './pages/Achievements';
import { CreateQuiz } from './pages/CreateQuiz';
import { QuestionBank } from './pages/QuestionBank';
import { Analytics } from './pages/Analytics';
import { Pricing } from './pages/Pricing';
import { Profile } from './pages/Profile';
import { AuthenticatedLayout } from './components/layout/AuthenticatedLayout';
import { Toaster } from './components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const landingRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Landing });
const loginRoute = createRoute({ getParentRoute: () => rootRoute, path: '/login', component: Login });
const signupRoute = createRoute({ getParentRoute: () => rootRoute, path: '/signup', component: Signup });
const pricingRoute = createRoute({ getParentRoute: () => rootRoute, path: '/pricing', component: Pricing });

const authLayoutRoute = createRoute({ getParentRoute: () => rootRoute, id: 'auth', component: AuthenticatedLayout });

const dashboardRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/dashboard', component: StudentDashboard });
const teacherDashboardRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/teacher-dashboard', component: TeacherDashboard });
const generateRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/generate', component: GenerateQuiz });
const quizPlayRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/quiz/$id', component: QuizPlay });
const resultsRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/results', component: Results });
const libraryRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/library', component: QuizLibrary });
const leaderboardRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/leaderboard', component: Leaderboard });
const achievementsRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/achievements', component: Achievements });
const createQuizRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/create-quiz', component: CreateQuiz });
const questionBankRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/question-bank', component: QuestionBank });
const analyticsRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/analytics', component: Analytics });
const profileRoute = createRoute({ getParentRoute: () => authLayoutRoute, path: '/profile', component: Profile });

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  signupRoute,
  pricingRoute,
  authLayoutRoute.addChildren([
    dashboardRoute,
    teacherDashboardRoute,
    generateRoute,
    quizPlayRoute,
    resultsRoute,
    libraryRoute,
    leaderboardRoute,
    achievementsRoute,
    createQuizRoute,
    questionBankRoute,
    analyticsRoute,
    profileRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
