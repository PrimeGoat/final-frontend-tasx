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

const setupSortables2 = function() {
	$( () => {
		$( ".listBody" ).sortable({
			connectWith: ".connectedSorts",
			stop: () => {
				const structure = getBoardStructure();
				console.log("Task item has been moved.");
			}
		}).disableSelection();
	} );

	// $( () => {
	// 	$( ".boardBody" ).sortable({
	// 		axis: 'x',
	// 		change: () => {
	// 			const structure = getBoardStructure();
	// 			console.log("List has been moved.");
	// 		}
	// 	}).disableSelection();
	// } );
}

const populateBoard = function() {
	const boardBody = $("#insertLists");

	const newList = createList("Sample List");
	boardBody.append(newList);
	const newList2 = createList("Sample List");
	boardBody.append(newList2);

	// Create task in list
	const newTask = createTask("Sample task", true, "2020-04-20");
	newList.children().eq(1).append(newTask);

	setupSortables();
}

const getBoardStructure = function() {
	const lists = $('.boardBody').children();
	console.log("Length of lists: ", lists.length);

	lists.each((index, list) => {
		list = $(list);
		if(list.attr('data-listId') == null) return true;
		console.log("List ", list.attr('data-listId') + ':');
		const tasks = list.children().eq(1).children();

		tasks.each((index, task) => {
			task = $(task);
			console.log(task.attr('data-taskId'));
		});
	});
}

const createList = function(name) {
	const listTemplate = $("#listTemplate");

	// Create list
	const newList = listTemplate.clone(true);
	newList.removeAttr("id");
	newList.removeAttr("style");

	newList.removeClass("!list");
	newList.addClass("list");

	newList.attr("data-listId", listId++);


	// Set up events for editing the list's name
	const listName = newList.children().first().children().first();
	listName.text(name);
	listName.click(editList);
	const editText = newList.children().first().children().eq(1).children().first();

	editText.keyup((event) => {
		if(event.key == "Enter" || event.key == "Escape") {
			saveListEdit($(event.target));
		}
	});
	editText.blur((event) => {
		saveListEdit($(event.target));
	});


	// "Add Task" Button
	const addTaskButton = newList.children().eq(2).children().first();
	addTaskButton.click(addTask);

	return newList;
}

function editList(event) {
	const text = $(event.target).text();
	console.log(text);

	const textDiv = $(event.target);
	const editDiv = $(event.target).parent().children().eq(1);
	const editList = $(event.target).parent().children().eq(1).children().first();
	editList.val(textDiv.text());
	textDiv.css('display', 'none');
	editDiv.css('display', 'inline');
	editList.focus();
	editList.select();
}

const saveListEdit = function(element) {
	const editText = element;
	const editDiv = element.parent();
	const textDiv = element.parent().parent().children().first();

	if(editText.val() == "") editText.val("[Enter title]");
	textDiv.text(editText.val());
	textDiv.css('display', 'inline');
	editDiv.css('display', 'none');
	console.log("text div:", textDiv);
}


const addTask = function(event) {
	console.log("Add Task button pressed");
	const list = $(event.target).parent().parent().children().eq(1);
	list.append(createTask());
}

const addList = function(event) {
	console.log("Add List button pressed");
	const boardBody = $("#insertLists");

	const newList = createList("New List");
	boardBody.append(newList);

	//setupSortables2();

	const listName = newList.children().first().children().first();
	listName.trigger("click");
}

const createTask = function(name = "New Task", start = false, startDate = "", due = false, dueDate = "") {
	const taskTemplate = $("#taskTemplate");
	const newTask = taskTemplate.clone(true);
	newTask.removeAttr("id");
	newTask.removeAttr("style");

	newTask.removeClass("!task");
	newTask.addClass("task");

	newTask.attr("data-taskId", taskId++);

	// console.log("NEW TASK DATE STUFF")
	// console.log(newTask.children().eq(2).children().eq(0).children().eq(0));
	// console.log(newTask.children().eq(2).children().eq(0).children().eq(2));
	// console.log(newTask.children().eq(2).children().eq(1).children().eq(0));
	// console.log(newTask.children().eq(2).children().eq(1).children().eq(2));

	// Populate task
	const taskName = newTask.children().first();
	taskName.text(name);

	const nodeStartCheck = newTask.children().eq(2).children().eq(0).children().eq(0);
	nodeStartCheck.checked = start;

	const nodeStartDate = newTask.children().eq(2).children().eq(0).children().eq(2);
	nodeStartDate.value = startDate;

	const nodeDueCheck = newTask.children().eq(2).children().eq(1).children().eq(0);
	nodeDueCheck.checked = due;

	const nodeDueDate = newTask.children().eq(2).children().eq(1).children().eq(2);
	nodeDueDate.value = dueDate;

	// Set up events for editing the task's name
	taskName.click(editTask);
	const editText = newTask.children().eq(1).children().first();

	editText.keyup((event) => {
		if(event.key == "Enter" || event.key == "Escape") {
			saveTaskEdit($(event.target));
		}
	});
	editText.blur((event) => {
		saveTaskEdit($(event.target));
	});

	//console.log(newTask.children);

	console.log("setup");
	setupSortables();

	return newTask;
}

var listId = 0;
var taskId = 0;

function editTask(event) {
	const text = $(event.target).text();
	console.log(text);

	const textDiv = $(event.target);
	const editDiv = $(event.target).parent().children().eq(1);
	const editText = $(event.target).parent().children().eq(1).children().first();
	editText.val(textDiv.text());
	textDiv.css('display', 'none');
	editDiv.css('display', 'inline');
	editText.focus();
	editText.select();
}

const saveTaskEdit = function(element) {
	const editText = element;
	const editDiv = element.parent();
	const textDiv = element.parent().parent().children().first();

	if(editText.val() == "") editText.val("[Enter title]");
	textDiv.text(editText.val());
	textDiv.css('display', 'inline');
	editDiv.css('display', 'none');
	console.log("text div:", textDiv);
}

$("#addListButton").click(addList);
populateBoard();
