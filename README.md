# Study Companion

A modern web application designed to help students study more effectively using AI-powered features.

## Features

- **AI-Powered Flashcards**: Create flashcards automatically from your study materials
- **Interactive Quizzes**: Generate quizzes based on your flashcards
- **Progress Tracking**: Monitor your learning progress over time
- **User Profiles**: Personal dashboard with study statistics
- **Modern UI**: Clean, responsive design with dark mode

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Google's Gemini AI API
- React Router DOM
- Headless UI
- Hero Icons

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/study-companion.git
   cd study-companion
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment

This project is configured for deployment on Vercel. Simply push to your GitHub repository and connect it to Vercel for automatic deployments.

## Environment Variables

The following environment variables are required:

- `VITE_GEMINI_API_KEY`: Your Google Gemini AI API key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
