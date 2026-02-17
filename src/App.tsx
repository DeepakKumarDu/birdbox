import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProductListPage from './pages/ProductListPage';
import SendItemsPage from './pages/SendItemsPage';
import './styles/global.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const antTheme = {
  token: {
    colorPrimary: '#7B2FBE',
    colorLink: '#7B2FBE',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 13,
    colorBorder: '#e5e7eb',
    colorText: '#1a1a2e',
    colorTextSecondary: '#6B7280',
    colorTextPlaceholder: '#D1D5DB',
  },
  components: {
    Button: {
      primaryColor: '#ffffff',
    },
    Table: {
      headerBg: '#fafafa',
      headerColor: '#9CA3AF',
      rowHoverBg: '#faf5ff',
    },
    Slider: {
      trackBg: '#7B2FBE',
      handleColor: '#7B2FBE',
      trackHoverBg: '#6b21a8',
    },
    Checkbox: {
      colorPrimary: '#7B2FBE',
    },
    Switch: {
      colorPrimary: '#7B2FBE',
    },
    Pagination: {
      itemActiveBg: '#7B2FBE',
    },
  },
};

// Shared layout with sidebar
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="app-shell">
    <Sidebar />
    <div className="main-wrapper">
      <div className="page-scroll">
        <div className="page-body">{children}</div>
        <Footer />
      </div>
    </div>
  </div>
);

const ThemedApp: React.FC = () => {
  const { darkMode } = useTheme();

  const currentTheme = {
    ...antTheme,
    algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      ...antTheme.token,
      colorBgBase: darkMode ? '#1f2937' : '#ffffff',
      colorTextBase: darkMode ? '#f3f4f6' : '#1a1a2e',
      colorBorder: darkMode ? '#374151' : '#e5e7eb',
      colorPrimary: darkMode ? '#a855f7' : '#7B2FBE',
    },
  };

  return (
    <ConfigProvider theme={currentTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <ProductListPage />
              </AppLayout>
            }
          />
          <Route
            path="/send-items"
            element={
              <AppLayout>
                <SendItemsPage />
              </AppLayout>
            }
          />
          {/* Redirect /orders to send-items as per doc requirement */}
          <Route path="/orders" element={<Navigate to="/send-items" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  </Provider>
);

export default App;
