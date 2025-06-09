// JS for Project: Library for The Odin Project
            
const btnShowBookAddDialog = document.querySelector("#btn-show-book-add-dialog");
const btnAddBook = document.querySelector("#btn-add-book");
const btnCancel = document.querySelector("#btn-cancel");

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

class Book {
    #libraryId;
    #title;
    #author;
    #pages;
    #rating;
    #isRead;
    constructor(libraryId,title,author,pages,rating,isRead){
        this.#libraryId = libraryId;
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#rating = rating;
        this.#isRead = isRead;        
        Book.bookCount++;
    }
    get libraryId(){
        return this.#libraryId;
    }
    get title(){
        return this.#title;
    }
    get author(){
        return this.#author;
    }
    get pages(){
        return this.#pages;
    }
    get rating(){
        return this.#rating;
    }
    set rating(val){
        this.#rating = val;
    }
    get isRead(){
        return this.#isRead;
    }
    set isRead(val){
        this.#isRead = val;
    }

}

// function Book(libraryId,title,author,pages,rating, isRead) {
//     this.libraryId = libraryId;
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.rating = rating;
//     this.isRead = isRead;
// }

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
    document.querySelector("#book-count").innerText=`Total Books in Library: ${myLibrary.length}`;
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

function getBookIndex(bookId){
    for(let i=0; i < myLibrary.length;i++){
        if(myLibrary[i].libraryId === bookId){
            return i;
        }
    }
    return -1;
}

bookGrid.addEventListener("click",(e)=>{
    let elementType = e.target.nodeName;
    if(!(elementType === "BUTTON" || elementType === "INPUT")){
        return;
    }
    let bookId = e.target.id;
    if(elementType==="INPUT"){
        bookId = bookId.slice(4);
    }
    let bookIndex = getBookIndex(bookId);
    if(bookIndex === -1){
        throw Error("Logical Error!");
    }
    if(elementType==="INPUT"){
        myLibrary[bookIndex].isRead = !myLibrary[bookIndex].isRead;
        return;
    }
    alert(myLibrary[bookIndex].title + " is being deleted!");
    myLibrary[bookIndex]=null;
    myLibrary.splice(bookIndex,1);
    updateBookGrid();
})

window.onload = ()=>{
 myLibrary.push(new Book(getLibraryId(),"The Hobbit","JRR Tolkein",615,7,false));
 myLibrary.push(new Book(getLibraryId(),"Dracula","Bram Stoker",342,8,true));
 myLibrary.push(new Book(getLibraryId(),"Carmilla","Sheridan Le Fanu",216,9,true));
 myLibrary.push(new Book(getLibraryId(),"War of The Worlds","H G Wells",315,8,false));
 myLibrary.push(new Book(getLibraryId(),"20 Thousand Leagues Under the Sea","Jules Verne",356,8,true));
 myLibrary.push(new Book(getLibraryId(),"Dr. Jekyll and Mr. Hyde","Robert Louis Stevenson",278,9,false));
 myLibrary.push(new Book(getLibraryId(),"Frankenstein","Mary Shelley",316,9,false));
 myLibrary.push(new Book(getLibraryId(),"Robots of The Dawn","Isaac Asimov",416,10,true));
 myLibrary.push(new Book(getLibraryId(),"2001: A Space Odyssey","Arthur C Clarke",590,9,true));
 myLibrary.push(new Book(getLibraryId(),"The Jewel of Seven Stars","Bram Stoker",290,7,true));
 updateBookGrid();
}