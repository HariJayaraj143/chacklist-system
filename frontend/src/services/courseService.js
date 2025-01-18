import axios from "axios";

// Base URL for course-related API requests
const API_URL = "/api/courses/";

// Create a new course
const createCourse = async (courseData) => {
  try {
    const response = await axios.post(API_URL, courseData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data; // Return the created course data
  } catch (error) {
    throw error.response?.data?.message || "Failed to create course. Please try again.";
  }
};

// Get all courses
const getAllCourses = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data; // Return the list of courses
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch courses. Please try again.";
  }
};

// Get a single course by ID
const getCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}${courseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data; // Return the course data
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch course. Please try again.";
  }
};

// Update a course by ID
const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axios.put(`${API_URL}${courseId}`, courseData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data; // Return the updated course data
  } catch (error) {
    throw error.response?.data?.message || "Failed to update course. Please try again.";
  }
};

// Delete a course by ID
const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${API_URL}${courseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data; // Return the confirmation of course deletion
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete course. Please try again.";
  }
};

const courseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};

export default courseService;
