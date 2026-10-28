import { useSocket } from './hooks/useSocket';
import { AuthProvider } from '@zitadel/react-auth';
import { Layout } from 'antd';
import { AppHeader } from './features/layout/components/AppHeader';
import { AppContent } from './features/layout/components/AppContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from "./features/Auth/components/LoginPage";
import { ProtectedRoute } from './features/Auth/components/ProtectedRoute';
import { PortfolioPage } from './features/portfolio/components/PortfolioPage';

import './index.css';
import { TransactionsPage } from './features/portfolio/components/TransactionPage';

// Очистка URL после входа
const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

function App() {
  useSocket();

  return (
    <BrowserRouter>
      <AuthProvider
        authority={import.meta.env.VITE_ZITADEL_DOMAIN}
        client_id={import.meta.env.VITE_ZITADEL_CLIENT_ID}
        redirect_uri={import.meta.env.VITE_ZITADEL_CALLBACK_URL}
        post_logout_redirect_uri={import.meta.env.VITE_ZITADEL_POST_LOGOUT_URL}
        scope="openid profile email offline_access"
        onSigninCallback={onSigninCallback}
      >
        <Routes>
          {/* Страница логина (публичная) */}
          <Route path="/login" element={<LoginPage />} />
     
            <Route 
            path="/portfolio*" 
            element={
              <ProtectedRoute>
                <Layout>
                  <AppHeader />
                  <Layout>
                    <PortfolioPage/>
                  </Layout>
                </Layout>
              </ProtectedRoute>
            } 
            
          />
                      <Route 
            path="/transaction" 
            element={
              <ProtectedRoute>
                <Layout>
                  <AppHeader />
                  <Layout>
                    <TransactionsPage/>
                  </Layout>
                </Layout>
              </ProtectedRoute>
            } 
            />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Layout>
                  <AppHeader />
                  <Layout>
                    <AppContent />
                  </Layout>
                </Layout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;