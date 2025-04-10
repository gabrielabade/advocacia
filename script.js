document.addEventListener('DOMContentLoaded', function () {
  // Elementos do DOM
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header');

  // ===== TOGGLE DO HAMBURGER MENU =====
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      // Toggle das classes para animação e exibição
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('no-scroll'); // Impede rolagem quando menu está aberto
    });
  }

  // ===== DETECTAR SEÇÃO ATIVA DURANTE SCROLL =====
  function setActiveSection() {
    const scrollPosition = window.scrollY;

    // Verificar se estamos no topo da página
    if (scrollPosition < 100) {
      navLinks.forEach(link => link.classList.remove('active'));
      const homeLink = document.querySelector('.nav-link[href="#"]');
      if (homeLink) {
        homeLink.classList.add('active');
      }
      return;
    }

    // Obter todas as seções com ID
    const sections = document.querySelectorAll('section[id]');

    // Variável para armazenar a seção mais próxima do topo da viewport
    let currentSection = null;
    let minDistance = Number.MAX_VALUE;

    // Percorrer cada seção para encontrar a que está mais visível na viewport
    sections.forEach(section => {
      // Calcular a posição da seção em relação ao topo da janela
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Verificar se a seção está parcialmente visível na viewport
      const isVisible =
        (scrollPosition >= sectionTop - window.innerHeight / 2) &&
        (scrollPosition < sectionTop + sectionHeight - 100);

      if (isVisible) {
        // Calcular a distância entre o topo da viewport e o meio da seção
        const sectionMiddle = sectionTop + sectionHeight / 2;
        const distanceFromViewportMiddle = Math.abs(scrollPosition + window.innerHeight / 2 - sectionMiddle);

        // Se esta seção estiver mais visível que a anterior, atualizamos a seção atual
        if (distanceFromViewportMiddle < minDistance) {
          minDistance = distanceFromViewportMiddle;
          currentSection = section;
        }
      }
    });

    // Atualizar links de navegação se encontrou uma seção ativa
    if (currentSection) {
      const sectionId = currentSection.getAttribute('id');

      // Remover a classe active de todos os links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Adicionar classe active ao link correspondente à seção atual
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }

  // Monitorar eventos de scroll e redimensionamento
  window.addEventListener('scroll', setActiveSection);
  window.addEventListener('resize', setActiveSection);

  // Chamar setActiveSection após um pequeno delay para garantir que
  // todas as dimensões estejam calculadas
  setTimeout(setActiveSection, 300);

  // ===== ADICIONAR SOMBRA AO HEADER DURANTE SCROLL =====
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== NAVEGAÇÃO SUAVE E FECHAMENTO DO MENU MÓVEL =====
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // Para links internos (começando com #)
      if (targetId.startsWith('#')) {
        e.preventDefault();

        // Atualizar link ativo manualmente
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');

        // Navegação suave
        if (targetId === '#') {
          // Rolar para o topo
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          // Rolar para a seção alvo
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerHeight = header.offsetHeight;
            // Ajustar o offset para tornar a navegação mais precisa
            const targetPosition = targetElement.offsetTop - headerHeight - 10;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Adicionar um pequeno delay e chamar setActiveSection novamente
            // para garantir que o link correto seja destacado após a rolagem
            setTimeout(setActiveSection, 1000);
          }
        }

        // Fechar o menu mobile se estiver aberto
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      }
    });
  });

  // ===== DEPOIMENTOS SLIDER =====
  const depoimentosTrack = document.querySelector('.depoimentos-track');
  const dots = document.querySelectorAll('.dot');

  if (dots.length > 0 && depoimentosTrack) {
    const depoimentos = [
      {
        texto: "A equipe da Monteiro & Associados foi fundamental para o crescimento seguro da nossa empresa. O planejamento tributário implementado gerou uma economia significativa, permitindo novos investimentos.",
        autor: "Ricardo Almeida",
        cargo: "CEO, TechSolutions Brasil"
      },
      {
        texto: "Sou cliente do escritório há mais de 5 anos e sempre fui atendido com excelência e profissionalismo. Os advogados são extremamente qualificados e atentos aos detalhes.",
        autor: "Camila Rodrigues",
        cargo: "Diretora Financeira, Grupo Horizonte"
      },
      {
        texto: "O suporte jurídico que recebemos durante o processo de fusão foi excepcional. A experiência e o conhecimento da equipe foram determinantes para o sucesso da operação.",
        autor: "Fernando Costa",
        cargo: "Presidente, Inovare Tecnologia"
      }
    ];

    // Função para atualizar o depoimento
    function updateDepoimento(index) {
      dots.forEach(d => d.classList.remove('active'));
      dots[index].classList.add('active');

      if (depoimentos[index]) {
        const depoimento = depoimentos[index];
        const depoimentoHTML = `
          <div class="depoimento">
            <p class="depoimento-texto">${depoimento.texto}</p>
            <h4 class="depoimento-autor">${depoimento.autor}</h4>
            <p class="depoimento-cargo">${depoimento.cargo}</p>
          </div>
        `;
        depoimentosTrack.innerHTML = depoimentoHTML;
      }
    }

    // Adicionar evento de clique para cada dot
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => updateDepoimento(index));
    });

    // Rotação automática dos depoimentos
    let currentIndex = 0;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % depoimentos.length;
      updateDepoimento(currentIndex);
    }, 5000);
  }

  // ===== FORMULÁRIOS =====
  // Formulário de contato com validação e redirecionamento para WhatsApp/Email
  const formContato = document.getElementById('formContato');
  if (formContato) {
    formContato.addEventListener('submit', function (e) {
      e.preventDefault();

      // Obter campos do formulário
      const nome = document.getElementById('nome');
      const email = document.getElementById('email');
      const telefone = document.getElementById('telefone');
      const assunto = document.getElementById('assunto');
      const mensagem = document.getElementById('mensagem');

      // Flag para controlar validação
      let isValid = true;

      // Função para exibir erro
      function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');

        if (!formGroup.querySelector('.error-message')) {
          errorElement.className = 'error-message';
          formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        input.classList.add('error');
        isValid = false;
      }

      // Função para remover erro
      function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
          formGroup.removeChild(errorElement);
        }

        input.classList.remove('error');
      }

      // Validar nome (não vazio)
      if (nome.value.trim() === '') {
        showError(nome, 'Por favor, informe seu nome');
      } else {
        removeError(nome);
      }

      // Validar email (formato correto)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === '') {
        showError(email, 'Por favor, informe seu email');
      } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Por favor, informe um email válido');
      } else {
        removeError(email);
      }

      // Validar telefone se preenchido (opcional)
      if (telefone.value.trim() !== '') {
        const phoneRegex = /^(\(\d{2}\)|\d{2})\s?9?\d{4}-?\d{4}$/;
        if (!phoneRegex.test(telefone.value.trim())) {
          showError(telefone, 'Formato de telefone inválido. Ex: (11) 98765-4321');
        } else {
          removeError(telefone);
        }
      } else {
        removeError(telefone);
      }

      // Validar assunto (seleção obrigatória)
      if (assunto.value === '') {
        showError(assunto, 'Por favor, selecione um assunto');
      } else {
        removeError(assunto);
      }

      // Validar mensagem (não vazia e com tamanho mínimo)
      if (mensagem.value.trim() === '') {
        showError(mensagem, 'Por favor, escreva sua mensagem');
      } else if (mensagem.value.trim().length < 10) {
        showError(mensagem, 'A mensagem deve ter pelo menos 10 caracteres');
      } else {
        removeError(mensagem);
      }

      // Se o formulário for válido, encaminhar para WhatsApp ou Email
      if (isValid) {
        // Mostrar modal de opções
        showContactOptions(nome.value, email.value, telefone.value, assunto.options[assunto.selectedIndex].text, mensagem.value);
      }
    });

    // Função para mostrar opções de contato (WhatsApp ou Email)
    function showContactOptions(nome, email, telefone, assunto, mensagem) {
      // Criar o modal
      const modal = document.createElement('div');
      modal.className = 'contact-modal';

      // Mensagem formatada para WhatsApp
      const whatsappMsg = encodeURIComponent(
        `*Contato via Website - Monteiro & Associados*\n\n` +
        `*Nome:* ${nome}\n` +
        `*Email:* ${email}\n` +
        `*Telefone:* ${telefone || 'Não informado'}\n` +
        `*Assunto:* ${assunto}\n\n` +
        `*Mensagem:*\n${mensagem}`
      );

      // Mensagem formatada para Email (assunto + corpo)
      const emailSubject = encodeURIComponent(`Contato via Website - ${assunto}`);
      const emailBody = encodeURIComponent(
        `Nome: ${nome}\n` +
        `Email: ${email}\n` +
        `Telefone: ${telefone || 'Não informado'}\n` +
        `Assunto: ${assunto}\n\n` +
        `Mensagem:\n${mensagem}`
      );

      // Número de WhatsApp (substitua pelo número correto - formato: 5511999999999)
      const whatsappNumber = '5511999999999';

      // Email de destino (substitua pelo email correto)
      const targetEmail = 'contato@monteiroadvogados.com.br';

      // Conteúdo do modal
      modal.innerHTML = `
        <div class="modal-content">
          <h3>Como deseja prosseguir?</h3>
          <p>Escolha como deseja enviar sua mensagem:</p>
          <div class="contact-options">
            <a href="https://wa.me/${whatsappNumber}?text=${whatsappMsg}" target="_blank" class="btn-whatsapp">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar por WhatsApp
            </a>
            <a href="mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}" class="btn-email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Enviar por Email
            </a>
          </div>
          <button class="btn-close">Fechar</button>
        </div>
      `;

      // Adicionar modal ao body
      document.body.appendChild(modal);

      // Mostrar modal com animação
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);

      // Adicionar evento para fechar o modal
      const closeBtn = modal.querySelector('.btn-close');
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 300);

        // Resetar o formulário após fechar o modal
        formContato.reset();
      });
    }
  }
});