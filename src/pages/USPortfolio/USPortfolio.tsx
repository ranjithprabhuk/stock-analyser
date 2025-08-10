import { useState } from 'react';
import { Box, Typography, Button, Stack, CircularProgress, Alert } from '@mui/material';
import samplePortfolioData from '../../test-data/sample-portfolio.json';
import { FileUpload } from '../../components/FileUpload';
import { PortfolioTable } from '../../components/PortfolioTable';
import { fetchHoldingsFromIndMoney } from '../../services/indmoney';
import type { StockHolding } from '../../types/portfolio';

// Import the sample data with type assertion
interface SamplePortfolioData {
  data: StockHolding[];
}

const samplePortfolio = (samplePortfolioData as unknown as SamplePortfolioData).data;

const USPortfolio = () => {
  const [portfolioData, setPortfolioData] = useState<StockHolding[]>(samplePortfolio);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const content = await file.text();
      const parsedData = JSON.parse(content);
      if (Array.isArray(parsedData.data)) {
        setPortfolioData(parsedData.data);
      } else if (Array.isArray(parsedData)) {
        setPortfolioData(parsedData);
      } else {
        throw new Error('Invalid file format. Please upload a valid portfolio JSON file.');
      }
    } catch (error) {
      console.error('Error parsing file:', error);
      setError(
        error instanceof Error 
          ? error.message 
          : 'Failed to parse the uploaded file. Please ensure it is a valid JSON file.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFetchFromIndMoney = async () => {
    setApiLoading(true);
    setError(null);
    try {
      const holdings = await fetchHoldingsFromIndMoney();
      if (holdings && holdings.length > 0) {
        setPortfolioData(holdings);
      } else {
        throw new Error('No holdings found in your IndMoney account.');
      }
    } catch (err) {
      console.error('Error fetching from IndMoney:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to fetch data from IndMoney. Please check your connection and try again.'
      );
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          US Stock Portfolio Analyzer
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Upload your US stock portfolio in JSON format or connect to your IndMoney account to analyze your holdings.
        </Typography>
      </Box>

      <Box mb={4}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" gap={2}>
          <FileUpload onFileSelect={handleFileUpload} disabled={apiLoading} />
          <Typography variant="body1" color="text.secondary">
            or
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => setPortfolioData(samplePortfolio)}
            disabled={loading || apiLoading}
          >
            Load Sample Portfolio
          </Button>
          <Typography variant="body1" color="text.secondary">
            or
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleFetchFromIndMoney}
            disabled={loading || apiLoading}
            startIcon={apiLoading ? <CircularProgress size={20} /> : null}
          >
            {apiLoading ? 'Fetching...' : 'Fetch from IndMoney'}
          </Button>
        </Stack>
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Box>

      <PortfolioTable 
        data={portfolioData} 
        loading={loading} 
      />
    </Box>
  );
};

export default USPortfolio;
