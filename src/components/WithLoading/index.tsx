import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SerializedError } from '@reduxjs/toolkit'

type WithLoadingProps = {
  children: ReactNode
  isLoading: boolean
  error?: FetchBaseQueryError | SerializedError
}

const WithLoading = ({
  children,
  isLoading,
  error,
}: WithLoadingProps): JSX.Element => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
        Loading...
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">Error!</Alert>
  }

  return <>{children}</>
}

export default WithLoading
