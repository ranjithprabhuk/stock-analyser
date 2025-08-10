import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import USPortfolio from './pages/USPortfolio';
import IndianPortfolio from './pages/IndianPortfolio';
import Screener from './pages/Screener';
import About from './pages/About';

// GitHub Pages support for SPA routing
const basename = import.meta.env.DEV ? '' : '/stock-analyser';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h4: {
      fontWeight: 600,
      marginBottom: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={basename}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/us-portfolio" element={<USPortfolio />} />
            <Route path="/indian-portfolio" element={<IndianPortfolio />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
