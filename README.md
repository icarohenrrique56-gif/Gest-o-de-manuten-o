# 🚀 Kanban PCM System - Guia de Instalação

Este é um sistema de quadro Kanban para Gestão de Manutenção (PCM) construído com **HTML5, TailwindCSS e JavaScript puro**, utilizando o **Google Firebase** como back-end (Autenticação e Realtime Database).

## 📋 Tecnologias Utilizadas

- **HTML5** - Estrutura
- **Tailwind CSS** - Estilos
- **JavaScript Puro** - Lógica
- **Firebase Authentication** - Login com E-mail e Google
- **Firebase Realtime Database** - Armazenamento de dados
- **Sortable.js** - Drag & Drop no Kanban
- **DOMPurify** - Segurança (XSS)
- **PapaParse** - Importação CSV/Excel

---

## 🔧 Guia de Configuração (Passo a Passo)

### Pré-requisitos
- Uma conta Google
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Acesso à [Console do Firebase](https://console.firebase.google.com)

### Passo 1: Criar o Projeto no Firebase

1. Vá para o **[Console do Firebase](https://console.firebase.google.com)**
2. Clique em **"Adicionar projeto"**
3. Dê um nome a ele (ex: `pcm-kanban-heineken`)
4. Selecione sua localização
5. Clique em **"Criar projeto"** e aguarde

---

### Passo 2: Obter as Chaves da API

1. Dentro do seu projeto no Firebase, clique no ícone de **engrenagem ⚙️** → **"Configurações do projeto"**
2. Na aba **"Geral"**, role para baixo até **"Seus apps"**
3. Clique no ícone **`</>`** (Web)
4. Dê um apelido (ex: `"App Web Kanban"`) e clique em **"Registrar app"**
5. O Firebase mostrará um objeto `firebaseConfig`
6. **Copie esse objeto inteiro**

---

### Passo 3: Configurar firebase-init.js

1. Abra o arquivo **`firebase-init.js`** no seu editor
2. Substitua o `firebaseConfig` que está lá pelo que você copiou:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_MEASUREMENT_ID"
};
```

3. **IMPORTANTE:** Agora você precisa adicionar o `databaseURL`:
   - No Firebase, vá em **Build > Realtime Database**
   - Clique em **"Criar banco de dados"**
   - Copie a URL do banco (algo como `https://meu-projeto-default-rtdb.firebaseio.com`)
   - Adicione ao seu `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  databaseURL: "https://SEU_DATABASE_URL.firebaseio.com", // ← ADICIONE
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_MEASUREMENT_ID"
};
```

---

### Passo 4: Ativar Autenticação

1. No Firebase, vá em **Build > Authentication**
2. Clique na aba **"Sign-in method"**
3. Clique em **"E-mail/senha"** e ative com o toggle
4. Clique em **"Google"** e ative
   - Selecione o e-mail de suporte (seu e-mail Google)
   - Clique em **"Salvar"**

---

### Passo 5: Configurar Regras do Banco de Dados

⚠️ **Etapa Crítica:** Sem isso, os dados não são salvos!

1. No Firebase, vá em **Build > Realtime Database**
2. Clique na aba **"Regras"**
3. Apague o JSON padrão
4. Cole as regras abaixo:

```json
{
  "rules": {
    "tasks": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["idOS", "priority", "column"]
    },
    "logs": {
      ".read": "auth != null && (root.child('users/' + auth.uid + '/role').val() === 'admin')",
      ".write": "auth != null",
      ".indexOn": ["timestamp"]
    },
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
```

5. Clique em **"Publicar"**

---

## 🚀 Executando o Projeto

### Opção A: Teste Local (Rápido)

#### No Visual Studio Code:
1. Instale a extensão **"Live Server"** (by Ritwick Dey)
2. Clique com botão direito em `login.html`
3. Selecione **"Open with Live Server"**
4. O navegador abrirá em `http://127.0.0.1:5500/login.html`

#### Ou use Python (já vem instalado):

```bash
cd /caminho/para/Gest-o-de-manuten-o
python3 -m http.server 8000 --bind 0.0.0.0
```

Abra no navegador: `http://localhost:8000/login.html`

---

### Opção B: Publicar na Web (Firebase Hosting)

Recomendado para que a equipe toda acesse de qualquer lugar.

#### 1. Instale Firebase Tools

```bash
npm install -g firebase-tools
```

#### 2. Configure o projeto

```bash
firebase login
cd /caminho/para/Gest-o-de-manuten-o
firebase init hosting
```

Siga as instruções:
- Selecione o projeto que criou no Firebase
- Use `.` (ponto) como diretório público
- Responda **Não** para "configure as a single-page app"

#### 3. Deploy

```bash
firebase deploy
```

O Firebase te dará um link: `https://meu-projeto.web.app` 🎉

---

## 📁 Estrutura do Projeto

```
Gest-o-de-manuten-o/
├── login.html              # Tela de login/registro
├── index.html              # Dashboard Kanban
├── firebase-init.js        # Configuração do Firebase (⚠️ EDITE COM SUAS CHAVES)
├── auth.js                 # Lógica de autenticação
├── app.js                  # Lógica do Kanban
├── fire.js                 # Helper Firebase (opcional)
├── README.md               # Este arquivo
├── .gitignore              # Git ignore
└── .git/                   # Histórico Git
```

---

## 🧪 Testando o Login

1. Abra `http://localhost:8000/login.html`
2. **Abra o Console** (F12 ou Ctrl+Shift+J)
3. Verifique se aparecem os logs verdes (`✅ Firebase carregado`)
4. Teste os fluxos:
   - **Alternar telas**: Clique em "Solicitar nova conta"
   - **Registro**: Crie uma conta (ex: `usuario@empresa.com` / `senha123`)
   - **Login**: Faça login com a mesma conta
   - **Google**: Clique em "Entrar com Google"

### Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `❌ Firebase não foi carregado` | Scripts compat não carregaram | Verifique CDN no `login.html` |
| `auth/invalid-api-key` | API Key incorreta | Revise `firebase-init.js` |
| `auth/configuration-not-found` | Configuração incompleta | Verifique se `databaseURL` foi adicionada |
| `permission-denied` | Regras do banco incorretas | Publique as regras (Passo 5) |

---

## 💡 Dicas

- **Sempre use HTTPS em produção** (Firebase Hosting é HTTPS)
- **Não commit `firebase-init.js` com chaves reais** (considere `.env`)
- **Teste no console do navegador** (F12) para debug
- **Limpe cache se mudar as regras** (Ctrl+Shift+Delete)

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique o Console do navegador (F12)
2. Revise as logs do Firebase Console
3. Confirme que todas as chaves estão corretas em `firebase-init.js`
4. Verifique as regras do Realtime Database

---

**Desenvolvido com ❤️ para o PCM System**
