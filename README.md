# 📋 PCM System - Gestão de Manutenção
## Sistema Completo de Ordens de Serviço com Kanban em Tempo Real

Sistema web **profissional** de gestão de ordens de serviço com **Kanban interativo**, **autenticação Firebase**, **sincronização em tempo real** e **histórico completo** de movimentações.

**Desenvolvido com:** HTML5 • TailwindCSS • JavaScript Puro • Firebase • Sortable.js

---

## 🎯 Funcionalidades Principais

### ✅ Autenticação & Segurança
- Login com E-mail e Senha
- Google Sign-In (OAuth 2.0)
- Registro de novos usuários
- Logout seguro
- Proteção contra XSS (DOMPurify)
- Isolamento de dados por usuário

### ✅ Gestão de Ordens de Serviço (OS)
- Criar nova OS com descrição, prioridade e ID único
- Editar OS existentes
- **Arrastar/soltar entre situações** (Kanban)
- **Comentários descritivos** ao mover OS
- **Histórico completo** de movimentações
- Filtrar por prioridade (Alta/Média/Baixa)
- Contadores de tarefas por coluna
- Atualização em tempo real

### ✅ Situações de Atendimento (5 Colunas)
```
🔴 A Restaurar          - OS nova, aguardando início
🟡 Em Diagnóstico       - Analisando o problema
🟠 Em Restauração       - Consertando/instalando
🔵 Qualidade/Teste      - Testando funcionamento
🟢 Pronto               - OS finalizada
```

### ✅ Interface Kanban Profissional
- Drag & drop suave entre colunas
- Contadores em tempo real
- Animações profissionais
- Responsivo (desktop/tablet/mobile)
- Notificações toast (sucesso/erro)
- Modal de comentários ao mover

---

## 🚀 Instalação & Configuração Rápida

### 🎯 Pré-requisitos
- Conta Google (gratuita)
- Navegador moderno (Chrome, Firefox, Edge)
- Editor de código (VS Code, etc)
- Python 3.6+ (para servidor local) - OPCIONAL

---

### 📌 Passo 1: Download do Projeto
```bash
# Via Git
git clone https://github.com/icarohenrrique56-gif/Gest-o-de-manuten-o.git
cd Gest-o-de-manuten-o

# Ou baixar ZIP manualmente
# Descompactar na pasta desejada
```

---

### 📌 Passo 2: Configurar Firebase

#### 2.1 - Criar Projeto Firebase

1. Acesse: **https://console.firebase.google.com**
2. Clique em **"Adicionar projeto"**
3. Nome: `pcm-kanban` (ou seu nome)
4. Selecione localização e clique **"Criar projeto"**
5. Aguarde criação (2-3 minutos)

#### 2.2 - Obter Chaves da API

1. Clique no ícone ⚙️ → **"Configurações do projeto"**
2. Aba **"Geral"** → role para **"Seus apps"**
3. Clique no ícone **`</>`** (Web)
4. Apelido: `Kanban Web` → **"Registrar app"**
5. Copie o `firebaseConfig` mostrado

#### 2.3 - Adicionar ao Projeto

1. Abra: **`firebase-init.js`** no seu editor
2. Substitua o `firebaseConfig`:

```javascript
// ANTES (exemplo):
const firebaseConfig = {
  apiKey: "AIzaSyAe5vcJe...",
  authDomain: "projeto-p-c672e.firebaseapp.com",
  databaseURL: "https://projeto-p-c672e-default-rtdb.firebaseio.com",
  // ... resto
};

// DEPOIS (com SUA chave):
const firebaseConfig = {
  apiKey: "COPIE_AQUI_SUA_API_KEY",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  databaseURL: "https://SEU-PROJETO-default-rtdb.firebaseio.com",
  projectId: "SEU-PROJETO",
  storageBucket: "SEU-PROJETO.firebasestorage.app",
  messagingSenderId: "SEU-MESSAGING-ID",
  appId: "1:SEU-APP-ID:web:SEU-WEB-ID",
  measurementId: "G-SEU-MEASUREMENT-ID"
};
```

3. **Salve o arquivo** (Ctrl+S)

---

### 📌 Passo 3: Habilitar Autenticação

#### 3.1 - Email/Senha

1. Firebase Console → **"Authentication"** (menu esquerda)
2. Aba **"Sign-in method"**
3. Clique em **"Email/Password"**
4. Toggle **"Enable"** ✅
5. Clique **"Save"**

#### 3.2 - Google Sign-In

1. Mesma aba **"Sign-in method"**
2. Clique em **"Google"**
3. Toggle **"Enable"** ✅
4. Selecione email de suporte
5. Clique **"Save"**

#### 3.3 - Domínios Autorizados

1. **"Settings"** (gear icon) → **"Authorized domains"**
2. Clique **"Add domain"**
3. Adicione CADA um:
   - `localhost` (testes locais)
   - `127.0.0.1` (alternativa localhost)
   - `seu-dominio.com` (produção)
   - `seu-app.vercel.app` (se usar Vercel)
   - `seu-app.herokuapp.com` (se usar Heroku)

