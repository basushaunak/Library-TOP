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


const dialogAddBook = document.querySelector("#dialog-add-book");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const rating = document.querySelector("#rating");
const isRead = document.querySelector("#is-read");



const myLibrary = [];




function getLibraryId(){
    return crypto.randomUUID();
}

function Book(libraryId,title,author,pages,isRead,rating) {
    this.libraryId = libraryId;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.rating = rating;
}

function updatePage(){
    if(myLibrary.length === 0){
        bookGrid.innerHTML = "";
        return ;
    }
    let htmlStr = ``; 
    for(let i=0;i<myLibrary.length;i++){
        htmlStr = `<div clas="book-card" id = "${myLibrary[i].libraryId}">
                <h2>${myLibrary[i].title}</h2>
                <p>by ${myLibrary[i].author}</p>
                <p>Total Pages: ${myLibrary[i].pages}</p>
                <p>Rating: ${myLibrary[i].rating}/10</p>
                <input style="checkbox" id="chk-${myLibrary[i].libraryId}" value = "${myLibrary[i].isRead}">
                <label for ="chk-${myLibrary[i].libraryId}">Already Read</label>
                <btn id="btn-remove-book">Remove</btn>
                </div>`
        

    }
}

function addBookToLibrary() {
    let libId = getLibraryId();
    let book = new Book(libId);
    myLibrary.push(book);
    updatePage();
}

function removeBookFromLibrary(libraryId){  
    //Remove from array
    updatePage();  
}

function isValidFormData(){
    if (title.value.trim().length === 0 ){
        alert("Title: " + title.value.trim().length);
        return false;
    }
    if (author.value.trim().length === 0 ){
        alert("author");
        return false;
    }
    if(Number(rating.value) < 1 || Number(rating.value) > 10){
        alert("rating");
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