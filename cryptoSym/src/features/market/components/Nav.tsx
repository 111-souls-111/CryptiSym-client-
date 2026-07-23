import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import { UserOutlined } from '@ant-design/icons';
import { Button, Avatar, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import 'flag-icons/css/flag-icons.min.css';

const languages = [
  { code: 'ru', label: 'Русский', flag: 'ru' },
  { code: 'en', label: 'English', flag: 'gb' },
  { code: 'de', label: 'Deutsch', flag: 'de' },
];

export const Nav = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <h3>CryptoSym</h3>
        <Link to="/" className={styles.navLink}>
          {t('nav.store')}
        </Link>
        <Link to="/about" className={styles.navLink}>
          {t('nav.portfolio')}
        </Link>
        <Link to="/products" className={styles.navLink}>
          {t('nav.transaction')}
        </Link>
      </nav>

      <div className={styles.UserWrapper}>
        <Select
          className={styles.langSelect}
          value={currentLang}
          onChange={changeLanguage}
          options={languages.map(lang => ({
            value: lang.code,
            label: (
              <span>
                <span className={`fi fi-${lang.flag}`} style={{ marginRight: '8px' }} />
                {lang.label}
              </span>
            ),
          }))}
          popupStyle={{
            backgroundColor: ' #d76f08 ',
          }}

          style={{ width: 150 }}
        />

        <Button className={styles.replenishmentButton} type="primary">
          {t('nav.replenishment')}
        </Button>
        <Avatar className={styles.Avatar} size={64} icon={<UserOutlined />} />
      </div>
    </div>
  );
};
