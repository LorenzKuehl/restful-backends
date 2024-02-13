// Todo-App with API

//Variablen
const allRadio = document.getElementById("all");
const openRadio = document.getElementById("open");
const doneRadio = document.getElementById("done");
const filterRadio = document.querySelectorAll("#all #open #done");
const rmvBtn = document.getElementById("remBtn");
const taskInp = document.getElementById("new-task");
const addBtn = document.getElementById("addButton");
const ul = document.querySelector("ul");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const apiUrl = "http://localhost:4730/todos";
let filter = "";

//Initial state
let state = {
  todos: [
    // { description: "Learn HTML", done: false, id: 1 },
    // { description: "Learn Javascript", done: true, id: 2 },
    // { description: "Learn CSS", done: false, id: 3 },
    // { description: "Learn all together", done: false, id: 4 },
  ],
};

//Action functions
function handleCheckboxChange(task) {
  const updatedTodo = { ...task, done: !task.done };

  fetch(`${apiUrl}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Noooope");
      }
      refresh();
    })
    .catch((error) => {
      console.error("Oha, dat war wohl nüschts...", error);
    });
}

function createTaskElement(task) {
  const liTask = document.createElement("li");
  ul.append(liTask);
  liTask.textContent = task.description;
  const input = document.createElement("input");
  liTask.append(input);
  input.setAttribute("type", "checkbox");
  input.checked = task.done;
  input.addEventListener("change", () => handleCheckboxChange(task));
}

function refresh() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      state.todos = data;
      render();
    });
}

//Render function
function render() {
  ul.innerHTML = "";
  state.todos.forEach((task) => {
    if (filter === "all" || filter === "") {
      createTaskElement(task);
    } else if (filter === "open" && !task.done) {
      createTaskElement(task);
    } else if (filter === "done" && task.done) {
      createTaskElement(task);
    }
  });
}

// Event Listener
allRadio.addEventListener("click", function () {
  if (allRadio.checked) {
    filter = "all";
  }
  return render();
});

openRadio.addEventListener("click", function () {
  if (openRadio.checked) {
    filter = "open";
  }
  return render();
});

doneRadio.addEventListener("click", function () {
  if (doneRadio.checked) {
    filter = "done";
  }
  return render();
});

checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("change", () => {
    handleCheckboxChange(state.todos[index]);
  });
});

addBtn.addEventListener("click", function () {
  const inputDescription = taskInp.value.trim();
  const description = inputDescription.toLowerCase();
  const id = Date.now().toString();

  // Checken ob der text-input nicht leer und länger als 5 Zeichen ist
  if (!inputDescription || inputDescription.length <= 4) {
    alert("Oha! Dein ToDo muss mindestens 5 Zeichen lang sein.");
    return;
  }

  // Checken ob der task bereits in der list ist
  if (
    state.todos.some((task) => task.description.toLowerCase() === description)
  ) {
    alert("Ups! Sieht so aus als wäre dein ToDo bereits in der Liste.");
    return;
  }

  // Den task zur list pushen
  const newTodo = {
    description: inputDescription,
    done: false,
  };
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json())
    .then(refresh());

  // Das text-input-field clearen
  taskInp.value = "";

  // Render
  render();
});

rmvBtn.addEventListener("click", function () {
  state.todos.forEach((task) => {
    if (task.done) {
      fetch(`${apiUrl}/${task.id}`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Nooope");
          }
          refresh();
        })
        .catch((error) => {
          console.error("Ups, da hat wohl etwas nicht funktioniert...", error);
        });
    }
  });
});

//Initial render call
render();
refresh();
