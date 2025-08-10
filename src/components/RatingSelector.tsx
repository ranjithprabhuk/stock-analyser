import { useCallback } from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';

const Rating = {
  STRONG_BUY: 'Strong Buy',
  BUY: 'Buy',
  HOLD: 'Hold',
  SELL: 'Sell',
  STRONG_SELL: 'Strong Sell',
} as const;

type RatingValue = (typeof Rating)[keyof typeof Rating];

interface RatingSelectorProps {
  ticker: string;
  ratingType: string;
  currentValue: RatingValue | '';
  onRatingChange: (ticker: string, ratingType: string, value: RatingValue) => void;
}

const RatingSelectorComponent = ({ ticker, ratingType, currentValue, onRatingChange }: RatingSelectorProps) => {
  const handleChange = useCallback(
    (event: any) => {
      const value = event.target.value as RatingValue;
      onRatingChange(ticker, ratingType, value);
    },
    [ticker, ratingType, onRatingChange]
  );

  // Get background color based on rating value
  const getBackgroundColor = (rating: RatingValue | '') => {
    switch (rating) {
      case Rating.STRONG_BUY:
        return '#d4edda'; // Darker light green for Strong Buy
      case Rating.BUY:
        return '#e8f5e8'; // Light green for Buy
      case Rating.HOLD:
        return '#fff3cd'; // Light yellow for Hold
      case Rating.SELL:
        return '#f8d7da'; // Light red for Sell
      case Rating.STRONG_SELL:
        return '#f5c6cb'; // Darker light red for Strong Sell
      default:
        return 'transparent'; // No background for "Not Set"
    }
  };

  // Get border color based on rating value
  const getBorderColor = (rating: RatingValue | '') => {
    switch (rating) {
      case Rating.STRONG_BUY:
        return '#155724'; // Dark green for Strong Buy
      case Rating.BUY:
        return '#28a745'; // Green for Buy
      case Rating.HOLD:
        return '#ffc107'; // Yellow for Hold
      case Rating.SELL:
        return '#dc3545'; // Red for Sell
      case Rating.STRONG_SELL:
        return '#721c24'; // Dark red for Strong Sell
      default:
        return '#e0e0e0'; // Default border
    }
  };

  // Get text color based on rating value
  const getTextColor = (rating: RatingValue | '') => {
    switch (rating) {
      case Rating.STRONG_BUY:
        return '#155724'; // Dark green text for Strong Buy
      case Rating.BUY:
        return '#1e7e34'; // Medium green text for Buy
      case Rating.HOLD:
        return '#856404'; // Dark yellow/amber text for Hold
      case Rating.SELL:
        return '#721c24'; // Dark red text for Sell
      case Rating.STRONG_SELL:
        return '#4a1215'; // Very dark red text for Strong Sell
      default:
        return 'inherit'; // Default text color
    }
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={currentValue}
        onChange={handleChange}
        displayEmpty
        sx={{
          fontSize: '0.875rem',
          backgroundColor: getBackgroundColor(currentValue),
          color: getTextColor(currentValue),
          fontWeight: currentValue ? 'bold' : 'normal',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: getBorderColor(currentValue),
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: getBorderColor(currentValue),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: getBorderColor(currentValue),
            borderWidth: '2px',
          },
        }}
      >
        <MenuItem value="">
          <em>Not Set</em>
        </MenuItem>
        {Object.values(Rating).map((rating) => (
          <MenuItem
            key={rating}
            value={rating}
            sx={{
              backgroundColor: getBackgroundColor(rating),
              color: getTextColor(rating),
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: getBackgroundColor(rating),
                opacity: 0.8,
              },
            }}
          >
            {rating}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// Export without memoization to ensure re-renders
export const RatingSelector = RatingSelectorComponent;

// Add displayName to the component function
RatingSelectorComponent.displayName = 'RatingSelector';
