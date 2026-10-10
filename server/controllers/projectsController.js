import pool from "../config/db.js";

export async function getAllProjects(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM projects ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (err) {
    next(err); // hands off to errorHandler.js
  }
}

export async function getProjectById(req, res, next) {
  try {
    const { id } = req.params;

    const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(rows[0]); // send back just the single project object, not an array
  } catch (err) {
    next(err);
  }
}

export async function createProject(req, res, next) {
  try {
    const { title, description, image, github_url, live_url, featured } =
      req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO projects (title, description, image, github_url, live_url, featured) VALUES (?, ?, ?, ?, ?, ?)",
      [
        title,
        description,
        image || null,
        github_url || null,
        live_url || null,
        featured || false,
      ],
    );

    res.status(201).json({
      message: "Project created successfully",
      id: result.insertId, // MySQL tells us the new row's auto-generated id
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, image, github_url, live_url, featured } =
      req.body;

    const [result] = await pool.query(
      "UPDATE projects SET title = ?, description = ?, image = ?, github_url = ?, live_url = ?, featured = ? WHERE id = ?",
      [title, description, image, github_url, live_url, featured, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project updated successfully" });
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM projects WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    next(err);
  }
}

export function uploadProjectImage(req, res) {
  if (!req.file) {
    return res
      .status(400)
      .json({
        error: "No image received. Send the file in a field named 'image'.",
      });
  }

  res.status(201).json({
    message: "Image uploaded successfully",
    imagePath: `/uploads/${req.file.filename}`,
  });
}
