// constants
let todos = JSON.parse(globalThis.localStorage.getItem("todos")) || [
  { text: "dummy1", completed: false },
];
let newtask = "";

// elements
let inputel = document.querySelector(".input__field");
let countel = document.getElementById("cnter");
let scrollel = document.querySelector(".scroll");
let addBtnEl = document.querySelector(".btn");
let deleteBtnEl = document.getElementById("delete__button");

//actions
const handleClick = (e) => {
  e.preventDefault();
  newtask = e.target.value;
  if (e.key == "Enter") {
    addTask();
  }
};
const addTask = () => {
  todos.push({ text: newtask, completed: false });
  newtask = "";
  //reset the input field value[]
  inputel.value = "";
  displayTasks();
  saveToStorage();
};
const toggleTask = (idx) => {
  let currTask = todos[idx];
  todos[idx].completed = !todos[idx].completed;
  displayTasks();
  saveToStorage();
};
const editTask = (idx) => {
  // get all the todos and change the text of idx task
  const currEl = document.getElementById(`todo__p-${idx}`);
  currEl.innerHTML = "";
  const currText = todos[idx].text;
  const editInputEl = document.createElement("input");
  editInputEl.value = currText;
  currEl.replaceWith(editInputEl);
  editInputEl.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key == "Enter") {
      const editedText = editInputEl.value;
      todos[idx].text = editedText;
      displayTasks();
      saveToStorage();
    }
  });
};
const displayTasks = () => {
  scrollel.innerHTML = "";

  todos.map((todo, idx) => {
    // display each todo
    const { completed, text } = todo;
    const child = document.createElement("li");
    child.innerHTML = `
                <div class="todo__container">
                    <input
                    id = todo__checkbox-${idx}
                    type="checkbox" ${completed ? "checked" : ""} />
                    <p
                    class = ${completed ? "completed" : "notcomplete"}
                    id = todo__p-${idx}
                    onclick = "editTask(${idx})"
                    >${text}</p>
                </div>
    `;
    // append the todochild to scroll list
    scrollel.appendChild(child);
    document
      .getElementById(`todo__checkbox-${idx}`)
      .addEventListener("change", () => {
        toggleTask(idx);
      });
  });
  countel.innerHTML = `${todos.length}`;
};

const saveToStorage = () => {
  globalThis.localStorage.setItem("todos", JSON.stringify(todos));
};

const deleteAllTasks = () => {
  todos = [];
  saveToStorage();
  displayTasks();
};

// events
document.addEventListener("DOMContentLoaded", displayTasks);
addBtnEl.addEventListener("click", addTask);
inputel.addEventListener("keyup", handleClick);
deleteBtnEl.addEventListener("click", deleteAllTasks);
