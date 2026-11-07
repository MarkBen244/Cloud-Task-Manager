
// ===============================
// GET HTML ELEMENTS
// ===============================

const authSection = document.getElementById("auth-section");
const taskSection = document.getElementById("task-section");
const authMessage = document.getElementById("auth-message");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const logoutButton = document.getElementById("logout-button");

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const filterButtons = document.querySelectorAll(".filter-button");

let currentUserId = null;
let currentFilter = "all";


// ===============================
// USER REGISTRATION
// ===============================

signupForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    authMessage.textContent = "Creating account...";

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        authMessage.textContent = error.message;
        return;
    }

    if (data.session) {
        authMessage.textContent = "Account created successfully!";
    } else {
        authMessage.textContent =
            "Check your email to confirm your account.";
    }

    signupForm.reset();
});


// ===============================
// USER LOGIN
// ===============================

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    authMessage.textContent = "Logging in...";

    const { error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        authMessage.textContent = error.message;
        return;
    }

    authMessage.textContent = "Login successful!";
});


// ===============================
// USER LOGOUT
// ===============================

logoutButton.addEventListener("click", async function() {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        authMessage.textContent = error.message;
    }
});


// ===============================
// LOAD TASKS FROM DATABASE
// ===============================

async function loadTasks(userId) {

    taskList.textContent = "Loading tasks...";

    const { data, error } = await supabaseClient
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        taskList.textContent = "Could not load tasks: " + error.message;
        return;
    }

    displayTasks(data);
}


// ===============================
// DISPLAY TASKS
// ===============================

function displayTasks(tasks) {

    taskList.innerHTML = "";

    // Apply selected filter
    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(function(task) {
            return !task.is_completed;
        });
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function(task) {
            return task.is_completed;
        });
    }

    if (filteredTasks.length === 0) {
        taskList.textContent = "No tasks found.";
        return;
    }

    filteredTasks.forEach(function(task) {

        const taskItem = document.createElement("div");

        const taskText = document.createElement("span");
        taskText.textContent = task.title;

        if (task.is_completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        // Complete or undo button
        const completeButton = document.createElement("button");

        completeButton.textContent =
            task.is_completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", function() {
            updateTask(task);
        });

        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {
            editTask(task);
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        // Add elements to task container
        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}


// ===============================
// TASK FILTER BUTTONS
// ===============================

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;

        // Update active button
        filterButtons.forEach(function(filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        // Reload tasks using selected filter
        loadTasks(currentUserId);

    });

});


// ===============================
// ADD A NEW TASK
// ===============================

taskForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName === "" || !currentUserId) {
        return;
    }

    const { error } = await supabaseClient
        .from("tasks")
        .insert({
            title: taskName,
            user_id: currentUserId,
            is_completed: false
        });

    if (error) {
        alert("Could not add task: " + error.message);
        return;
    }

    taskInput.value = "";

    loadTasks(currentUserId);
});


// ===============================
// UPDATE TASK COMPLETION
// ===============================

async function updateTask(task) {

    const { error } = await supabaseClient
        .from("tasks")
        .update({
            is_completed: !task.is_completed
        })
        .eq("id", task.id)
        .eq("user_id", currentUserId);

    if (error) {
        alert("Could not update task: " + error.message);
        return;
    }

    loadTasks(currentUserId);
}


// ===============================
// EDIT TASK
// ===============================

async function editTask(task) {

    const newTitle = prompt("Edit your task:", task.title);

    if (newTitle === null) {
        return;
    }

    const updatedTitle = newTitle.trim();

    if (updatedTitle === "") {
        alert("Task title cannot be empty.");
        return;
    }

    const { error } = await supabaseClient
        .from("tasks")
        .update({
            title: updatedTitle
        })
        .eq("id", task.id)
        .eq("user_id", currentUserId);

    if (error) {
        alert("Could not edit task: " + error.message);
        return;
    }

    loadTasks(currentUserId);
}


// ===============================
// DELETE TASK
// ===============================

async function deleteTask(taskId) {

    const { error } = await supabaseClient
        .from("tasks")
        .delete()
        .eq("id", taskId)
        .eq("user_id", currentUserId);

    if (error) {
        alert("Could not delete task: " + error.message);
        return;
    }

    loadTasks(currentUserId);
}


// ===============================
// UPDATE APPLICATION INTERFACE
// ===============================

async function updateInterface(session = null) {

    if (session === null) {
        const { data } = await supabaseClient.auth.getSession();
        session = data.session;
    }

    if (session) {

        currentUserId = session.user.id;

        authSection.hidden = true;
        taskSection.hidden = false;
        logoutButton.hidden = false;

        await loadTasks(currentUserId);

    } else {

        currentUserId = null;

        authSection.hidden = false;
        taskSection.hidden = true;
        logoutButton.hidden = true;

        taskList.innerHTML = "";
    }
}


// ===============================
// LISTEN FOR AUTHENTICATION CHANGES
// ===============================

supabaseClient.auth.onAuthStateChange(function(event, session) {

    setTimeout(function() {
        updateInterface(session);
    }, 0);

});


// ===============================
// CHECK LOGIN STATUS ON PAGE LOAD
// ===============================

updateInterface();
