import { useEffect, useState } from 'react';
import './CheerAlert69.css';
import audioAlert69 from './mp3/alert-cheer69.mp3';
import imgGasm from './img/gasm.png';

const alertSound = new Audio(audioAlert69);

export function CheerAlert69(props) {
  const [shudder, setShudder] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setShudder(true);
      timeout = setTimeout(() => {
        setShudder(false);
      }, 2000);
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (shudder) {
      alertSound.play();
    }
  }, [shudder]);

  return (
    <div className="CheerAlert69">
      <img className={`gasm ${shudder ? 'shudder' : ''}`} src={imgGasm} alt="" />
    </div>
  );
}
