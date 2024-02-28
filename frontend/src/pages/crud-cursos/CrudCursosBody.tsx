import React, { useEffect, useState } from 'react'
import { DisplayFlex, Text } from '../../styles'
import {
    Button,
    ButtonGroup,
    FormControl,
    FormHelperText,
    Modal,
    TextField,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
    createCurso,
    deleteCurso,
    getCourse,
    updateCurso,
} from '../../api/Course'
import { Course } from '../../interfaces/Course'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 320 },
    { field: 'name', headerName: 'Nome', width: 400 },
    { field: 'hours', headerName: 'Horas', width: 220 },
]

const CrudCourseBody = () => {
    const [rows, setRows] = useState<any[]>([])

    const [selected, setSelected] = useState<Course>({
        name: '',
        hours: 0,
    } as Course)

    const [selectionModel, setSelectionModel] = useState<any[]>([])
    const [open, setOpen] = useState(false)

    const [nameError, setNameError] = useState(false)
    const [hoursError, setHoursError] = useState(false)

    useEffect(() => {
        updatedRows()
    }, [])

    const updatedRows = () => {
        getCourse().then((data: any) => {
            setRows(data)
        })
    }

    const deleteSelected = () => {
        const bucket = rows.filter((row) => selectionModel.includes(row.id))

        Promise.all(bucket.map((row) => deleteCurso(row.id))).then(() => {
            updatedRows()
        })
    }

    const updateSelected = () => {
        const bucket = rows.filter((row) => selectionModel.includes(row.id))
        console.log(selected)

        setSelected(bucket[0])
        setOpen(true)
    }

    const hoursHandler = (e: any) => {
        if (!selected.hours) setSelected({ ...selected, hours: 0 })

        if (e.target.value === '') {
            setSelected({
                ...selected,
                hours: 0,
            })
        } else if (
            !isNaN(e.target.value) &&
            Number.isInteger(Number(e.target.value))
        ) {
            setSelected({
                ...selected,
                hours: Number.parseInt(e.target.value),
            })
        }
    }

    const updateNewCurso = () => {
        if (validate()) {
            if (selected.id) {
                updateCurso(selected)
                    .then(() => {
                        updatedRows()
                        setOpen(false)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            } else {
                createCurso(selected)
                    .then(() => {
                        updatedRows()
                        setOpen(false)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        }
    }

    const validate = (): boolean => {
        let valid = true
        if (selected.name === undefined || selected.name === '') {
            setNameError(true)
            valid = false
        } else {
            setNameError(false)
        }

        if (selected.hours === undefined || selected.hours === 0) {
            setHoursError(true)
            valid = false
        } else {
            setHoursError(false)
        }
        return valid
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
                                setSelected({} as Course)
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
                onClose={(e) => setOpen(false)}
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
                        {selected?.id ? 'Editar' : 'Adicionar'} Curso
                    </Text>
                    {selected?.id ? (
                        <TextField
                            id="id"
                            label="Id"
                            variant="outlined"
                            disabled={true}
                            value={selected?.id}
                        />
                    ) : (
                        <></>
                    )}
                    <FormControl>
                        <TextField
                            id="name"
                            label="Nome"
                            variant="outlined"
                            value={selected?.name}
                            onChange={(e) => {
                                setSelected({
                                    ...selected,
                                    name: e.target.value,
                                } as Course)
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
                            id="horas"
                            label="Horas"
                            variant="outlined"
                            value={selected?.hours}
                            onChange={(e) => hoursHandler(e)}
                        />
                        {hoursError ? (
                            <FormHelperText style={{ color: 'red' }}>
                                Favor preencher uma carga horária válida!
                            </FormHelperText>
                        ) : (
                            <></>
                        )}
                    </FormControl>
                    <Button
                        variant="contained"
                        onClick={updateNewCurso}
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

export default CrudCourseBody
