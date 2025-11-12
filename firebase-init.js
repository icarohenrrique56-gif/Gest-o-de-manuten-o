// firebase-init.js - Configuração do Firebase
// ===================================================
// INSTRUÇÕES:
// 1. Vá para https://console.firebase.google.com
// 2. Abra seu projeto
// 3. Clique em ⚙️ > Configurações do Projeto
// 4. Vá para "Seus apps" > </> (Web)
// 5. Copie o firebaseConfig
// 6. Cole abaixo, substituindo os valores de exemplo
// ===================================================

const firebaseConfig = {
  apiKey: "AIzaSyAe5vcJe5mUUxAX5mXWFjCwL26esbxLvbo",
  authDomain: "projeto-p-c672e.firebaseapp.com",
  databaseURL: "https://projeto-p-c672e-default-rtdb.firebaseio.com",
  projectId: "projeto-p-c672e",
  storageBucket: "projeto-p-c672e.firebasestorage.app",
  messagingSenderId: "474078684255",
  appId: "1:474078684255:web:d7b603028fbe0713e0a7ea",
  measurementId: "G-ZCKVM5HW4G"
};

// Inicializa o Firebase (API Compat)
try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase inicializado com sucesso');
  } else {
    console.log('⚠️ Firebase já estava inicializado');
  }
} catch (error) {
  console.error('❌ Erro ao inicializar Firebase:', error);
}
