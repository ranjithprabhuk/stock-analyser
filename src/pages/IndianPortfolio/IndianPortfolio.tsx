import { Box, Typography, Paper, Container } from '@mui/material';

const IndianPortfolio = () => {
  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Indian Stock Portfolio
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Coming soon! This section will allow you to analyze your Indian stock portfolio.
        </Typography>
      </Box>

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Under Development
          </Typography>
          <Typography paragraph>
            We're working hard to bring you a comprehensive Indian stock portfolio analyzer.
            This feature will be available soon!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default IndianPortfolio;
