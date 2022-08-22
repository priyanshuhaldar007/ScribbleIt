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
var noteArr = [];

var imgFlag = 0;
addImg.addEventListener("click", function () {
  imgFlag = 1;
});

//take input from form
function getVals() {
  var noteText = textarea.value;
  textarea.value='';
  var imgSrc = "";
  if (imgFlag == 1) {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
      imgSrc = oFREvent.target.result;

      addItemToList(noteText, imgSrc);
      pushArr(noteText, imgSrc);
    };
  } else {
    addItemToList(noteText, imgSrc);
    pushArr(noteText, imgSrc);
  }
}

//push to array
function pushArr(noteText, imgSrc) {
  noteObj = { noteContent: noteText, imgPath: imgSrc };
  noteArr.push(noteObj);
  //   noteArr.unshift(noteObj);
  console.log(noteArr);
  noteParent = Object.assign({}, noteArr);
  localStorage.setItem("notes", JSON.stringify(noteParent));
}

//get from localstorage
function fetchVals() {
  var noteParent = JSON.parse(localStorage.getItem("notes"));
  if (noteParent == undefined || noteParent == null) {
    noteParent = {};
  }
  var dataArr = Object.values(noteParent);
  console.log(dataArr);
  dataArr.map((ele) => {
    pushArr(ele.noteContent, ele.imgPath);
    addItemToList(ele.noteContent, ele.imgPath);
  });
}

window.onload = (event) => {
  noteArr = [];
  list.innerHTML = "";
  fetchVals();
};

//delete individual note
function deleteNote(el) {
  var note = el.parentElement.parentElement;
  note.style.display = "none";
  console.log(noteArr);
  var currNote = note.firstChild.firstChild.innerText;
  var index = 0;
  noteArr.map((ele) => {
    if (currNote == ele.noteContent) {
      noteArr.splice(index, 1);
    }
    index += 1;
  });
  console.log(noteArr);
  noteParent = Object.assign({}, noteArr);
  localStorage.setItem("notes", JSON.stringify(noteParent));
}

//search from individual note
function searchNote(el) {
  var note = el.parentElement.parentElement;
  var input = note.firstChild.firstChild.innerText;
  var query = "https://www.google.com/search?q=" + encodeURIComponent(input);
  if (input != "")
    if (input != "") {
      localStorage.setItem("note", input);
      window.open(query);
    }
}

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
  noteArr = [];
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
if (imgFlag == 1) {
  function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
      document.getElementsByClassName("noteImg").src = oFREvent.target.result;
    };
  }
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
function createNote(noteContent, imgSrc) {
  let noteContainer = document.createElement("li");
  let ncLeft = document.createElement("div");
  let ncMid = document.createElement("div");
  let ncRight = document.createElement("div");
  let date = document.createElement("div");
  var ncRightContent = `
    <button id="DeleteNote" onclick="deleteNote(this)">
    <abbr title="Delete Note">
    <li>
      <span class="trash">
        <span></span>
        <i></i>
      </span></li
  ></abbr>
</button>
<button id="searchNote" onclick="searchNote(this)">
  <abbr title="Search Note">
    <li><i class="fa-solid fa-search"></i></li>
  </abbr>
</button>`;
  let noteText = document.createElement("div");
  let noteImg = document.createElement("img");

  noteText.innerText = noteContent;
  var d = new Date();
  var CurrDate = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

  noteContainer.classList.add("noteContainer");
  ncLeft.classList.add("ncLeft");
  ncMid.classList.add("ncMid");
  ncRight.classList.add("ncRight");
  date.classList.add("date");
  noteImg.classList.add("noteImg");
  noteText.classList.add("noteText");

  if (imgSrc != '') {
    console.log(imgSrc);
    noteImg.src = imgSrc;
  } else {
    noteImg.style.height = 0;
    noteImg.style.width = 0;
    ncMid.style.display = "none";    
    noteContainer.style.gridTemplateColumns = '4.5fr 0.5fr';
  }

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
function addItemToList(noteText, imgSrc) {
    // console.log(noteText,'\n', imgSrc);
  list.prepend(createNote(noteText, imgSrc));
//   textarea.value = "";
  //   imgFlag;
}

//button calling
addNote.addEventListener("click", function () {
  // addItemToList();
  if (textarea.value != "") {
    console.log(imgFlag);
    getVals();
  }
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
