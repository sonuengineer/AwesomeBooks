/* eslint-disable max-classes-per-file, class-methods-use-this */
let ID = 0;
// converting json value into object using parse
let BooksArray = JSON.parse(localStorage.getItem('books'));
const BooksListsl = document.getElementById('Books-lists');

// Making class book and constructor for that as well
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  // Logic for removing data from local storage
  remove(bookToRemove) {
    const bookIndex = Array.from(BooksListsl.children).indexOf(bookToRemove);
    BooksArray = BooksArray.filter((book) => book !== BooksArray[bookIndex]);
    localStorage.setItem('books', JSON.stringify(BooksArray));
    BooksListsl.removeChild(bookToRemove);
    if (bookIndex !== 0 && bookIndex < BooksArray.length) {
      for (let i = bookIndex; i < BooksArray.length; i += 1) {
        if (i % 2 === 0) {
          BooksListsl.children[i].className = 'book pair-bg';
        } else {
          BooksListsl.children[i].className = 'book odd-bg';
        }
      }
    }
  }

  // Showing books on UI interface
  AddBookToDom() {
    const newBook = document.createElement('li');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerText = 'remove';
    newBook.classList.add('book');
    newBook.setAttribute('id', this.id);
    newBook.innerHTML = `<p class="book-author">"${this.title}" by ${this.author}</p>`;
    removeBtn.addEventListener('click', () => this.remove(newBook));
    newBook.appendChild(removeBtn);
    BooksListsl.appendChild(newBook);
    if (Array.from(BooksListsl.children).indexOf(newBook) % 2 === 0) {
      newBook.classList.add('pair-bg');
    } else {
      newBook.classList.add('odd-bg');
    }
  }

  // adding books into local storage
  AddBookToStorage() {
    BooksArray.push({
      id: this.id,
      title: this.title,
      author: this.author,
    });

    localStorage.setItem('books', JSON.stringify(BooksArray));
  }
}

const DefaultBooks = [
  new Book(0, 'JavaScript', 'Brenden Eich'),
  new Book(1, 'HTML/CSS', 'HÃ¥kon Wium Lie'),
];

// Creating list of books
const createList = () => {
  // if local storage is empty then default books will store in local storage with key as books
  if (BooksArray === null || BooksArray.length === 0) {
    BooksArray = DefaultBooks;
    localStorage.setItem('books', JSON.stringify(BooksArray));
  }
  ID = BooksArray.length - 1;
  BooksArray.forEach((book) => {
    book = new Book(book.id, book.title, book.author);
    book.AddBookToDom();
  });
};

// getting value from the UI
document.getElementById('btn').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = ID + 1;
  const New = new Book(id, title, author);
  New.AddBookToDom();
  New.AddBookToStorage();
  ID += 1;
});

document.querySelectorAll('.nav-link').forEach((navLink) => {
  navLink.addEventListener('click', () => {
    if (!navLink.classList.contains('active')) {
      document.querySelectorAll('.active').forEach((element) => {
        element.classList.remove('active');
      });
      const elementId = navLink.innerHTML.toLowerCase();
      const element = document.getElementById(elementId);
      element.classList.add('active');
      navLink.classList.add('active');
    }
  });
});

createList();

document.getElementById('btn').addEventListener('click', () => {
  /* eslint no-alert: "error" */
  alert('Book added succesfully'); // eslint-disable-line no-alert
});
