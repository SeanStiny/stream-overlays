import { useEffect, useState } from 'react';
import { PopCat } from '../../common/pop-cat/PopCat';
import './SubAlert.css';
import notasheepMp3 from './mp3/alert-notasheep.mp3';

const alertSound = new Audio(notasheepMp3);

export function SubAlert(props) {
  const [mouth, setMouth] = useState('closed');
  
  useEffect(() => {
    let timeout = setTimeout(() => {
      setMouth('open');
      timeout = setTimeout(() => {
        setMouth('closed');
      }, 1000);
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
    if (mouth === 'open') {
      alertSound.play();
    }
  }, [mouth])

  return (
    <div className="SubAlert">
      <PopCat mouth={mouth} />
    </div>
  );
}
