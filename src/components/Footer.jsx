import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-8">
            <h1 className="text-2xl font-bold tracking-tight text-dark-900 font-inter">
              Study Companion
            </h1>
            <p className="text-sm leading-6 text-dark-700 font-inter">
              Empowering students with AI-powered learning tools to achieve their academic goals.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-dark-900 hover:text-dark-700">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-dark-900 hover:text-dark-700">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-dark-900 hover:text-dark-700">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-dark-900 font-inter">Features</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/notes" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Smart Notes
                    </Link>
                  </li>
                  <li>
                    <Link to="/flashcards" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Flashcards
                    </Link>
                  </li>
                  <li>
                    <Link to="/quiz" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Quizzes
                    </Link>
                  </li>
                  <li>
                    <Link to="/progress" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Progress Tracking
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-dark-900 font-inter">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/documentation" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="/guides" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-dark-900 font-inter">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/about" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/press" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-dark-900 font-inter">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/privacy" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/licenses" className="text-sm leading-6 text-dark-700 hover:text-dark-900 font-inter">
                      Licenses
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 border-t border-dark-200 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col items-start justify-between gap-y-12 lg:flex-row">
            <div className="lg:flex-1">
              <h3 className="text-sm font-semibold leading-6 text-dark-900 font-inter">Subscribe to our newsletter</h3>
              <p className="mt-2 text-sm leading-6 text-dark-700 font-inter">
                Get the latest updates about new features and learning tips.
              </p>
              <div className="mt-4 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border border-dark-200 bg-white/5 px-3.5 py-2 text-dark-900 shadow-sm ring-1 ring-inset ring-dark-200 focus:ring-2 focus:ring-inset focus:ring-dark-900 sm:text-sm sm:leading-6 font-inter"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-dark-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-dark-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-900 font-inter"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-dark-200 pt-8">
            <p className="text-xs leading-5 text-dark-700 font-inter">
              &copy; {new Date().getFullYear()} Study Companion. All rights reserved. Built with care by students, for students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
