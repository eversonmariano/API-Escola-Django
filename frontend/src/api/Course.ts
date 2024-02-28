import axios from 'axios'
import { Course } from '../interfaces/Course'

export const getCourse = async () => {
    const response = await axios.get('http://localhost:8000/courses/')
    return response.data as Course[]
}

export const deleteCurso = async (id: string) => {
    await axios.delete(`http://localhost:8000/courses/${id}`)
}

export const createCurso = async (Course: Course) => {
    await axios.post('http://localhost:8000/courses/', Course)
}

export const updateCurso = async (Course: Course) => {
    await axios.put(`http://localhost:8000/courses/${Course.id}/`, Course)
}
