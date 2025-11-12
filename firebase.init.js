// firebase-init.js

// ----------------------------------------------------------------
// IMPORTANTE:
// 1. Vá ao seu console do Firebase (https://console.firebase.google.com/)
// 2. Crie um novo projeto ou selecione um existente.
// 3. Adicione um aplicativo Web (ícone </>)
// 4. Copie o objeto 'firebaseConfig' e cole-o abaixo.
// ----------------------------------------------------------------

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  databaseURL: "SEU_DATABASE_URL", // Essencial para o Realtime DB
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);