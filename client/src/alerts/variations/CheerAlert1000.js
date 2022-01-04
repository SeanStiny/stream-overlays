import { useEffect, useState } from 'react';
import { Meowow } from '../../common/meowow/Meowow';
import './CheerAlert1000.css';
import mp3Alert1000 from './mp3/alert-cheer1000.mp3';

const alertSound = new Audio(mp3Alert1000);

export function CheerAlert1000(props) {
  const [blep, setBlep] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setBlep(true);
      timeout = setTimeout(() => {
        setBlep(false);
      }, 3000);
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const onended = props.onended;
    alertSound.addEventListener('ended', onended);

    return () => {
      alertSound.removeEventListener('ended', onended);
    }
  }, [props.onended]);

  useEffect(() => {
    if (blep) {
      alertSound.play();
    }
  }, [blep]);

  return (
    <div className={`CheerAlert1000 ${blep ? 'blep' : ''}`}>
      <Meowow blep={blep} />
    </div>
  );
}
