// app.js - Lógica do Kanban PCM System

let db, auth, currentUser, currentTasks = [];

document.addEventListener('DOMContentLoaded', () => {
    
    // Validações iniciais
    if (typeof firebase === 'undefined') {
        console.error('❌ ERRO: Firebase não foi carregado!');
        alert('Erro ao carregar Firebase. Verifique o console (F12).');
        return;
    }

    if (!firebase.database || !firebase.auth) {
        console.error('❌ ERRO: Firebase Database ou Auth não disponível!');
        return;
    }

    console.log('✅ Firebase carregado');

    // Inicializa referências
    db = firebase.database();
    auth = firebase.auth();

    // Monitora autenticação
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('✅ Usuário autenticado:', user.email);
            currentUser = user;
            document.getElementById('user-email-display').textContent = user.email;
            loadTasks();
            updateAuthUI(user);
        } else {
            console.log('❌ Usuário não autenticado. Redirecionando...');
            // Se estivermos na página index, redireciona para o login.
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ) {
                window.location.href = 'login.html';
            } else {
                updateAuthUI(null);
            }
        }
    });

    // Event Listeners
    setupEventListeners();

    // Fallback: força atualização UI após 500ms se for necessário
    setTimeout(() => {
        const user = auth.currentUser;
        if (user && !document.getElementById('add-task-btn').disabled) {
            console.log('✅ Botão Nova OS já habilitado (updateAuthUI funcionou)');
        } else if (user) {
            console.log('⚠️ Fallback: habilitando Nova OS manualmente');
            updateAuthUI(user);
        }
    }, 500);
});

// ============= SETUP EVENTOS =============

function setupEventListeners() {
    // Botão Adicionar Tarefa
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', openTaskModal);
    }

    // Botão Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Formulário de Tarefa
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', saveTask);
    }

    // Filtro de Prioridade
    const filterSelect = document.getElementById('header-priority-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', filterTasks);
    }

    console.log('✅ Event listeners configurados');
}

// Atualiza UI baseada no estado de autenticação
function updateAuthUI(user) {
    const addTaskBtn = document.getElementById('add-task-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userEmailDisplay = document.getElementById('user-email-display');

    if (user) {
        if (addTaskBtn) addTaskBtn.disabled = false;
        if (logoutBtn) logoutBtn.style.display = 'inline';
        if (userEmailDisplay) userEmailDisplay.textContent = user.email;
    } else {
        if (addTaskBtn) addTaskBtn.disabled = true;
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userEmailDisplay) userEmailDisplay.textContent = '...';
    }
}

// ============= TAREFAS =============

function loadTasks() {
    if (!currentUser) return;

    console.log('➜ Carregando tarefas...');

    db.ref('tasks').orderByChild('userId').equalTo(currentUser.uid)
        .on('value', (snapshot) => {
            currentTasks = [];
            if (snapshot.val()) {
                Object.keys(snapshot.val()).forEach(key => {
                    currentTasks.push({
                        id: key,
                        ...snapshot.val()[key]
                    });
                });
            }
            console.log(`✅ ${currentTasks.length} tarefas carregadas`);
            renderTasks();
        }, (error) => {
            console.error('❌ Erro ao carregar tarefas:', error);
            showToast('Erro ao carregar tarefas', 'error');
        });
}

function renderTasks() {
    // Limpar colunas
    ['col-restaurar', 'col-diagnostico', 'col-restauracao', 'col-teste', 'col-pronto'].forEach(colId => {
        const col = document.getElementById(colId);
        if (col) col.innerHTML = '';
    });

    // Distribuir tarefas
    currentTasks.forEach(task => {
        const col = document.getElementById(task.column);
        if (!col) return;

        const taskEl = createTaskElement(task);
        col.appendChild(taskEl);
    });

    // Atualizar contadores
    updateCounters();
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = 'p-3 bg-white rounded border-l-4 shadow cursor-move hover:shadow-md transition-all';
    
    // Cor da borda por prioridade
    const borderColors = {
        high: 'border-red-500',
        medium: 'border-orange-500',
        low: 'border-blue-500'
    };
    div.classList.add(borderColors[task.priority] || 'border-gray-300');

    div.innerHTML = `
        <div class="font-bold text-xs text-gray-500 mb-1">${task.idOS || 'N/A'}</div>
        <div class="text-sm font-medium text-gray-800 mb-2">${DOMPurify.sanitize(task.title)}</div>
        <div class="flex justify-between items-center">
            <span class="text-xs px-2 py-1 rounded ${
                task.priority === 'high' ? 'bg-red-100 text-red-700' :
                task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
            }">
                ${task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
            </span>
            <button onclick="editTask('${task.id}')" class="text-xs text-blue-600 hover:underline">Editar</button>
        </div>
    `;

    return div;
}

