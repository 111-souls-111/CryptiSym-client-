import styles from './LangSelector.module.css';
import {  Select } from 'antd';
import { useTranslation } from 'react-i18next';
import 'flag-icons/css/flag-icons.min.css';
import type { LangTypes } from '../types';

const languages: LangTypes[] = [
  { code: 'ru', label: 'Русский', flag: 'ru' },
  { code: 'en', label: 'English', flag: 'gb' },
  { code: 'de', label: 'Deutsch', flag: 'de' },
];

export const LangSelector = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
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
            backgroundColor: ' var(--nav-orange) ',
          }}
        />
  )
};
