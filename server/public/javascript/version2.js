const csrfToken = $("#csrfToken").val();
const loginRoute = $("#loginRoute").val();
const validateRoute = $("#validateRoute").val();
const createRoute = $("#createRoute").val();
const addRoute = $("#addRoute").val();
const deleteRoute = $("#deleteRoute").val();

$("#contents").load(loginRoute); 

function login() {
    const username = $("#loginName").val();
    const password = $("#loginPass").val();
    $.post(validateRoute, {username, password, csrfToken}, data => {("#contents").html(data);});
    console.log("passed post")        
}

function createUser() {
    const username = $("#createName").val();
    const password = $("#createPass").val();
    $.post(createRoute,
        {username, password, csrfToken},
        data => {
            ("#contents").html(data);
        });
}

function deleteTask(index) {
    $.post(deleteRoute,
        {index, csrfToken},
        data => {
            ("#contents").html(data);
        });
}

function addTask() {
    const task = $("#newTask").val();
    $.post(addRoute,
        {text, csrfToken},
        data => {
            ("#contents").html(data);
        });
}