# ⚡ Collaborative IDE

> **A real-time code editor built to understand distributed systems.**
>
> *React + Vite | Node.js | WebSockets | CRDTs (Yjs) | Docker*

![Status](https://img.shields.io/badge/Status:%20_Phase_3,_The_Execution_Engine-gray)
![TypeScript](https://img.shields.io/badge/TypeScript-gray)

---

## 📖 About the Project

I built this project because I wanted to understand how tools like Google Docs or VS Code Live Share actually work under the hood.

The goal was to build a collaborative environment where multiple users can edit the same file simultaneously without overwriting each other's changes. To achieve this, I implemented **CRDTs (Conflict-free Replicated Data Types)** using Yjs.

**Current Focus:**
I am currently working on **The Execution Engine**. I'm building a decoupled service that can take the user's code, run it securel, inside Docker containers, and stream the output back to the browser.

---

## 🏗️ Architecture

I designed the system as a Monorepo with three main parts:

1.  **The Client:** A React app using **Monaco Editor** (the same editor used in VS Code) to provide a familiar coding experience.
2.  **The Orchestrator:** A Node.js server that manages WebSocket connections, user authentication, and room logic.
3.  **The Execution Engine:** A background service responsible for running untrusted code safely (Work In Progress).

---

## 🚀 How to run it:

If you want to run this locally to test the project:

### Requirements
* Node.js (v18+)
* npm (v9+)

### Steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/alexbindiu/collaborative-ide.git](https://github.com/alexbindiu/collaborative-ide.git)
    cd collaborative-ide
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Stack:**
    You need two terminals (one for frontend, one for backend).

    *Terminal 1 (Server):*
    ```bash
    npm run dev:server
    ```

    *Terminal 2 )Client):*
    ```bash
    npm run dev:client
    ```

    Visit `http://localhost:5173`.
