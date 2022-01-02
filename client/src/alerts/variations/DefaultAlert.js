import { useEffect } from 'react';
import oggNewMessage from './ogg/new-message.ogg';

const alertSound = new Audio(oggNewMessage);

export function DefaultAlert(props) {
  useEffect(() => {
    alertSound.play();
  }, []);

  return null;
}
