import { memo } from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import type { HeaderGroup } from '@tanstack/react-table';
import type { StockHolding } from '../types/portfolio';

interface PortfolioTableHeaderProps {
  headerGroups: HeaderGroup<StockHolding>[];
}

export const PortfolioTableHeader = memo(({ headerGroups }: PortfolioTableHeaderProps) => {
  return (
    <TableHead>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableCell
              key={header.id}
              sx={{
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                cursor: header.column.getCanSort() ? 'pointer' : 'default',
                backgroundColor: 'background.paper',
              }}
              onClick={header.column.getToggleSortingHandler()}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
});

PortfolioTableHeader.displayName = 'PortfolioTableHeader';
