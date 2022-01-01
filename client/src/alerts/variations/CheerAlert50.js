import { useEffect, useState } from 'react';
import { Meowow } from '../../common/meowow/Meowow';
import './CheerAlert50.css';
import mp3Alert1 from './mp3/alert-cheer1.mp3';

const alertSound = new Audio(mp3Alert1);

export function CheerAlert50(props) {
  const [blep, setBlep] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setBlep(true);
      timeout = setTimeout(() => {
        setBlep(false);
      }, 1000);
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (blep) {
      alertSound.play();
    }
  }, [blep]);

  return (
    <div className="CheerAlert50">
      <Meowow blep={blep} />
    </div>
  );
}
