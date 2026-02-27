import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Check, X, ChevronRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LandingHeader } from '@/components/layout/LandingHeader';

const FEATURES = [
  { name: 'AI Quiz Generation', free: true, pro: true, enterprise: true },
  { name: 'Adaptive Difficulty', free: false, pro: true, enterprise: true },
  { name: 'Analytics Dashboard', free: false, pro: true, enterprise: true },
  { name: 'Question Bank', free: true, pro: true, enterprise: true },
  { name: 'Unlimited Quizzes', free: false, pro: true, enterprise: true },
  { name: 'Priority Support', free: false, pro: true, enterprise: true },
  { name: 'Custom Branding', free: false, pro: false, enterprise: true },
  { name: 'API Access', free: false, pro: false, enterprise: true },
  { name: 'Team Management', free: false, pro: false, enterprise: true },
  { name: 'SSO Integration', free: false, pro: false, enterprise: true },
];

const FAQS = [
  { q: 'Can I try Pro for free?', a: 'Yes! We offer a 14-day free trial of Pro with no credit card required. You can explore all Pro features before committing.' },
  { q: 'How does AI quiz generation work?', a: 'Our AI analyzes your topic and generates contextually relevant questions using advanced language models. It supports multiple question types and difficulty levels.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. You can cancel your subscription at any time from your account settings. You\'ll retain access until the end of your billing period.' },
  { q: 'Is there a limit on quiz creation in the Free plan?', a: 'The Free plan allows up to 10 AI-generated quizzes per month. You can create unlimited manual quizzes.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans.' },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const proPrice = annual ? 7.99 : 9.99;
  const proAnnualTotal = (proPrice * 12).toFixed(2);

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.03_280)]">
      <LandingHeader />

      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Simple, Transparent <span className="gradient-primary-text">Pricing</span>
            </h1>
            <p className="text-white/60 text-lg mb-8">Start free, upgrade when you need more power</p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <Label className="text-white/70">Monthly</Label>
              <Switch checked={annual} onCheckedChange={setAnnual} />
              <Label className="text-white/70">Annual</Label>
              {annual && (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Save 20%</Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Free', price: '$0', period: '/month', highlight: false,
                features: ['10 AI quizzes/month', 'Basic analytics', 'Question bank (100 questions)', 'Community support', '5 question types'],
                cta: 'Get Started', ctaLink: '/signup',
              },
              {
                name: 'Pro', price: `$${proPrice}`, period: '/month', highlight: true,
                subtext: annual ? `$${proAnnualTotal}/year` : undefined,
                features: ['Unlimited AI quizzes', 'Advanced analytics', 'Unlimited question bank', 'Priority support', 'All question types', 'Custom branding', 'Export to PDF/CSV'],
                cta: 'Start Free Trial', ctaLink: '/signup',
              },
              {
                name: 'Enterprise', price: 'Custom', period: '', highlight: false,
                features: ['Everything in Pro', 'Dedicated support', 'Custom integrations', 'SLA guarantee', 'Team management', 'API access', 'SSO integration'],
                cta: 'Contact Sales', ctaLink: '/signup',
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl border relative transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border-violet-500/50 shadow-glow'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 px-4">Most Popular</Badge>
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/50">{plan.period}</span>
                </div>
                {plan.subtext && <p className="text-white/40 text-sm mb-4">{plan.subtext}</p>}
                <ul className="space-y-3 mb-8 mt-4">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={plan.ctaLink as '/signup'}>
                  <Button
                    className={`w-full ${plan.highlight ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0' : 'border-white/20 text-white hover:bg-white/10'}`}
                    variant={plan.highlight ? 'default' : 'outline'}
                  >
                    {plan.cta} <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white text-center mb-8">Feature Comparison</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white/70 font-medium">Feature</th>
                      <th className="text-center p-4 text-white font-semibold">Free</th>
                      <th className="text-center p-4 text-violet-400 font-semibold">Pro</th>
                      <th className="text-center p-4 text-cyan-400 font-semibold">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEATURES.map((f, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-white/70 text-sm">{f.name}</td>
                        <td className="p-4 text-center">
                          {f.free ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-white/20 mx-auto" />}
                        </td>
                        <td className="p-4 text-center">
                          {f.pro ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-white/20 mx-auto" />}
                        </td>
                        <td className="p-4 text-center">
                          {f.enterprise ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-white/20 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white/5 border border-white/10 rounded-xl px-5 overflow-hidden">
                  <AccordionTrigger className="text-white hover:text-white/80 text-left py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[oklch(0.08_0.03_280)] border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white">QuizAI</span>
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} QuizAI · Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'quizai')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
