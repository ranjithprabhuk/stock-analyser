import { Box, Typography, Container, Paper, Link } from '@mui/material';

const About = () => {
  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Stock Analyzer
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          A comprehensive tool for analyzing and managing your investment portfolios.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4, flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography paragraph>
              At Stock Analyzer, our mission is to provide investors with powerful yet easy-to-use tools
              for analyzing and managing their stock portfolios. We believe that everyone should have
              access to the information they need to make informed investment decisions.
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 4, flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              Features
            </Typography>
            <ul>
              <li><Typography>US Stock Portfolio Analysis</Typography></li>
              <li><Typography>Indian Stock Portfolio (Coming Soon)</Typography></li>
              <li><Typography>Stock Screener (Coming Soon)</Typography></li>
              <li><Typography>Interactive Data Visualization</Typography></li>
              <li><Typography>AI-Powered Stock Analysis</Typography></li>
            </ul>
          </Paper>
        </Box>

        <Box mt={4}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Contact Us
            </Typography>
            <Typography paragraph>
              Have questions or feedback? We'd love to hear from you!
            </Typography>
            <Typography>
              Email: <Link href="mailto:support@stockanalyzer.com">support@stockanalyzer.com</Link>
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
