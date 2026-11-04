
// ================= GET HTML ELEMENTS =================

const authSection = document.getElementById("auth-section");
const dashboardSection = document.getElementById("dashboard-section");

const signinPage = document.getElementById("signin-page");
const signupPage = document.getElementById("signup-page");


// ================= PAGE SWITCHING =================

// Open Signup
document.getElementById("open-signup").addEventListener("click", function () {

    signinPage.classList.add("d-none");
    signupPage.classList.remove("d-none");

});

// Open Signin
document.getElementById("open-signin").addEventListener("click", function () {

    signupPage.classList.add("d-none");
    signinPage.classList.remove("d-none");

});


// ================= SHOW / HIDE PASSWORD =================

const loginPassword = document.getElementById("login-password");

document.getElementById("show-login-password").addEventListener("click", function () {

    if (loginPassword.type === "password") {

        loginPassword.type = "text";

    } else {

        loginPassword.type = "password";

    }

});


// ================= DEMO ACCOUNT =================

// Temporary account for frontend testing
let demoAccount = null;


// ================= SIGNUP =================

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document.getElementById("signup-username").value.trim();

    const email = document.getElementById("signup-email").value.trim();

    const phone = document.getElementById("signup-phone").value.trim();

    const password = document.getElementById("signup-password").value;

    const confirmPassword = document.getElementById("confirm-password").value;


    // Check Password
    if (password !== confirmPassword) {

        alert("Password and Confirm Password do not match!");

        return;

    }

    // Save temporary demo account in memory
    demoAccount = {
        username: username,
        email: email,
        phone: phone,
        password: password
    };

    alert("Account created successfully! Now Sign In.");

    signupForm.reset();

    signupPage.classList.add("d-none");
    signinPage.classList.remove("d-none");

    document.getElementById("login-username").value = username;

});


// ================= LOGIN =================

const signinForm = document.getElementById("signin-form");

signinForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document.getElementById("login-username").value.trim();

    const password = document.getElementById("login-password").value;


    // Check demo account
    if (!demoAccount) {

        alert("Please create an account first!");

        return;

    }

    if (
        username === demoAccount.username &&
        password === demoAccount.password
    ) {

        // Show Dashboard
        authSection.classList.add("d-none");

        dashboardSection.classList.remove("d-none");

        // Show Username
        document.getElementById("display-username").textContent = username;

        signinForm.reset();

    } else {

        alert("Invalid Username or Password!");

    }

});


// ================= ADD TASK =================

const taskForm = document.getElementById("task-form");

const taskList = document.getElementById("task-list");

let tasks = [];


// Add Task Submit
taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get Values
    const taskName = document.getElementById("task-name").value.trim();

    const schedule = document.getElementById("task-schedule").value;

    const reminder = document.getElementById("task-reminder").value;

    const note = document.getElementById("task-note").value.trim();

    const priority = Number(document.getElementById("task-priority").value);


    // Convert Priority to Stars
    let stars = "";

    for (let i = 0; i < priority; i++) {

        stars += "⭐";

    }

    if (priority === 0) {

        stars = "☆";

    }


    // Create Task Object
    const task = {
        name: taskName,
        schedule: schedule,
        reminder: reminder,
        note: note,
        priority: priority,
        stars: stars
    };


    // Add Task to Array
    tasks.push(task);

    // Display Tasks
    showTasks(tasks);

    // Reset Form
    taskForm.reset();

    // Close Modal
    const modalElement = document.getElementById("addTaskModal");

    const modal = bootstrap.Modal.getInstance(modalElement);

    modal.hide();

});


// ================= DISPLAY TASKS =================

function showTasks(taskData) {

    taskList.innerHTML = "";

    taskData.forEach(function (task) {

        const row = document.createElement("tr");

        const values = [
            task.name,
            task.schedule ? task.schedule.replace("T", " ") : "-",
            task.reminder ? task.reminder.replace("T", " ") : "-",
            task.note || "-",
            task.stars
        ];

        values.forEach(function (value) {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        taskList.appendChild(row);

    });

}


// ================= SEARCH TASK =================

const searchInput = document.getElementById("search-task");

function searchTasks() {

    const searchValue = searchInput.value.toLowerCase().trim();

    const filteredTasks = tasks.filter(function (task) {

        return (
            task.name.toLowerCase().includes(searchValue) ||
            task.note.toLowerCase().includes(searchValue)
        );

    });

    showTasks(filteredTasks);

}


// Search Button
document.getElementById("search-btn").addEventListener("click", searchTasks);


// Search while typing
searchInput.addEventListener("input", searchTasks);


// ================= PROFILE =================

document.getElementById("profile-btn").addEventListener("click", function () {

    if (demoAccount) {

        alert(
            "Username: " + demoAccount.username +
            "\nEmail: " + demoAccount.email +
            "\nPhone: " + demoAccount.phone
        );

    }

});


// ================= LOGOUT =================

document.getElementById("logout-btn").addEventListener("click", function () {

    // Clear Current User Tasks
    tasks = [];

    taskList.innerHTML = "";

    searchInput.value = "";

    taskForm.reset();

    // Hide Dashboard
    dashboardSection.classList.add("d-none");

    // Show Login Page
    authSection.classList.remove("d-none");

    signinPage.classList.remove("d-none");

    signupPage.classList.add("d-none");

    signinForm.reset();

    alert("You have logged out successfully!");

});
