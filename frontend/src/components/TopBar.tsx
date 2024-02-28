import React, { useState, useEffect } from 'react'
import { Logo, SidebarContainer } from './styles'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import { DisplayFlex } from '../styles'

interface TopBarProps {
    theme?: string
    setTheme?: (theme: boolean) => void
}

const TopBar = (props: TopBarProps) => {
    const pages = ['Alunos', 'Cursos']

    const [user, setUser] = useState(null)

    useEffect(() => {
        const userStorage = localStorage.getItem('user')
        if (userStorage) {
            setUser(JSON.parse(userStorage).name.toUpperCase())
        }
    }, [])

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    )

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLogout = (setting: string) => {
        if (setting === 'Logout') {
            localStorage.removeItem('user')
            window.location.href = '/'
        }
    }

    return (
        <DisplayFlex card={true} justifyContent="center">
            {pages.map((page) => (
                <Button
                    key={page}
                    href={`/${page}`}
                    sx={{
                        my: 2,
                        color: 'black',
                        display: 'block',
                    }}
                >
                    <strong>{page}</strong>
                </Button>
            ))}
        </DisplayFlex>
    )
}

export default TopBar
