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

const addTask = function(event) {
	console.log("Button pressed.");
	const listId = event.target.parentElement.parentElement.getAttribute('data-listId');
	const newTask = document.createElement('div');
	newTask.className = "task";
	newTask.setAttribute("data-taskId", taskId++);
	newTask.innerText = "Task";
	event.target.parentElement.parentElement.children[1].appendChild(newTask);

	console.log(listId);
}

/*
<!-- START TASK -->
<div class="task" data-taskId="0">
	<div class="taskTitle">
		Task
	</div>
	<div class="taskEdit">
		<input type="text" class="taskEditInput">
	</div>
	<div class="dates">
		<input type="checkbox" class="startCheck">
		<span style="display: inline-block; width: 75px;">
			<label>Start date:</label>
		</span>
		<input type="date" class="startDate">
		<br>
		<input type="checkbox" class="dueCheck">
		<span style="display: inline-block; width: 75px;">
			<label>Due date:</label>
		</span>
		<input type="date" class="dueDate">
	</div>
</div>
<!-- END TASK -->
*/

var listId = 0;
var taskId = 0;

// Creates a task and returns the element
const createTask = function() {
	const task			= document.createElement('div');
	task.className 		= "task";
	task.setAttribute("data-taskId", taskId++);

	const taskTitle		= document.createElement('div');
	taskTitle.className = "taskTitle";
	taskTitle.innerText = "[Enter title]";

	const taskEdit 		= document.createElement('div');
	taskEdit.className 	= "taskEdit";

	const taskEditInput = document.createElement('input');

	const dates 		= document.createElement('div');



	const startCheck 	= document.createElement('input');

	const startSpan 	= document.createElement('span');

	const startLabel 	= document.createElement('label');

	const startDate 	= document.createElement('input');



	const newline 		= document.createElement('br');



	const dueCheck 		= document.createElement('input');

	const dueSpan 		= document.createElement('span');

	const dueLabel 		= document.createElement('label');

	const dueDate 		= document.createElement('input');
}

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

	editText.addEventListener("keyup", (event) => {
		if(event.key == "Enter") {
			console.log("Enter detected.");
			const editText = event.target;
			const editDiv = event.target.parentElement;
			const textDiv = event.target.parentElement.parentElement.children[0];

			if(editText.value == "") editText.value = "[Enter title]"
			textDiv.innerText = editText.value;
			textDiv.style.display = 'inline';
			editDiv.style.display = 'none';
			console.log("text div:", textDiv);
		}
	})


/*	var theText = document.getElementById('thetext');
	var theEditor = document.getElementById('ta1');
	var editorArea = document.getElementById('editor');

	//set text in text div to textarea
	//correct line breaks, prevent HTML injection
	var subject = theText.innerHTML;
	subject = subject.replace(new RegExp("<br />", "gi"), 'n');
	subject = subject.replace(new RegExp("<br />", "gi"), 'n');
	subject = subject.replace(new RegExp("<", "gi"), '<');
	subject = subject.replace(new RegExp(">", "gi"), '>');
	theEditor.value = subject;

	//hide text, show editor
	theText.style.display = 'none';
	editorArea.style.display = 'inline';
	*/
}

document.querySelector('.addButton').addEventListener('click', addTask);
document.querySelector('.taskTitle').addEventListener('click', editTask);

//document.querySelector('.startDate').valueAsDate = new Date();
