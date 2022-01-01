import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { Alert } from './alerts/Alert';
import './App.css';
import { Branding } from './branding/Branding';
import { RecentSupportTicker } from './supporters/RecentSupportTicker';

const recentSupporters = [
  {
    username: 'SapphireZero7',
    type: 'cheer',
    amount: 300,
  },
  {
    username: 'DebROAR',
    type: 'gift',
    amount: 5,
  },
  {
    username: 'Flynpeakok',
    type: 'resub',
    amount: 4,
  },
  {
    username: 'lilith_the_maid',
    type: 'sub',
    amount: 1,
  },
  {
    username: 'VryGlitchy',
    type: 'resub',
    amount: 13,
  },
];

export function App() {
  const [newAlert, setNewAlert] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setNewAlert({
        username: 'SeanStiny',
        type: 'cheer',
        amount: 1,
      });
    }, 1000);

    setTimeout(() => {
      setNewAlert({
        username: 'SeanStiny',
        type: 'cheer',
        amount: 50,
      });
    }, 1100);

    setTimeout(() => {
      setNewAlert({
        username: 'SeanStiny',
        type: 'cheer',
        amount: 69,
      });
    }, 1100);

    setTimeout(() => {
      setNewAlert({
        username: 'SeanStiny',
        type: 'cheer',
        amount: 200,
      });
    }, 1100);

    setTimeout(() => {
      setNewAlert({
        username: 'SeanStiny',
        type: 'cheer',
        amount: 1000,
      });
    }, 1100);
  }, []);

  return (
    <div className="App">
      <RecentSupportTicker recentSupporters={recentSupporters} />
      <Alert newAlert={newAlert} />
      <Branding />
    </div>
  );
}
