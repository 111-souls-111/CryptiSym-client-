import { useSocket } from './hooks/useSocket';
import { Layout } from 'antd';
import { AppHeader } from './features/market/components/layout/AppHeader';
import { AppContent } from './features/market/components/layout/AppContent';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

function App() {
  useSocket();

  return (
    <BrowserRouter>
      <Layout>
        <AppHeader />
        <Layout>
          <Routes>
            <Route path="/" element={<AppContent />}></Route>
          </Routes>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
