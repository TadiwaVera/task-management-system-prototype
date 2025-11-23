const API_URL = "http://localhost:8080/tasks";
const taskForm = document.getElementById("task-form");
const tasksList = document.getElementById("tasks-list");

// Fetch and display all tasks
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        tasksList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.title}: ${task.description}`;
            tasksList.appendChild(li);
        });
    } catch (err) {
        console.error("Error fetching tasks:", err);
    }
}

// Handle form submission
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, completed: false })
        });

        taskForm.reset();
        loadTasks();
    } catch (err) {
        console.error("Error adding task:", err);
    }
});

// Load tasks when page loads
window.addEventListener("DOMContentLoaded", loadTasks);


