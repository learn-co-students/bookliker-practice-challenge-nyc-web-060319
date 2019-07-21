let booksURL = `http://localhost:3000/books`;
let usersURL = `http://localhost:3000/users`;
let allBooks = [];
let allUsers = [];
let currentUser;
let specificBook;


document.addEventListener("DOMContentLoaded", function() {
    const booksList = document.querySelector('#list');
    const booksShow = document.querySelector('#show-panel');
    
    fetchBooks(booksURL);
    fetchUsers(usersURL);

    booksList.addEventListener('click', e => {
        specificBook = searchBook(e.target.dataset.id);
        booksShow.innerHTML = renderBooks([specificBook]);
    });
    
    booksShow.addEventListener('click', e => {
        if(e.target.type === 'button'){
            specificBook = searchBook(e.target.dataset.id);
        }

            if(e.target.innerText === "Like it"){
                specificBook['users'].push(currentUser);
                booksShow.innerHTML = renderBooks([specificBook]);
                changeLikes(e.target.daraset.id, currentUser, specificBook);
            } else {
                e.target.innerHTML === "Unlike it"
                let newUser = specificBook['users'].filter(user => {
                    return user.id !== currentUser.id;
                });
                specificBook['users'] = newUser;
                booksShow.innerHTML = renderBooks([specificBook]);
                changeLikes(e.target.dataset.id, currentUser, specificBook);
            }
    });
    
    // fetch 
    function fetchBooks(url){
        fetch(url)
            .then(resp => resp.json())
            .then(books => {
                allBooks = books;
                booksList.innerHTML = createBooks(allBooks);
            }); 
    }

    function fetchUsers(usersURL){
        fetch(usersURL)
            .then(resp => resp.json())
            .then(users => {
                allUsers = users;
                currentUser = users[0];
            });
    }

    // DOM
    function createBooks(books){
        return books.map(book => {
            return `<li data-id='${book.id}'>${book.title}</li>`
        }).join('');
    }
    
    function listUserLikes(book){
        return book["users"].map(user => {
            return `<li data-id='${user.id}'>${user.username}</li>`
        }).join('');
    }

    function renderBooks(book){
        function clickLikes(users){
            let existingUser = users.find(user => {
                return user.username === currentUser.username;
            });
            return (existingUser? "Unlike it" : "Like it");
        }
        
        return book.map(data => {
            return `<h1>${data.title}</h1>
            <p>${data.description}</p>
            <img src=${data.img_url}>
            <p>Likes: ${data.users.length}</p>
            <p>Who likes this book: </p>
            <ul> ${listUserLikes(data)}</ul>
            <button>${clickLikes(data.users)}</button>`
        }).join('');
    }
    
    //helpers
    function searchBook(id){
        return allBooks.find(book => {
            return parseInt(id) === book.id;
        });
    }

    function changeLikes(id, user, book) {
        let bookUsers = book["users"]
      
        fetch(booksURL + `/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            users: bookUsers
          })
        });
      }

});
// debugger