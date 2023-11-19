"use strict"

const csrfToken = document.getElementById("csrfToken").value;
const validateRoute = document.getElementById("validateRoute").value;
const tasksRoute = document.getElementById("tasksRoute").value;
const createRoute = document.getElementById("createRoute").value;
const addRoute = document.getElementById("addRoute").value;
const deleteRoute = document.getElementById("deleteRoute").value;

function login() {
    const username = document.getElementById("loginName").value;
    const password = document.getElementById("loginPass").value;
    fetch(validateRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
        body: JSON.stringify({ username, password })
    }).then(res => res.text()).then(data => {
        if(data) {
            document.getElementById("login-section").hidden = true;
            document.getElementById("task-section").hidden = false;
            loadTasks();
        } else {
            //TODO
        }
    });
}

function loadTasks() {
    const ul = document.getElementById("task-list");
    //clears prior tasks
    ul.innerHTML = "";
    fetch(tasksRoute).then(res => res.json()).then(tasks => {
        for(let i = 0; i <tasks.length; ++i) {
            const task = tasks[i];
            const li = document.createElement("li");
            const text = document.createTextNode(tasks[i]);
            li.appendChild(text);
            li.onclick = e => {
                fetch(deleteRoute, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
                    body: JSON.stringify(i)
                }).then(res => res.text()).then(data => {
                    if(data) {
                        loadTasks();
                    } else {
                        //TODO false - error 
                    }
                });
            }
            ul.appendChild(li);
        }
    });
}

function addTask() {
    let task = document.getElementById("newTask").value;
    fetch(addRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
        body: JSON.stringify(task)
    }).then(res => res.text()).then(data => {
        if(data) {
            loadTasks();
        } else {
            //TODO false - error task 
        }
    });
}