import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { BookOpenIcon, AcademicCapIcon, DocumentTextIcon, ArrowTrendingUpIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Profile() {
  const { user, userRecords, logout } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!user) {
    navigate('/login');
    return null;
  }

  const stats = [
    { 
      name: 'Flashcards Created', 
      value: userRecords.flashcards?.length || 0,
      icon: BookOpenIcon 
    },
    { 
      name: 'Quizzes Completed', 
      value: userRecords.quizzes?.length || 0,
      icon: AcademicCapIcon 
    },
  ];

  const calculateAverageScore = () => {
    if (!userRecords.quizzes?.length) return 0;
    const totalScore = userRecords.quizzes.reduce((acc, quiz) => {
      return acc + (quiz.score / quiz.totalQuestions) * 100;
    }, 0);
    return Math.round(totalScore / userRecords.quizzes.length);
  };

  const handleSave = () => {
    // In a real app, you would make an API call here
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="glass-effect gradient-bg rounded-2xl p-8 mb-8 animate-fadeIn">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-400 mt-1">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-inter"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="border-t border-dark-700">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <img
                  className="h-24 w-24 rounded-full"
                  src={user.avatar}
                  alt={user.name}
                />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-600 bg-dark-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-600 bg-dark-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={handleSave}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setName(user?.name || '');
                          setEmail(user?.email || '');
                        }}
                        className="inline-flex justify-center rounded-md border border-gray-600 bg-dark-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold text-white font-inter">{user.name}</h2>
                    <p className="text-gray-400 font-inter">{user.email}</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent-primary hover:bg-accent-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary font-inter"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Study Statistics */}
          <div className="glass-effect gradient-bg rounded-2xl p-6 animate-slideInRight" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpenIcon className="h-6 w-6 mr-2 text-indigo-400" />
              Study Statistics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-dark-800/50">
                <p className="text-sm text-gray-400">Flashcards</p>
                <p className="text-2xl font-bold mt-1">{userRecords.flashcards.length}</p>
              </div>
              <div className="p-4 rounded-xl bg-dark-800/50">
                <p className="text-sm text-gray-400">Notes</p>
                <p className="text-2xl font-bold mt-1">{userRecords.notes.length}</p>
              </div>
            </div>
          </div>

          {/* Quiz Performance */}
          <div className="glass-effect gradient-bg rounded-2xl p-6 animate-slideInRight" style={{ animationDelay: '200ms' }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AcademicCapIcon className="h-6 w-6 mr-2 text-indigo-400" />
              Quiz Performance
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-dark-800/50">
                <p className="text-sm text-gray-400">Quizzes Completed</p>
                <p className="text-2xl font-bold mt-1">{userRecords.quizzes.length}</p>
              </div>
              <div className="p-4 rounded-xl bg-dark-800/50">
                <p className="text-sm text-gray-400">Average Score</p>
                <p className="text-2xl font-bold mt-1">{calculateAverageScore()}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-effect gradient-bg rounded-2xl p-6 animate-slideInRight" style={{ animationDelay: '300ms' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ArrowTrendingUpIcon className="h-6 w-6 mr-2 text-indigo-400" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {userRecords.quizzes.slice(-3).reverse().map((quiz, index) => (
              <div key={index} className="flex items-center p-4 rounded-xl bg-dark-800/50">
                <DocumentTextIcon className="h-5 w-5 text-indigo-400 mr-3" />
                <div>
                  <p className="font-medium">Completed Quiz</p>
                  <p className="text-sm text-gray-400">Score: {quiz.score}%</p>
                </div>
              </div>
            ))}
            {userRecords.quizzes.length === 0 && (
              <p className="text-gray-400 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
