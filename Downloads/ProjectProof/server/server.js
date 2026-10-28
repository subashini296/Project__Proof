const dns = require("dns");

// Fix DNS resolution before loading Mongoose
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Project = require("./Project");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "ProjectProof backend is running!",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected",
  });
});

// Get all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Fetch projects error:", error.message);
    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
});

// Add a project
app.post("/api/projects", async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      status,
      github,
      demo,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const project = await Project.create({
      title: title.trim(),
      description,
      technologies: Array.isArray(technologies) ? technologies : [],
      status: status || "In Progress",
      github: github || "",
      demo: demo || "",
    });

    res.status(201).json({
      message: "Project added successfully",
      project,
    });
  } catch (error) {
    console.error("Add project error:", error.message);
    res.status(500).json({
      message: "Failed to add project",
    });
  }
});

// Delete a project
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error.message);
    res.status(500).json({
      message: "Failed to delete project",
    });
  }
});

// Start server and connect MongoDB
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing in server/.env file");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("✅ MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`✅ ProjectProof server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup error:", error.message);
    process.exit(1);
  }
}

startServer();