4. Aguarde propagação (~5 minutos)

---

### 📌 Passo 4: Criar & Configurar Realtime Database

#### 4.1 - Criar Database

1. Firebase Console → **"Realtime Database"**
2. Clique **"Create Database"**
3. Localização: escolha mais próxima
4. Modo de segurança: **"Começar em modo de teste"**
5. Clique **"Enable"**

#### 4.2 - Publicar Regras de Segurança

1. Aba **"Rules"**
2. Cole estas regras:

```json
{
  "rules": {
    "tasks": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

3. Clique **"Publish"** ✅

---

### 📌 Passo 5: Iniciar Servidor Local

```bash
# Abrir terminal na pasta do projeto
cd Gest-o-de-manuten-o

# Iniciar Python HTTP Server
python -m http.server 8000

# Ou Python 2 (se não tiver Python 3):
# python -m SimpleHTTPServer 8000
```

Você verá:
```
Serving HTTP on 0.0.0.0 port 8000 ...
```

---

### 📌 Passo 6: Abrir no Navegador

1. Abra: **`http://localhost:8000`**
2. Será redirecionado para **`login.html`**
3. ✅ Pronto!

---

## 🎮 Como Usar o Sistema

### 🔐 LOGIN / REGISTRO

#### Criar Conta
1. Clique em **"Solicitar nova conta"**
2. E-mail: seu e-mail (ex: seu.nome@empresa.com)
3. Senha: mínimo 6 caracteres
4. Confirme a senha
5. Clique **"Criar Acesso"**
6. ✅ Redirecionado para Kanban

#### Fazer Login
**Opção 1: E-mail/Senha**
1. Digite e-mail e senha
2. Clique **"Entrar no Sistema"**
3. ✅ Autenticado

**Opção 2: Google**
1. Clique **"Entrar com Google"**
2. Selecione conta Google
3. Autorize acesso
4. ✅ Autenticado

---

### 📌 CRIAR NOVA OS

1. Clique botão **"+ Nova OS"** (canto superior direito)
2. Preencha:
   - **Código/OS**: ex "OS-001" (opcional, auto-gera se vazio)
   - **Descrição**: O que precisa ser feito **(obrigatório)**
   - **Responsável**: Quem vai fazer (opcional)
   - **Prioridade**: 
     - 🔴 **Alta** (vermelho)
     - 🟡 **Média** (laranja)
     - 🔵 **Baixa** (azul)
3. Clique **"Salvar OS"**
4. ✅ OS criada na coluna "🔴 A Restaurar"

---

### 📌 MOVER OS ENTRE SITUAÇÕES

**Método 1: Arrastar/Soltar**
1. Clique e segure em uma OS
2. Arraste para outra coluna
3. Solte o botão do mouse
4. **Modal "Descrever a Etapa" abre automaticamente**

**Modal de Comentário - O que fazer:**
1. Digite a descrição da etapa:
   - "Iniciando diagnóstico"
   - "Peças encomendadas, aguardando chegada"
   - "Restauração em progresso"
   - "Testando funcionamento"
   - "OS finalizada com sucesso"
2. Opções:
   - Clique **"Salvar e Mover"** ✅
   - Ou pressione **Ctrl+Enter** ⚡
   - Ou clique **"Cancelar"** para desfazer

3. ✅ OS movida + Comentário salvo no histórico

---

### 📌 EDITAR OS EXISTENTE

1. Clique botão **"Editar"** da OS
2. Modal abre com dados preenchidos
3. Altere o necessário
4. Clique **"Salvar OS"**
5. ✅ Dados atualizados

---

### 📌 FILTRAR POR PRIORIDADE

1. Dropdown **"Todas Prioridades"** (cabeçalho)
2. Selecione:
   - "Todas Prioridades" = mostrar tudo
   - "Alta" = apenas vermelhas
   - "Média" = apenas laranja
   - "Baixa" = apenas azuis
3. ✅ Kanban filtra em tempo real

---

### 📌 FAZER LOGOUT

1. Clique **"Sair"** (canto superior direito)
2. Confirme saída
3. ✅ Redirecionado para login

---

## 🔧 Explicação Detalhada do Código

### 📄 `firebase-init.js` - Inicialização Firebase

```javascript
// Linhas 13-28: Objeto com chaves da API
const firebaseConfig = {
  apiKey: "AIzaSyAe5vcJe5mUUxAX5mXWFjCwL26esbxLvbo",
  // Chave pública (ok expor no cliente)
  
  authDomain: "projeto-p-c672e.firebaseapp.com",
  // Domínio para autenticação
  
  databaseURL: "https://projeto-p-c672e-default-rtdb.firebaseio.com",
  // URL do Realtime Database
  
  projectId: "projeto-p-c672e",
  // ID único do projeto
  
  storageBucket: "projeto-p-c672e.firebasestorage.app",
  // Storage (para arquivos - não usado aqui)
  
  messagingSenderId: "474078684255",
  appId: "1:474078684255:web:d7b603028fbe0713e0a7ea",
  measurementId: "G-ZCKVM5HW4G"
  // IDs adicionais do Firebase
};

// Linhas 30-35: Inicializar Firebase
try {
  // Verificar se já foi inicializado (evitar dupla inicialização)
  if (!firebase.apps.length) {
    // Inicializar com as credenciais acima
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase inicializado com sucesso');
  }
}
```

