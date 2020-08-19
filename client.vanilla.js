// API

// Task
const sampleTask = {
	taskId: 12345,
	title: "Sample Task",
	startDate: "",
	dueDate: "2020-08-12"
}

// List
const sampleList = {
	ListId: 456,
	title: "Todo",
	tasks: [sampleTask]
}

// Board
const kanbanBoard = {
	title: "Task Manager",
	lists: [sampleList]
}

console.log(kanbanBoard);

// Routes:

// GET /board
// GET /list/:id
// GET /task/:id
// POST
// PUT /updatetask/:id
// DELETE /killtask/:id

const setupSortables = function() {
	$( () => {
		$( ".listBody" ).sortable({
			connectWith: ".connectedSorts",
			stop: () => {
				const structure = getBoardStructure();
				console.log("Task item has been moved.");
			}
		}).disableSelection();
	} );

	$( () => {
		$( ".boardBody" ).sortable({
			axis: 'x',
			change: () => {
				const structure = getBoardStructure();
				console.log("List has been moved.");
			}
		}).disableSelection();
	} );
}

const populateBoard = function() {
	const boardBody = document.querySelector("#insertLists");

	const newList = createList("Sample List");
	boardBody.appendChild(newList);
	const newList2 = createList("Sample List");
	boardBody.appendChild(newList2);

	// Create task in list
	const newTask = createTask("Sample task", true, "2020-04-20");
	newList.children[1].appendChild(newTask);

	setupSortables();
}

const getBoardStructure = function() {
	const lists = document.querySelector('.boardBody').children;
	console.log("Length of lists: ", lists.length);
	for(list of lists) {
		if(list.getAttribute('data-listId') == null) continue;

		console.log("List ", list.getAttribute('data-listId') + ':');
		const tasks = list.children[1].children;

		for(task of tasks) {
			console.log(task.getAttribute('data-taskId'));
		}
	}
}



const createList = function(name) {
	const listTemplate = document.getElementById("listTemplate");

	// Create list
	const newList = listTemplate.cloneNode(true);
	newList.removeAttribute("id");
	newList.removeAttribute("style");
	newList.className = "list";

	// Set up events for editing the list's name
	const listName = newList.children[0].children[0];
	listName.addEventListener('click', editList);
	const editText = newList.children[0].children[1].children[0];

	editText.addEventListener("keyup", (event) => {
		if(event.key == "Enter" || event.key == "Escape") {
			saveListEdit(event.target);
		}
	});
	editText.addEventListener("blur", (event) => {
		saveListEdit(event.target);
	});


	// "Add Task" Button
	const addTaskButton = newList.children[2].children[0];
	addTaskButton.addEventListener('click', addTask);

	console.log(newList.children);
	return newList;
}

function editList(event) {
	const text = event.target.innerText;
	console.log(text);

	const textDiv = event.target;
	const editDiv = event.target.parentElement.children[1];
	const editList = event.target.parentElement.children[1].children[0];
	console.log(editList);
	editList.value = textDiv.innerText;
	textDiv.style.display = 'none';
	editDiv.style.display = 'inline';
	editList.focus();
	editList.select();
}

const saveListEdit = function(element) {
	const editText = element;
	const editDiv = element.parentElement;
	const textDiv = element.parentElement.parentElement.children[0];

	if(editText.value == "") editText.value = "[Enter title]"
	textDiv.innerText = editText.value;
	textDiv.style.display = 'inline';
	editDiv.style.display = 'none';
	console.log("text div:", textDiv);
}


const addTask = function(event) {
	console.log("Add Task button pressed");
	const list = event.target.parentElement.parentElement.children[1];
	list.appendChild(createTask());
}

const addList = function(event) {
	console.log("Add List button pressed");
	const boardBody = document.getElementById("insertLists");

	const newList = createList("New List");
	boardBody.appendChild(newList);
	setupSortables();
	const listName = newList.children[0].children[0];
	listName.dispatchEvent(new Event("click"));
}

const createTask = function(name = "New Task", start = false, startDate = "", due = false, dueDate = "") {
	const taskTemplate = document.getElementById("taskTemplate");
	const newTask = taskTemplate.cloneNode(true);
	newTask.removeAttribute("id");
	newTask.removeAttribute("style");
	newTask.className = "task";
	newTask.setAttribute("data-taskId", taskId++);

	console.log("NEW TASK DATE STUFF")
	console.log(newTask.children[2].children[0].children[0]);
	console.log(newTask.children[2].children[0].children[2]);
	console.log(newTask.children[2].children[1].children[0]);
	console.log(newTask.children[2].children[1].children[2]);
	// Populate task
	const taskName = newTask.children[0];
	taskName.innerText = name;

	const nodeStartCheck = newTask.children[2].children[0].children[0];
	nodeStartCheck.checked = start;

	const nodeStartDate = newTask.children[2].children[0].children[2];
	nodeStartDate.value = startDate;

	const nodeDueCheck = newTask.children[2].children[1].children[0];
	nodeDueCheck.checked = due;

	const nodeDueDate = newTask.children[2].children[1].children[2];
	nodeDueDate.value = dueDate;

	// Set up events for editing the task's name
	taskName.addEventListener('click', editTask);
	const editText = newTask.children[1].children[0];

	editText.addEventListener("keyup", (event) => {
		if(event.key == "Enter" || event.key == "Escape") {
			saveTaskEdit(event.target);
		}
	});
	editText.addEventListener("blur", (event) => {
		saveTaskEdit(event.target);
	});

	//console.log(newTask.children);
	return newTask;
}

var listId = 0;
var taskId = 0;

function editTask(event) {
	const text = event.target.innerText;
	console.log(text);

	const textDiv = event.target;
	const editDiv = event.target.parentElement.children[1];
	const editText = event.target.parentElement.children[1].children[0];
	console.log(editText);
	editText.value = textDiv.innerText;
	textDiv.style.display = 'none';
	editDiv.style.display = 'inline';
	editText.focus();
	editText.select();
}

const saveTaskEdit = function(element) {
	const editText = element;
	const editDiv = element.parentElement;
	const textDiv = element.parentElement.parentElement.children[0];

	if(editText.value == "") editText.value = "[Enter title]"
	textDiv.innerText = editText.value;
	textDiv.style.display = 'inline';
	editDiv.style.display = 'none';
	console.log("text div:", textDiv);
}

document.getElementById("addListButton").addEventListener("click", addList);
populateBoard();
