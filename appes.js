class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // create table row
        const row = document.createElement('tr');
        // add class name
        row.className = 'table-row';
        // insert columns
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
            `;
        list.appendChild(row);
    }

    showAlert(message, className) {
        // make a div
        const div = document.createElement('div');
        // adding class
        div.className = `alert ${className}`;
        // text node
        div.appendChild(document.createTextNode(message));
        // get a parent
        const container = document.querySelector('.container');
        // form
        const form = document.querySelector('#book-form');
        // inserting alert
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    clearFields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }

}
// Local storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(book => {
            const ui = new UI;
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// event listener for DOM
document.addEventListener('DOMContentLoaded', Store.displayBooks);
// Event listener for the book
document.querySelector(".btn").addEventListener("click", function (e) {
    // form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    // create a book
    const book = new Book(title, author, isbn);
    // new UI
    const ui = new UI();
    // Validate
    if (title === "" || author === "" || isbn === "") {
        ui.showAlert('Something is wrong. Please check all the values.', 'error');
    } else {
        //UI to book list
        ui.addBookToList(book);
        // add to local storage
        Store.addBook(book);
        // Success message
        ui.showAlert('Book added! :)', 'success');
        // Clear field
        ui.clearFields();
    }
    e.preventDefault();
});

// event listener for delete button
document.getElementById('book-list').addEventListener('click', function (e) {
    // initiate UI
    const ui = new UI();
    // deleting
    ui.deleteBook(e.target);
    // remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // message
    ui.showAlert('Book deleted.', 'success');

    e.preventDefault();
});
// event listener for book filter
document.querySelector('#filter-input').addEventListener('keyup', function filterTasks(e) {
    // Declare variables 
    const text = e.target.value.toLowerCase();
    let input = document.querySelector("#filter-input");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("book-list");
    let tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    e.preventDefault();
});