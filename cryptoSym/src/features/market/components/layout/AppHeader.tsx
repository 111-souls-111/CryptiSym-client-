import { Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export const AppHeader = () => {
  const headerStyle: React.CSSProperties = {
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#141414',
    borderBottom: '1px solid #262626',
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    height: '65px',
  };

  const linkStyle: React.CSSProperties = {
    color: '#ffa600',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.2s ease',
  };

  return (
    <Layout.Header style={headerStyle}>
      {/* Слева можно будет воткнуть логотип или название проекта */}
      <div style={{ color: '#fa8c16', fontWeight: 'bold', fontSize: '18px', display: 'flex' }}>
        <nav style={navStyle}>
          <h3>CryptoSym</h3>
          <Link to="/" style={linkStyle}>
            Store
          </Link>
          <Link to="/about" style={linkStyle}>
            Portfolio
          </Link>
          <Link to="/products" style={linkStyle}>
            Transaction
          </Link>
        </nav>
      </div>
    </Layout.Header>
  );
};
