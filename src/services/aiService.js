// This is an AI service using Google's Gemini API
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI with safety settings
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCSrEI1sTP687fUWYhy6ri_6OKuCagAIEI');

export const generateFlashcards = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Create 5 educational flashcards from this text. For each flashcard, provide:
    1. A front (question/term)
    2. A back (answer/definition)
    3. An imageSearchTerm (a short, specific phrase that best represents the concept)

    Format your response as a valid JSON array of objects. Each object should have exactly these properties: front, back, and imageSearchTerm.
    Example format:
    [
      {
        "front": "What is photosynthesis?",
        "back": "The process by which plants convert sunlight into energy",
        "imageSearchTerm": "plant photosynthesis diagram"
      }
    ]

    Text to create flashcards from:
    ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    let flashcardsData;
    try {
      flashcardsData = JSON.parse(content);
      // Validate the response format
      if (!Array.isArray(flashcardsData)) {
        throw new Error('Invalid response format: expected an array');
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('Failed to generate valid flashcards format. Please try again with different text.');
    }

    // Get images for each flashcard
    const flashcardsWithImages = await Promise.all(
      flashcardsData.map(async (flashcard, index) => {
        try {
          if (!import.meta.env.VITE_UNSPLASH_ACCESS_KEY) {
            return {
              id: Date.now() + index,
              question: flashcard.front,
              answer: flashcard.back,
              imageUrl: null
            };
          }

          const imageResponse = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(flashcard.imageSearchTerm)}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
          );
          
          if (!imageResponse.ok) {
            throw new Error('Failed to fetch image from Unsplash');
          }
          
          const imageData = await imageResponse.json();
          
          return {
            id: Date.now() + index,
            question: flashcard.front,
            answer: flashcard.back,
            imageUrl: imageData.results[0]?.urls.small || null
          };
        } catch (error) {
          console.error('Error fetching image:', error);
          return {
            id: Date.now() + index,
            question: flashcard.front,
            answer: flashcard.back,
            imageUrl: null
          };
        }
      })
    );

    if (flashcardsWithImages.length === 0) {
      throw new Error('No flashcards were generated. Please try again with different text.');
    }

    return flashcardsWithImages;
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw new Error(error.message || 'Failed to generate flashcards. Please try again.');
  }
};

export const generateQuiz = async (flashcards, difficulty = 'medium', numQuestions = 5) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are a helpful AI tutor that creates ${difficulty} difficulty quiz questions.
    Create a quiz with ${numQuestions} multiple choice questions based on these flashcards:
    ${JSON.stringify(flashcards)}
    
    For each question:
    1. Create a clear question
    2. Provide 4 possible answers
    3. Specify the correct answer index (0-3)
    4. Give a brief explanation
    
    Format each question exactly as:
    Q: [Question]
    Options: [Option 1], [Option 2], [Option 3], [Option 4]
    Correct: [index]
    Explanation: [explanation]
    
    Separate each question with a blank line.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    console.log('Quiz AI Response:', content); // Debug log
    
    const questionStrings = content.split('\n\n').filter(str => {
      const trimmed = str.trim();
      return trimmed.startsWith('Q:') && trimmed.includes('Options:');
    });
    
    const quiz = questionStrings.map((str, index) => {
      const lines = str.split('\n');
      const question = lines.find(line => line.trim().startsWith('Q:'))?.replace('Q:', '').trim();
      const options = lines.find(line => line.trim().startsWith('Options:'))?.replace('Options:', '').split(',').map(opt => opt.trim());
      const correctIndex = parseInt(lines.find(line => line.trim().startsWith('Correct:'))?.replace('Correct:', '').trim());
      const explanation = lines.find(line => line.trim().startsWith('Explanation:'))?.replace('Explanation:', '').trim();
      
      if (!question || !options || isNaN(correctIndex) || !explanation) {
        console.error('Invalid quiz question format:', str);
        return null;
      }
      
      return {
        id: Date.now() + index,
        question,
        answers: options,
        correctIndex,
        explanation
      };
    }).filter(q => q !== null);
    
    console.log('Parsed Quiz:', quiz); // Debug log
    
    if (quiz.length === 0) {
      throw new Error('No valid quiz questions were generated');
    }

    return quiz;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
};

export const generateTopicExplanation = async (subject, topic) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `As an engaging teacher, provide a comprehensive explanation of ${topic} in the context of ${subject}. 
    Format your response with the following sections, using emojis and clear structure:

    📚 Overview
    Start with a brief, engaging introduction to the topic.

    💡 Key Concepts
    - List and explain the main concepts
    - Include important definitions
    - Highlight fundamental principles
    Use relevant emojis for each point (e.g., 🔍 for definitions, ⭐ for key points)

    🌟 Real-World Applications
    - Provide practical examples
    - Show how the concept is used in daily life
    - Include relevant industry applications
    Use descriptive emojis that match each example

    ❗ Common Misconceptions & Tips
    - Address typical misunderstandings
    - Highlight important points to remember
    - Provide tips for better understanding
    Use warning ⚠️ for misconceptions and 💪 for tips

    Make the explanation engaging and easy to understand for students. Use clear language and structure the response with proper spacing between sections.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    return content;
  } catch (error) {
    console.error('Error generating topic explanation:', error);
    throw error;
  }
};

export const analyzeImage = async (imageBase64) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    const prompt = `Analyze this image and provide an engaging explanation with emojis. If it contains:
    
    📸 Image Type:
    - Question/Problem: Provide solution with step-by-step explanation
    - Concept/Diagram: Explain what it represents and key components
    - Text Content: Summarize and explain main points

    Use appropriate emojis to make the explanation more engaging:
    - 🎯 For main points
    - 💡 For insights
    - 📝 For examples
    - ⚡ For quick tips
    - ❗ For important notes
    - ✨ For interesting facts

    Format your response with clear sections and bullet points, using emojis to enhance readability.`;

    // Remove the data URL prefix to get just the base64 string
    const base64Data = imageBase64.split(',')[1];
    
    // Convert base64 to Uint8Array
    const binaryData = atob(base64Data);
    const bytes = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      bytes[i] = binaryData.charCodeAt(i);
    }

    const result = await model.generateContent([prompt, {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg"
      }
    }]);
    
    const response = await result.response;
    const content = response.text();
    
    return content;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};
