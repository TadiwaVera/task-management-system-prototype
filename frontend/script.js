console.log("Loaded script.js from TASK-MANAGER project");

async function loadTasks() {
    try {
        console.log("Fetching tasks...");
        const response = await fetch("http://127.0.0.1:8080/tasks");
        const tasks = await response.json();

        const startList = document.getElementById("tasks-start");
        const progressList = document.getElementById("tasks-progress");
        const completedList = document.getElementById("tasks-completed");

        startList.innerHTML = "";
        progressList.innerHTML = "";
        completedList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.title}: ${task.description} `;

            // Show participants
            const participantsDiv = document.createElement("div");
            participantsDiv.textContent = "Participants: " + (task.participants?.join(", ") || "None");
            li.appendChild(participantsDiv);

            // Input + button to add participant
            const input = document.createElement("input");
            input.placeholder = "Add participant";
            const addBtn = document.createElement("button");
            addBtn.textContent = "Add";
            addBtn.addEventListener("click", () => {
                if (input.value.trim() !== "") {
                    addParticipant(task.id, input.value.trim());
                    input.value = "";
                }
            });
            li.appendChild(input);
            li.appendChild(addBtn);

            // Render remove buttons for each participant
            if (task.participants) {
                task.participants.forEach(p => {
                    const pDiv = document.createElement("div");
                    pDiv.textContent = p + " ";
                    const removeBtn = document.createElement("button");
                    removeBtn.textContent = "Remove";
                    removeBtn.addEventListener("click", () => removeParticipant(task.id, p));
                    pDiv.appendChild(removeBtn);
                    li.appendChild(pDiv);
                });
            }

            // Status-specific buttons
            if (task.status?.toUpperCase() === "START") {
                const startBtn = document.createElement("button");
                startBtn.textContent = "Start Task";
                startBtn.addEventListener("click", () => markInProgress(task.id));
                li.appendChild(startBtn);
                startList.appendChild(li);
            } else if (task.status?.toUpperCase() === "IN_PROGRESS") {
                const completeBtn = document.createElement("button");
                completeBtn.textContent = "Complete Task";
                completeBtn.addEventListener("click", () => completeTask(task.id));
                li.appendChild(completeBtn);
                progressList.appendChild(li);
            } else if (task.status?.toUpperCase() === "COMPLETED") {
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete Task";
                deleteBtn.addEventListener("click", () => deleteTask(task.id));
                li.appendChild(deleteBtn);
                completedList.appendChild(li);
            }
        });
    } catch (err) {
        console.error("Error loading tasks:", err);
    }
}

// Add new task
document.getElementById("task-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    try {
        await fetch("http://127.0.0.1:8080/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description })
        });

        document.getElementById("task-form").reset();
        loadTasks();
    } catch (err) {
        console.error("Error adding task:", err);
    }
});

// Delete task
async function deleteTask(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/tasks/${id}`, {
            method: "DELETE"
        });
        if (response.status === 204) {
            console.log(`Task ${id} deleted`);
            loadTasks();
        }
    } catch (err) {
        console.error("Error deleting task:", err);
    }
}

// Mark task as in progress
async function markInProgress(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/tasks/${id}/progress`, {
            method: "PATCH"
        });
        if (response.ok) {
            console.log(`Task ${id} marked in progress`);
            loadTasks();
        } else {
            console.error("Failed to mark task in progress:", response.status);
        }
    } catch (err) {
        console.error("Error marking task in progress:", err);
    }
}

// Mark task as complete
async function completeTask(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/tasks/${id}/complete`, {
            method: "PATCH"
        });
        if (response.ok) {
            console.log(`Task ${id} marked complete`);
            loadTasks();
        } else {
            console.error("Failed to mark task complete:", response.status);
        }
    } catch (err) {
        console.error("Error completing task:", err);
    }
}

// Add participant
async function addParticipant(id, participant) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/tasks/${id}/add-participant`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ participant })
        });
        if (response.ok) {
            console.log(`Participant ${participant} added to task ${id}`);
            loadTasks();
        } else {
            console.error("Failed to add participant:", response.status);
        }
    } catch (err) {
        console.error("Error adding participant:", err);
    }
}

// Remove participant
async function removeParticipant(id, participant) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/tasks/${id}/remove-participant`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ participant })
        });
        if (response.ok) {
            console.log(`Participant ${participant} removed from task ${id}`);
            loadTasks();
        } else {
            console.error("Failed to remove participant:", response.status);
        }
    } catch (err) {
        console.error("Error removing participant:", err);
    }
}

// Load tasks when page opens
loadTasks();
