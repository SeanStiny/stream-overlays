import { useEffect, useState } from 'react';
import { Portal } from '../common/portal/Portal';
import './Alert.css';
import { CheerAlert50 } from './variations/CheerAlert50';
import { CheerAlert100 } from './variations/CheerAlert100';
import { CheerAlert1000 } from './variations/CheerAlert1000';
import { CheerAlert69 } from './variations/CheerAlert69';
import { SubAlert } from './variations/SubAlert';
import { DefaultAlert } from './variations/DefaultAlert';
import { synthesize } from './tts';

const ALERT_LENGTH = 7000;
const ALERT_COOLDOWN = 1000;

export function Alert(props) {
  const [portalOpen, setPortalOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [ttsAudio, setTtsAudio] = useState(null);

  // Add new alerts to the queue.
  useEffect(() => {
    if (props.newAlert !== null) {
      setQueue((queue) => [...queue, props.newAlert]);
    }
  }, [props.newAlert]);

  // Play through the alert queue.
  useEffect(() => {
    if (!currentAlert && !ttsAudio && queue.length > 0) {
      setCurrentAlert(queue[0]);
      setQueue((queue) => {
        return queue.slice(1);
      });
    }
  }, [currentAlert, queue, ttsAudio]);

  // Play the next alert.
  useEffect(() => {
    let timeout;
    if (currentAlert) {
      if (currentAlert.tts && currentAlert.tts.length > 0) {
        synthesize(currentAlert.tts).then((audio) => {
          setTtsAudio(audio);
        });
      }
      setPortalOpen(true);
      timeout = setTimeout(() => {
        setVisible(true);
        timeout = setTimeout(() => {
          setVisible(false);
          timeout = setTimeout(() => {
            setPortalOpen(false);
            timeout = setTimeout(() => {
              setCurrentAlert(null);
            }, 480 + ALERT_COOLDOWN);
          }, 500);
        }, ALERT_LENGTH);
      }, 200);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [currentAlert]);

  function speak() {
    if (ttsAudio) {
      ttsAudio.play();
      ttsAudio.addEventListener('ended', () => {
        setTtsAudio(null);
      });
    }
  }

  let action = null;
  let effect;
  if (currentAlert !== null) {
    action = currentAlert.amount;
    if (currentAlert.type === 'sub') {
      action = 'New Sub';
      effect = <SubAlert />;
    } else if (currentAlert.type === 'resub') {
      if (currentAlert.amount === 1) {
        action = 'Just Subscribed!';
      } else {
        action = `Resubbed for ${currentAlert.amount} Months`;
      }
      effect = (
        <SubAlert
          onended={() => {
            speak();
          }}
        />
      );
    } else if (currentAlert.type === 'cheer') {
      action = `Cheered ${currentAlert.amount} Bits`;
      if (currentAlert.amount >= 50) {
        if (currentAlert.amount === 69) {
          effect = (
            <CheerAlert69
              onended={() => {
                speak();
              }}
            />
          );
        } else if (currentAlert.amount < 200) {
          effect = (
            <CheerAlert50
              onended={() => {
                speak();
              }}
            />
          );
        } else if (currentAlert.amount < 1000) {
          effect = (
            <CheerAlert100
              onended={() => {
                speak();
              }}
            />
          );
        } else {
          effect = (
            <CheerAlert1000
              onended={() => {
                speak();
              }}
            />
          );
        }
      }
    } else if (currentAlert.type === 'gift') {
      action = `Gifted ${currentAlert.amount} Subs`;
      effect = <SubAlert />;
      if (currentAlert.username === null) {
        currentAlert.username = 'Anonymous Gifter';
      }
    } else if (currentAlert.type === 'raid') {
      action = `Raided with ${currentAlert.amount} Viewers`;
    } else if (currentAlert.type === 'follow') {
      action = `Just Followed!`;
    }

    if (effect === undefined) {
      effect = <DefaultAlert />;
    }
  }

  return (
    <div className="Alert">
      <div className={`info ${visible ? 'visible' : 'hidden'}`}>
        <div className="variation">{effect}</div>
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
