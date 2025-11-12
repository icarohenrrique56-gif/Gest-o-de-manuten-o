// firebase-init.js (compat loader)
// Usado por páginas que dependem da API compat (ex: index.html -> app.js)
// ---------------------------------------------------------------
// Atenção: este arquivo inicializa o Firebase como global `firebase` (compat).
// Se você usar módulos ES (import ...), use `firebase.init.js` (com ponto).

const firebaseConfig = {
  apiKey: "AIzaSyAe5vcJe5mUUxAX5mXWFjCwL26esbxLvbo",
  authDomain: "projeto-p-c672e.firebaseapp.com",
  projectId: "projeto-p-c672e",
  storageBucket: "projeto-p-c672e.firebasestorage.app",
  messagingSenderId: "474078684255",
  appId: "1:474078684255:web:d7b603028fbe0713e0a7ea",
  measurementId: "G-ZCKVM5HW4G"
};

// Inicializa o Firebase (compat)
if (typeof firebase !== 'undefined' && firebase.initializeApp) {
  try {
    firebase.initializeApp(firebaseConfig);
    // opcional: firebase.analytics(); // compat analytics se necessário
  } catch (e) {
    // Se já inicializado, ignora
    console.warn('Firebase compat já inicializado ou ocorreu erro:', e.message || e);
  }
} else {
  console.warn('SDK Firebase compat não encontrado. Verifique se os scripts compat foram carregados.');
}
