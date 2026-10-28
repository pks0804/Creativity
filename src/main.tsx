import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { missingFirebaseEnv } from './lib/firebase';
import { MissingConfigPage } from './pages/MissingConfigPage';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    {missingFirebaseEnv.length > 0 ? (
      <MissingConfigPage missing={missingFirebaseEnv} />
    ) : (
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    )}
  </StrictMode>,
);
