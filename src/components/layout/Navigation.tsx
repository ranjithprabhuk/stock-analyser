import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Stock Analyzer
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: 'flex', ml: 3 }}>
            <Button
              component={RouterLink}
              to="/us-portfolio"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              US Portfolio
            </Button>
            <Button
              component={RouterLink}
              to="/indian-portfolio"
              sx={{ my: 2, color: 'white', display: 'block', ml: 2 }}
            >
              Indian Portfolio
            </Button>
            <Button
              component={RouterLink}
              to="/screener"
              sx={{ my: 2, color: 'white', display: 'block', ml: 2 }}
            >
              Screener
            </Button>
            <Button
              component={RouterLink}
              to="/about"
              sx={{ my: 2, color: 'white', display: 'block', ml: 2 }}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
