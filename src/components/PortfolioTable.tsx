import { useState, useEffect, useMemo, useCallback } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';
import type { ColumnDef, VisibilityState } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  IconButton,
  Box,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import type { StockHolding } from '../types/portfolio';
import { StockAnalysisModal } from './StockAnalysisModal';
import { NotesInput } from './NotesInput';
import { RatingSelector } from './RatingSelector';
import { PortfolioTableHeader } from './PortfolioTableHeader';
import { PortfolioTableRow } from './PortfolioTableRow';

const Rating = {
  STRONG_BUY: 'Strong Buy',
  BUY: 'Buy',
  HOLD: 'Hold',
  SELL: 'Sell',
  STRONG_SELL: 'Strong Sell',
} as const;

type RatingValue = (typeof Rating)[keyof typeof Rating];

interface StockRatings {
  [ticker: string]: {
    gemini_rating?: RatingValue;
    perplexity_rating?: RatingValue;
    alpha_spread_rating?: RatingValue;
    notes?: string;
  };
}

interface PortfolioTableProps {
  data: StockHolding[];
  loading: boolean;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercentage = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

// Helper function to load settings from localStorage
const loadSettingsFromStorage = () => {
  try {
    const savedSettings = localStorage.getItem('portfolioTableSettings');
    if (savedSettings) {
      const { visibility, order, sizing } = JSON.parse(savedSettings);
      return {
        visibility: visibility || {},
        order: order || [],
        sizing: sizing || {},
      };
    }
  } catch (error) {
    console.error('Error loading settings from localStorage:', error);
    localStorage.removeItem('portfolioTableSettings');
  }
  return {
    visibility: {},
    order: [],
    sizing: {},
  };
};

// Helper function to load ratings from localStorage
const loadRatingsFromStorage = (): StockRatings => {
  try {
    const savedRatings = localStorage.getItem('stockRatings');
    if (savedRatings) {
      const ratings = JSON.parse(savedRatings);
      return ratings;
    }
  } catch (error) {
    console.error('Error loading ratings from localStorage:', error);
    localStorage.removeItem('stockRatings');
  }
  return {};
};

export const PortfolioTable = ({ data, loading }: PortfolioTableProps) => {
  const initialSettings = loadSettingsFromStorage();
  const initialRatings = loadRatingsFromStorage();

  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialSettings.visibility);
  const [columnOrder, setColumnOrder] = useState<string[]>(initialSettings.order);
  const [columnSizing, setColumnSizing] = useState<Record<string, number>>(initialSettings.sizing);
  const [selectedStock, setSelectedStock] = useState<StockHolding | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });
  const [copySnackbarOpen, setCopySnackbarOpen] = useState(false);
  const [stockRatings, setStockRatings] = useState<StockRatings>(initialRatings);

  // Save table settings to localStorage when they change
  useEffect(() => {
    try {
      const settings = {
        visibility: columnVisibility,
        order: columnOrder,
        sizing: columnSizing,
      };
      localStorage.setItem('portfolioTableSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  }, [columnVisibility, columnOrder, columnSizing]);

  const handleCopyAnalysisPrompt = async (stock: StockHolding) => {
    const analysisPrompt = `${stock.name} ${stock.ticker}

Current Holdings:
- Quantity: ${stock.quantity}
- Average Price: ${formatCurrency(stock.avg_price)}
- Invested Amount: ${formatCurrency(stock.invested_amount)}

Analyze the stock and provide a detailed long-term investment recommendation: Strong Buy, Buy, Hold, Sell or Strong Sell.
Your analysis should include the following sections:
Company Overview
 – Brief description of business model, core products/services, industry positioning, and key markets served.
Financial Health
 – Trends in revenue, EBITDA, and net profit over the last 5 years till the latest 2025 financials
 – Profitability metrics (Operating Margin, Net Margin, ROE, ROCE)
 – Balance sheet strength (Debt-to-Equity, Interest Coverage)
 – Free cash flow consistency
Valuation
 – Analyze valuation multiples: P/E, P/B, P/S, EV/EBITDA, PEG ratio
 – Compare with historical averages and industry peers
Growth Prospects & Projected CAGR
 – Growth outlook based on industry trends, market expansion, product pipeline, and analyst projections
 – Include expected revenue and/or earnings CAGR over the next 5–10 years
Risks & Challenges
 – Key business, financial, industry, or regulatory risks
 – Dependency on few products/customers, global exposure, etc.
Competitive Advantage & Moat
 – Does the company have durable competitive advantages?
 – Assess brand value, IP, cost leadership, switching costs, etc.
Promoter & Management Integrity
 – Track record of promoters and leadership team
 – Corporate governance, related-party transactions, share pledging, and past controversies (if any)
(Optional) ESG Factors
 – Environmental, social, or governance factors that may impact the business
✅ Conclusion – Investment Recommendation
– Provide a clear Buy, Hold, or Sell rating for long-term holding (5–10 years)
– Justify your rating with supporting data and assumptions
– Include a summary of projected long-term CAGR and risk/reward profile.`;

    try {
      await navigator.clipboard.writeText(analysisPrompt);
      setCopySnackbarOpen(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleRatingChange = useCallback((ticker: string, ratingType: string, value: RatingValue) => {
    setStockRatings((prevRatings) => {
      const updatedRatings = {
        ...prevRatings,
        [ticker]: {
          ...prevRatings[ticker],
          [ratingType]: value,
        },
      };
      localStorage.setItem('stockRatings', JSON.stringify(updatedRatings));
      return updatedRatings;
    });
  }, []);

  const handleNotesChange = useCallback((ticker: string, notes: string) => {
    setStockRatings((prevRatings) => {
      const updatedRatings = {
        ...prevRatings,
        [ticker]: {
          ...prevRatings[ticker],
          notes: notes,
        },
      };
      localStorage.setItem('stockRatings', JSON.stringify(updatedRatings));
      return updatedRatings;
    });
  }, []);

  const columns = useMemo<ColumnDef<StockHolding>[]>(() => {
    return [
      {
        accessorKey: 'logo',
        header: '',
        cell: ({ row }) => (
          <img
            src={row.original.logo}
            alt={row.original.ticker}
            style={{ width: 30, height: 30, borderRadius: '50%' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/30';
            }}
          />
        ),
        size: 50,
      },
      {
        accessorKey: 'ticker',
        header: 'Ticker',
        size: 100,
      },
      {
        accessorKey: 'name',
        header: 'Company',
        size: 200,
      },
      {
        accessorKey: 'sector',
        header: 'Sector',
        size: 150,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({ getValue }) => getValue<number>().toFixed(2),
        size: 100,
      },
      {
        accessorKey: 'avg_price',
        header: 'Avg. Price',
        cell: ({ getValue }) => formatCurrency(getValue<number>()),
        size: 120,
      },
      {
        accessorKey: 'live_price',
        header: 'Live Price',
        cell: ({ getValue }) => formatCurrency(getValue<number>()),
        size: 120,
      },
      {
        accessorKey: 'invested_amount',
        header: 'Invested',
        cell: ({ getValue }) => formatCurrency(getValue<number>()),
        size: 120,
      },
      {
        accessorKey: 'current_value',
        header: 'Current Value',
        cell: ({ getValue }) => formatCurrency(getValue<number>()),
        size: 140,
      },
      {
        accessorKey: 'total_profit_loss',
        header: 'P&L',
        cell: ({ row }) => {
          const value = row.original.total_profit_loss;
          const isPositive = value >= 0;
          return (
            <span style={{ color: isPositive ? 'green' : 'red' }}>
              {formatCurrency(value)} ({isPositive ? '+' : ''}
              {formatPercentage(row.original.total_percent_change)})
            </span>
          );
        },
        size: 150,
      },
      {
        id: 'gemini_rating',
        header: 'Gemini Rating',
        cell: ({ row }) => (
          <RatingSelector
            ticker={row.original.ticker}
            ratingType="gemini_rating"
            currentValue={stockRatings[row.original.ticker]?.gemini_rating || ''}
            onRatingChange={handleRatingChange}
          />
        ),
        size: 140,
      },
      {
        id: 'perplexity_rating',
        header: 'Perplexity Rating',
        cell: ({ row }) => (
          <RatingSelector
            ticker={row.original.ticker}
            ratingType="perplexity_rating"
            currentValue={stockRatings[row.original.ticker]?.perplexity_rating || ''}
            onRatingChange={handleRatingChange}
          />
        ),
        size: 140,
      },
      {
        id: 'alpha_spread_rating',
        header: 'Alpha Spread Rating',
        cell: ({ row }) => (
          <RatingSelector
            ticker={row.original.ticker}
            ratingType="alpha_spread_rating"
            currentValue={stockRatings[row.original.ticker]?.alpha_spread_rating || ''}
            onRatingChange={handleRatingChange}
          />
        ),
        size: 160,
      },
      {
        id: 'notes',
        header: 'Notes',
        cell: ({ row }) => (
          <NotesInput
            ticker={row.original.ticker}
            initialValue={stockRatings[row.original.ticker]?.notes || ''}
            onNotesChange={handleNotesChange}
          />
        ),
        size: 200,
      },
      {
        id: 'copy',
        header: 'Copy',
        cell: ({ row }) => (
          <Tooltip title="Copy analysis prompt">
            <IconButton size="small" onClick={() => handleCopyAnalysisPrompt(row.original)} color="primary">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ),
        size: 80,
      },
      // {
      //   id: 'actions',
      //   header: 'Actions',
      //   cell: ({ row }) => (
      //     <Button variant="outlined" size="small" onClick={() => setSelectedStock(row.original)}>
      //       Analyze
      //     </Button>
      //   ),
      //   size: 120,
      // },
    ];
  }, [stockRatings, handleCopyAnalysisPrompt, handleRatingChange, handleNotesChange]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnOrder,
      columnSizing,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
  });

  const handleColumnMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColumnMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleColumnVisibility = (columnId: string) => {
    table.getColumn(columnId)?.toggleVisibility();
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: newPage,
    }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({
      pageIndex: 0,
      pageSize: parseInt(event.target.value, 10),
    });
  };

  const handleCloseSnackbar = () => {
    setCopySnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="body1" mt={2}>
            Loading portfolio data...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" p={4} textAlign="center">
        <Typography variant="h6" color="text.secondary">
          No portfolio data available. Please upload a file or fetch from IndMoney.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" color="text.primary">
          Your Portfolio
        </Typography>
        <Tooltip title="Configure columns">
          <IconButton onClick={handleColumnMenuOpen}>
            <ViewColumnIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table stickyHeader>
            <PortfolioTableHeader headerGroups={table.getHeaderGroups()} />
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                const ticker = row.original.ticker;
                const ratingsKey = JSON.stringify(stockRatings[ticker] || {});
                return <PortfolioTableRow key={`${row.id}-${ratingsKey}`} row={row} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleColumnMenuClose}>
        <MenuItem>
          <Typography variant="subtitle2" fontWeight="bold">
            Toggle Columns
          </Typography>
        </MenuItem>
        {table.getAllLeafColumns().map((column) => {
          const headerText = column.columnDef.header;
          const displayLabel =
            headerText && typeof headerText === 'string' && headerText.trim()
              ? headerText
              : column.id === 'logo'
              ? 'Logo'
              : column.id || 'Column';

          return (
            <MenuItem key={column.id}>
              <FormControlLabel
                control={
                  <Checkbox checked={column.getIsVisible()} onChange={() => toggleColumnVisibility(column.id)} />
                }
                label={String(displayLabel)}
              />
            </MenuItem>
          );
        })}
      </Menu>

      <Snackbar
        open={copySnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Analysis prompt copied to clipboard!
        </Alert>
      </Snackbar>

      <StockAnalysisModal open={!!selectedStock} onClose={() => setSelectedStock(null)} stock={selectedStock} />
    </Box>
  );
};
