import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { generateQuiz } from '../services/aiService';
import { useProgress } from '../services/progressService';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const difficultyOptions = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard'
};

export default function Quiz() {
  const { userRecords, saveRecords } = useUser();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(5);

  const handleStartQuiz = async () => {
    const currentFlashcards = userRecords.flashcards || [];
    if (currentFlashcards.length < 3) {
      toast.error('You need at least 3 flashcards to generate a quiz');
      return;
    }

    setLoading(true);
    try {
      const generatedQuestions = await generateQuiz(currentFlashcards, difficulty, numQuestions);
      console.log('Generated Questions:', generatedQuestions); // Debug log
      setQuestions(generatedQuestions);
      setQuizStarted(true);
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizCompleted(false);
      setSelectedAnswer(null);
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast.error('Failed to generate quiz. Please try again.');
    }
    setLoading(false);
  };

  const handleAnswerSelect = (answer, index) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    setSelectedAnswer(answer);
    
    if (index === questions[currentQuestionIndex].correctIndex) {
      setScore(score + 1);
    }

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        handleQuizComplete();
      }
    }, 1000);
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    
    // Save quiz record
    const quizRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      difficulty,
      timeCompleted: new Date().toISOString()
    };

    const updatedRecords = {
      ...userRecords,
      quizzes: [...(userRecords.quizzes || []), quizRecord]
    };

    saveRecords(updatedRecords);
    toast.success('Quiz completed! Results saved to your profile.');
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(false);
  };

  useEffect(() => {
    // Update quiz history when user records change
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Generating your quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-dark-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 rounded-3xl blur-3xl" />
          
          {/* Main content */}
          <div className="relative bg-dark-800/50 backdrop-blur-xl border border-white/5 shadow-2xl rounded-3xl p-8">
            {!quizStarted ? (
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                  Test Your Knowledge
                </h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Challenge yourself with AI-generated questions based on your flashcards. Choose your difficulty and start learning!
                </p>
                <div className="max-w-md mx-auto space-y-8">
                  {/* Difficulty selection */}
                  <div className="form-group">
                    <label htmlFor="difficulty" className="block text-lg font-medium text-white mb-4">
                      Select Difficulty
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(difficultyOptions).map(([value, label]) => (
                        <button
                          key={value}
                          onClick={() => setDifficulty(value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            difficulty === value
                              ? 'border-emerald-500 bg-emerald-500/10 text-white'
                              : 'border-gray-700 hover:border-emerald-500/50 text-gray-400 hover:text-white'
                          }`}
                        >
                          <div className="text-lg font-semibold">{label}</div>
                          <div className="text-sm mt-1 opacity-80">
                            {value === 'easy' && '~1 min/q'}
                            {value === 'medium' && '~1.5 min/q'}
                            {value === 'hard' && '~2 min/q'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number of questions */}
                  <div className="form-group">
                    <label htmlFor="numQuestions" className="block text-lg font-medium text-white mb-4">
                      Quiz Length
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 3, label: 'Quick', desc: '3 Questions' },
                        { value: 5, label: 'Standard', desc: '5 Questions' },
                        { value: 10, label: 'Extended', desc: '10 Questions' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setNumQuestions(option.value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            numQuestions === option.value
                              ? 'border-emerald-500 bg-emerald-500/10 text-white'
                              : 'border-gray-700 hover:border-emerald-500/50 text-gray-400 hover:text-white'
                          }`}
                        >
                          <div className="text-lg font-semibold">{option.label}</div>
                          <div className="text-sm mt-1 opacity-80">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Start button */}
                  <button
                    onClick={handleStartQuiz}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-3 group"
                  >
                    <span>Start Quiz</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : quizCompleted ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <CheckCircleIcon className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Quiz Completed!</h2>
                <div className="mb-8">
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                  <p className="text-gray-400 mt-2">
                    You got {score} out of {questions.length} questions correct
                  </p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Another Quiz
                </button>
              </div>
            ) : (
              <div>
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-400">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                    <div className="text-sm font-medium text-emerald-400">
                      Score: {score}/{currentQuestionIndex + (selectedAnswer !== null ? 1 : 0)}
                    </div>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + (selectedAnswer !== null ? 1 : 0)) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="bg-dark-700/50 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-white/5">
                  <p className="text-xl text-white mb-8">{currentQuestion.question}</p>
                  <div className="space-y-4">
                    {currentQuestion.answers.map((option, index) => {
                      let buttonClass = 'w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ';
                      if (selectedAnswer === null) {
                        buttonClass += 'border-gray-700 hover:border-emerald-500/50 bg-dark-800/50 text-white hover:bg-dark-800';
                      } else if (index === currentQuestion.correctIndex) {
                        buttonClass += 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
                      } else if (option === selectedAnswer) {
                        buttonClass += 'border-red-500 bg-red-500/10 text-red-400';
                      } else {
                        buttonClass += 'border-gray-700 bg-dark-800/50 text-gray-400';
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(option, index)}
                          disabled={selectedAnswer !== null}
                          className={buttonClass}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${
                              selectedAnswer === null 
                                ? 'border-gray-600 text-gray-400' 
                                : index === currentQuestion.correctIndex
                                ? 'border-emerald-500 text-emerald-400'
                                : option === selectedAnswer
                                ? 'border-red-500 text-red-400'
                                : 'border-gray-600 text-gray-400'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="flex-grow">{option}</span>
                            {selectedAnswer !== null && index === currentQuestion.correctIndex && (
                              <CheckCircleIcon className="h-6 w-6 text-emerald-400" />
                            )}
                            {selectedAnswer === option && index !== currentQuestion.correctIndex && (
                              <XCircleIcon className="h-6 w-6 text-red-400" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
