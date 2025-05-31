// JS for Project: Library for The Odin Project

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

}

function addBookToLibrary(book) {
    myLibrary.push(book);
    updatePage();
}

function removeBookFromLibrary(libraryId){  
    //Remove from array
    updatePage();  
}


document.querySelector("dialog").show();
document.querySelector("#btn-add-book").addEventListener("click", (e)=>{
    e.preventDefault();
})