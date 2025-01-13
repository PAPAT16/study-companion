import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { UserCircleIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

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
    <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-dark-800 shadow rounded-lg">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-white font-inter">User Profile</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-400 font-inter">
                Personal details and preferences
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-inter"
            >
              Logout
            </button>
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
                        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent-primary hover:bg-accent-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary font-inter"
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="border-t border-dark-700">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 p-4">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-dark-700/50 px-4 py-5 rounded-lg shadow">
                  <dt className="text-base font-normal text-gray-400 flex items-center gap-2">
                    <stat.icon className="h-5 w-5" />
                    {stat.name}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">{stat.value}</dd>
                </div>
              ))}
              <div className="bg-dark-700/50 px-4 py-5 rounded-lg shadow">
                <dt className="text-base font-normal text-gray-400">Average Score</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">{calculateAverageScore()}%</dd>
              </div>
            </dl>
          </div>

          {/* Quiz History */}
          <div className="border-t border-dark-700 px-4 py-5">
            <h4 className="text-lg font-medium text-white mb-4">Quiz History</h4>
            <div className="space-y-4">
              {userRecords.quizzes && userRecords.quizzes.length > 0 ? (
                [...userRecords.quizzes]
                  .sort((a, b) => new Date(b.timeCompleted) - new Date(a.timeCompleted))
                  .map((quiz) => (
                    <div key={quiz.id} className="bg-dark-700/50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">
                            {new Date(quiz.timeCompleted).toLocaleDateString()} at {new Date(quiz.timeCompleted).toLocaleTimeString()}
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full capitalize" 
                                style={{
                                  backgroundColor: quiz.difficulty === 'easy' ? 'rgba(34, 197, 94, 0.1)' : 
                                                 quiz.difficulty === 'medium' ? 'rgba(234, 179, 8, 0.1)' : 
                                                 'rgba(239, 68, 68, 0.1)',
                                  color: quiz.difficulty === 'easy' ? 'rgb(34, 197, 94)' : 
                                        quiz.difficulty === 'medium' ? 'rgb(234, 179, 8)' : 
                                        'rgb(239, 68, 68)'
                                }}>
                            {quiz.difficulty}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-300">
                          Score: {quiz.score} out of {quiz.totalQuestions}
                        </div>
                      </div>
                      <div className="text-2xl font-semibold" style={{
                        color: (quiz.score / quiz.totalQuestions) >= 0.8 ? 'rgb(34, 197, 94)' :
                               (quiz.score / quiz.totalQuestions) >= 0.6 ? 'rgb(234, 179, 8)' :
                               'rgb(239, 68, 68)'
                      }}>
                        {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <AcademicCapIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No quiz history yet. Start taking quizzes to see your progress!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
