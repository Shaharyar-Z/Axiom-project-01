const addBtn = document.querySelector('#add');




const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    textAreaData.forEach(note => {
        return notes.push(note.value)
    })
    localStorage.setItem('notes',JSON.stringify(notes))


};


const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note')

    const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden':''}"></textarea>
    `
    note.insertAdjacentHTML('afterbegin', htmlData)


    // Getting reference
    const editBtn = note.querySelector('.edit')
    const delBtn = note.querySelector('.delete')
    const mainDiv = note.querySelector('.main')
    const textArea = note.querySelector('textarea')
    
    delBtn.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    textArea.value = text;
    mainDiv.innerHTML = text
    
    editBtn.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (e) => {
        const value = e.target.value;
        mainDiv.innerHTML = value;

        updateLSData(value);
    })

    document.body.appendChild(note)
};


const notesData = JSON.parse(localStorage.getItem('notes'));
if (notesData) {
    notesData.forEach(note => addNewNote(note))
}


addBtn.addEventListener('click', () => addNewNote());