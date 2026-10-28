// Nav.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';
import {
  MenuOutlined,
  ShopOutlined,
  WalletOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Button, Menu, Drawer } from 'antd';
import UserMenu from '../../Auth/components/UserMenu';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import 'flag-icons/css/flag-icons.min.css';
import { LangSelector } from './LangSelector';

export const Nav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: MenuProps['items'] = [
        {
      key: 'avatar',
      label: <UserMenu />,
    },
    {
      key: '/',
      label: <Link to="/">{t('nav.store')}</Link>,
      icon: <ShopOutlined />,
    },
    {
      key: '/portfolio',
      label: <Link to="/portfolio">{t('nav.portfolio')}</Link>,
      icon: <WalletOutlined />,
    },
    {
      key: '/products',
      label: <Link to="/products">{t('nav.transaction')}</Link>,
      icon: <SwapOutlined />,
    },
    
  ];

  const mobileMenuItems: MenuProps['items'] = [
    ...menuItems,
    {
      type: 'divider',
    },
    {
      key: 'replenishment',
      label: (
        <Button className={styles.mobileReplenishmentButton} block>
          {t('nav.replenishment')}
        </Button>
      ),
      disabled: true,
    },
  ];

  const selectedKey = location.pathname;

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <h3 className={styles.logo}>CryptoSym</h3>
      </div>

      <Menu
        className={styles.desktopMenu}
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={menuItems}
        disabledOverflow={false}
        overflowedIndicator={<span className={styles.customMore}>Ещё</span>}  // ← кастом
      />

      <div className={styles.userWrapper}>
        <LangSelector />

        <Button className={styles.replenishmentButton} type="primary">
          {t('nav.replenishment')}
        </Button>

         
        <Button
          className={styles.burgerButton}
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(true)}
        />
      </div>

      <Drawer
        placement="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        closable={false}
        size={280}
        className={styles.mobileDrawer}
        bodyStyle={{ background: 'var(--accent-color)', padding: 0 }}
      >
        <div className={styles.mobileContent}>
          <div className={styles.mobileHeader}>
            <h3 className={styles.mobileLogo}>CryptoSym</h3>
            <Button
              className={styles.burgerButton}
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
          <Menu
            className={styles.mobileMenu}
            mode="vertical"
            selectedKeys={[selectedKey]}
            items={mobileMenuItems}
          />
        </div>
      </Drawer>
    </div>
  );
};
