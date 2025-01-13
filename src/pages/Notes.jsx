import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Notes() {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [currentNote, setCurrentNote] = useState('');
  const [title, setTitle] = useState('');

  const handleSaveNote = () => {
    if (currentNote.trim() && title.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title: title.trim(),
          content: currentNote.trim(),
          date: new Date().toISOString(),
        },
      ]);
      setCurrentNote('');
      setTitle('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Note Editor */}
        <div className="bg-dark-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-white">Create Note</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full p-2 mb-4 rounded-md bg-dark-700 text-white placeholder-gray-400 border border-dark-600 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
          />
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Start typing your note..."
            className="w-full h-64 p-2 mb-4 rounded-md bg-dark-700 text-white placeholder-gray-400 border border-dark-600 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
          />
          <button
            onClick={handleSaveNote}
            disabled={!currentNote.trim() || !title.trim()}
            className="w-full py-2 px-4 bg-accent-primary text-white rounded-md hover:bg-accent-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Note
          </button>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4 text-white">Your Notes</h2>
          {notes.length === 0 ? (
            <p className="text-gray-400">No notes yet. Create your first note!</p>
          ) : (
            notes.map(note => (
              <div key={note.id} className="bg-dark-800 rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{note.title}</h3>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-300 mb-2">{note.content}</p>
                <p className="text-sm text-gray-400">
                  {new Date(note.date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
