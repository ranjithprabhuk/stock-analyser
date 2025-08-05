import axios, { AxiosError } from 'axios';
import type { StockHolding } from '../types/portfolio';

export const fetchHoldingsFromIndMoney = async (): Promise<StockHolding[]> => {
  try {
    const response = await axios.get('/api/holdings');
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error('Invalid response format from server');
    }
    return response.data.data;
  } catch (error) {
    console.error('Error fetching holdings from IndMoney:', error);
    
    // Handle different error types
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: string }>;
      const errorMessage = (axiosError.response?.data as any)?.error || 
                         axiosError.message || 
                         'Failed to fetch holdings from IndMoney';
      throw new Error(typeof errorMessage === 'string' ? errorMessage : 'Failed to fetch holdings');
    } else if (error instanceof Error) {
      throw error; // Re-throw standard Error objects as-is
    } else {
      throw new Error('An unknown error occurred while fetching holdings');
    }
  }
};
