import { Box, Typography, Paper, Container } from '@mui/material';

const Screener = () => {
  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Stock Screener
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Coming soon! This section will provide powerful stock screening capabilities.
        </Typography>
      </Box>

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Under Development
          </Typography>
          <Typography paragraph>
            We're building a powerful stock screener to help you find the best investment opportunities.
            Stay tuned for updates!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Screener;
