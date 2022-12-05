// importing books from books.json file 
import DefaultBooks from './books.json' assert {type: 'json'};
const BooksListsl = document.getElementById('Books-lists');

//if local storage is empty then default books will store in local storage with key as books
// which is store in books.json
if (localStorage.getItem('books') === null) {
  localStorage.setItem('books', JSON.stringify(DefaultBooks))
}


// //converting json value into object using parse
let BooksArray= JSON.parse(localStorage.getItem('books'));

//Logic for removing data from local storage
const remove = (RemovedBooks) => {
  BooksArray = BooksArray.filter( (book) => book.id != RemovedBooks.id)
  localStorage.setItem('books', JSON.stringify(BooksArray))
  BooksListsl.removeChild(RemovedBooks);
};

//adding books into local storage
const AddBookToStorage = (title, author,id) => {
  BooksArray.push(
    {
      title: title,
      author: author,
      id: id,
    }
  )
  localStorage.setItem('books', JSON.stringify(BooksArray))
}


//Showing books on UI interface
const AddBookToDom = (title, author, index) => {
  const newBookEl = document.createElement('li');
  newBookEl.classList.add('book');
  newBookEl.setAttribute('id', index)
  newBookEl.innerHTML = `
  <h2 class="book-title">${title}</h2>
  <p class="book-author">${author}</p>
  <button class="remove-btn">remove</button><hr>
  `;
  newBookEl.addEventListener('click', () => remove(newBookEl))
  BooksListsl.appendChild(newBookEl);  
}

//Creating list of books
const createList = () => {
  BooksArray.forEach((book) => {
    AddBookToDom(book.title, book.author,book.id );
  });
}


//Removing books from UI
document.querySelectorAll('remove-btn').forEach(removeBtn => {
  removeBtn.addEventListener('click', remove(removeBtn))
});

//getting value from the UI
document.getElementById('add-book').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = BooksArray.length
  //console.log(id)
  AddBookToDom(title, author, id);
  AddBookToStorage(title, author, id);
})

createList();
