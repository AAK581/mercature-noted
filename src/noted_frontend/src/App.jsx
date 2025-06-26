import { useState, useEffect } from 'react';
import { noted_backend } from 'declarations/noted_backend';
import './index.css';

function App() {
  
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const canisterId = 'uxrrr-q7777-77774-qaaaq-cai';

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await noted_backend.getNotes();
      setNotes(notes);
    }
    fetchNotes();
  }, []);

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

  return (
    <>
    <div className={notes.length === 0 ? "max-w-xl p-5 pb-16 m-auto my-6 bg-blue-100 shadow-xl rounded-xl" : 'max-w-6xl p-5 m-auto my-6 bg-blue-100 shadow-xl rounded-xl'}>
          <div className="flex justify-center items-center m-auto mb-8 ml-8 gap-2">
            <h3 className='text-5xl text-gray-700'>
              Noted!
            </h3>
            <img src="../kowNoted.png" alt="Noted logo" className='w-20'/>
          </div>
      <div className={notes.length === 0 ? "m-auto w-[70%]" : "flex justify-between items-center"}>
        <div className={notes.length === 0 ? "w-full text-center" : "w-[35%] ml-10"}>
            <div className="mt-0 text-center">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={notes.length === 0 ? "rounded-xl w-[80%] p-2 mb-6 text-center text-xl bg-gray-100 focus:outline-gray-100" : "rounded-xl w-[60%] p-2 mb-6 text-center text-xl bg-gray-100 focus:outline-gray-100"} placeholder="Title" /><br/>
              <textarea name="content" value={content} placeholder='Content' className={notes.length === 0 ? "rounded-xl w-[100%] text-center focus:text-left mb-6 text-xl resize-none p-4 bg-gray-100 focus:outline-gray-100" : 'rounded-xl w-[80%] text-center focus:text-left mb-6 text-xl resize-none p-4 bg-gray-100 focus:outline-gray-100'} rows="3" onChange={(e) => {setContent(e.target.value)}}/><br/>
              <button onClick={() => {addNote(title, content)}} className="rounded-xl bg-blue-400/80 hover:bg-blue-400 hover:scale-110 transition duration-500 py-4 px-6 text-white">Add Note</button>
            </div>
        </div>
        <div className="w-[35%] -mt-6 mr-16">
            <div className="-mt-12">
              <ul>
                {notes.map((note) => (
                  <li
                  onClick={() => openModal(note)}
                  className="py-4 bg-blue-300/50 rounded-xl w-full m-4 px-6 p-3 flex justify-between items-center hover:cursor-pointer"
                    key={Number(note.id)}
                    >
                      <div>
                        <strong className="text-gray-800">{note.title}</strong>
                        <p className="text-gray-700">{truncateContent(note.content, 80)}</p>
                        <small className="text-gray-700">{new Date(Number(note.timestamp) / 1000000).toLocaleString()}</small>
                      </div>
                      <div>
                        <button className="rounded-xl bg-blue-500/60 hover:bg-blue-500/70 hover:scale-110 transition duration-500 text-white p-2" onClick={
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
        <div className="bg-blue-100 p-6 rounded-xl w-[40%]">
          <h3 className="mb-4 text-center text-gray-700 text-3xl">Edit Note</h3>
          <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="text-center rounded-xl w-full p-2 mb-4 bg-gray-100 text-xl focus:outline-gray-100" placeHolder="Title"/>
          <textarea name="content" value={editContent} onChange={(e) => setEditContent(e.target.value)} className="rounded-xl text-center bg-gray-100 w-full p-4 mb-4 text-xl resize-none focus:text-left focus:outline-gray-100" placeholder="Content" rows="5"></textarea>
          <div className="flex justify-end gap-4">
            <button className="rounded-xl bg-gray-400/80 hover:bg-gray-400 hover:scale-110 transition duration-500 py-2 px-4 text-white" onClick={closeModal}>Cancel</button>
            <button className="rounded-xl bg-blue-400/80 hover:bg-blue-400 hover:scale-110 transition duration-500 py-2 px-4 text-white" onClick={() => updateNote(selectedNote.id, editTitle, editContent)}>Save</button>
          </div>
        </div>
      </div>
    )}
    <div className="text-[18px] mt-14 flex justify-between mx-20">
        <footer>Made by AAK581</footer>
        <footer className="text-blue-500">
          <a href="https://www.linkedin.com/in/adham-ahmed-3849b324b/" target="_blank" rel="noopener noreferrer">LinkedIn</a> - 
          <a href="https://github.com/AAK581" target="_blank" rel="noopener noreferrer"> Github</a>
        </footer>
    </div>
    </>
  )
}

export default App;