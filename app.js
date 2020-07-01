const clear = document.querySelector(".clear");
const date = document.querySelector("#date");
const list = document.querySelector("#list");
const items = document.getElementsByTagName("li");
const text = document.querySelector(".text");
const add_Todo = document.querySelector(".add-to-do i");
const input = document.querySelector("input");
let checked = "fa-check-circle";
let unChecked = "fa-circle-thin";
let line_through = "lineThrough";
let LIST, id;
let DATA = localStorage.getItem("TODO");
if (DATA) {
  LIST = JSON.parse(DATA);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(array) {
  array.forEach((item) => {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

function addTodo(toDo, id, done, trash) {
  if (trash) return;

  let Done = done ? checked : unChecked;
  let Line = done ? line_through : "";

  const text = `<li class="item">
  <i class="fa ${Done}
   co" job = "complete" id = "${id}"></i>
  <p class="text ${Line}">${toDo}</p>
  <i class="fa fa-trash-o de" job = "delete" id = "${id}"></i>
  </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
}

function doME(event) {
  const toDo = input.value;
  if (event.keyCode == 13) {
    if (toDo) {
      addTodo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      input.value = "";
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
  }
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
  const element = event.target;
  const elementJob = element.attributes.job.value;
  if (elementJob == "complete") {
    completeTodo(element);
  } else if (elementJob == "delete") {
    deleteTodo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
}
document.addEventListener("keyup", doME);
list.addEventListener("click", checkTodo);

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

const today = new Date();
let options = { weekday: "long", month: "short", day: "numeric" };
date.innerHTML = today.toLocaleDateString("en-US", options);
