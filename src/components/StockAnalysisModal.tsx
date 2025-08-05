import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import CloseIcon from '@mui/icons-material/Close';
import type { StockHolding } from '../types/portfolio';

interface StockAnalysisModalProps {
  open: boolean;
  onClose: () => void;
  stock: StockHolding | null;
}

export const StockAnalysisModal = ({ open, onClose, stock }: StockAnalysisModalProps) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!stock || !open) return;

      setLoading(true);
      setError(null);

      try {
        // In a real app, you would use the analysis prompt with the Gemini API
        // For now, we'll just simulate a response
        console.log(`Analyzing stock: ${stock.ticker} (${stock.name})`);

        // In a real app, you would call your backend API here
        // const response = await axios.post('/api/analyze', { prompt });
        // setAnalysis(response.data.analysis);

        // For demo purposes, we'll simulate a response
        setTimeout(() => {
          setAnalysis(`# Analysis for ${stock.ticker} (${stock.name})

## Company Overview
[Simulated response - In a real app, this would be a detailed analysis from the Gemini API]

## Financial Health
[Simulated financial data]

## Valuation
[Simulated valuation metrics]

## Growth Prospects
[Simulated growth analysis]

## Risks & Challenges
[Simulated risk assessment]

## Competitive Advantage
[Simulated competitive analysis]

## Management & Governance
[Simulated management assessment]

## ESG Factors
[Simulated ESG analysis]

## Conclusion
**Recommendation**: Hold
[Simulated conclusion with justification]`);
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error('Error fetching analysis:', err);
        setError('Failed to fetch analysis. Please try again later.');
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [stock, open]);

  const handleClose = () => {
    setAnalysis('');
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>Analysis for {stock?.ticker}</span>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box sx={{ '& > *': { mb: 2 } }}>
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
