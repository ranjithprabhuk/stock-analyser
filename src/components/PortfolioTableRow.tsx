import { TableRow, TableCell } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import type { Row } from '@tanstack/react-table';
import type { StockHolding } from '../types/portfolio';

interface PortfolioTableRowProps {
  row: Row<StockHolding>;
}

export const PortfolioTableRow = ({ row }: PortfolioTableRowProps) => {
  return (
    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          sx={{
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

PortfolioTableRow.displayName = 'PortfolioTableRow';
