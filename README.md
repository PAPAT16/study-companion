# Study Companion

An AI-powered learning assistant that helps students study more effectively through flashcards, quizzes, and notes.

## Features

- AI-powered flashcard generation
- Interactive quizzes
- Note-taking with AI assistance
- User authentication
- Profile management

## Tech Stack

- React
- Create React App
- TailwindCSS
- Google Gemini AI
- React Router
- React Hot Toast

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

## Deployment on Vercel

1. Push your code to a Git repository

2. Connect your repository to Vercel

3. Add the following environment variables in Vercel:
   - `REACT_APP_GEMINI_API_KEY`
   - `REACT_APP_UNSPLASH_ACCESS_KEY`

4. Deploy! Vercel will automatically detect Create React App and build your project correctly.

## Build

To create a production build:

```bash
npm run build
```

The build will be created in the `build` directory.

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0
