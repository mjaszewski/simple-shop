import { FC } from 'react'
import NavigationBar from '../NavigationBar'
import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

const Layout: FC = () => {
  return (
    <>
      <CssBaseline />
      <NavigationBar />
      <Container maxWidth="lg">
        <Box sx={{ my: '7rem' }}>
          <Outlet />
        </Box>
      </Container>
    </>
  )
}

export default Layout
