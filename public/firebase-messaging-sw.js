importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration (you can reuse the same config as in your app)
const firebaseConfig = {
    apiKey: "AIzaSyB6Ik9RM45gQRmqiuC-PBZcNjumLQ0I94A",
    authDomain: "edumax-414706.firebaseapp.com",
    projectId: "edumax-414706",
    messagingSenderId: "356957646824",
    appId: "1:356957646824:web:8b3defe369923f51067e5d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background Message Handler
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});