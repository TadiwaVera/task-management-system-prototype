package com.taskmanager.controller;

import com.taskmanager.model.Task;
import com.taskmanager.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // DTO for participant requests
    public static class ParticipantRequest {
        private String participant;
        public String getParticipant() { return participant; }
        public void setParticipant(String participant) { this.participant = participant; }
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }
    // Test I implemented for resolving CORS ERRORS
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        task.setStatus("START");
        return taskService.saveTask(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Optional<Task> taskOptional = taskService.getTaskById(id);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setStatus(taskDetails.getStatus());
            return ResponseEntity.ok(taskService.saveTask(task));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Adding participants
    @PatchMapping("/{id}/add-participant")
    public ResponseEntity<Task> addParticipant(@PathVariable Long id, @RequestBody ParticipantRequest request) {
        Optional<Task> taskOptional = taskService.getTaskById(id);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            if (task.getParticipants() == null) {
                task.setParticipants(new ArrayList<>());
            }
            task.getParticipants().add(request.getParticipant());
            return ResponseEntity.ok(taskService.saveTask(task));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Removing participants
    @PatchMapping("/{id}/remove-participant")
    public ResponseEntity<Task> removeParticipant(@PathVariable Long id, @RequestBody ParticipantRequest request) {
        Optional<Task> taskOptional = taskService.getTaskById(id);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            if (task.getParticipants() != null) {
                task.getParticipants().remove(request.getParticipant());
            }
            return ResponseEntity.ok(taskService.saveTask(task));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/progress")
    public ResponseEntity<Task> markTaskAsInProgress(@PathVariable Long id) {
        Optional<Task> taskOptional = taskService.getTaskById(id);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setStatus("IN_PROGRESS");
            return ResponseEntity.ok(taskService.saveTask(task));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<Task> markTaskAsCompleted(@PathVariable Long id) {
        Optional<Task> taskOptional = taskService.getTaskById(id);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setStatus("COMPLETED");
            return ResponseEntity.ok(taskService.saveTask(task));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}



