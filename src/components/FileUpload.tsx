import { Button } from '@mui/material';
import type { ChangeEvent } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const FileUpload = ({ onFileSelect, disabled = false }: FileUploadProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <input
        accept=".json"
        style={{ display: 'none' }}
        id="portfolio-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="portfolio-upload">
        <Button
          variant="contained"
          component="span"
          disabled={disabled}
          startIcon={<CloudUploadIcon />}
        >
          Upload Portfolio JSON
        </Button>
      </label>
    </div>
  );
};
