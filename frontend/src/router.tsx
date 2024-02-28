import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    redirect,
    Navigate,
} from 'react-router-dom'
import Error404 from './pages/404/Error404'
import CrudAlunoBody from './pages/crud-aluno/CrudAlunoBody'
import CrudCursosBody from './pages/crud-cursos/CrudCursosBody'

export const RouterApp = (props: any) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/cursos" />} />
                <Route path="/alunos" element={<CrudAlunoBody />} />
                <Route path="/cursos" element={<CrudCursosBody />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
}
