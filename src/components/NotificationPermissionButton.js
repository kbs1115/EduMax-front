import React from 'react';
import { requestNotificationPermission } from '../firebase-messaging';
import { registerFCMToken } from '../apifetchers/fetcher';
function NotificationPermissionButton() {
    
  const handleRequestPermission = () => {
      requestNotificationPermission().then(token => {
          if (token) {
              console.log('Received FCM token:', token);
              // Call the function to register the token to the server
              registerFCMToken(token).then(response => {
                  console.log('FCM token registered successfully:', response);
              }).catch(error => {
                  console.error('Error registering FCM token:', error);
              });
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