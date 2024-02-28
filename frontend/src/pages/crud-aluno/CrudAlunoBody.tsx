import React, { useEffect, useState } from 'react'
import { DisplayFlex, Text } from '../../styles'
import InputLabel from '@mui/material/InputLabel'
import {
    Button,
    ButtonGroup,
    FormControl,
    FormHelperText,
    MenuItem,
    Modal,
    Select,
    TextField,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
    createStudent,
    deleteStudent,
    getStudents,
    updateStudent,
} from '../../api/Student'
import { Student } from '../../interfaces/Student'
import { Course } from '../../interfaces/Course'
import { getCourse } from '../../api/Course'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 320 },
    { field: 'name', headerName: 'Name', width: 400 },
    { field: 'age', headerName: 'Idade', width: 70 },
    { field: 'courseName', headerName: 'Curso', width: 220 },
    { field: 'registrationDate', headerName: 'Data de registro', width: 140 },
]

const CrudStudentBody = () => {
    const [rows, setRows] = useState<any[]>([])

    const [selected, setSelected] = useState<Student>({} as Student)

    const [course, setCourse] = useState<Course>({} as Course)
    const [courses, setCourses] = useState<Course[]>([])

    const [selectionModel, setSelectionModel] = useState<any[]>([])
    const [open, setOpen] = useState(false)

    const [nameError, setNameError] = useState(false)
    const [ageError, setAgeError] = useState(false)
    const [courseError, setCourseError] = useState(false)

    useEffect(() => {
        updatedRows()
        getCourse().then((data) => {
            setCourses(data)
        })
    }, [])

    const updatedRows = () => {
        getStudents().then((data) => {
            setRows(data)
        })
    }

    const deleteSelected = () => {
        const bucket = rows.filter((row) => selectionModel.includes(row.id))

        Promise.all(bucket.map((row) => deleteStudent(row.id))).then(() => {
            updatedRows()
        })
    }

    const updateSelected = () => {
        const bucket = rows.filter((row) => selectionModel.includes(row.id))

        setSelected(bucket[0])
        setOpen(true)
    }

    const validate = (update: boolean) => {
        let valid = true
        if (selected.name === undefined || selected.name === '') {
            setNameError(true)
            valid = false
        } else {
            setNameError(false)
        }
        if (
            selected.age === undefined ||
            selected.age <= 0 ||
            selected.age > 150
        ) {
            setAgeError(true)
            valid = false
        } else {
            setAgeError(false)
        }
        if (!update) {
            if (selected.course === undefined || selected.course === '') {
                setCourseError(true)
                valid = false
            } else {
                setCourseError(false)
            }
        }

        return valid
    }

    const updateNewStudent = () => {
        if (selected.id) {
            if (!validate(true)) return
            updateStudent(selected)
                .then(() => {
                    updatedRows()
                    setOpen(false)
                })
                .catch((e) => {
                    console.log(e)
                })
        } else {
            if (!validate(false)) return
            createStudent(selected)
                .then(() => {
                    updatedRows()
                    setOpen(false)
                    clearSelected()
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }

    const courseHandler = (id: string) => {
        const course = courses.filter((course) => course.id === id)
        setSelected({
            ...selected,
            course: id,
        } as Student)
        setCourse(course[0])
    }

    const clearSelected = () => {
        setSelected({} as Student)
        setCourse({} as Course)
    }

    const ageHandler = (e: any) => {
        if (!selected.age) setSelected({ ...selected, age: 0 })

        if (e.target.value === '') {
            setSelected({
                ...selected,
                age: 0,
            })
        } else if (
            !isNaN(e.target.value) &&
            Number.isInteger(Number(e.target.value))
        ) {
            setSelected({
                ...selected,
                age: Number.parseInt(e.target.value),
            })
        }
    }

    const clearValidation = () => {
        setNameError(false)
        setAgeError(false)
        setCourseError(false)
    }

    return (
        <>
            <DisplayFlex
                direction="column"
                width="100%"
                height="90vh"
                overflow="auto"
                style={{ alignItems: 'center' }}
            >
                <DisplayFlex direction="column" width="80%" marginTop="30px">
                    <DisplayFlex
                        direction="row"
                        width="100%"
                        justifyContent="end"
                        marginBottom="10px"
                    >
                        <ButtonGroup variant="contained">
                            <Button
                                color="warning"
                                disabled={!(selectionModel.length === 1)}
                                onClick={updateSelected}
                            >
                                Edit
                            </Button>
                            <Button
                                color="error"
                                onClick={deleteSelected}
                                disabled={!(selectionModel.length >= 1)}
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </DisplayFlex>
                    <DataGrid
                        className="data-grid"
                        showCellVerticalBorder={true}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        checkboxSelection
                        onRowSelectionModelChange={(e) => setSelectionModel(e)}
                        rowSelectionModel={selectionModel}
                        style={{
                            fontWeight: 'bold',
                            minHeight: '150px',
                        }}
                    />
                    <DisplayFlex justifyContent="center">
                        <Button
                            variant="contained"
                            style={{
                                width: '400px',
                                height: '60px',
                                fontWeight: 'bold',
                                marginTop: '20px',
                            }}
                            onClick={() => {
                                setSelected({} as Student)
                                setSelectionModel([])
                                setOpen(true)
                            }}
                        >
                            Adicionar
                        </Button>
                    </DisplayFlex>
                </DisplayFlex>
            </DisplayFlex>
            <Modal
                open={open}
                onClose={(e) => {
                    setOpen(false)
                    clearValidation()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <DisplayFlex
                    direction="column"
                    justifyContent="space-evenly"
                    width="600px"
                    height="500px"
                    style={{ alignSelf: 'center', padding: '20px' }}
                    card={true}
                >
                    <Text
                        fontSize="1.5em"
                        marginBottom="10px"
                        style={{ alignSelf: 'center' }}
                    >
                        {selected?.id ? 'Editar' : 'Adicionar'} Aluno
                    </Text>
                    {selected?.id ? (
                        <FormControl>
                            <TextField
                                id="id"
                                label="Id"
                                variant="outlined"
                                disabled={true}
                                value={selected?.id}
                            />
                        </FormControl>
                    ) : (
                        <></>
                    )}
                    <FormControl>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={selected?.name}
                            onChange={(e) => {
                                setSelected({
                                    ...selected,
                                    name: e.target.value,
                                } as Student)
                            }}
                        />
                        {nameError ? (
                            <FormHelperText style={{ color: 'red' }}>
                                Favor preencher com um nome válido!
                            </FormHelperText>
                        ) : (
                            <></>
                        )}
                    </FormControl>
                    <FormControl>
                        <TextField
                            id="outlined-basic"
                            label="age"
                            variant="outlined"
                            value={selected?.age}
                            onChange={(e) => {
                                ageHandler(e)
                            }}
                        />
                        {ageError ? (
                            <FormHelperText style={{ color: 'red' }}>
                                Favor preencher com uma idade válida!
                            </FormHelperText>
                        ) : (
                            <></>
                        )}
                    </FormControl>
                    {!selected?.id ? (
                        <FormControl>
                            <InputLabel id="demo-simple-select-helper-label">
                                Course
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={course.name}
                                label="Course"
                                onChange={(e) => {
                                    courseHandler(e.target.value)
                                }}
                            >
                                {courses.map((course) => (
                                    <MenuItem value={course.id}>
                                        {course.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {courseError ? (
                                <FormHelperText style={{ color: 'red' }}>
                                    Favor selecionar um curso!
                                </FormHelperText>
                            ) : (
                                <></>
                            )}
                        </FormControl>
                    ) : (
                        <></>
                    )}
                    <Button
                        variant="contained"
                        onClick={updateNewStudent}
                        style={{
                            height: '50px',
                            width: '60%',
                            alignSelf: 'center',
                        }}
                    >
                        Adicionar
                    </Button>
                </DisplayFlex>
            </Modal>
        </>
    )
}

export default CrudStudentBody
