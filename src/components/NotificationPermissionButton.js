import React from 'react';
import { requestNotificationPermission } from '../firebase-messaging';

function NotificationPermissionButton() {
  
  const handleRequestPermission = () => {
    requestNotificationPermission().then(token => {
      if (token) {
        console.log('Received FCM token:', token);
        // Optionally handle the received token, like saving it to your server
      } else {
        console.log('Failed to get permission or token.');
      }
    }).catch(error => {
      console.error('Error requesting notification permission:', error);
    });
  };

  return (
    <button onClick={handleRequestPermission}>
      Enable Notifications
    </button>
  );
}

export default NotificationPermissionButton;