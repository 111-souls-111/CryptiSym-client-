import { useSocket } from './hooks/useSocket';
import { Layout } from 'antd';
import { AppHeader } from './features/market/components/layout/AppHeader'
import {AppContent} from './features/market/components/layout/AppContent'
import {AppSider} from './features/market/components/layout/AppSider'
import { BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';
import { Route,Routes } from 'react-router-dom';

function App() {

  useSocket();

  return (
    // <div className={styles.app}>
    //   <CoinSelector />
    //   <main style={{ maxWidth: '1200px' }}>
    //     <PriceChart />
    //   </main>
    // </div>
    <BrowserRouter>
                <Layout >
              <AppHeader/>
              <Layout>
                <Routes>
                  <Route path='/' element={<AppContent /> }></Route>
                </Routes>
             
             
              </Layout>
            </Layout>
    </BrowserRouter>
  );
}

export default App;