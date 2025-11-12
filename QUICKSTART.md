# 🚀 Guia Rápido - Kanban PCM System

## ⚡ Iniciar em 5 Minutos

### 1️⃣ Clone ou Baixe o Projeto
```bash
git clone <seu-repo>
cd Gest-o-de-manuten-o
```

### 2️⃣ Configure Firebase
1. Vá para https://console.firebase.google.com
2. Crie um novo projeto (ou use o existente)
3. Copie suas credenciais para `firebase-init.js`
4. Adicione o `databaseURL` em `firebase-init.js`
5. Ative Email/Senha e Google em Authentication
6. Publique as regras do Realtime Database (veja `README.md`)

### 3️⃣ Teste Localmente
```bash
python3 -m http.server 8000
# Abra http://localhost:8000/login.html
```

### 4️⃣ Deploy na Web
```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

---

## 📝 Arquivos Principais

| Arquivo | Função |
|---------|--------|
| `login.html` | Página de login e registro |
| `index.html` | Dashboard Kanban |
| `auth.js` | Lógica de autenticação |
| `app.js` | Lógica do Kanban |
| `firebase-init.js` | ⚠️ **EDITE COM SUAS CHAVES** |

---

## 🆘 Algo não funciona?

1. Abra o Console do navegador (F12)
2. Procure por mensagens `❌` em vermelho
3. Confira `firebase-init.js` — as chaves estão corretas?
4. Verifique se as regras do Database foram publicadas
5. Leia `README.md` para troubleshooting completo

---

## 📚 Próximas Features

- [ ] Drag & Drop avançado (integrar Sortable.js)
- [ ] Importação CSV/Excel (PapaParse)
- [ ] Histórico de atividades (Logs)
- [ ] Editar/Deletar tarefas
- [ ] Notificações em tempo real
- [ ] Responsividade mobile aprimorada

---

**Dúvidas?** Leia `README.md` ou revise os logs do console!
