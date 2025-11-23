# task-management-system-prototype
This prototype system uses HTML, CSS, and JavaScript on the frontend and Spring Boot with JPA/Hibernate on the backend. It provides full CRUD task management: users can create, view, update, and delete tasks via REST API calls, with data persisted through a simple JPA-configured relational database.
Tools Used in the Implemented Version

Frontend (Implemented Prototype)
1. HTML
Used to structure the web interface, providing the core layout for pages such as the task dashboard, task creation forms, and task listings.
2. CSS
Responsible for the visual styling of the prototype. It provides a simple, clean, minimalistic interface that aligns with developer preferences.
3. JavaScript
Enables dynamic behaviour on the frontend, including:
Fetching data from the backend through REST API calls
Updating the task list without reloading the page
Handling user actions like creating or deleting tasks
Backend (Implemented Prototype)
1. Java (Spring Boot)
The main backend framework used to build the running prototype. It provides:
RESTful API endpoints
Business logic for managing tasks
Controllers, Services, and Entity mappings
2. JPA / Hibernate
Used to map Java objects (Task entity) to the database and handle data persistence.
3. Database (JPA-Configured Storage)
The prototype uses a relational database setup (via JPA).
Even though future versions will use PostgreSQL + MongoDB, the prototype uses a simpler database configuration suitable for demonstrating CRUD operations.

Current Functionality
The prototype task management system enables task creation, viewing, updating, and deletion with backend persistence. It supports CRUD operations via REST API endpoints, integrates frontend fetch calls, and uses JPA/Hibernate for lightweight yet functional data storage and retrieval.
