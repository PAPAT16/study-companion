import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  BookOpenIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UserIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function Preloader() {
  const location = useLocation();
  
  // Define preloader styles for different pages
  const preloaderConfig = {
    '/notes': {
      icon: DocumentTextIcon,
      text: 'Loading your study notes...',
      color: 'blue',
      gradientFrom: 'from-blue-500/20',
      gradientTo: 'to-cyan-400/20',
    },
    '/flashcards': {
      icon: BookOpenIcon,
      text: 'Preparing your flashcards...',
      color: 'purple',
      gradientFrom: 'from-purple-500/20',
      gradientTo: 'to-pink-400/20',
    },
    '/quiz': {
      icon: AcademicCapIcon,
      text: 'Setting up your quiz...',
      color: 'emerald',
      gradientFrom: 'from-emerald-500/20',
      gradientTo: 'to-teal-400/20',
    },
    '/profile': {
      icon: UserIcon,
      text: 'Loading your profile...',
      color: 'amber',
      gradientFrom: 'from-amber-500/20',
      gradientTo: 'to-orange-400/20',
    },
    '/track-progress': {
      icon: ChartBarIcon,
      text: 'Analyzing your progress...',
      color: 'rose',
      gradientFrom: 'from-rose-500/20',
      gradientTo: 'to-pink-400/20',
    },
    default: {
      icon: DocumentTextIcon,
      text: 'Loading...',
      color: 'indigo',
      gradientFrom: 'from-indigo-500/20',
      gradientTo: 'to-purple-400/20',
    },
  };

  const config = preloaderConfig[location.pathname] || preloaderConfig.default;
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dark-900/90 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Background gradient animation */}
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} rounded-full animate-pulse blur-xl opacity-75`} />
        
        {/* Main circle */}
        <div className={`w-20 h-20 rounded-full border-4 border-${config.color}-200/30 animate-spin relative`}>
          <div className={`absolute top-0 left-0 w-20 h-20 rounded-full border-t-4 border-${config.color}-500 animate-spin-fast`}></div>
        </div>
        
        {/* Icon in the middle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Icon className={`w-8 h-8 text-${config.color}-500 animate-bounce`} />
        </div>
        
        {/* Text below */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center">
          <span className={`text-${config.color}-500 font-medium text-lg animate-pulse`}>
            {config.text}
          </span>
          <div className="flex space-x-2 mt-2">
            <div className={`w-2 h-2 rounded-full bg-${config.color}-500 animate-bounce [animation-delay:-0.3s]`}></div>
            <div className={`w-2 h-2 rounded-full bg-${config.color}-500 animate-bounce [animation-delay:-0.15s]`}></div>
            <div className={`w-2 h-2 rounded-full bg-${config.color}-500 animate-bounce`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
