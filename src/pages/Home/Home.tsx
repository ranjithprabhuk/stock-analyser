import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography component="h1" variant="h3" align="center" gutterBottom>
            Welcome to Stock Analyzer
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Your one-stop solution for portfolio management and stock analysis
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button component={RouterLink} to="/us-portfolio" variant="contained" color="secondary" size="large">
              US Portfolio
            </Button>
            <Button
              component={RouterLink}
              to="/indian-portfolio"
              variant="outlined"
              color="inherit"
              size="large"
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Indian Portfolio
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          <Box>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                US Portfolio Analysis
              </Typography>
              <Typography paragraph>
                Upload and analyze your US stock portfolio with detailed insights and performance metrics.
              </Typography>
              <Button component={RouterLink} to="/us-portfolio" variant="outlined" color="primary">
                Get Started
              </Button>
            </Paper>
          </Box>
          <Box>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Indian Portfolio
              </Typography>
              <Typography paragraph>
                Manage and analyze your Indian stock portfolio with comprehensive tools and analysis.
              </Typography>
              <Button component={RouterLink} to="/indian-portfolio" variant="outlined" color="primary">
                Explore
              </Button>
            </Paper>
          </Box>
          <Box>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Stock Screener
              </Typography>
              <Typography paragraph>
                Discover potential investment opportunities with our powerful stock screening tools.
              </Typography>
              <Button component={RouterLink} to="/screener" variant="outlined" color="primary">
                Start Screening
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
