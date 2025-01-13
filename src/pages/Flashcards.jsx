import React, { useState, useEffect, useRef } from 'react'
import { PlusIcon, ArrowPathIcon, SparklesIcon, TrashIcon, BookOpenIcon, ChevronLeftIcon, ChevronRightIcon, AcademicCapIcon, CameraIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useUser } from '../context/UserContext';
import { generateFlashcards, generateTopicExplanation, analyzeImage } from '../services/aiService'
import toast from 'react-hot-toast'
import '../styles/flashcard.css'

export default function Flashcards() {
  const { userRecords, saveRecords } = useUser();
  const [cards, setCards] = useState(userRecords.flashcards || []);
  const [currentCard, setCurrentCard] = useState({ question: '', answer: '', imageUrl: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyText, setStudyText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [imageAnalysis, setImageAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    saveRecords('flashcards', cards);
  }, [cards, saveRecords]);

  useEffect(() => {
    setCards(userRecords.flashcards || []);
  }, [userRecords.flashcards]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const captureImage = async () => {
    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const imageBase64 = canvas.toDataURL('image/jpeg');
      
      setIsAnalyzing(true);
      stopCamera();
      
      const analysis = await analyzeImage(imageBase64);
      setImageAnalysis(analysis);
      toast.success('Image analyzed successfully!');
    } catch (error) {
      console.error('Error capturing image:', error);
      toast.error('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCreateCard = () => {
    if (currentCard.question && currentCard.answer) {
      setCards([...cards, { ...currentCard, id: Date.now() }]);
      setCurrentCard({ question: '', answer: '', imageUrl: '' });
      setIsCreating(false);
    }
  };

  const handleGenerateCards = async () => {
    if (!studyText.trim()) {
      toast.error('Please enter some text to generate flashcards from');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedCards = await generateFlashcards(studyText);
      
      // Check if we got valid cards back
      if (!Array.isArray(generatedCards) || generatedCards.length === 0) {
        throw new Error('No valid flashcards were generated');
      }

      // Validate each card has the required properties
      const validCards = generatedCards.filter(card => 
        card && typeof card.question === 'string' && 
        typeof card.answer === 'string' && 
        card.id
      );

      if (validCards.length === 0) {
        throw new Error('Generated cards were not in the correct format');
      }

      setCards(prevCards => [...prevCards, ...validCards]);
      setStudyText('');
      setIsCreating(false);
      setIsFlipped(false);
      setCurrentIndex(cards.length);
      toast.success(`Successfully generated ${validCards.length} flashcards!`);
    } catch (error) {
      console.error('Error in handleGenerateCards:', error);
      toast.error(error.message || 'Failed to generate flashcards. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleDeleteCard = (cardId) => {
    const newCards = cards.filter((card) => card.id !== cardId);
    setCards(newCards);
    if (currentIndex >= newCards.length) {
      setCurrentIndex(Math.max(0, newCards.length - 1));
    }
  };

  const handleGetExplanation = async () => {
    if (!subject.trim() || !topic.trim()) {
      toast.error('Please enter both subject and topic');
      return;
    }

    setIsExplaining(true);
    try {
      const content = await generateTopicExplanation(subject, topic);
      setExplanation(content);
      toast.success('Explanation generated successfully!');
    } catch (error) {
      console.error('Error getting explanation:', error);
      toast.error('Failed to generate explanation. Please try again.');
    }
    setIsExplaining(false);
  };

  return (
    <div className="relative isolate overflow-hidden">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 md:px-6 pb-16 md:pb-20 pt-12 md:pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-inter">
                Flashcards
              </h1>
              <p className="mt-2 text-base md:text-lg text-gray-300 font-inter">
                Create and practice with AI-powered flashcards
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowExplanation(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  !showExplanation ? 'bg-white text-dark-900' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                Flashcards
              </button>
              <button
                onClick={() => setShowExplanation(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  showExplanation ? 'bg-white text-dark-900' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                AI Explanation
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Controls */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white/90 font-inter">Tools</h2>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsCreating('generate')}
                    className="w-full px-4 py-2.5 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <SparklesIcon className="h-4 w-4" />
                    Generate Cards
                  </button>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="w-full px-4 py-2.5 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Create Card
                  </button>
                  <button
                    onClick={startCamera}
                    className="w-full px-4 py-2.5 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <CameraIcon className="h-4 w-4" />
                    Scan Text
                  </button>
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-white/90 font-inter mb-4">Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-700/50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-white">{cards.length}</p>
                    <p className="text-sm text-gray-400">Total Cards</p>
                  </div>
                  <div className="bg-dark-700/50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-white">{currentIndex + 1}</p>
                    <p className="text-sm text-gray-400">Current Card</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
              {showExplanation ? (
                <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <AcademicCapIcon className="h-6 w-6 mr-2 text-indigo-600" />
                      Study Assistant
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full rounded-md border-gray-300 bg-dark-700 text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="e.g., Mathematics, Physics, History"
                        />
                      </div>
                      <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-white mb-1">
                          Topic
                        </label>
                        <input
                          type="text"
                          id="topic"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="w-full rounded-md border-gray-300 bg-dark-700 text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="e.g., Quadratic Equations, Newton's Laws"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={handleGetExplanation}
                        disabled={isExplaining}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                      >
                        {isExplaining ? (
                          <>
                            <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                            Generating Explanation...
                          </>
                        ) : (
                          <>
                            <SparklesIcon className="h-5 w-5 mr-2" />
                            Get Explanation
                          </>
                        )}
                      </button>
                      <button
                        onClick={startCamera}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <CameraIcon className="h-5 w-5 mr-2" />
                        Scan Question
                      </button>
                    </div>
                  </div>

                  {explanation && (
                    <div className="mt-6">
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 animate-fadeIn hover:shadow-xl transition-all duration-300">
                        {/* Explanation content */}
                        {explanation.split('\n').map((paragraph, index) => {
                          if (/^[📚💡🌟❗]/.test(paragraph.trim())) {
                            return (
                              <h4 key={index} className="text-xl font-semibold text-indigo-600 mt-6 mb-3 flex items-center animate-slideIn" style={{ animationDelay: `${index * 100}ms` }}>
                                <span className="mr-2 animate-wiggle">{paragraph.charAt(0)}</span>
                                {paragraph.substring(1)}
                              </h4>
                            );
                          }
                          else if (/^[🔍⭐💪⚠️📝]/.test(paragraph.trim())) {
                            return (
                              <div key={index} className="flex items-start space-x-3 my-2 animate-slideIn" style={{ animationDelay: `${index * 100}ms` }}>
                                <span className="animate-wiggle">{paragraph.charAt(0)}</span>
                                <p className="text-gray-700 leading-relaxed">
                                  {paragraph.substring(1).trim()}
                                </p>
                              </div>
                            );
                          }
                          else if (paragraph.trim()) {
                            return (
                              <p key={index} className="text-gray-700 leading-relaxed my-3 animate-slideIn" style={{ animationDelay: `${index * 100}ms` }}>
                                {paragraph}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  )}

                  {imageAnalysis && (
                    <div className="mt-6">
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 animate-fadeIn hover:shadow-xl transition-all duration-300">
                        {/* Image analysis content */}
                        {imageAnalysis.split('\n').map((paragraph, index) => {
                          if (/^[📚💡🌟❗]/.test(paragraph.trim())) {
                            return (
                              <h4 key={index} className="text-xl font-semibold text-indigo-600 mt-6 mb-3 flex items-center animate-slideIn" style={{ animationDelay: `${index * 100}ms` }}>
                                <span className="mr-2 animate-wiggle">{paragraph.charAt(0)}</span>
                                {paragraph.substring(1)}
                              </h4>
                            );
                          }
                          if (/^[🔍⭐💪⚠️📝]/.test(paragraph.trim())) {
                            return (
                              <div key={index} className="flex items-start space-x-3 my-2 animate-slideIn" style={{ animationDelay: `${index * 100}ms` }}>
                                <span className="animate-wiggle">{paragraph.charAt(0)}</span>
                                <p className="text-gray-700 leading-relaxed">
                                  {paragraph.substring(1).trim()}
                                </p>
                              </div>
                            );
                          }
                          if (paragraph.trim()) {
                            return (
                              <p key={index} className="text-gray-700 leading-relaxed my-3 animate-slideIn" style={{ animationDelay: `${index * 100}ms` }}>
                                {paragraph}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {isCreating && (
                    <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
                      <h2 className="text-lg font-semibold text-white/90 font-inter mb-4">Create New Flashcard</h2>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="question" className="block text-sm font-medium text-white">
                            Question
                          </label>
                          <input
                            type="text"
                            name="question"
                            id="question"
                            value={currentCard.question}
                            onChange={(e) => setCurrentCard({ ...currentCard, question: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 bg-dark-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                            placeholder="Enter the question"
                          />
                        </div>
                        <div>
                          <label htmlFor="answer" className="block text-sm font-medium text-white">
                            Answer
                          </label>
                          <input
                            type="text"
                            name="answer"
                            id="answer"
                            value={currentCard.answer}
                            onChange={(e) => setCurrentCard({ ...currentCard, answer: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 bg-dark-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                            placeholder="Enter the answer"
                          />
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setIsCreating(false)}
                            className="px-4 py-2 border border-gray-300 rounded-xl text-white bg-dark-700 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleCreateCard}
                            className="px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {isCreating === 'generate' && (
                    <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
                      <h2 className="text-lg font-semibold text-white/90 font-inter mb-4">Generate Flashcards</h2>
                      <div className="space-y-4">
                        <textarea
                          value={studyText}
                          onChange={(e) => setStudyText(e.target.value)}
                          placeholder="Enter your study text here..."
                          className="w-full h-32 px-3 py-2 text-white bg-dark-700 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        />
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setIsCreating(false)}
                            className="px-4 py-2 border border-gray-300 rounded-xl text-white bg-dark-700 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleGenerateCards}
                            disabled={isGenerating}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                          >
                            {isGenerating ? (
                              <>
                                <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <SparklesIcon className="h-5 w-5 mr-2" />
                                Generate
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isCreating && cards.length > 0 && (
                    <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
                      <div className="flex justify-center items-center mb-6 space-x-4">
                        <button
                          onClick={handlePrevious}
                          className="p-2 rounded-xl bg-dark-700/50 hover:bg-dark-600 text-white transition-colors disabled:opacity-50"
                          disabled={cards.length <= 1}
                        >
                          <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <span className="text-white/90 font-medium">
                          Card {currentIndex + 1} of {cards.length}
                        </span>
                        <button
                          onClick={handleNext}
                          className="p-2 rounded-xl bg-dark-700/50 hover:bg-dark-600 text-white transition-colors disabled:opacity-50"
                          disabled={cards.length <= 1}
                        >
                          <ChevronRightIcon className="h-5 w-5" />
                        </button>
                      </div>

                      <div 
                        onClick={handleFlip}
                        className={`flip-card relative w-full h-[350px] ${isFlipped ? 'flipped' : ''}`}
                      >
                        <div className="flip-card-inner">
                          <div className="flip-card-front glass-effect gradient-bg glow-effect shine-effect rounded-2xl">
                            <div className="card-content">
                              {cards[currentIndex].imageUrl ? (
                                <div className="card-image-container mb-4">
                                  <img
                                    src={cards[currentIndex].imageUrl}
                                    alt={cards[currentIndex].question}
                                    className="card-image"
                                  />
                                  <div className="card-image-overlay" />
                                </div>
                              ) : (
                                <div className="card-image-container glass-effect flex items-center justify-center mb-4">
                                  <BookOpenIcon className="h-12 w-12 text-white/70" />
                                </div>
                              )}
                              
                              <div className="flex-grow flex flex-col justify-between">
                                <div>
                                  <h3 className="text-xl font-semibold text-white/90 mb-3 font-inter">Question</h3>
                                  <p className="text-white/80 text-lg leading-relaxed font-inter">{cards[currentIndex].question}</p>
                                </div>
                                <div className="flex items-center justify-between text-sm text-white/60 mt-4">
                                  <span className="font-inter tracking-wide">TAP TO REVEAL</span>
                                  <ArrowPathIcon className="h-5 w-5 animate-pulse" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flip-card-back glass-effect gradient-bg glow-effect shine-effect rounded-2xl">
                            <div className="card-content">
                              <div className="flex-grow flex flex-col justify-between">
                                <div>
                                  <h3 className="text-xl font-semibold text-white/90 mb-3 font-inter">Answer</h3>
                                  <p className="text-white/80 text-lg leading-relaxed font-inter">{cards[currentIndex].answer}</p>
                                </div>
                                <div className="flex items-center justify-between text-sm text-white/60 mt-4">
                                  <span className="font-inter tracking-wide">TAP TO FLIP</span>
                                  <ArrowPathIcon className="h-5 w-5 animate-pulse" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCard(cards[currentIndex].id);
                          }}
                          className="absolute top-3 right-3 z-10 p-2 rounded-full glass-effect hover:bg-white/10 text-white/70 hover:text-white/90 transition-all duration-300"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {!isCreating && cards.length === 0 && (
                    <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl p-8 text-center">
                      <div className="max-w-md mx-auto">
                        <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No Flashcards Yet</h3>
                        <p className="text-gray-400 mb-6">Create your first flashcard or generate them from your study material.</p>
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => setIsCreating(true)}
                            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-medium text-sm transition-all duration-200"
                          >
                            Create Card
                          </button>
                          <button
                            onClick={() => setIsCreating('generate')}
                            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-medium text-sm transition-all duration-200"
                          >
                            Generate Cards
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
