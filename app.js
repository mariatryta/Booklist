// Book
function Book(title, author, isbn) {
    this.title = title;
    this.author = author,
    this.isbn = isbn;
}

// UI
function UI() {
    // book to list
    UI.prototype.addbooktolist = function(book) {
        const list = document.getElementById('book-list');
        // create table row
        const row = document.createElement('tr');
        // insert columns
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);
    };
}
// SHow alert
UI.prototype.showAlert = function (message,className) {
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
    container.insertBefore(div,form);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}
    // Delete book
UI.prototype.deleteBook = function (target){
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}
    // Clear fields function
UI.prototype.clearFields = function () {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}

// Event listeners
document.querySelector(".btn").addEventListener("click",function(e) {
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
        ui.showAlert ('Something is wrong. Please check all the values.','error');
    } else {
        //UI to book list
        ui.addbooktolist(book);
        // Success message
        ui.showAlert ('Book added! :)', 'success');
        // Clear field
        ui.clearFields();
    }
    e.preventDefault();
});

// event listener for delete button
document.getElementById('book-list').addEventListener('click', function(e){
    // initiate UI
    const ui = new UI();
    // deleting
    ui.deleteBook(e.target);
    // message
    ui.showAlert('Book deleted.','success');

    e.preventDefault();
});