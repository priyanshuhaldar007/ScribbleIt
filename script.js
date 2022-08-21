var search = document.getElementById("search");
var add = document.getElementById("add");
var save = document.getElementById("save");
var del = document.getElementById("delete");
var textarea = document.getElementById("textarea");

var saved = localStorage.getItem("listItems");
var note = localStorage.getItem("note");
if (saved) {
  list.innerHTML = saved;
}
if (note) {
  textarea.innerHTML = note;
}
add.addEventListener("click", function (event) {
  addItemToList();
});
search.addEventListener("click", function () {
  var input = document.getElementById("textarea").value;
  var query = "https://www.google.com/search?q=" + encodeURIComponent(input);
  if (input != "")
    if (input != "") {
      localStorage.setItem("note", input);
      window.open(query);
    }
});
download.addEventListener("click", function () {
  downloadToFile();
});

clear.addEventListener("click", function () {
  clearList();
});

// const noteCard = `<li class="noteCard">
// <div>
// <p>${item}</p>
// <span>${date}</span>
// </div>
// <div>
// <img src=${imgSrc}/>
// </div>
// <div>
// <button id="clear">
//         <li>
//           <span class="trash">
//             <span></span>
//             <i></i>
//           </span>
//         </li>
//       </button>
//       <button id="search">
//         <li><i class="fa-solid fa-search"></i></li>
//       </button>
// </div>
// </li>`;

function addItemToList() {

  var item = document.getElementById("textarea").value;
  var list = document.getElementById("list");
  var d = new Date();
  var date = `<div id='date'>
    ${d.getHours()} 
    :
    ${d.getMinutes()} 
    ${d.getDate()} 
    /
    ${d.getMonth()} 
    /
    ${d.getFullYear()} 
    </div>`;

  var buttons = `
    </div>
    <button id="">
         <li>
           <span class="trash">
             <span></span>
             <i></i>
           </span>
         </li>
       </button>
       <button id="">
         <li><i class="fa-solid fa-search"></i></li>
       </button>`;
  
  var listItem = "<li>" + item + date + buttons + "</li>";
  if (item != "") list.innerHTML = listItem + list.innerHTML;
  document.getElementById("textarea").value = "";
  localStorage.setItem("listItems", list.innerHTML);
}
var saved = localStorage.getItem("listItems");
if (saved) {
  list.innerHTML = saved;
}
function downloadToFile() {
  var list = document.getElementById("list");
  const textToBLOB = new Blob([list.innerHTML], { type: "text/plain" });
  const fileName = "List.html"; // The file to save the data.

  let newLink = document.createElement("a");
  newLink.download = fileName;
  if (window.webkitURL != null) {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  } else {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }
  newLink.click();
}
function clearList() {
  localStorage.clear();
  list.innerHTML = "";
}
