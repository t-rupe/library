//button listeners
const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addBookToLibrary);

const newBookBtn = document.querySelector('#newBtn');
newBookBtn.addEventListener('click', () => infoForm.style.display = 'block');

const infoForm = document.getElementById('info');
const closeInfo = document.getElementsByTagName('span')[0];
closeInfo.addEventListener('click', () => infoForm.style.display = 'none');

//Book Constructor
function Book(title, author, pages, read) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value + ' pages';
    this.read = form.read.checked;
}

let myLibrary = [];
let newBook;

function addBookToLibrary() {
    event.preventDefault();
    infoForm.style.display = 'none';

    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    setData(); //saves updated array in local storage
    render();
    form.reset();
}

function render() {
    const display = document.getElementById('Library-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));

    for (let i = 0; i < myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}

function createBook(item) {
    const library = document.querySelector('#Library-container');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = item.author;
    authDiv.classList.add('author');
    bookDiv.appendChild(authDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn');
    bookDiv.appendChild(readBtn);
    if(item.read===false){
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#e01f33';
    } else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#63da63';
    }

    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);

    library.appendChild(bookDiv);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData();
        render();
    });

    readBtn.addEventListener('click', () => {
        item.read = !item.read;
        setData();
        render();
    });
};

//setting Library to store using local Storage
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage if page refreshed
function restore() {
    if(!localStorage.myLibrary) {
        render();
    } else {
        let objects = localStorage.getItem('myLibrary') //gets info from local storage to use in next loop for DOM'display
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();