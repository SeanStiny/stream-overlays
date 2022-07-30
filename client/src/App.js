import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Alert } from './alerts/Alert';
import { Branding } from './branding/Branding';
import { RecentAlertTicker } from './supporters/RecentAlertTicker';

export function App() {
  const [newAlert, setNewAlert] = useState(null);
  const [recentAlerts, setRecentAlerts] = useState([]);

  useEffect(() => {
    const socket = io();
    socket.emit('query recent');

    socket.on('recent', (alerts) => {
      setRecentAlerts(alerts);
    });

    socket.on('alert', (alert, showInRecents) => {
      setNewAlert(alert);
      if (showInRecents) {
        setRecentAlerts((recentAlerts) => {
          return [alert, ...recentAlerts.slice(0, recentAlerts.length - 1)];
        });
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <RecentAlertTicker alerts={recentAlerts} />
      <Alert newAlert={newAlert} />
    </div>
  );
}
