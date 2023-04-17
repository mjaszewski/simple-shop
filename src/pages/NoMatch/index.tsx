import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const NoMatch: FC = () => (
  <Box sx={{ p: 2, textAlign: 'center' }}>
    <Typography variant="h3">404</Typography>
  </Box>
)

export default NoMatch
