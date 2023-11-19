"use strict"

const csrfToken = document.getElementById("csrfToken").value;
const validateRoute = document.getElementById("validateRoute").value;
const createRoute = document.getElementById("createRoute").value;
const addRoute = document.getElementById("addRoute").value;
const deleteRoute = document.getElementById("deleteRoute").value;

function login() {
    const username = document.getElementById("loginName").value;
    const password = document.getElementById("loginPass").value;
    fetch(validateRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: { username, password }
    }).then(res => res.json()).then(body => {
        console.log(data);
    });
}