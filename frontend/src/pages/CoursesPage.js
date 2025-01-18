import React from 'react'
import {useNavigate} from 'react-router-dom'
import CourseList from './CourseList'

const CoursesPage = () => {
  const navigate = useNavigate()

  // Navigate to the course creation page
  const handleAddCourse = () => {
    navigate('/courses/new')
  }

  return (
    <div className='courses-page-container'>
      <header className='courses-page-header'>
        <h1>Manage Courses</h1>
        <button onClick={handleAddCourse} className='add-course-button'>
          Add New Course
        </button>
      </header>
      <main>
        <CourseList />
      </main>
    </div>
  )
}

export default CoursesPage
