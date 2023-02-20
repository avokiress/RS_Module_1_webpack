import React, { useState, useRef } from 'react';
import classnames from 'classnames';

import { InputRange } from './components/InputRange';
import weatherData from './constants/weatherData';


export const App = () => {
  const [backgroundImage, setBackground] = useState('');
  const [soundValue, setSoundValue] = useState(0.1);
  const [isPlaying, setPlaying] = useState(false);
  const [title, setTitle] = useState('Weather sounds');

  const refAudio = useRef(null);

  const onChangeRangeValue = (e) => {
    const { value } = e.target;
    setSoundValue(value);
    refAudio.current.volume = value;
  }

  const onClickWeather = (e) => {
    const { name, sound, image } = e.target.dataset;

    refAudio.current.loop = false;
    refAudio.current.src = sound;
    setBackground(image)

    setPlaying(true);
    setTitle(`Weather sounds ${name}`);
    return refAudio.current.play();
  }

  const onPause = (e) => {
    e.stopPropagation();
    setPlaying(false);
    return refAudio.current.pause();
  }

  const onPlay = (e) => {
    e.stopPropagation();
    setPlaying(true);
    return refAudio.current.play();
  }


  const renderEntityWeather = (weather) => {
    const isActive = backgroundImage === weather.image;

    return (
      <li
        data-sound={weather.sound}
        data-name={weather.name}
        data-image={weather.image}
        key={weather.id}
        className={classnames('weather_list__item', weather.name)}
        style={{ backgroundImage: `url("${weather.image}")` }} onClick={isActive ? onPlay : onClickWeather}>

        <img src={weather.icon} alt="" width={60} />

        {isActive && isPlaying &&
          <i className="icon_pause" onClick={onPause} />
        }
      </li>
    )
  }

  return (
    <div className='wrapper' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>{title}</h1>
      <ul className='weather_list'>
        {weatherData.map(weather => {
          return renderEntityWeather(weather);
        })}
      </ul>
      <audio ref={refAudio} />
      <InputRange min={0.1} max={1} step={0.1} value={soundValue} onChangeRange={onChangeRangeValue} />
    </div>
  )
}