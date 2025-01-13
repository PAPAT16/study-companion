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

          {/* Stats Section */}
          <div className="border-t border-dark-700">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-white mb-4 font-inter">Statistics</h3>
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.name}
                    className="relative overflow-hidden rounded-lg bg-dark-700 p-5"
                  >
                    <dt>
                      <div className="absolute rounded-md bg-indigo-500 p-3">
                        <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <p className="ml-16 truncate text-sm font-medium text-gray-400">
                        {stat.name}
                      </p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    </dd>
                  </div>
                ))}
                <div className="relative overflow-hidden rounded-lg bg-dark-700 p-5 sm:col-span-3">
                  <dt>
                    <div className="absolute rounded-md bg-indigo-500 p-3">
                      <AcademicCapIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-400">
                      Average Quiz Score
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-white">{calculateAverageScore()}%</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
