// JS for Project: Library for The Odin Project

// book-card:
//                 `<div clas="book-card" id = "${bookLibraryId}">
//                 <h2>${bookTitle}</h2>
//                 <p>by ${bookAuthor}</p>
//                 <p>Total Pages: ${bookPages}</p>
//                 <p>Rating: ${bookRating}/10</p>
//                 <input style="checkbox" id=chk-${bookLibraryId}>
//                 <label for ="chk-${bookLibraryId">Already Read</label>
//                 <btn id="btn-remove-book">Remove</btn>
//                 </div>`
            
const btnShowBookAddDialog = document.querySelector("#btn-show-book-add-dialog");
const btnAddBook = document.querySelector("#btn-add-book");
const btnCancel = document.querySelector("#btn-cancel");
// const btnRemoveBook = document.querySelectorAll(".btn-remove-book");

const dialogAddBook = document.querySelector("#dialog-add-book");
const bookGrid = document.querySelector("#book-grid");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const rating = document.querySelector("#rating");
const isRead = document.querySelector("#is-read");



const myLibrary = [];


function getLibraryId(){
    return crypto.randomUUID();
}

//libId,title.value,author.value,pages.value,rating.value,isRead.value
function Book(libraryId,title,author,pages,rating, isRead) {
    this.libraryId = libraryId;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.rating = rating;
    this.isRead = isRead;
}

function updateBookGrid(){
    if(myLibrary.length === 0){
        bookGrid.innerHTML = "";
        return ;
    }
    let htmlStr = ``; 
    bookGrid.innerHTML=``;
    for(let i=0;i<myLibrary.length;i++){
        let checked="";
        if(myLibrary[i].isRead){
            checked="checked";
        }
        htmlStr = `<div class="book-card">
                <h2>${myLibrary[i].title}</h2>
                <p>by ${myLibrary[i].author}</p>
                <p>Total Pages: ${myLibrary[i].pages}</p>
                <p>Rating: ${myLibrary[i].rating}/10</p>
                <div>
                    <input type="checkbox" id="chk-${myLibrary[i].libraryId}"  ${checked}>
                    <label for ="chk-${myLibrary[i].libraryId}">Already Read</label>
                </div>
                <button class="btn-remove-book" id="${myLibrary[i].libraryId}">Remove</btn>
                </div>`
        bookGrid.innerHTML+=htmlStr;
        htmlStr=``;
    }
}

function addBookToLibrary() {
    let libId = getLibraryId();
    let book = new Book(libId,title.value,author.value,pages.value,rating.value,isRead.checked);
    myLibrary.push(book);
    // updateBookGrid();
}

function removeBookFromLibrary(libraryId){  
    //Remove from array
    updateBookGrid();  
}

function isValidFormData(){
    if (title.value.trim().length === 0 ){
        return false;
    }
    if (author.value.trim().length === 0 ){
        return false;
    }
    if(Number(rating.value) < 1 || Number(rating.value) > 10){
        return false;
    }
    return true;
}

btnAddBook.addEventListener("click", (e)=>{
    e.preventDefault();
    if(!isValidFormData()){
        return;
    }
    dialogAddBook.hidden=true;
    btnShowBookAddDialog.style.visibility = 'visible';
    addBookToLibrary();
    updateBookGrid();
})

btnShowBookAddDialog.addEventListener("click",(e)=>{
    dialogAddBook.hidden=false;
    btnShowBookAddDialog.style.visibility = 'hidden';
    initDialog();
    dialogAddBook.show();
})

btnCancel.addEventListener("click",(e)=>{
    initDialog();
    dialogAddBook.hidden=true;
    btnShowBookAddDialog.style.visibility = 'visible';   
})

function initDialog(){
    title.value="";
    author.value="";
    pages.value="0";
    rating.value="5";
    isRead.checked = false;
}

bookGrid.addEventListener("click",(e)=>{
    alert(e.target.id);
    alert(e.target.nodeName);
})