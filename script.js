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
  // Formulário de contato
  const formContato = document.getElementById('formContato');
  if (formContato) {
    formContato.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
      this.reset();
    });
  }

  // Formulário de newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Obrigado por assinar nossa newsletter!');
      this.reset();
    });
  }
});