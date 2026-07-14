import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';
import { changeTimeFrame, type TimeFrame } from '../slices/marketSlice';
import { type RootState } from '../../../app/store';

export const TimeFramePanel: React.FC = () => {
  const dispatch = useDispatch();
  const currentTimeFrame = useSelector((state: RootState) => state.market.selectedTimeFrame);

  const timeFrames: { value: TimeFrame; label: string }[] = [
    { value: '1D', label: '1 День' },
    { value: '1W', label: '1 Неделя' },
    { value: '1M', label: '1 Месяц' },
  ];

  return (
    <div style={{ marginBottom: '15px' }}>
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
            style={{
              backgroundColor: currentTimeFrame === tf.value ? '#fa8c16' : '#141414',
              color: currentTimeFrame === tf.value ? '#fff' : '#aaa',
              borderColor: '#303030',
            }}
          >
            {tf.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};