---

### 📄 `auth.js` - Autenticação (Login/Registro)

```javascript
// ESTRUTURA GERAL:
// 1. Validar se Firebase carregou
// 2. Encontrar elementos HTML (formulários, botões)
// 3. Adicionar event listeners
// 4. Funções para:
//    - Login com E-mail
//    - Google Sign-In
//    - Registro
//    - Mostrar/Ocultar senhas
//    - Tratamento de erros

// Linha 7: Validar se Firebase foi carregado
if (typeof firebase === 'undefined') {
    console.error('❌ ERRO: Firebase não foi carregado!');
    // Se Firebase não carregou, parar execução
    return;
}

// Linhas 19-20: Inicializar autenticação
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Linha 101-150: Funções de Login
forms.login.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar reload da página
    
    // Capturar e-mail e senha dos inputs
    const email = inputs.loginEmail.value;
    const password = inputs.loginPass.value;
    
    try {
        // Tentar fazer login no Firebase
        await auth.signInWithEmailAndPassword(email, password);
        
        // Se sucesso, redirecionar para Kanban
        window.location.href = 'index.html';
    } catch (error) {
        // Tratar erros comuns
        if (error.code === 'auth/user-not-found') {
            alert('Usuário não encontrado. Crie uma conta.');
        } else if (error.code === 'auth/wrong-password') {
            alert('Senha incorreta.');
        } else if (error.code === 'auth/invalid-email') {
            alert('E-mail inválido.');
        }
    }
});

// Linhas 180-200: Google Sign-In
buttons.btnGoogleLogin.addEventListener('click', async () => {
    try {
        // Abrir popup do Google
        await auth.signInWithPopup(googleProvider);
        // Se sucesso, redirecionar
        window.location.href = 'index.html';
    } catch (error) {
        if (error.code === 'auth/popup-blocked-by-browser') {
            alert('Popup foi bloqueado. Libere popups neste site.');
        } else if (error.code === 'auth/unauthorized-domain') {
            alert('Domínio não autorizado. Adicione em Firebase Console.');
        }
    }
});

// Linhas 220-270: Registro de Novo Usuário
forms.register.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validar senhas iguais
    if (inputs.regPass.value !== inputs.regConfirm.value) {
        alert('Senhas não conferem.');
        return;
    }
    
    // Validar tamanho mínimo
    if (inputs.regPass.value.length < 6) {
        alert('Senha deve ter mínimo 6 caracteres.');
        return;
    }
    
    try {
        // Criar usuário no Firebase
        await auth.createUserWithEmailAndPassword(
            inputs.regEmail.value,
            inputs.regPass.value
        );
        // Se sucesso, redirecionar
        window.location.href = 'index.html';
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Este e-mail já está cadastrado.');
        } else if (error.code === 'auth/weak-password') {
            alert('Senha muito fraca. Use letras, números e símbolos.');
        }
    }
});
```

---

### 📄 `app.js` - Lógica Principal do Kanban

#### **INICIALIZAÇÃO**

```javascript
// Linhas 1-4: Declarar variáveis globais
let db;           // Referência ao Realtime Database
let auth;         // Referência ao Authentication
let currentUser;  // Usuário logado atualmente
let currentTasks = [];  // Array com todas as tarefas do usuário

// Linhas 6-7: Esperar página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // Linhas 10-15: Validar se Firebase foi carregado
    if (typeof firebase === 'undefined') {
        console.error('❌ ERRO: Firebase não foi carregado!');
        alert('Erro ao carregar Firebase. Verifique o console (F12).');
        return;  // PARAR EXECUÇÃO
    }
    
    // Linhas 22-23: Inicializar referências
    db = firebase.database();  // Acessar Realtime DB
    auth = firebase.auth();    // Acessar Autenticação
    
    // Linhas 26-46: Monitorar mudanças de autenticação
    auth.onAuthStateChanged((user) => {
        // Esta função é chamada quando:
        // - Usuário faz login
        // - Usuário faz logout
        // - Página carrega e recupera sessão anterior
        
        if (user) {
            // USUÁRIO ESTÁ LOGADO
            console.log('✅ Usuário autenticado:', user.email);
            
            // Guardar usuário em variável global
            currentUser = user;
            
            // Mostrar e-mail na UI
            document.getElementById('user-email-display').textContent = user.email;
            
            // Carregar tarefas do usuário
            loadTasks();
            
            // Habilitar botões (Nova OS, etc)
            updateAuthUI(user);
        } else {
            // USUÁRIO NÃO ESTÁ LOGADO
            console.log('❌ Usuário não autenticado. Redirecionando...');
            
            // Redirecionar para página de login
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                window.location.href = 'login.html';
            }
        }
    });
    
    // Linhas 49: Configurar event listeners
    setupEventListeners();
});
```

