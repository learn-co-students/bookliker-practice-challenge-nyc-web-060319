document.addEventListener("DOMContentLoaded", function() {
  const bookList = document.querySelector("#list")
  const showDiv = document.querySelector("#show-panel")
  //index
  fetch(`http://localhost:3000/books`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    json.forEach(function(jsonObj){
      const bookTitles = document.createElement("div")
      bookTitles.dataset.id = jsonObj.id
      bookTitles.innerHTML = jsonObj.title
      bookList.appendChild(bookTitles)
      bookTitles.addEventListener("click", clickTitle)
      const bookButton = document.createElement("button")
      bookButton.addEventListener("click", likeBook)
      bookButton.innerHTML = "Like"
      bookList.appendChild(bookButton)
      bookButton.dataset.id = jsonObj.id
      // const bookDeleteButton = document.createElement("button")
      //a way to differentiate between each button, each datasetid is equal to the object's id
      //bookButton.dataset.name = jsonObj.id (id of that one single object)--> you can store wahtever key and value
      //*whole JSON object does not have an id b/cuz its just an array of objects so we are giving it an ID using dataset
    });
  }); //end of fetch request
//show
  function clickTitle(e){
    const showDiv = document.querySelector("#show-panel")
    showDiv.innerHTML = ""
    fetch(`http://localhost:3000/books/${e.target.dataset.id}`)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      //description
      const bookTitles = e.target
      // bookTitles.style.width = "1000px"
      const bookDescription = document.createElement("div")
      bookDescription.innerHTML = json.description
      showDiv.appendChild(bookDescription)



      //image
      const bookImage = document.createElement("img")
      bookImage.src = json.img_url
      showDiv.appendChild(bookImage)
      json.users.forEach(function(user){
        const bookUsers = document.createElement("li")
        bookUsers.innerHTML = user.username
        showDiv.appendChild(bookUsers)
      })
    })
  } //end of function clickTitle()

  function likeBook(e){
//edit
    fetch(`http://localhost:3000/books/${e.target.dataset.id}`)
    .then(res => res.json())
    .then(res => {

      user1 = {
        "id": 1,
        "username": "pouros"
      }

      reqUsers  = res.users
      reqUsers.push(user1) //this is what we want our book 1 users array to be
      console.log(reqUsers)
      fetch(`http://localhost:3000/books/${e.target.dataset.id}`, {
        //dataset gives values you want to hold
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "users": reqUsers
        })
      })
    } )

      }


function deleteData() {
  fetch(`http://localhost:3000/books/${e.target.dataset.id}`, {
    method: 'DELETE',
  })
  .then(function(response){
    console.log(json.response)
  })
}


}) //end of entire doc