function updateCounters() {
    const counts = {
        'col-restaurar': 0,
        'col-diagnostico': 0,
        'col-restauracao': 0,
        'col-teste': 0,
        'col-pronto': 0
    };

    currentTasks.forEach(task => {
        if (counts[task.column] !== undefined) {
            counts[task.column]++;
        }
    });

    Object.keys(counts).forEach(colId => {
        const countEl = document.getElementById('count-' + colId);
        if (countEl) {
            countEl.textContent = counts[colId];
        }
    });
}

// ============= MODAL =============

function openTaskModal() {
    const modal = document.getElementById('task-modal');
    if (modal) {
        document.getElementById('modal-title').textContent = 'Nova Ordem de Serviço';
        document.getElementById('task-form').reset();
        document.getElementById('task-id-hidden').value = '';
        modal.classList.remove('hidden');
    }
}

function closeTaskModal() {
    const modal = document.getElementById('task-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

async function saveTask(e) {
    e.preventDefault();

    if (!currentUser) {
        showToast('Você não está autenticado', 'error');
        return;
    }

    console.log('➜ saveTask currentUser:', currentUser ? { uid: currentUser.uid, email: currentUser.email } : null);

    const taskId = document.getElementById('task-id-hidden').value;
    const title = document.getElementById('task-text-input').value;
    const idOS = document.getElementById('task-id-input').value || 'OS-' + Date.now();
    const priority = document.querySelector('input[name="priority"]:checked')?.value || 'medium';

    if (!title.trim()) {
        showToast('Descrição é obrigatória', 'error');
        return;
    }

    const taskData = {
        title: title.trim(),
        idOS: idOS,
        priority: priority,
        column: 'col-restaurar',
        userId: currentUser.uid,
        createdAt: taskId ? undefined : Date.now(),
        updatedAt: Date.now()
    };

    try {
        if (taskId) {
            await db.ref(`tasks/${taskId}`).update(taskData);
            console.log('✅ Tarefa atualizada:', taskId);
        } else {
            console.log('➜ Enviando taskData para Realtime DB:', taskData);
            const ref = await db.ref('tasks').push(taskData);
            console.log('✅ Tarefa criada:', ref.key);
        }
        showToast('Tarefa salva com sucesso!', 'success');
        closeTaskModal();
        loadTasks();
    } catch (error) {
        console.error('❌ Erro ao salvar tarefa:', error.code || error, error.message || '');
        // Tratar permission-denied explicitamente
        const code = (error && (error.code || error.codeName)) || '';
        if (code.toString().toLowerCase().includes('permission')) {
            showToast('Permissão negada: verifique as regras do Realtime Database e se você está autenticado.', 'error');
            console.warn('Sugestão: abra o Console do Firebase → Realtime Database → Rules e confirme que `tasks` permite .write quando auth != null.');
        } else if (code === 'auth/no-current-user' || !currentUser) {
            showToast('Você não está autenticado. Faça login para adicionar uma OS.', 'error');
            setTimeout(() => window.location.href = 'login.html', 700);
        } else {
            showToast('Erro ao salvar tarefa: ' + (error.message || ''), 'error');
        }
    }
}

function editTask(taskId) {
    const task = currentTasks.find(t => t.id === taskId);
    if (!task) return;

    document.getElementById('modal-title').textContent = 'Editar Ordem de Serviço';
    document.getElementById('task-id-hidden').value = taskId;
    document.getElementById('task-id-input').value = task.idOS;
    document.getElementById('task-text-input').value = task.title;
    document.querySelector(`input[name="priority"][value="${task.priority}"]`).checked = true;
    openTaskModal();
}

// ============= FILTROS =============

function filterTasks() {
    const filterValue = document.getElementById('header-priority-select').value;
    console.log('➜ Filtrando por prioridade:', filterValue);

    if (filterValue === 'all') {
        renderTasks();
    } else {
        const filtered = currentTasks.filter(t => t.priority === filterValue);
        
        // Limpar colunas
        ['col-restaurar', 'col-diagnostico', 'col-restauracao', 'col-teste', 'col-pronto'].forEach(colId => {
            const col = document.getElementById(colId);
            if (col) col.innerHTML = '';
        });

        // Renderizar filtrados
        filtered.forEach(task => {
            const col = document.getElementById(task.column);
            if (col) col.appendChild(createTaskElement(task));
        });
    }
}

// ============= AUTENTICAÇÃO =============

function logout() {
    if (!confirm('Deseja sair do sistema?')) return;

    auth.signOut().then(() => {
        console.log('✅ Logout realizado');
        window.location.href = 'login.html';
    }).catch(error => {
        console.error('❌ Erro ao fazer logout:', error);
        showToast('Erro ao fazer logout', 'error');
    });
}

// ============= NOTIFICAÇÕES =============

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const colors = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    const icon = type === 'success' ? '✓' : '✕';

    toast.className = `toast ${colors} text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 min-w-[300px] mb-2 font-medium text-sm`;
    toast.innerHTML = `
        <span class="bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">${icon}</span>
        <span>${message}</span>
    `;

    const container = document.getElementById('toast-container');
    if (container) {
        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

console.log('✅ app.js carregado');