#### **SETUP DE EVENT LISTENERS**

```javascript
// Linhas 53-87: Configurar escutadores de eventos
function setupEventListeners() {
    // Botão "Nova OS"
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        // Quando clicar, abrir modal de criar tarefa
        addTaskBtn.addEventListener('click', openTaskModal);
    }
    
    // Botão "Sair"
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        // Quando clicar, fazer logout
        logoutBtn.addEventListener('click', logout);
    }
    
    // Formulário de tarefa
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        // Quando enviar (click em "Salvar"), processar dados
        taskForm.addEventListener('submit', saveTask);
    }
    
    // Dropdown de filtro
    const filterSelect = document.getElementById('header-priority-select');
    if (filterSelect) {
        // Quando mudar seleção, filtrar tarefas
        filterSelect.addEventListener('change', filterTasks);
    }
}
```

#### **CARREGAR TAREFAS DO USUÁRIO**

```javascript
// Linhas 114-137: Carregar tarefas
function loadTasks() {
    // Validar autenticação
    if (!currentUser) return;  // Se não autenticado, sair
    
    console.log('➜ Carregando tarefas...');
    
    // Consultar Firebase Realtime DB
    db.ref('tasks')  // Referência ao nó 'tasks'
      .orderByChild('userId')  // Ordenar por userId
      .equalTo(currentUser.uid)  // Apenas do usuário logado
      .on('value', (snapshot) => {
          // Esta função é chamada:
          // - Primeira vez que carrega
          // - Toda vez que dados mudam (tempo real!)
          
          // Limpar array anterior
          currentTasks = [];
          
          // Se há dados
          if (snapshot.val()) {
              // Iterar sobre cada tarefa
              Object.keys(snapshot.val()).forEach(key => {
                  // Adicionar ao array
                  currentTasks.push({
                      id: key,                    // ID gerado pelo Firebase
                      ...snapshot.val()[key]      // Espalhar propriedades (spread operator)
                  });
              });
          }
          
          console.log(`✅ ${currentTasks.length} tarefas carregadas`);
          
          // Re-renderizar Kanban com novos dados
          renderTasks();
      }, (error) => {
          // Se houver erro
          console.error('❌ Erro ao carregar tarefas:', error);
          showToast('Erro ao carregar tarefas', 'error');
      });
}
```

#### **RENDERIZAR KANBAN**

```javascript
// Linhas 139-157: Renderizar tarefas nas colunas
function renderTasks() {
    // Limpar todas as colunas
    ['col-restaurar', 'col-diagnostico', 'col-restauracao', 'col-teste', 'col-pronto']
        .forEach(colId => {
            const col = document.getElementById(colId);
            if (col) col.innerHTML = '';  // Remover todos os cards
        });
    
    // Distribuir tarefas nas colunas corretas
    currentTasks.forEach(task => {
        // Encontrar coluna onde a tarefa deve estar
        const col = document.getElementById(task.column);
        
        if (!col) return;  // Se coluna não existe, ignorar
        
        // Criar elemento visual da tarefa
        const taskEl = createTaskElement(task);
        
        // Adicionar à coluna
        col.appendChild(taskEl);
    });
    
    // Atualizar contadores (0, 1, 2, etc)
    updateCounters();
    
    // Inicializar Sortable (drag & drop)
    try {
        setupSortable();
    } catch (e) {
        console.warn('Sortable init falhou:', e);
    }
}
```

#### **CRIAR ELEMENTO DE TAREFA (CARD)**

```javascript
// Linhas 159-196: Criar card HTML de uma tarefa
function createTaskElement(task) {
    // Criar elemento div
    const div = document.createElement('div');
    
    // Adicionar classes CSS (estilos Tailwind)
    div.className = 'p-3 bg-white rounded border-l-4 shadow cursor-move hover:shadow-md transition-all';
    // p-3 = padding 3
    // bg-white = fundo branco
    // rounded = cantos arredondados
    // border-l-4 = borda esquerda 4px (cor varia por prioridade)
    // shadow = sombra
    // cursor-move = mouse vira logo de movimentação ao passar
    // hover:shadow-md = sombra maior ao passar mouse
    // transition-all = animação suave
    
    // Definir cor da borda por prioridade
    const borderColors = {
        high: 'border-red-500',      // Vermelha para Alta
        medium: 'border-orange-500', // Laranja para Média
        low: 'border-blue-500'       // Azul para Baixa
    };
    
    // Adicionar cor baseada em task.priority
    div.classList.add(borderColors[task.priority] || 'border-gray-300');
    
    // Montar HTML do card
    div.innerHTML = `
        <!-- ID da OS em cinza pequeno -->
        <div class="font-bold text-xs text-gray-500 mb-1">${task.idOS || 'N/A'}</div>
        
        <!-- Descrição da tarefa (sanitizada para evitar XSS) -->
        <div class="text-sm font-medium text-gray-800 mb-2">
            ${DOMPurify.sanitize(task.title)}
        </div>
        <!-- DOMPurify.sanitize remove <script> e tags perigosas -->
        
        <!-- Prioridade e botão Editar -->
        <div class="flex justify-between items-center">
            <!-- Badge de prioridade -->
            <span class="text-xs px-2 py-1 rounded ${
                task.priority === 'high' ? 'bg-red-100 text-red-700' :
                task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
            }">
                ${task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
            </span>
            
            <!-- Botão Editar -->
            <button onclick="editTask('${task.id}')" class="text-xs text-blue-600 hover:underline">
                Editar
            </button>
        </div>
    `;
    
    // Armazenar ID da tarefa no elemento (para drag & drop)
    // Sortable.js vai ler este atributo
    div.dataset.taskId = task.id;
    
    return div;
}
```

#### **ATUALIZAR CONTADORES**

```javascript
// Linhas 197-217: Atualizar números de tarefas por coluna
function updateCounters() {
    // Criar objeto para contar tarefas
    const counts = {
        'col-restaurar': 0,
        'col-diagnostico': 0,
        'col-restauracao': 0,
        'col-teste': 0,
        'col-pronto': 0
    };
    
    // Contar quantas tarefas em cada coluna
    currentTasks.forEach(task => {
        if (counts[task.column] !== undefined) {
            counts[task.column]++;  // Incrementar contador
        }
    });
    
    // Atualizar elementos HTML com novos contadores
    Object.keys(counts).forEach(colId => {
        const countEl = document.getElementById('count-' + colId);
        if (countEl) {
            // Mostrar número no badge
            countEl.textContent = counts[colId];
        }
    });
}
```

#### **SALVAR TAREFA (CRIAR/EDITAR)**

```javascript
// Linhas 232-286: Salvar tarefa no Firebase
async function saveTask(e) {
    // Evitar reload da página
    e.preventDefault();
    
    // Validar autenticação
    if (!currentUser) {
        showToast('Você não está autenticado', 'error');
        return;  // Parar
    }
    
    // Capturar valores do formulário
    const taskId = document.getElementById('task-id-hidden').value;
    // ID preenchido = edição; vazio = criação
    
    const title = document.getElementById('task-text-input').value;
    // Descrição do que fazer
    
    const idOS = document.getElementById('task-id-input').value || 'OS-' + Date.now();
    // ID legível (ex: OS-001) ou auto-gera
    
    const priority = document.querySelector('input[name="priority"]:checked')?.value || 'medium';
    // Prioridade selecionada (high/medium/low)
    
    // Validar título
    if (!title.trim()) {
        showToast('Descrição é obrigatória', 'error');
        return;  // Parar
    }
    
    // Montar objeto de dados
    const taskData = {
        title: title.trim(),           // Descrição (sem espaços extras)
        idOS: idOS,                    // ID único
        priority: priority,            // Prioridade
        column: 'col-restaurar',       // Nova tarefa começa em "A Restaurar"
        userId: currentUser.uid,       // UID do usuário
        createdAt: taskId ? undefined : Date.now(),  // Data criação (só se nova)
        updatedAt: Date.now()          // Última modificação
    };
    
    try {
        if (taskId) {
            // ===== EDIÇÃO =====
            // Atualizar registro existente
            await db.ref(`tasks/${taskId}`).update(taskData);
            console.log('✅ Tarefa atualizada:', taskId);
        } else {
            // ===== CRIAÇÃO =====
            // .push() gera um ID único automaticamente
            const ref = await db.ref('tasks').push(taskData);
            console.log('✅ Tarefa criada:', ref.key);
        }
        
        // Sucesso: mostrar mensagem
        showToast('Tarefa salva com sucesso!', 'success');
        
        // Fechar modal
        closeTaskModal();
        
        // Recarregar tarefas (Firebase dispara onAuthStateChanged)
        loadTasks();
        
    } catch (error) {
        // ERRO: Tratar diferentes tipos
        console.error('❌ Erro ao salvar tarefa:', error);
        
        const code = (error && (error.code || error.codeName)) || '';
        
        if (code.toString().toLowerCase().includes('permission')) {
            // Erro: Regras do Realtime DB bloqueando
            showToast('Permissão negada: verifique regras do Realtime DB', 'error');
            console.warn('Sugestão: Abra Firebase Console → Realtime DB → Rules');
            console.warn('Verifique que ".write: auth != null" está presente');
            
        } else if (code === 'auth/no-current-user' || !currentUser) {
            // Erro: Usuário deslogou
            showToast('Você não está autenticado. Faça login.', 'error');
            setTimeout(() => window.location.href = 'login.html', 700);
            
        } else {
            // Outro erro genérico
            showToast('Erro ao salvar tarefa: ' + (error.message || ''), 'error');
        }
    }
}
```

#### **FILTRAR TAREFAS POR PRIORIDADE**

```javascript
// Linhas 307-331: Filtrar tarefas
function filterTasks() {
    // Obter valor do dropdown de filtro
    const filterValue = document.getElementById('header-priority-select').value;
    
    if (filterValue === 'all') {
        // ===== MOSTRAR TODAS =====
        renderTasks();  // Re-renderizar todas
        
    } else {
        // ===== FILTRAR =====
        // Filtrar array apenas com tarefas que correspondem
        const filtered = currentTasks.filter(t => t.priority === filterValue);
        
        // Limpar todas as colunas
        ['col-restaurar', 'col-diagnostico', 'col-restauracao', 'col-teste', 'col-pronto']
            .forEach(colId => {
                const col = document.getElementById(colId);
                if (col) col.innerHTML = '';
            });
        
        // Re-renderizar apenas as filtradas
        filtered.forEach(task => {
            const col = document.getElementById(task.column);
            if (col) col.appendChild(createTaskElement(task));
        });
    }
}
```

#### **DRAG & DROP (SORTABLE.JS)**

```javascript
// Linhas 333-399: Inicializar Sortable (arrastar/soltar)
function setupSortable() {
    // IDs de todas as colunas
    const columnIds = ['col-restaurar', 'col-diagnostico', 'col-restauracao', 'col-teste', 'col-pronto'];
    
    // Configurar cada coluna
    columnIds.forEach(colId => {
        const col = document.getElementById(colId);
        if (!col) return;
        
        // Evitar inicializar duas vezes (otimização)
        if (col._sortableInitialized) return;
        
        // Criar nova instância Sortable
        new Sortable(col, {
            group: 'kanban',              // Grupo compartilhado = pode mover entre colunas
            animation: 150,               // Animação ao soltar (milissegundos)
            draggable: '.p-3',            // Seletor CSS dos elementos arrastaveis (cards)
            
            onEnd: async (evt) => {
                // ===== EXECUTADO QUANDO USUÁRIO SOLTA O ELEMENTO =====
                
                // Elemento que foi movido
                const item = evt.item;
                
                // ID da tarefa (armazenado em data-taskId)
                const taskId = item.dataset.taskId;
                
                // Coluna de origem e destino
                const from = evt.from;
                const to = evt.to;
                
                // Posições
                const oldIndex = evt.oldIndex;   // Índice anterior
                const newIndex = evt.newIndex;   // Índice novo
                
                // IDs das colunas
                const newColumn = to.dataset.columnId || to.id;
                const oldColumn = from.dataset.columnId || from.id;
                
                // Validar se tem ID
                if (!taskId) return;
                
                console.log('➜ Move detectado:', {
                    taskId,
                    from: oldColumn,
                    to: newColumn,
                    oldIndex,
                    newIndex
                });
                
                // ===== ATUALIZAÇÃO OTIMISTA =====
                // Atualizar em memória ANTES de salvar no DB
                // (assim a UI muda imediatamente, não espera resposta do Firebase)
                
                const task = currentTasks.find(t => t.id === taskId);
                const prevColumn = task ? task.column : oldColumn;  // Guardar coluna anterior
                
                if (task) task.column = newColumn;  // Mudar em memória
                
                // Abrir modal para capturar comentário
                // Passa elemento DOM para possível rollback
                await openStatusCommentModal(taskId, newColumn, prevColumn, item, from, oldIndex);
            }
        });
        
        // Marcar como inicializado
        col._sortableInitialized = true;
    });
}
```

#### **MODAL DE COMENTÁRIO AO MOVER**

```javascript
// Linhas 401-551: Modal de comentário ao mover OS
function openStatusCommentModal(taskId, newColumn, oldColumn, domItem, fromCol, oldIndex) {
    // Esta função retorna uma Promise
    // (permite usar await para esperar usuário confirmar/cancelar)
    return new Promise((resolve) => {
        // Encontrar elementos do modal
        const modal = document.getElementById('status-comment-modal');
        const commentInput = document.getElementById('status-comment-input');
        const saveBtn = document.getElementById('save-status-comment-btn');
        const cancelBtn = document.getElementById('cancel-status-comment-btn');
        
        // Validar se elementos existem
        if (!modal || !commentInput || !saveBtn || !cancelBtn) {
            console.error('❌ Elementos do modal não encontrados');
            resolve();  // Resolver promise
            return;
        }
        
        // ===== ABRIR MODAL =====
        commentInput.value = '';           // Limpar campo
        commentInput.focus();              // Cursor no campo
        modal.classList.remove('hidden');  // Mostrar modal
        
        // ===== HANDLER: SALVAR E MOVER =====
        const onSave = async () => {
            // Capturar comentário
            const comment = commentInput.value.trim();
            
            // Fechar modal
            modal.classList.add('hidden');
            
            // Remover listeners
            removeListeners();
            
            try {
                // ===== MONTAR ATUALIZAÇÃO =====
                const updateData = {
                    column: newColumn,                          // Nova situação
                    updatedAt: Date.now(),                      // Quando foi movida
                    lastStatus: comment || '(sem descrição)',   // Último comentário
                    lastStatusBy: currentUser ? currentUser.email : 'anônimo',  // Quem moveu
                    lastStatusAt: Date.now()                    // Quando
                };
                
                // ===== HISTÓRICO DE MOVIMENTAÇÕES =====
                const task = currentTasks.find(t => t.id === taskId);
                
                if (task && task.statusHistory && Array.isArray(task.statusHistory)) {
                    // Já tem histórico: adicionar novo movimento
                    updateData.statusHistory = [
                        ...task.statusHistory,  // Incluir anteriores (spread operator)
                        {
                            column: newColumn,
                            comment: comment || '(sem descrição)',
                            by: currentUser.email,
                            at: Date.now()
                        }
                    ];
                } else {
                    // Primeiro movimento: criar novo array
                    updateData.statusHistory = [{
                        column: newColumn,
                        comment: comment || '(sem descrição)',
                        by: currentUser.email,
                        at: Date.now()
                    }];
                }
                
                // ===== SALVAR NO FIREBASE =====
                await db.ref(`tasks/${taskId}`).update(updateData);
                
                // Sucesso: mostrar mensagem
                showToast(
                    `OS movida para ${getColumnLabel(newColumn)}. ${comment ? 'Comentário: ' + comment : ''}`,
                    'success'
                );
                
                // Atualizar contadores
                updateCounters();
                
                // Resolver promise (sucesso)
                resolve();
                
            } catch (error) {
                // ===== ERRO: REVERTER =====
                console.error('❌ Erro ao atualizar status:', error);
                
                // Reverter DOM (colocar card de volta)
                if (fromCol) {
                    if (oldIndex >= fromCol.children.length) {
                        fromCol.appendChild(domItem);
                    } else {
                        fromCol.insertBefore(domItem, fromCol.children[oldIndex]);
                    }
                }
                
                // Reverter em memória
                const task = currentTasks.find(t => t.id === taskId);
                if (task) task.column = oldColumn;
                
                // Mostrar erro apropriado
                const code = (error && (error.code || '')).toString().toLowerCase();
                
                if (code.includes('permission')) {
                    showToast('Permissão negada: verifique regras do Realtime DB', 'error');
                } else if (code.includes('auth')) {
                    showToast('Autenticação necessária. Faça login.', 'error');
                } else {
                    showToast('Erro ao atualizar status: ' + (error.message || ''), 'error');
                }
                
                // Resolver promise (erro)
                resolve();
            }
        };
        
        // ===== HANDLER: CANCELAR =====
        const onCancel = () => {
            // Fechar modal
            modal.classList.add('hidden');
            
            // Remover listeners
            removeListeners();
            
            // Reverter DOM (colocar card de volta)
            if (fromCol) {
                if (oldIndex >= fromCol.children.length) {
                    fromCol.appendChild(domItem);
                } else {
                    fromCol.insertBefore(domItem, fromCol.children[oldIndex]);
                }
            }
            
            // Reverter em memória
            const task = currentTasks.find(t => t.id === taskId);
            if (task) task.column = oldColumn;
            
            // Mostrar mensagem
            showToast('Movimento cancelado.', 'error');
            
            // Resolver promise
            resolve();
        };
        
        // ===== ATALHOS DE TECLADO =====
        const onKeyDown = (e) => {
            if (e.key === 'Enter' && e.ctrlKey) onSave();  // Ctrl+Enter = salvar
            if (e.key === 'Escape') onCancel();            // Esc = cancelar
        };
        
        // ===== REMOVER LISTENERS =====
        const removeListeners = () => {
            saveBtn.removeEventListener('click', onSave);
            cancelBtn.removeEventListener('click', onCancel);
            commentInput.removeEventListener('keydown', onKeyDown);
        };
        
        // ===== ADICIONAR LISTENERS =====
        saveBtn.addEventListener('click', onSave);
        cancelBtn.addEventListener('click', onCancel);
        commentInput.addEventListener('keydown', onKeyDown);
    });
}

// Helper: Traduzir ID de coluna para nome legível
function getColumnLabel(colId) {
    const labels = {
        'col-restaurar': 'A Restaurar',
        'col-diagnostico': 'Em Diagnóstico',
        'col-restauracao': 'Em Restauração',
        'col-teste': 'Qualidade/Teste',
        'col-pronto': 'Pronto'
    };
    return labels[colId] || colId;
}
```

#### **LOGOUT**

```javascript
// Linhas 553-565: Fazer logout
function logout() {
    // Pedir confirmação
    if (!confirm('Deseja sair do sistema?')) return;  // Se não confirmar, sair
    
    // Deslogar no Firebase
    auth.signOut().then(() => {
        console.log('✅ Logout realizado');
        // Redirecionar para login
        window.location.href = 'login.html';
    }).catch(error => {
        console.error('❌ Erro ao fazer logout:', error);
        showToast('Erro ao fazer logout', 'error');
    });
}
```

#### **NOTIFICAÇÕES (TOAST)**

```javascript
// Linhas 567-591: Mostrar notificações
function showToast(message, type = 'success') {
    // Criar elemento div
    const toast = document.createElement('div');
    
    // Definir cores por tipo
    const colors = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    const icon = type === 'success' ? '✓' : '✕';
    
    // Montar HTML
    toast.className = `toast ${colors} text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 min-w-[300px] mb-2 font-medium text-sm`;
    toast.innerHTML = `
        <span class="bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">${icon}</span>
        <span>${message}</span>
    `;
    
    // Adicionar à página
    const container = document.getElementById('toast-container');
    if (container) {
        container.appendChild(toast);
        
        // Animar entrada (slide da direita)
        requestAnimationFrame(() => toast.classList.add('show'));
        
        // Remover após 3 segundos
        setTimeout(() => {
            toast.classList.remove('show');  // Animar saída
            setTimeout(() => toast.remove(), 300);  // Remover do DOM
        }, 3000);
    }
}
```

---

## 📊 Estrutura do Banco de Dados

### Realtime Database JSON
```json
{
  "tasks": {
    "-task-id-1": {
      "idOS": "OS-001",
      "title": "Conserto da impressora",
      "priority": "high",
      "column": "col-restaurar",
      "userId": "uid-do-usuario-123",
      "createdAt": 1700000000000,
      "updatedAt": 1700000005000,
      "lastStatus": "Iniciando reparos",
      "lastStatusBy": "usuario@email.com",
      "lastStatusAt": 1700000005000,
      "statusHistory": [
        {
          "column": "col-diagnostico",
          "comment": "Diagnosticado problema na fonte",
          "by": "usuario@email.com",
          "at": 1700000005000
        },
        {
          "column": "col-restauracao",
          "comment": "Substituindo fonte",
          "by": "usuario@email.com",
          "at": 1700000010000
        }
      ]
    },
    "-task-id-2": {
      // ... mesma estrutura
    }
  }
}
```

### Explicação dos Campos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `idOS` | String | Identificador legível (ex: OS-001) |
| `title` | String | Descrição do que fazer |
| `priority` | String | "high" / "medium" / "low" |
| `column` | String | "col-restaurar", "col-diagnostico", etc |
| `userId` | String | UID único do Firebase (isolamento de dados) |
| `createdAt` | Number | Timestamp (ms desde 01/01/1970) |
| `updatedAt` | Number | Última modificação |
| `lastStatus` | String | Último comentário |
| `lastStatusBy` | String | E-mail de quem moveu |
| `lastStatusAt` | Number | Quando moveu |
| `statusHistory` | Array | Array com todos os movimentos anteriores |

---

## 🔒 Segurança

### Regras do Realtime Database

**Desenvolvimento (teste):**
```json
{
  "rules": {
    "tasks": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

**Produção (recomendado):**
```json
{
  "rules": {
    "tasks": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$uid": {
        ".read": "data.child('userId').val() === auth.uid",
        ".write": "data.child('userId').val() === auth.uid"
      }
    }
  }
}
```

---

## 🚨 Troubleshooting

| Erro | Causa | Solução |
|------|-------|---------|
| `auth/unauthorized-domain` | Domínio não autorizado | Firebase Console → Authorized domains → Add `localhost` |
| `permission-denied` | Regras do DB bloqueando | Firebase Console → Rules → Publish regras corretas |
| OS não aparece | Usuário diferente criou | Verificar `userId` no Firebase (deve ser seu `uid`) |
| Modal não abre ao arrastar | Sortable.js não carregou | Verificar console (F12) → network → Sortable.js CDN |
| Firebase não carregado | Scripts em ordem errada | `firebase-init.js` ANTES de `app.js` |

---

## 📱 Suporte a Dispositivos

| Dispositivo | Status | Notas |
|-------------|--------|-------|
| 💻 Desktop (1024px+) | ✅ Totalmente suportado | Todos os detalhes visíveis |
| 📱 Tablet (768-1023px) | ✅ Otimizado | Layout adaptável |
| 📱 Mobile (< 768px) | ✅ Otimizado | Toque otimizado, scrolling horizontal |

---

## 🎉 Próximas Melhorias (Roadmap)

- [ ] Anexar arquivos nas OS
- [ ] Notificações por e-mail
- [ ] Exportar relatórios em PDF
- [ ] Gráficos de produtividade
- [ ] Atribuir responsáveis
- [ ] SLA (tempo máximo por etapa)
- [ ] App mobile (React Native)
- [ ] API REST (Node.js)

---

**Desenvolvido com ❤️ para gestão profissional de manutenção**

v2.0 - November 2025

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
