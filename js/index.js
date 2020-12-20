document.addEventListener("DOMContentLoaded", function() {
    // console.log("hello");
    booksList.addEventListener('click', handleBooksListClick);
    renderBooks();
});

const booksList = document.querySelector("#list");

function handleBooksListClick(event) {
    // console.log(event);
    const bookID = event.target.id;
    console.log(bookID);
    const bookTitle = event.target.textContent;
    renderBookInShowPane(bookID, bookTitle);
}

function renderBookInShowPane(bookID, bookTitle) {
    const showPanel = document.querySelector("#show-panel");
    showPanel.innerHTML = "";
    showPanel.appendChild(createHeader(bookTitle))
    getBook(bookID).then(book => {
        console.log(book);
        showPanel.appendChild(createImg(book.img_url));
        showPanel.appendChild(createBookDescription(book.description));
        showPanel.appendChild(createBooksLikedUsers(book.users));
        showPanel.appendChild(createBooksReadBookButton(bookID, showPanel, book.users, bookTitle));
    })
}

function addUserToReadBook(user) {
    const showPanel = document.querySelector("#book-users-liked");
    const newUserLI = document.createElement("li");
    newUserLI.innerText = user.username;
    showPanel.appendChild(newUserLI);
}

function createBooksReadBookButton(bookID, showPanel, users, title) {
    const newButton = document.createElement("button");
    newButton.innerText = "Read Book"
    if (! (users.find(element => {return element.id === 1;}))) {
        newButton.addEventListener('click', function readBookButtonClickHandler(event) {
            users.push({id: 1, username: "pouros"});
            fetch(`http://localhost:3000/books/${bookID}`, {
                method: 'PATCH',
                mode: 'cors',
                body: JSON.stringify(users)
            }).then(response => response.json()).then((response) => {
                console.log(response);
                // renderBookInShowPane(bookID, title);
                addUserToReadBook({id: 1, username: "pouros"});
                newButton.removeEventListener('click', readBookButtonClickHandler);
                newButton.addEventListener('click', () => {alert("You read this already!")});
            })
        })
    }
    else {
        newButton.addEventListener('click', () => {alert("You read this already!")})
    }
    return newButton;
}


function createBooksLikedUsers(bookUsers) {
    const newUsersList = document.createElement("ul");
    newUsersList.id = "book-users-liked";
    newUsersList.innerText = "Users who like this book:"
    for(let i = 0; i < bookUsers.length; i++) {
        const newItem = document.createElement("li");
        newItem.innerText = bookUsers[i].username;
        newUsersList.appendChild(newItem);
    }
    return newUsersList;
}

function createHeader(text) {
    const newHeader = document.createElement("h1");
    newHeader.innerText = text;
    return newHeader;
}

function getBook(id) {
    return fetch(`http://localhost:3000/books/${id}`).then(resp => resp.json())
}

function createImg(img_url) {
    const newImg = document.createElement("img");
    newImg.src = img_url;
    return newImg;
}

function createBookDescription(description) {
    const newDesc = document.createElement("p");
    newDesc.innerText = description;
    return newDesc;
}


function getBooks() {
    return fetch("http://localhost:3000/books").then(resp => resp.json());
}
function createBookElement(book) {
    const bookElem = document.createElement("li");
    bookElem.id = book.id;
    bookElem.innerText = book.title;
    return bookElem;
}

function renderBooks() {
    getBooks().then(resp => {
        console.log(resp);
        for(let bookIter = 0; bookIter < resp.length; bookIter++) {
            booksList.appendChild(createBookElement(resp[bookIter]));
        }
    })
}
