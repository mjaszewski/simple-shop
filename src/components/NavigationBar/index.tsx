import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import { useAppSelector } from '../../store/hooks'
import { selectNumberOfProducts } from '../../pages/Cart/cartSlice'

const pages = [{ label: 'Products', to: '/' }]

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: theme.palette.customBackground.secondary,
    padding: '0 4px',
  },
}))

const StyledLogo = styled('img')(() => ({
  position: 'relative',
  top: '9px',
}))

const NavigationBar: FC = () => {
  const navigate = useNavigate()
  const count = useAppSelector(selectNumberOfProducts)

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleClickNavMenu = (to: string) => {
    setAnchorElNav(null)
    navigate(to)
  }

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#131921' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link to={'/'}>
              <StyledLogo src="/amazon.png" alt="logo" />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.to}
                  onClick={() => handleClickNavMenu(page.to)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={'/'}>
              <StyledLogo src="/amazon.png" alt="mobile-logo" />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.to}
                onClick={() => handleClickNavMenu(page.to)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link to={'/cart'}>
              <IconButton sx={{ color: 'white' }}>
                <StyledBadge
                  badgeContent={count}
                  color="secondary"
                  data-testid="cart-badge"
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavigationBar
