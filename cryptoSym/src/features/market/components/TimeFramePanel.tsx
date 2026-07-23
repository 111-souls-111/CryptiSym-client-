import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';
import { changeTimeFrame } from '../slices/marketSlice';
import { type RootState } from '../../../app/store';
import styles from './TimeFramePanel.module.css';
import { type TimeFrame } from '../types';

export const TimeFramePanel: React.FC = () => {
  const dispatch = useDispatch();
  const currentTimeFrame = useSelector((state: RootState) => state.market.selectedTimeFrame);

  const timeFrames: { value: TimeFrame; label: string }[] = [
    { value: '24h', label: 'day' },
    { value: '1h', label: '1h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '1y', label: '1y' },
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
