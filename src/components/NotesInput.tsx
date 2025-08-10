import { useState, useCallback, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';

interface NotesInputProps {
  ticker: string;
  initialValue: string;
  onNotesChange: (ticker: string, notes: string) => void;
}

export const NotesInput = ({ ticker, initialValue, onNotesChange }: NotesInputProps) => {
  const [localValue, setLocalValue] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update local value when initial value changes (from external source)
  useEffect(() => {
    setLocalValue(initialValue);
  }, [initialValue]);

  // Debounced save to prevent excessive localStorage writes
  const debouncedSave = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onNotesChange(ticker, value);
      }, 500); // 500ms debounce
    },
    [ticker, onNotesChange]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setLocalValue(newValue);
      debouncedSave(newValue);
    },
    [debouncedSave]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <TextField
      multiline
      rows={2}
      value={localValue}
      onChange={handleChange}
      placeholder="Add notes..."
      size="small"
      sx={{ minWidth: 150, maxWidth: 200 }}
      variant="outlined"
    />
  );
};

NotesInput.displayName = 'NotesInput';
