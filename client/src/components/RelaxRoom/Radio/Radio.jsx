/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import defaultImage from './icon-radio.png';
import styles from './Radio.module.css';

export default function Radio() {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState('hit');

  const setupApi = async (stf) => {
    const api = new RadioBrowserApi('My Radio App');

    const newStations = await api
      .searchStations({
        language: 'russia',
        tag: stf,
        limit: 4,
      })
      .then((data) => data);

    return newStations;
  };

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      // const randomStation = data.filter((el) => FourRandom(20).includes())
      setStations(data);
    });
  }, [stationFilter]);


  // function FourRandom (num) {

  //   let indexRadio=[];
  //   let index = 0;

  //   while (index < 4) {
  //    let random = Math.floor(Math.random()*num);

  //    if (indexRadio.includes(random)) continue
  //     indexRadio.push(random)
  //     index+=1
  //     console.log(indexRadio)
  //   }
  //   return indexRadio
  // }

  const filters = [
    'hit',
    'classical',
    'popular',
    'dance',
    'disco',
    'house',
    'jazz',
    'pop',
    'rap',
    'retro',
    'rock',
  ];

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className={styles.radio}>
      <div className={styles.filters}>
        {filters.map((filter, index) => (
          <span
            key={index}
            className={stationFilter === filter ? 'selected' : ''}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
      <div className={styles.stations}>
        {stations &&
          stations.map((station, index) => (
            <div className={styles.station} key={index}>
              <div className={styles.stationName}>
                <img
                  className={styles.logo}
                  src={station.favicon}
                  alt="station logo"
                  onError={setDefaultSrc}
                />
                <div className={styles.name}>{station.name}</div>
              </div>

              <AudioPlayer
                className={styles.player}
                src={station.urlResolved}
                showJumpControls={false}
                layout="stacked"
                customProgressBarSection={[]}
                customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
                autoPlayAfterSrcChange={false}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
