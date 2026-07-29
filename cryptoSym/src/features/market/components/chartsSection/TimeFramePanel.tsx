import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';
import { changeTimeFrame } from '../../slices/marketSlice';
import { type RootState } from '../../../../app/store';
import styles from './TimeFramePanel.module.css';
import { type TimeFrame } from '../../types';
import { useTranslation } from 'react-i18next';

export const TimeFramePanel: React.FC = () => {
  const dispatch = useDispatch();
  const currentTimeFrame = useSelector((state: RootState) => state.market.selectedTimeFrame);
  const { t } = useTranslation();

  const timeFrames: { value: TimeFrame; label: string }[] = [
    { value: '24h', label: t('time.day') },
    { value: '1h', label: t('time.hour') },
    { value: '7d', label: t('time.week') },
    { value: '30d', label: t('time.month') },
    { value: '1y', label: t('time.year') },
  ];

  return (
    <div className={styles.container}>
      <Radio.Group
        value={currentTimeFrame}
        onChange={e => dispatch(changeTimeFrame(e.target.value as TimeFrame))}
        optionType="button"
        buttonStyle="solid"
      >
        {timeFrames.map(tf => (
          <Radio.Button
            key={tf.value}
            value={tf.value}
            className={currentTimeFrame === tf.value ? styles.active : styles.notActive}
          >
            {tf.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};
