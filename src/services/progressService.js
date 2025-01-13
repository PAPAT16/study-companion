import { useLocalStorage } from '../hooks/useLocalStorage';

export const useProgress = () => {
  const [progress, setProgress] = useLocalStorage('study_progress', {
    quizzes: [],
    flashcards: {
      total: 0,
      mastered: 0,
      learning: 0,
      needsPractice: 0,
    },
    studyTime: 0,
    streakDays: 0,
    lastStudyDate: null,
  });

  const updateQuizProgress = (quizResult) => {
    setProgress(prev => ({
      ...prev,
      quizzes: [...prev.quizzes, {
        date: new Date().toISOString(),
        score: quizResult.score,
        total: quizResult.total,
        difficulty: quizResult.difficulty,
        timeSpent: quizResult.timeSpent,
      }],
    }));
  };

  const updateFlashcardProgress = (cardId, status) => {
    setProgress(prev => {
      const flashcards = { ...prev.flashcards };
      
      // Decrease previous status count
      if (status === 'mastered') flashcards.learning--;
      else if (status === 'learning') flashcards.needsPractice--;
      
      // Increase new status count
      if (status === 'mastered') flashcards.mastered++;
      else if (status === 'learning') flashcards.learning++;
      else flashcards.needsPractice++;

      return {
        ...prev,
        flashcards,
      };
    });
  };

  const updateStudyTime = (minutes) => {
    setProgress(prev => {
      const today = new Date().toDateString();
      const lastStudy = prev.lastStudyDate ? new Date(prev.lastStudyDate).toDateString() : null;
      
      let streakDays = prev.streakDays;
      if (lastStudy) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastStudy === yesterday) streakDays++;
        else if (lastStudy !== today) streakDays = 1;
      } else {
        streakDays = 1;
      }

      return {
        ...prev,
        studyTime: prev.studyTime + minutes,
        streakDays,
        lastStudyDate: new Date().toISOString(),
      };
    });
  };

  const getStats = () => {
    const recentQuizzes = progress.quizzes.slice(-5);
    const averageScore = recentQuizzes.reduce((acc, quiz) => 
      acc + (quiz.score / quiz.total) * 100, 0) / (recentQuizzes.length || 1);

    return {
      quizAverage: Math.round(averageScore),
      flashcardsMastered: progress.flashcards.mastered,
      totalStudyTime: progress.studyTime,
      currentStreak: progress.streakDays,
    };
  };

  return {
    progress,
    updateQuizProgress,
    updateFlashcardProgress,
    updateStudyTime,
    getStats,
  };
};
