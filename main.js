shownotes();
let addBtn = document.getElementById('addBtn');
console.log(addBtn);
addBtn.addEventListener('click', function(e){
   let addTxt = document.getElementById('addTxt');
   let addTitle = document.getElementById('addTitle');
   console.log(addTxt);
   let notes =localStorage.getItem('notes');
   if(notes == null){
       notesObj = [];
   }
   else{
       notesObj = JSON.parse(notes);
   }
   let myObj ={
       title:addTitle.value,
       text:addTxt.value
   }
   notesObj.push(myObj);
   localStorage.setItem('notes', JSON.stringify(notesObj));
   addTxt.value = '';
   addTitle.value = '';
   shownotes();
});

function shownotes(){
    let notes =localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    let html = '';
    notesObj.forEach(function(element, index) {
        html += `<div class="card noteCard mx-3 my-3 text-center" style="width: 18rem; box-shadow: 2px 2px 1px #2222;">
        <img src="main.jfif" class="card-img-top img-thumbnail" alt="...">
        <div class="card-body">
          <h5 class="card-title text-center"> ${element.title}</h5>
          <p class="card-text text-center">${element.text}</p>
          <button  id=${index} onclick="dltNotes(this.id)" class="btn btn-danger text-center" id="dltBtn">Delete</button> 
        </div>
      </div>`
    });
    
    let notesElm = document.getElementById('notes')
    console.log(notesElm);
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `<h2 class="text-center">NOTHING TO SHOW! USE ADD NOTE BUTTON AND START KEEPING YOUR NOTES.</h2>`
    }
}

function dltNotes(index){
    // console.log('deleting')
    let notes =localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    shownotes();
}

let search =document.getElementById('searchTxt');
search.addEventListener('input', function(){
    // console.log('inputtttt');


    let inputVal = search.value.toLowerCase();
    // console.log(inputVal)
    let notecards = document.getElementsByClassName('noteCard');
    Array.from(notecards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;

        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })
})