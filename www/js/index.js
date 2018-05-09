Backendless.initApp("17EE290A-B663-29DE-FF68-57B15656BA00","9B160163-F13A-07BC-FF69-0DA99F0B0800");

$(document).on("pageshow","#toDoPage", onPageShow);
function onPageShow() {
console.log("page shown");

var dataQueryBuilder = Backendless.DataQueryBuilder.create();
dataQueryBuilder.setSortBy( ["created"] );

Backendless.Data.of("tasks").find(dataQueryBuilder).then(processResults).catch(error);

function processResults(tasks) {
		//wipe the list clean
		$('#taskList').empty();

		//add each tasks
		for (var i = 0; i < tasks.length; i++) {
		 $('#taskList').append("<li>"+tasks[i].task+" - "+tasks[i].objectId+" <input type='button' data-id='"+tasks[i].objectId+"' id='deleteTaskButton' value='X'/></li>");
		}

		//refresh the listview
		$('#taskList').listview('refresh');

}
function error(err) {
 alert(err);
}

$(document).on("click", "#addTaskButton", onAddTask);

function onAddTask() {
console.log("add task button clicked");
var tasktext = $('#addTaskText').val();

var newTask = {};
newTask.task = tasktext;

Backendless.Data.of("tasks").save(newTask).then(saved).catch(error);
function saved(savedTask) {
console.log("Added")

Backendless.Data.of("tasks").find(dataQueryBuilder).then(processResults).catch(error);

}

}

$(document).on("click", "#deleteTaskButton", onDeleteTask);

function onDeleteTask() {
	
	Backendless.Data.of("tasks").remove( { objectId: $(this).data("id") } ).then(function() {
      Backendless.Data.of("tasks").find(dataQueryBuilder).then(processResults).catch(error);
    }).catch(error);
}

}
