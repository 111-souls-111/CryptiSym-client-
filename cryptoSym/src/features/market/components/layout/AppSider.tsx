import { Layout, Card } from 'antd';
import React from 'react';

const { Sider } = Layout;

export const AppSider = () => {
  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#000000',
  };

  return (
    <Sider width="25%" style={siderStyle}>
      <Card style={{ margin: '20px' }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Sider>
  );
};
