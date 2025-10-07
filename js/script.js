// Executa todo o código apenas depois que o documento for carregado
document.addEventListener('DOMContentLoaded', function() {
  // Atualiza o ano no rodapé
  document.getElementById('ano').textContent = new Date().getFullYear();

  /* ---------- Tema claro/escuro ---------- */
  const themeToggle = document.getElementById('themeToggle');

  // Função para aplicar o tema de acordo com a preferência
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️'; // sol no modo escuro
    } else {
      document.body.classList.remove('dark');
      themeToggle.textContent = '🌙'; // lua no modo claro
    }
    // Salva a preferência no localStorage
    try { localStorage.setItem('theme', theme); } catch(e) {}
  }

  // Carrega tema salvo ou detecta preferência do sistema
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('theme'); } catch(e) {}
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  // Alternar ao clicar no botão
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = document.body.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

  /* ---------- MENU MOBILE ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    // fechar menu ao clicar em um link
    Array.from(mainNav.querySelectorAll('a')).forEach(a => {
      a.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- FORMULÁRIO ---------- */
  const form = document.getElementById('contatoForm');
  const btnEnviar = document.getElementById('btnEnviar');
  const status = document.getElementById('status');

  // Exibe mensagens de erro
  function showError(id, msg) {
    document.getElementById('err-' + id).textContent = msg;
  }

  // Limpa mensagens de erro
  function clearErrors() {
    ['nome','email','mensagem'].forEach(id => {
      document.getElementById('err-' + id).textContent = '';
    });
    status.textContent = '';
  }

  // Validação e simulação de envio
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors();

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      let valid = true;

      // Verifica nome
      if (!nome) { showError('nome', 'Por favor, informe seu nome.'); valid = false; }
      
      // Verifica email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) { showError('email', 'Por favor, informe seu e-mail.'); valid = false; }
      else if (!emailRegex.test(email)) { showError('email', 'E-mail inválido.'); valid = false; }
      
      // Verifica mensagem
      if (!mensagem) { showError('mensagem', 'Escreva uma mensagem.'); valid = false; }

      // Impede envio se inválido
      if (!valid) return;

      // Simulação de envio
      btnEnviar.disabled = true;
      btnEnviar.textContent = 'Enviando...';
      status.textContent = 'Enviando mensagem...';

      setTimeout(function() {
        status.textContent = 'Mensagem enviada com sucesso! (Simulação)';
        form.reset();
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Enviar';
      }, 1000);
    });
  }
});
