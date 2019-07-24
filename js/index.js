function fetchAllBooks() {
  const allBooksData = fetch('http://localhost:3000/books')
  allBooksData
  .then(res => res.json())
  .then(body => {
    displayBooks(body)
  })
}

function displayBooks(body) {
  const bookListDiv = document.querySelector('#list-panel')
  body.forEach(function(book){
    //console.log(book)
    const newTitle = document.createElement('h2')
    newTitle.innerHTML = book.title
    const newImage = document.createElement('img')
    newImage.setAttribute('src', book.img_url)
    newImage.id = book.id
    bookListDiv.appendChild(newTitle)
    bookListDiv.appendChild(newImage)
  })
}

function listenToBooks() {
  const bookListDiv = document.querySelector('#list-panel')
  bookListDiv.addEventListener('click', function(event){
    if (event.target.tagName === "IMG") {
      fetchOneBook(event.target.id)
    }
  })
}

function fetchOneBook(id) {
    oneBookData = fetch(`http://localhost:3000/books/${id}`)
    oneBookData
    .then(res => res.json())
    .then(body => {
      displayOneBook(body)
    })
}

function displayOneBook(body) {
  const oneBookDiv = document.querySelector('#show-panel')
  oneBookDiv.innerHTML = ""
  const newDescription = document.createElement('p')
  newDescription.innerHTML = body.description
  const newUserList = document.createElement('ul')
  body.users.forEach(function(user){
    newLi = document.createElement('li')
    newLi.innerHTML = user.username
    newUserList.appendChild(newLi)
  })
  const likeButton = document.createElement('button')
  likeButton.id = body.id
  likeButton.innerText = "Like"
  oneBookDiv.appendChild(newDescription)
  oneBookDiv.appendChild(likeButton)
  oneBookDiv.appendChild(newUserList)
}

function listenToButton() {
  const oneBookDiv = document.querySelector('#show-panel')
  oneBookDiv.addEventListener('click', function(event){
    if (event.target.tagName === "BUTTON") {
    const id = event.target.id
    oneBookData = fetch(`http://localhost:3000/books/${id}`)
    oneBookData
    .then(res => res.json())
    .then(body => {
      sendPatch(body.users, id)
      displayOneBook(body)
    })
    }
  })
}

function sendPatch(array, id) {
  let usersArray = array
  usersArray.push({"id":1, "username":"pouros"})
  fetch(`http://localhost:3000/books/${id}`,
    { headers:
        { "Content-Type": "application/json" },
      method: "PATCH",
      body:
        JSON.stringify({users: usersArray})
    })
}



fetchAllBooks()
listenToBooks()
listenToButton()
