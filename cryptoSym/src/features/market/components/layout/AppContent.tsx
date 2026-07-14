import { Layout} from 'antd';
import React from 'react';
import { CoinSelector } from '../CoinSelector';
import {PriceChart} from '../PriceChart';
import { AppSider } from './AppSider';




const {Content } = Layout;
export const AppContent = () => {

const contentStyle: React.CSSProperties = {
     
        minHeight: 'calc(100vh - 60px)',

        color: '#fff',
        backgroundColor: '#000000',

};

    return (
        <>
    <Content style={contentStyle}>
        <CoinSelector />
        <PriceChart/>
    </Content>
    <AppSider />
    </>
          
    )
}