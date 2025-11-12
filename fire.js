// firebase-init.js

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAe5vcJe5mUUxAX5mXWFjCwL26esbxLvbo",
  authDomain: "projeto-p-c672e.firebaseapp.com",
  // ADICIONEI ESTA LINHA - ESSENCIAL PARA O REALTIME DB
  databaseURL: "https://projeto-p-c672e-default-rtdb.firebaseio.com", 
  projectId: "projeto-p-c672e",
  storageBucket: "projeto-p-c672e.firebasestorage.app",
  messagingSenderId: "474078684255",
  appId: "1:474078684255:web:d7b603028fbe0713e0a7ea",
  measurementId: "G-ZCKVM5HW4G"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);

