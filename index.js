// Book Class: Represens a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Store Class: Handles Storage
class Storage {
  static getBooks() {
    let books = JSON.parse(localStorage.getItem("books"));

    return books === null
      ? (books = [])
      : JSON.parse(localStorage.getItem("books")) || [];
  }

  static addBook(book) {
    const books = Storage.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(book));
  }

  static removeBook(isbn) {
    const books = Storage.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
  }
}

// UI Class: Handle UI Tasks
class UI {
  // methods: displayBooks, addBookToList, showAlert, clearFields
  static displayBooks() {
    const books = Storage.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book, index) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button type="button" class="btn btn-sm btn-danger delete">remove</button></td>
        `;

    list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // Vanish in 5 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    title.value = "";
    author.value = "";
    isbn.value = "";
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (event) => {
  // prevent actual submit
  event.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Plese, fill in all fields", "danger");
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to localStorage
    Storage.addBook(book);

    // show success message
    UI.showAlert("Book added", "success");

    // Clear Fields
    UI.clearFields();
  }
});

// Event: Remove a Book
// using `event propagation`
document.querySelector("#book-list").addEventListener("click", (event) => {
  // remove book from UI
  event.target.parentElement.parentElement.remove();

  // Remove book from store
  Storage.removeBook(
    event.target.parentElement.previousElementSibling.textContent
  );

  // Show success message
  UI.showAlert("Book removed", "success");
});
