const booksList = document.querySelector("#list")
const bookShow = document.querySelector("#show-panel")
const BOOKS_URL = `http://localhost:3000/books`
let users = []

function getEverything() {
  fetch(BOOKS_URL)
  .then(resp => resp.json())
  .then(bookObjects => renderBooks(bookObjects))
}
getEverything()

function renderBooks(books) {
  books.forEach(book => addBookToPage(book))
}

function addBookToPage(book) {
  booksList.innerHTML +=
  `<li id="${book.id}"> ${book.title} </li>`
}

booksList.addEventListener('click', (e) => {
  const bookId = e.target.id
  showBookInfo(bookId)
})

function bookLikers(book) {
  return book.users.forEach(user => renderUsers(user.username))
}

function renderUsers(book) {
  users = book.users
  return book.users.map(function(user){
    return user.username}).join(', ')
}

function showBookInfo(bookId) {
  fetch(`${BOOKS_URL}/${bookId}`)
  .then(resp => resp.json())
  .then(book => {
    bookShow.innerHTML = `
    <div id="show-panel">
      <h1> ${book.title} </h1>
      <img src="${book.img_url}">
      <p> Description: ${book.description} </p>
      <p hidden> ${book.id} </p>
      <p id="userLikers"> These users like <strong> ${book.title}</strong>:
      <span>${renderUsers(book)}</span>
      </p>
      <button data-id=${book.id} id="like-book" class="btn">
      ❤️
      </button>
    </div>
    `
  })
}

bookShow.addEventListener('click', (e) => {
  if (e.target.id === "like-book") {
    console.log(users)
    console.log('you clicked!')
    console.log(e.target.dataset.id)
    userLikeBook(e)
  }
})

function userLikeBook(e) {
  console.log(e.target.dataset.id)
  users.push({id: 1, username: "pouros"})
  fetch (`${BOOKS_URL}/${e.target.dataset.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      "users": users
    })
  })
  .then(resp => resp.json())
  .then(userLikes => {
    e.target.parentElement.querySelector('span').innerHTML =
    users.map(function(user){
      return user.username}).join(', ')
  })
}
