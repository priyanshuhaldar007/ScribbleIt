//variable declaration
var downloadFile = document.getElementById("downloadFile");
var clearAll = document.getElementById("clearAll");
var search = document.getElementById("search");
var downloadSnap = document.getElementById("downloadSnap");
var addNote = document.getElementById("addNote");
var addImg = document.getElementById("addImg");
var textarea = document.getElementById("textarea");
var captureElement = document.getElementById("capture");
var list = document.getElementById("list");
var DeleteNote = document.getElementById("DeleteNote");
var SearchNote = document.getElementById("SearchNote");

//file downloading
function downloadToFile() {
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

//emptying the list
function clearList() {
  localStorage.clear();
  list.innerHTML = "";
}

//downloading the snapshot
function capture() {
  const captureElement = document.querySelector("#capture");
  html2canvas(captureElement)
    .then((canvas) => {
      canvas.style.display = "none";
      document.body.appendChild(canvas);
      return canvas;
    })
    .then((canvas) => {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.setAttribute("download", "my-image.png");
      a.setAttribute("href", image);
      a.click();
      canvas.remove();
    });
}

//uploading the image
function PreviewImage() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

  oFReader.onload = function (oFREvent) {
    document.getElementsByClassName("noteImg").src = oFREvent.target.result;
  };
}

//take snapshot
function capture() {
  const captureElement = document.querySelector("#capture");
  html2canvas(captureElement)
    .then((canvas) => {
      canvas.style.display = "none";
      document.body.appendChild(canvas);
      return canvas;
    })
    .then((canvas) => {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.setAttribute("download", "my-image.png");
      a.setAttribute("href", image);
      a.click();
      canvas.remove();
    });
}

//Create note
function createNote() {
  let noteContainer = document.createElement("li");
  let ncLeft = document.createElement("div");
  let ncMid = document.createElement("div");
  let ncRight = document.createElement("div");
  let date = document.createElement("div");
  var ncRightContent = `
    <button id="">
         <li>
           <span class="trash">
             <span></span>
             <i></i>
           </span>
         </li>
       </button>
       <button id="searchNote">
         <li><i class="fa-solid fa-search"></i></li>
       </button>`;
  let noteText = document.createElement("div");
  let noteImg = document.createElement("img");

  noteText.innerText = textarea.value;
  var d = new Date();
  var CurrDate = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

  noteContainer.classList.add("noteContainer");
  ncLeft.classList.add("ncLeft");
  ncMid.classList.add("ncMid");
  ncRight.classList.add("ncRight");
  date.classList.add("date");
  noteImg.classList.add("noteImg");
  noteText.classList.add("noteText");

  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

  oFReader.onload = function (oFREvent) {
    noteImg.src = oFREvent.target.result;
  };

  date.innerText = CurrDate;
  ncRight.innerHTML = ncRightContent;

  ncMid.appendChild(noteImg);
  ncLeft.appendChild(noteText);
  ncLeft.appendChild(date);
  noteContainer.appendChild(ncLeft);
  noteContainer.appendChild(ncMid);
  noteContainer.appendChild(ncRight);

  return noteContainer;
}

//add note
function addItemToList() {
  list.appendChild(createNote());
}

//button calling
addNote.addEventListener("click", function () {
  // console.log('added');
  addItemToList();
});

clearAll.addEventListener("click", function () {
  clearList();
});

downloadFile.addEventListener("click", function () {
  downloadToFile();
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

downloadSnap.addEventListener("click", capture);