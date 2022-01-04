import { useEffect, useState } from 'react';
import { Meowow } from '../../common/meowow/Meowow';
import './CheerAlert100.css';
import mp3Alert100 from './mp3/alert-cheer100.mp3';

const alertSound = new Audio(mp3Alert100);

export function CheerAlert100(props) {
  const [blep, setBlep] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setBlep(true);
      timeout = setTimeout(() => {
        setBlep(false);
      }, 1100);
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
  }, [blep, props.onended]);

  return (
    <div className="CheerAlert100">
      <Meowow blep={blep} />
    </div>
  );
}
