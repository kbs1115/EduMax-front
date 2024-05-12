import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase-init";


export const requestNotificationPermission = async () => {
  console.log('Requesting notification permission...');
  return Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Get the token
      return getToken(messaging, { vapidKey: 'BIyzBwOzmE2HPCCfl9qmp4LTS-pPArQd56E3n3M_GyNMjIczroPQRmiHz7rVgQanGnb3zC27piLTlljnrlcbMcc' }).then((currentToken) => {
        if (currentToken) {
          console.log('FCM Token:', currentToken);
          //서버로 보내줌.
          return currentToken;
        } else {
          console.log('No registration token available. Request permission to generate one.');
          return null;
        }
      }).catch((err) => {
        console.error('An error occurred while retrieving token. ', err);
        return null;
      });
    } else {
      console.log('Unable to get permission to notify.');
      return null;
    }
  });
}

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);

  // Display the message or perform other actions based on the received payload
  alert(`${payload.notification.title}
${payload.notification.body}`);
});
