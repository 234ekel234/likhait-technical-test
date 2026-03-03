# Project Notes and Approach

## Background
* I have prior experience as a full-stack **Ruby on Rails** developer and as a **React** developer, but I have not combined React + Rails in a single project before.
* This project exposed me to integrating a **Rails API-only** backend with a **React + TypeScript** frontend.

---

## Docker and Environment Challenges

### Infrastructure Issues
* **Docker Compose:** `docker compose up` was failing on my **MacBook Air M1** (macOS Tahoe 26.3).
* **Architecture Problems:** Some containers required specifying architecture in the Docker YAML file.

### Dependency Issues
* **mysql2 gem:** Failed to install due to missing libraries (`zstd`, `libssl-dev`, etc.).
* **Configuration:** `Dockerfile` and `docker-compose` needed additional dependencies for Rails and MySQL.
* **Connectivity:** Even after installing dependencies, connecting Rails to MySQL inside Docker failed.

> **Resolution:** I decided to set up the environment **manually** on my laptop to save time and continue development.

---

## Technical Specifications

### Frontend
* **React:** 18.3.1
* **TypeScript:** 5.9.3
* **Vite:** 5.4.21 (build tool & development server)
* **Library:** Custom component library **Vibes** for consistent UI

### Backend
* **Ruby:** 3.3.7
* **Rails:** 7.2 (API-only mode)
* **MySQL:** 8.0 (relational database)

### Development Environment
* **OS:** macOS Tahoe 26.3, MacBook Air M1
* **rbenv:** For Ruby version management
* **npm:** v25.2.1 (via Node.js 25)

---

## Development Approach

### 1. Understanding the Project Structure
* Studied the frontend and backend folders to identify relevant files for the tasks.
* Traced how data flows from the React frontend to the Rails backend API.

### 2. Coding and Debugging Workflow
* Focused on **bug fixes first**, then implemented features, and merged everything to `main`.
* After completing core features, I moved on to **bonus features** and **writing tests**.

### 3. Tools and Assistance
* Heavily used **AI tools** to understand unfamiliar code and generate coding solutions.
* Tested locally using the **Rails server** and **React dev server** after bypassing Docker issues.