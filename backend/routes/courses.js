const express = require("express");
const Course = require("../models/course");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Create a new course
 * Route: POST /api/courses
 * Access: Protected
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, instructor } = req.body;

    // Validate input
    if (!name || !description || !instructor) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const course = new Course({ name, description, instructor });
    await course.save();

    res.status(201).json({ message: "Course created successfully.", course });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

/**
 * Get all courses
 * Route: GET /api/courses
 * Access: Public
 */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

/**
 * Get a single course by ID
 * Route: GET /api/courses/:id
 * Access: Public
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

/**
 * Update a course by ID
 * Route: PUT /api/courses/:id
 * Access: Protected
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, instructor } = req.body;

    // Validate input
    if (!name || !description || !instructor) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const course = await Course.findByIdAndUpdate(
      id,
      { name, description, instructor },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({ message: "Course updated successfully.", course });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

/**
 * Delete a course by ID
 * Route: DELETE /api/courses/:id
 * Access: Protected
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
