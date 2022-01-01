import { useEffect, useState } from 'react';
import { Portal } from '../common/portal/Portal';
import './Alert.css';
import { CheerAlert50 } from './variations/CheerAlert50';
import { CheerAlert100 } from './variations/CheerAlert100';
import { CheerAlert1000 } from './variations/CheerAlert1000';
import { CheerAlert69 } from './variations/CheerAlert69';
import { SubAlert } from './variations/SubAlert';

const ALERT_LENGTH = 7000;
const ALERT_COOLDOWN = 2000;

export function Alert(props) {
  const [portalOpen, setPortalOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [playing, setPlaying] = useState(false);

  // Add new alerts to the queue.
  useEffect(() => {
    if (props.newAlert !== null) {
      setQueue((queue) => [...queue, props.newAlert]);
    }
  }, [props.newAlert]);

  // Play through the alert queue.
  useEffect(() => {
    if (!playing && queue.length > 0) {
      setPlaying(true);
      setCurrentAlert(queue[0]);
      setQueue((queue) => {
        return queue.slice(1);
      });
    }
  }, [playing, queue]);

  // Play the next alert.
  useEffect(() => {
    let timeout;
    if (playing) {
      setPortalOpen(true);
      timeout = setTimeout(() => {
        setVisible(true);
        timeout = setTimeout(() => {
          setVisible(false);
          timeout = setTimeout(() => {
            setPortalOpen(false);
            timeout = setTimeout(() => {
              setCurrentAlert(null);
              timeout = setTimeout(() => {
                setPlaying(false);
              }, ALERT_COOLDOWN);
            }, 480);
          }, 500);
        }, ALERT_LENGTH);
      }, 200);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [playing]);

  let action = null;
  let variation = null;
  if (currentAlert !== null) {
    action = currentAlert.amount;
    if (currentAlert.type === 'sub') {
      action = 'New Sub';
      variation = <SubAlert />;
    } else if (currentAlert.type === 'resub') {
      action = `Resubbed for ${currentAlert.amount} Months`;
      variation = <SubAlert />;
    } else if (currentAlert.type === 'cheer') {
      action = `Cheered ${currentAlert.amount} Bits`;
      if (currentAlert.amount >= 50) {
        if (currentAlert.amount === 69) {
          variation = <CheerAlert69 />;
        } else if (currentAlert.amount < 200) {
          variation = <CheerAlert50 />;
        } else if (currentAlert.amount < 1000) {
          variation = <CheerAlert100 />;
        } else {
          variation = <CheerAlert1000 />;
        }
      }
    } else if (currentAlert.type === 'gift') {
      action = `Gifted ${currentAlert.amount} Subs`;
      variation = <SubAlert />;
    }
  }

  return (
    <div className="Alert">
      <div className={`info ${visible ? 'visible' : 'hidden'}`}>
        <div className="variation">{variation}</div>
        <div className="float">
          <div className="username neon-shadow">
            {currentAlert !== null ? currentAlert.username : null}
          </div>
          <div className="amount drop-shadow">{action}</div>
        </div>
      </div>

      <Portal open={portalOpen} />
    </div>
  );
}
