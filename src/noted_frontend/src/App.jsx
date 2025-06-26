import { useState, useEffect, useRef } from 'react';
import { noted_backend } from 'declarations/noted_backend';
import './index.css';

function App() {
  
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [theme, setTheme] = useState('light');
  const notesListRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null)

  const canisterId = 'uxrrr-q7777-77774-qaaaq-cai';

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await noted_backend.getNotes();
      setNotes(notes);
    }
    fetchNotes();
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {    
      if (notesListRef.current && notes.length > 0) {
      notesListRef.current.scrollTop = notesListRef.current.scrollHeight;
    }
  }, [notes])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  const deleteNote = async (id) => {
    await noted_backend.deleteNote(BigInt(id));
    const notes = await noted_backend.getNotes();
    setNotes(notes);
  }

  const addNote = async (title, content) => {
    if (!title.trim() || !content.trim()) return;
    await noted_backend.addNote(title, content);
    setTitle('');
    setContent('');
    const notes = await noted_backend.getNotes();
    setNotes(notes);
  }

  const updateNote = async (id, title, content) => {
    if (!title.trim() || !content.trim()) return;
    await noted_backend.updateNote(BigInt(id), title, content);
    setSelectedNote(null);
    setEditTitle('');
    setEditContent('');
    const notes = await noted_backend.getNotes();
    setNotes(notes);
  };

  const truncateContent = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const openModal = (note) => {
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setEditTitle('');
    setEditContent('');
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectTheme = (themeName) => {
    setTheme(themeName);
    setIsDropdownOpen(false);
  };

  return (
    <>
    <div className={notes.length === 0 ? "max-w-xl p-5 pb-16 m-auto my-6 shadow-xl rounded-xl" : 'max-w-6xl p-5 m-auto my-6 shadow-xl rounded-xl'} style={{backgroundColor: 'var(--container-bg)'}}>
          <div className="flex justify-center items-center m-auto mb-8 ml-8 gap-2">
            <h3 className='text-5xl' style={{color: 'var(--text-primary)'}}>
              Noted!
            </h3>
            <img src="../kowNoted.png" alt="Noted logo" className='w-20'/>
          </div>
          <div className={ notes.length === 0 ? 'absolute top-10 left-12' : "absolute top-10 left-15"} ref={dropdownRef}>
            <button className="rounded-xl p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-300" style={{color: 'var(--text-primary)', backgroundColor: 'var(--input-bg'}} onClick={toggleDropdown}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
            {
              isDropdownOpen && (
                <ul className="absolute top-12 left-0 w-32 bg-gray-100 rounded-xl shadow-lg z-50" style={{backgroundColor: 'var(--input-bg'}}>
                  <li className="px-4 py-2 hover:bg-gray-200 rounded-t-xl cursor-pointer" style={{color: 'var(--text-primary)'}} onClick={() => selectTheme('light')}>Light</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" style={{color: 'var(--text-primary)'}} onClick={() => selectTheme('dark')}>Dark</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" style={{color: 'var(--text-primary)'}} onClick={() => selectTheme('yellow')}>Yellow</li>
                  <li className="px-4 py-2 hover:bg-gray-200 rounded-b-xl cursor-pointer" style={{color: 'var(--text-primary)'}} onClick={() => selectTheme('ocean')}>Ocean</li>
                </ul>
              )
            }
          </div>
      <div className={notes.length === 0 ? "m-auto w-[70%]" : "flex justify-between items-center"}>
        <div className={notes.length === 0 ? "w-full text-center" : "w-[35%] ml-10"}>
            <div className="mt-0 text-center">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={notes.length === 0 ? "rounded-xl w-[80%] p-2 mb-6 text-center text-xl bg-gray-100 focus:outline-gray-100" : "rounded-xl w-[60%] p-2 mb-6 text-center text-xl bg-gray-100 focus:outline-gray-100"} placeholder="Title" style={{backgroundColor: 'var(--input-bg', color: 'var(--text-primary)'}} /><br/>
              <textarea name="content" value={content} placeholder='Content' className={notes.length === 0 ? "rounded-xl w-[100%] text-center focus:text-left mb-6 text-xl resize-none p-4 bg-gray-100 focus:outline-gray-100" : 'rounded-xl w-[80%] text-center focus:text-left mb-6 text-xl resize-none p-4 bg-gray-100 focus:outline-gray-100'} style={{backgroundColor: 'var(--input-bg', color: 'var(--text-primary)'}} rows="3" onChange={(e) => {setContent(e.target.value)}}/><br/>
              <button onClick={() => {addNote(title, content)}} style={{backgroundColor: 'var(--button-bg)', ':hover': {backgroundColor: '(var(--button-hover)'}}} className="rounded-xl bg-blue-400/80 hover:bg-blue-400 hover:scale-110 transition duration-500 py-4 px-6 text-white">Add Note</button>
            </div>
        </div>
        <div className={ notes.length === 0 ? 'w-[35%] -mt-6 mr-12' : "w-[35%] -mt-6 mr-8"}>
            <div className="-mt-12 max-h-[360px] overflow-y-auto overflow-x-hidden scrollbar-hidden" ref={notesListRef}>
              <ul className="pr-4">
                {notes.map((note) => (
                  <li
                  onClick={() => openModal(note)}
                  className="py-4 bg-blue-300/50 rounded-xl w-full m-4 px-6 p-3 flex justify-between items-center hover:cursor-pointer" style={{ backgroundColor: 'var(--note-bg)' }}
                    key={Number(note.id)}
                    >
                      <div>
                        <strong style={{ color: 'var(--text-primary)'}} className="text-gray-800">{note.title}</strong>
                        <p style={{ color: 'var(--text-primary)' }} className="text-gray-700">{truncateContent(note.content, 80)}</p>
                        <small style={{ color: 'var(--text-primary)' }} className="text-gray-700">{new Date(Number(note.timestamp) / 1000000).toLocaleString()}</small>
                      </div>
                      <div>
                        <button className="rounded-xl hover:scale-110 transition duration-500 text-white p-2" style={{backgroundColor: 'var(--delete-bg)'}} onClick={
                          (e) => {
                             e.stopPropagation();
                             deleteNote(note.id); 
                            } 
                          }>Delete</button>
                      </div>
                    </li>
                ))}
              </ul>
            </div>
        </div>
      </div>
    </div>
    {selectedNote && (
      <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center">
        <div className="bg-blue-100 p-6 rounded-xl w-[40%]" style={{ backgroundColor: 'var(--modal-bg)' }}>
          <h3 className="mb-4 text-center text-gray-700 text-3xl" style={{ color: 'var(--text-primary)' }}>Edit Note</h3>
          <input type="text" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)' }} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="text-center rounded-xl w-full p-2 mb-4 bg-gray-100 text-xl focus:outline-gray-100" placeHolder="Title"/>
          <textarea name="content" value={editContent} style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)' }} onChange={(e) => setEditContent(e.target.value)} className="rounded-xl text-center bg-gray-100 w-full p-4 mb-4 text-xl resize-none focus:text-left focus:outline-gray-100" placeholder="Content" rows="5"></textarea>
          <div className="flex justify-end gap-4">
            <button className="rounded-xl bg-gray-400/80 hover:bg-gray-400 hover:scale-110 transition duration-500 py-2 px-4 text-white" onClick={closeModal}>Cancel</button>
            <button style={{ backgroundColor: 'var(--button-bg)' }} className="rounded-xl bg-blue-400/80 hover:bg-blue-400 hover:scale-110 transition duration-500 py-2 px-4 text-white" onClick={() => updateNote(selectedNote.id, editTitle, editContent)}>Save</button>
          </div>
        </div>
      </div>
    )}
    <div className="text-[18px] mt-14 flex justify-between mx-20">
        <footer style={{ color: 'var(--text-primary)' }}>Made by AAK581</footer>
        <footer className="text-blue-500">
          <a href="https://www.linkedin.com/in/adham-ahmed-3849b324b/" target="_blank" rel="noopener noreferrer">LinkedIn</a> - 
          <a href="https://github.com/AAK581" target="_blank" rel="noopener noreferrer"> Github</a>
        </footer>
    </div>
    </>
  )
}

export default App;