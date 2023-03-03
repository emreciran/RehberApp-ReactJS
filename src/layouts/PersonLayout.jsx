import Container from '@mui/material/Container'
import React from 'react'
import { Outlet } from 'react-router-dom'

const PersonLayout = () => {
  return (
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  )
}

export default PersonLayout