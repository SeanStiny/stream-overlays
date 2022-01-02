import { useEffect, useState } from 'react';
import { RecentAlert } from './RecentAlert';
import './RecentAlertTicker.css';

export function RecentAlertTicker(props) {
  const [currentShown, setCurrentShown] = useState(0);

  // Rotate between supporters
  useEffect(() => {
    setCurrentShown(0);
    const changeInterval = setInterval(() => {
      setCurrentShown((currentShown) => {
        if (currentShown === props.alerts.length - 1) {
          return 0;
        } else {
          return currentShown + 1;
        }
      });
    }, 10000);

    return () => {
      clearInterval(changeInterval);
    };
  }, [props.alerts]);

  return (
    <div className="RecentAlertTicker">
      {props.alerts.map((supporter, index) => {
        return <RecentAlert
          username={supporter.username}
          amount={supporter.amount}
          type={supporter.type}
          visible={currentShown === index}
        />;
      })}
    </div>
  );
}
