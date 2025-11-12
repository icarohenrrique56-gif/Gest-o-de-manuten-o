// firebase.init.js

// Inicialização do Firebase usando módulos ES (import direto dos CDN)
// Substituído pelo snippet fornecido pelo usuário.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAe5vcJe5mUUxAX5mXWFjCwL26esbxLvbo",
  authDomain: "projeto-p-c672e.firebaseapp.com",
  projectId: "projeto-p-c672e",
  storageBucket: "projeto-p-c672e.firebasestorage.app",
  messagingSenderId: "474078684255",
  appId: "1:474078684255:web:d7b603028fbe0713e0a7ea",
  measurementId: "G-ZCKVM5HW4G"
};

// Inicializa o Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Observação: importe `firebase.init.js` em suas páginas como um módulo:
// <script type="module" src="/path/to/firebase.init.js"></script>