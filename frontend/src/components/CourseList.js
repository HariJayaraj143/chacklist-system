import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import courseService from '../services/courseService'

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Fetch courses from the API
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token') // Get the token from localStorage
      const response = await axios.get('/api/courses', {
        headers: {Authorization: `Bearer ${token}`},
      })
      setCourses(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  // Navigate to the course details page
  const handleViewCourse = courseId => {
    navigate(`/courses/${courseId}`)
  }

  // Delete a course
  const handleDeleteCourse = async courseId => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/courses/${courseId}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      setCourses(courses.filter(course => course._id !== courseId))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete course.')
    }
  }

  if (loading) return <p>Loading courses...</p>
  if (error) return <p className='error-message'>{error}</p>

  return (
    <div className='course-list-container'>
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul className='course-list'>
          {courses.map(course => (
            <li key={course._id} className='course-item'>
              <div>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <p>
                  <strong>Instructor:</strong> {course.instructor}
                </p>
              </div>
              <div className='course-actions'>
                <button onClick={() => handleViewCourse(course._id)}>
                  View
                </button>
                <button onClick={() => handleDeleteCourse(course._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CourseList
