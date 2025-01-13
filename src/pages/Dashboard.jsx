import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../services/progressService';
import {
  BookOpenIcon,
  DocumentTextIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { getStats } = useProgress();
  const stats = getStats();

  return (
    <div className="relative isolate overflow-hidden">
      {/* Announcement banner */}
      <div className="relative isolate flex items-center gap-x-4 overflow-hidden bg-dark-800/50 px-4 py-2 md:px-6 md:py-2.5 justify-center">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-300">
            <strong className="font-semibold text-white">New Feature</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx={1} cy={1} r={1} />
            </svg>
            AI-powered quiz generation now available
          </p>
          <Link
            to="/quiz"
            className="flex-none rounded-full bg-dark-700 px-3 py-1 md:px-3.5 md:py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-dark-600 transition-colors duration-200"
          >
            Try Now <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 md:px-6 pb-16 md:pb-24 pt-12 md:pt-16 lg:pt-32">
          <div className="max-w-full md:max-w-[60%] lg:max-w-[50%]">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-inter">
              Study
              <br />
              for students
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 text-gray-300 font-inter">
              The best way to learn and retain information. Create AI-powered study materials,
              practice with flashcards, and test your knowledge with adaptive quizzes.
            </p>
            <div className="mt-6 md:mt-10 flex items-center gap-x-4 md:gap-x-6">
              <Link
                to="/notes"
                className="rounded-full bg-white px-6 md:px-8 py-2.5 md:py-3.5 text-sm font-semibold text-dark-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 font-inter"
              >
                Get Started
              </Link>
              <Link
                to="/documentation"
                className="text-xs md:text-sm font-semibold leading-6 text-white hover:text-accent-primary transition-colors duration-200 font-inter"
              >
                Documentation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3D Model positioned absolutely */}
        <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 w-[60%] lg:w-[45%] aspect-square mr-5">
          <iframe
            src="https://my.spline.design/cubicresponsive-022b10b6d613b6600717e6376e536cb5/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full"
            title="3D Study Companion"
            style={{
              background: 'transparent',
              transform: 'scale(1.2)',
            }}
          />
        </div>
      </div>

      {/* Container for remaining content with its own background */}
      <div className="relative z-10 bg-dark-900">
        {/* Features section */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 mt-16 md:mt-24 lg:mt-32">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Smart Notes',
                  description: 'Create and organize your study notes with AI assistance.',
                  icon: DocumentTextIcon,
                  to: '/notes',
                  gradient: 'from-blue-500/20 via-blue-400/20 to-cyan-400/20',
                  iconColor: 'text-blue-400',
                },
                {
                  name: 'AI Flashcards',
                  description: 'Generate and practice with AI-powered flashcards.',
                  icon: BookOpenIcon,
                  to: '/flashcards',
                  gradient: 'from-purple-500/20 via-purple-400/20 to-pink-400/20',
                  iconColor: 'text-purple-400',
                },
                {
                  name: 'Adaptive Quizzes',
                  description: 'Test your knowledge with personalized quizzes.',
                  icon: AcademicCapIcon,
                  to: '/quiz',
                  gradient: 'from-emerald-500/20 via-emerald-400/20 to-teal-400/20',
                  iconColor: 'text-emerald-400',
                },
              ].map((feature) => (
                <Link
                  key={feature.name}
                  to={feature.to}
                  className="relative group"
                >
                  <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl group-hover:blur-2xl`} />
                  <div className="relative flex flex-col h-full p-8 bg-dark-800/50 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <feature.icon
                        className={`h-8 w-8 md:h-10 md:w-10 ${feature.iconColor} group-hover:scale-110 transition-all duration-300`}
                        aria-hidden="true"
                      />
                      <div className={`w-8 h-8 rounded-full ${feature.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                    </div>
                    <h3 className="mt-4 text-xl md:text-2xl font-bold text-white group-hover:text-white/90 transition-colors duration-300">
                      {feature.name}
                    </h3>
                    <p className="mt-3 text-base text-gray-300 group-hover:text-white/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300">
                      Learn more
                      <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 mt-16 md:mt-24 lg:mt-32">
          <div className="relative isolate overflow-hidden bg-dark-800/50 backdrop-blur-sm rounded-3xl">
            <div className="mx-auto max-w-7xl px-4 md:px-6 pb-16 md:pb-24 pt-12 md:pt-16 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">Track your progress</h2>
                <p className="mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 text-gray-300">
                  Monitor your learning journey with detailed statistics and insights.
                </p>
              </div>

              <dl className="mx-auto mt-12 md:mt-16 grid max-w-2xl grid-cols-1 gap-6 md:gap-x-8 md:gap-y-10 text-white sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                <div className="flex flex-col gap-y-3 border-l border-dark-600 pl-6">
                  <dt className="text-sm leading-6 text-gray-300">Quiz Average</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight">
                    {stats.quizAverage}%
                  </dd>
                </div>
                <div className="flex flex-col gap-y-3 border-l border-dark-600 pl-6">
                  <dt className="text-sm leading-6 text-gray-300">Flashcards Mastered</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight">
                    {stats.flashcardsMastered}
                  </dd>
                </div>
                <div className="flex flex-col gap-y-3 border-l border-dark-600 pl-6">
                  <dt className="text-sm leading-6 text-gray-300">Study Hours</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight">
                    {Math.round(stats.totalStudyTime / 60)}
                  </dd>
                </div>
                <div className="flex flex-col gap-y-3 border-l border-dark-600 pl-6">
                  <dt className="text-sm leading-6 text-gray-300">Day Streak</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight">
                    {stats.currentStreak}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Recent Activity section */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 mt-16 md:mt-24 lg:mt-32">
          <div className="mx-auto max-w-2xl lg:mx-0 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Recent Activity</h2>
            <p className="mt-2 text-base md:text-lg leading-7 md:leading-8 text-gray-300">
              Keep track of your latest study sessions and achievements.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Recent Quizzes */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Quizzes</h3>
              <div className="space-y-4">
                {stats.recentQuizzes?.slice(0, 3).map((quiz, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-dark-600 pb-4">
                    <div>
                      <p className="text-white font-medium">Quiz #{quiz.id}</p>
                      <p className="text-sm text-gray-300">{new Date(quiz.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{(quiz.score / quiz.total * 100).toFixed(0)}%</p>
                      <p className="text-sm text-gray-300">{quiz.difficulty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Study Streak */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Study Streak</h3>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-3xl font-bold text-white">{stats.currentStreak} Days</p>
                  <p className="text-sm text-gray-300">Current Streak</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">{stats.bestStreak || 0} Days</p>
                  <p className="text-sm text-gray-300">Best Streak</p>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${
                      i < stats.currentStreak % 28
                        ? 'bg-accent-primary'
                        : 'bg-dark-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 mt-16 md:mt-24 lg:mt-32 mb-12 md:mb-16">
          <div className="relative isolate overflow-hidden bg-dark-800/50 backdrop-blur-sm rounded-3xl">
            <div className="px-4 py-16 md:px-6 md:py-24 lg:px-32">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                  Ready to boost your learning?
                </h2>
                <p className="mx-auto mt-4 md:mt-6 max-w-xl text-base md:text-lg leading-7 md:leading-8 text-gray-300">
                  Start your learning journey today with our AI-powered study tools.
                </p>
                <div className="mt-6 md:mt-10 flex items-center justify-center gap-x-4 md:gap-x-6">
                  <Link
                    to="/notes"
                    className="rounded-full bg-white px-6 md:px-8 py-2.5 md:py-3.5 text-sm font-semibold text-dark-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/documentation"
                    className="text-xs md:text-sm font-semibold leading-6 text-white hover:text-accent-primary transition-colors duration-200"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
