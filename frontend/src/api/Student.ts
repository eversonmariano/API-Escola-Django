import axios from 'axios'
import { Student } from '../interfaces/Student'

export const getStudents = async () => {
    const response = await axios.get('http://localhost:8000/students/')
    return response.data as Student[]
}

export const deleteStudent = async (id: string) => {
    await axios.delete(`http://localhost:8000/students/${id}`)
}

export const createStudent = async (Student: Student) => {
    await axios.post('http://localhost:8000/students/', Student)
}

export const updateStudent = async (Student: Student) => {
    await axios.put(`http://localhost:8000/students/${Student.id}/`, Student)
}
