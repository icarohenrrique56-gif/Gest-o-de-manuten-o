// auth.js - Enterprise Logic (compat)

document.addEventListener('DOMContentLoaded', () => {
        const auth = firebase.auth();
        // NOVO: Inicializa o provedor do Google
        const googleProvider = new firebase.auth.GoogleAuthProvider();

        // --- ELEMENTOS ---
        const views = {
                login: document.getElementById('login-view'),
                register: document.getElementById('register-view')
        };

        const forms = {
                login: document.getElementById('login-form'),
                register: document.getElementById('register-form')
        };

        const inputs = {
                loginEmail: document.getElementById('login-email'),
                loginPass: document.getElementById('login-pass'),
                regEmail: document.getElementById('reg-email'),
                regPass: document.getElementById('reg-pass'),
                regConfirm: document.getElementById('reg-confirm')
        };

        const buttons = {
                gotoRegister: document.getElementById('goto-register'),
                gotoLogin: document.getElementById('goto-login'),
                togglePass: document.querySelectorAll('.toggle-pass'),
                // NOVO: Botão Google
                btnGoogleLogin: document.getElementById('btn-google-login')
        };

        // --- 1. ALTERNAR TELAS ---
    
        buttons.gotoRegister.addEventListener('click', () => {
                views.login.classList.add('hidden');
                views.register.classList.remove('hidden');
        });

        buttons.gotoLogin.addEventListener('click', () => {
                views.register.classList.add('hidden');
                views.login.classList.remove('hidden');
        });

        // --- 2. MOSTRAR/OCULTAR SENHA ---
    
        buttons.togglePass.forEach(btn => {
                btn.addEventListener('click', (e) => {
                        // Encontra o input associado pelo atributo data-target
                        const targetId = btn.getAttribute('data-target');
                        const input = document.getElementById(targetId);
            
                        if (input.type === 'password') {
                                input.type = 'text';
                                btn.classList.add('text-green-600');
                                btn.classList.remove('text-gray-400');
                        } else {
                                input.type = 'password';
                                btn.classList.remove('text-green-600');
                                btn.classList.add('text-gray-400');
                        }
                });
        });

        // --- 3. LOGIN ---

        forms.login.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('btn-login-submit');
                const originalText = btn.innerHTML;
        
                setLoading(btn, true);

                try {
                        await auth.signInWithEmailAndPassword(inputs.loginEmail.value, inputs.loginPass.value);
                        showToast('Login realizado com sucesso!', 'success');
                        // Redirecionamento é automático pelo onAuthStateChanged ou:
                        setTimeout(() => window.location.href = 'index.html', 1000);
                } catch (error) {
                        handleAuthError(error);
                        setLoading(btn, false, originalText);
                }
        });

        // --- 4. REGISTRO ---

        forms.register.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('btn-reg-submit');
                const originalText = btn.innerHTML;

                // Validação Senhas Iguais
                if (inputs.regPass.value !== inputs.regConfirm.value) {
                        showToast('As senhas não conferem.', 'error');
                        inputs.regConfirm.focus();
                        return;
                }

                // Validação Tamanho Senha
                if (inputs.regPass.value.length < 6) {
                        showToast('A senha deve ter no mínimo 6 caracteres.', 'error');
                        return;
                }

                setLoading(btn, true);

                try {
                        await auth.createUserWithEmailAndPassword(inputs.regEmail.value, inputs.regPass.value);
                        showToast('Conta criada! Redirecionando...', 'success');
                        setTimeout(() => window.location.href = 'index.html', 1500);
                } catch (error) {
                        handleAuthError(error);
                        setLoading(btn, false, originalText);
                }
        });

        // --- 5. GOOGLE SIGN-IN --- (NOVA SEÇÃO)

        buttons.btnGoogleLogin.addEventListener('click', async () => {
                const btn = buttons.btnGoogleLogin;
                const originalText = btn.innerHTML;
        
                // Simulação de "loading" simples para o botão do Google
                btn.disabled = true;
                btn.innerHTML = `
                        <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Processando...</span>
                `;

                try {
                        await auth.signInWithPopup(googleProvider);
                        // O login foi bem-sucedido
                        showToast('Login com Google realizado!', 'success');
                        setTimeout(() => window.location.href = 'index.html', 1000);
        
                } catch (error) {
                        // Trata erros (inclusive se o usuário fechar o popup)
                        handleAuthError(error);
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                }
        });


        // --- FUNÇÕES AUXILIARES ---

        function setLoading(btn, isLoading, originalText = '') {
                if (isLoading) {
                        btn.disabled = true;
                        btn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;
                        btn.classList.add('opacity-75', 'cursor-not-allowed');
                } else {
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                        btn.classList.remove('opacity-75', 'cursor-not-allowed');
                }
        }

        function handleAuthError(error) {
                console.error(error);
                let msg = 'Ocorreu um erro inesperado.';
        
                switch(error.code) {
                        case 'auth/invalid-email': msg = 'E-mail inválido.'; break;
                        case 'auth/user-not-found': msg = 'Usuário não encontrado.'; break;
                        case 'auth/wrong-password': msg = 'Senha incorreta.'; break;
                        case 'auth/email-already-in-use': msg = 'Este e-mail já está cadastrado.'; break;
                        case 'auth/weak-password': msg = 'Senha muito fraca.'; break;
                        case 'auth/too-many-requests': msg = 'Muitas tentativas. Tente mais tarde.'; break;
                        // NOVOS: Erros comuns do Google
                        case 'auth/popup-closed-by-user': msg = 'Login cancelado. O popup foi fechado.'; break;
                        case 'auth/account-exists-with-different-credential': msg = 'Este e-mail já está em uso com outro método de login.'; break;
                        case 'auth/popup-blocked-by-browser': msg = 'O popup foi bloqueado pelo navegador. Libere os popups para este site.'; break;
                }
                showToast(msg, 'error');
        }

        function showToast(message, type = 'success') {
                const toast = document.createElement('div');
                const colors = type === 'success' ? 'bg-green-600' : 'bg-red-600';
                const icon = type === 'success' ? '✓' : '✕';
        
                toast.className = `toast ${colors} text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 min-w-[300px] mb-2 font-medium text-sm`;
                toast.innerHTML = `
                        <span class="bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">${icon}</span>
                        <span>${message}</span>
                `;
        
                document.getElementById('toast-container').appendChild(toast);
        
                requestAnimationFrame(() => toast.classList.add('show'));
        
                setTimeout(() => {
                        toast.classList.remove('show');
                        setTimeout(() => toast.remove(), 300);
                }, 3000);
        }
});