import React from 'react';
import './index.scss'

export const InputRange = ({ max, min, value = 0.1, step = 1, onChangeRange }) => (
  <div className='range_volume'>
    <input type="range" name="volume" step={step} min={min} max={max} value={value} onChange={onChangeRange} />
  </div>
)