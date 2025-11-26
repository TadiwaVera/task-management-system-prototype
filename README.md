Task Management System Prototype

Description
This project is a prototype of a simple task management platform. It leverages a Spring Boot + JPA/Hibernate backend with a lightweight relational database, and a vanilla HTML/CSS/JavaScript frontend. The system provides full CRUD (Create, Read, Update, Delete) functionality for tasks through REST API endpoints, enabling users to create tasks, view all tasks, update tasks, and delete tasks.
This serves as a minimal working base for a more advanced task-management system (e.g. future hybrid database architecture, context tracking, GitHub integration, automation engine) — demonstrating the core data model, backend API, and frontend interaction flow.

Backend
Java + Spring Boot — for REST API controllers, business logic, configuration.
JPA / Hibernate — for object-relational mapping between Java entities (e.g. Task) and the database.
Relational database (configured via JPA) — storing persistent data for tasks in this prototype.

Frontend
HTML + CSS — basic layout, styling, and UI for task listing, creation, editing, deletion.
JavaScript — for asynchronously fetching data from backend API endpoints, updating UI without page reloads, and handling user interactions (create/update/delete tasks).

Features (Implemented)
REST API endpoints to:
Create a new task
Fetch all existing tasks / fetch specific task(s)
Update an existing task
Delete a task
Frontend UI that interacts with these endpoints for user-driven task management (via forms/buttons + JS fetch calls).
Use of ORM (JPA/Hibernate) for data persistence — mapping Java entities to a relational database.

Intended Architecture (Future / Evolved Design)
While this prototype uses a simple relational database, the long-term design envisions a hybrid database architecture, combining a relational database (e.g. PostgreSQL) for structured data (tasks, users, permissions) and a document-oriented database (e.g. MongoDB) for unstructured/semi-structured data (comments, context snapshots, metadata). This will allow:
Storage of flexible, evolving data structures without frequent schema migrations (ideal for context snapshots, metadata, collaboration info).
Strong ACID guarantees and structured relational integrity for core entities (tasks, users, permissions).
Scalability and flexibility where needed (unstructured data) while maintaining consistency and reliability for structured data.
In addition, the full architecture design foresees modules such as: context-tracking module, GitHub integration module (to link repository activity to tasks), automation engine (to react to events and update task states or generate reminders), collaboration module etc.

<img width="1470" height="956" alt="Screenshot 2025-11-26 at 21 44 15" src="https://github.com/user-attachments/assets/8d93e782-5b95-488a-8a56-8bf81b7c5c9e" />

