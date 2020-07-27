var clear = document.querySelector(".clear");
var date = document.querySelector("#date");
var list = document.querySelector("#list");
var header = document.querySelector(".header");
var items = document.getElementsByTagName("li");
var text = document.querySelector(".text");
var add_Todo = document.querySelector(".add-to-do i");
var input = document.querySelector("input");
var checked = "fa-check-circle";
var unChecked = "fa-circle-thin";
var line_through = "lineThrough";
var LIST = void 0,
    id = void 0;
var DATA = localStorage.getItem("TODO");
if (DATA) {
  LIST = JSON.parse(DATA);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

//header

var images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
var index = 0;
function imgSlide() {
  header.style.backgroundImage = "url(" + ("../img/" + images[index]) + ")";
  index++;
  if (index == images.length) {
    index = 0;
  }
  setTimeout(imgSlide, 6000);
}

imgSlide();

function loadList(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

function addTodo(toDo, id, done, trash) {
  if (trash) return;

  var Done = done ? checked : unChecked;
  var Line = done ? line_through : "";

  var text = "<li class=\"item\">\n  <i class=\"fa " + Done + "\n   co\" job = \"complete\" id = \"" + id + "\"></i>\n  <p class=\"text " + Line + "\">" + toDo + "</p>\n  <i class=\"fa fa-trash-o de\" job = \"delete\" id = \"" + id + "\"></i>\n  </li>";
  var position = "beforeend";
  list.insertAdjacentHTML(position, text);
}
function TODO() {
  var toDo = input.value;
  if (toDo) {
    addTodo(toDo, id, false, false);
    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false
    });

    input.value = "";
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
  }
}

function doME(event) {
  if (event.keyCode == 13) {
    TODO();
  }
}
function doMeOnClick() {
  TODO();
}

//complete todo
function completeTodo(element) {
  element.classList.toggle(checked);
  element.classList.toggle(unChecked);
  element.parentNode.querySelector(".text").classList.toggle(line_through);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}
//delete todo
function deleteTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}
function checkTodo(event) {
  var element = event.target;
  var elementJob = element.attributes.job.value;
  if (elementJob == "complete") {
    completeTodo(element);
  } else if (elementJob == "delete") {
    deleteTodo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
}

document.addEventListener("keyup", doME);
add_Todo.addEventListener("click", doMeOnClick);
list.addEventListener("click", checkTodo);

function pop() {
  alert("working");
}
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

var today = new Date();
var options = { weekday: "long", month: "short", day: "numeric" };
date.innerHTML = today.toLocaleDateString("en-US", options);