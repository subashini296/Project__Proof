# ProjectProof – Full-Stack Project Management Platform

ProjectProof is a full-stack web application designed to help users manage their projects, organize technical skills, and showcase their work through a simple dashboard.

## Features

- **Project Management:** Add, view, and delete projects.
- **Project Details:** Store project descriptions, technologies, status, GitHub links, and demo links.
- **Dashboard:** View and organize project information.
- **Database Integration:** Store project records using MongoDB Atlas.
- **REST API:** Manage project data through backend API endpoints.

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- REST API

**Database**
- MongoDB Atlas
- Mongoose

## Project Structure

```text
ProjectProof/
├── client/          # React frontend
├── server/
│   ├── server.js    # Express server and API routes
│   ├── project.js   # Project database model
│   └── .env         # Environment variables (not committed)
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/subashini296/Project__Proof.git
cd Project__Proof
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Replace the placeholder with your MongoDB Atlas connection string. Never publish your database password or `.env` file.

Start the backend:

```bash
node server.js
```

The backend runs at `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check backend and database status |
| GET | `/api/projects` | Retrieve all projects |
| POST | `/api/projects` | Add a project |
| DELETE | `/api/projects/:id` | Delete a project by ID |

## Future Improvements

- User authentication and authorization
- Connect the dashboard to the backend APIs
- Project verification workflow
- Deploy the frontend and backend online

## Author

**Subashini S**

GitHub: [subashini296](https://github.com/subashini296)

---

*ProjectProof is an ongoing project. Features and integrations may evolve during development.*
