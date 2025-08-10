# Stock Analyser

A comprehensive portfolio management application built with React, TypeScript, and Vite. Analyze your stock holdings with advanced filtering, sorting, and AI-powered insights.

## Features

- **Portfolio Upload**: Upload your portfolio in JSON format
- **Interactive Table**: Sort, filter, and customize the view of your holdings
- **Stock Analysis**: Get AI-powered analysis for individual stocks
- **Rating System**: Rate stocks with color-coded indicators (Strong Buy, Buy, Hold, Sell, Strong Sell)
- **Notes System**: Add personal notes to each stock
- **Responsive Design**: Works on both desktop and mobile devices
- **Local Storage**: Your table preferences and ratings are saved between sessions

## Live Demo

🚀 **[View Live Application](https://ranjithprabhuk.github.io/stock-analyser/)**

## Deployment

This application is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment

Every push to the `main` branch triggers an automatic deployment:

1. The GitHub Actions workflow builds the application
2. Deploys the built files to GitHub Pages
3. The site is available at: `https://ranjithprabhuk.github.io/stock-analyser/`

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

This will build the application and deploy it to the `gh-pages` branch.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/stock-analyser.git
   cd stock-analyser
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Click on the "Upload Portfolio JSON" button
2. Select the `sample-portfolio.json` file from the project root or your own portfolio file
3. View your portfolio in the interactive table
4. Click the "Analyze" button next to any stock to see a detailed analysis
5. Use the column visibility toggle to customize the table view
6. Click on column headers to sort the table

## Sample Data

A sample portfolio file (`sample-portfolio.json`) is included in the project root. You can use this to test the application.

## Technologies Used

- React 18
- TypeScript
- Vite
- Material-UI (MUI)
- TanStack Table (React Table)
- React Markdown

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
