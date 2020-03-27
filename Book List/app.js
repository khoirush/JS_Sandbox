/*author : khoirush akbar
apps : sample of adding and deleting book list
using Javascript OOP
*/

class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

class UI {
  addBook(book) {
    const bookList = document.querySelector('#book-list')
    let row = document.createElement('tr')
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</td>
    `
    bookList.appendChild(row)
  }
  showAlert(message, status) {
    console.log('alert')
    const frame = document.querySelector('.container')
    let alert = document.createElement('div')
    alert.className = `alert ${status}`
    alert.appendChild(document.createTextNode(message))
    const form = document.querySelector('#book-form')
    frame.insertBefore(alert, form)
    setTimeout(() => { document.querySelector('.alert').remove() }, 3000)
  }

  deleteBook(target) {
    if (target.className == 'delete') {
      target.parentElement.parentElement.remove()
    }
  }
  clearFields() {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''
  }
}

document.querySelector('#book-list').addEventListener('click', (e) => {
  let ui = new UI()
  ui.deleteBook(e.target)
  ui.showAlert('Book is Removed', 'success')
  e.preventDefault()
})

//event listner for adding book to book list
document.querySelector('#book-form').addEventListener('submit', (e) => {
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value

  let ui = new UI()
  console.log('adding')
  // validate input
  if (title == '' || author == '' || isbn == '') {
    //show alert
    ui.showAlert('Please enter the correct input !', 'error')
  } else {
    const newBook = new Book(title, author, isbn)
    ui.addBook(newBook)
    ui.showAlert(`Book ${title} Added !`, 'success')
    console.log('success')
    ui.clearFields()
  }
  e.preventDefault()
})