import { initEditPage, generateLastEdited } from './views.js'
import { updateNote, removeNote, getNoteTitle } from './notes.js'

const noteId = location.hash.substring(1)
const titleEl = document.querySelector('#note-title')
const bodyEl = document.querySelector('#note-body')
const dateEl = document.querySelector('#last-updated')
const removeEl = document.querySelector('#remove-note')

initEditPage(noteId)

getNoteTitle(noteId) != '' ? document.title = `${getNoteTitle(noteId)} - Notes App` : document.title = 'Unnamed note - Notes App'

titleEl.addEventListener('input', (e) => {
    e.target.value != '' ? document.title = `${e.target.value} - Notes App` : document.title = 'Unnamed note - Notes App'
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateEl.textContent = generateLastEdited(note.updatedAt)
})

bodyEl.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateEl.textContent = generateLastEdited(note.updatedAt)
})

removeEl.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initEditPage(noteId)
    }
})