import { useEffect, useState } from 'react';
import { RecentSupporter } from './RecentSupporter';
import './RecentSupportTicker.css';

export function RecentSupportTicker(props) {
  const [currentShown, setCurrentShown] = useState(0);

  // Rotate between supporters
  useEffect(() => {
    setCurrentShown(0);
    const changeInterval = setInterval(() => {
      setCurrentShown((currentShown) => {
        if (currentShown === props.recentSupporters.length - 1) {
          return 0;
        } else {
          return currentShown + 1;
        }
      });
    }, 10000);

    return () => {
      clearInterval(changeInterval);
    };
  }, [props.recentSupporters]);

  return (
    <div className="LabelTicker">
      {props.recentSupporters.map((supporter, index) => {
        return <RecentSupporter
          username={supporter.username}
          amount={supporter.amount}
          type={supporter.type}
          visible={currentShown === index}
        />;
      })}
    </div>
  );
}
