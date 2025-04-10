document.addEventListener('DOMContentLoaded', function () {
  // Função para lidar com o menu mobile
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('no-scroll'); // Impede rolagem quando menu está aberto
    });
  }

  // Marca o link ativo com base na seção visível
  function setActiveNavLink() {
    const scrollPosition = window.scrollY;

    // Obtém todas as seções
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove a classe 'active' de todos os links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Adiciona a classe 'active' ao link correspondente à seção atual
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });

    // Caso especial para o topo da página (início)
    if (scrollPosition < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      const homeLink = document.querySelector('.nav-link[href="#"]');
      if (homeLink) {
        homeLink.classList.add('active');
      }
    }
  }

  // Chama a função quando a página carrega e quando rola
  window.addEventListener('scroll', setActiveNavLink);
  setActiveNavLink();

  // Garante que o menu feche após clicar em um link (em dispositivos móveis)
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Obtém o id do alvo
      const targetId = this.getAttribute('href');

      // Se for um link interno (começa com #)
      if (targetId.startsWith('#')) {
        e.preventDefault();

        // Se for apenas # (home), rola para o topo
        if (targetId === '#') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          // Caso contrário, rola até a seção correspondente
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
              top: targetElement.offsetTop - headerHeight,
              behavior: 'smooth'
            });
          }
        }

        // Fecha o menu mobile após clicar
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      }
    });
  });

  // Adiciona classe ao body para prevenir rolagem quando menu está aberto
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .no-scroll {
        overflow: hidden;
      }
    </style>
  `);
});
// Função para adicionar classe ao cabeçalho quando rolar
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Depoimentos Slider
document.addEventListener('DOMContentLoaded', function () {
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
      // Remover a classe ativa de todos os dots
      dots.forEach(d => d.classList.remove('active'));

      // Adicionar a classe ativa ao dot correto
      dots[index].classList.add('active');

      // Atualizar o conteúdo do depoimento
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
      dot.addEventListener('click', () => {
        updateDepoimento(index);
      });
    });

    // Rotação automática dos depoimentos a cada 5 segundos
    let currentIndex = 0;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % depoimentos.length;
      updateDepoimento(currentIndex);
    }, 5000);
  }
});

// Formulário de contato
const formContato = document.getElementById('formContato');
if (formContato) {
  formContato.addEventListener('submit', function (e) {
    e.preventDefault();

    // Aqui você adicionaria o código para enviar o formulário via AJAX
    // Como este é um exemplo, apenas simulamos o envio

    alert('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
    this.reset();
  });
}

// Formulário de newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simulação de envio do formulário
    alert('Obrigado por assinar nossa newsletter!');
    this.reset();
  });
}

// Animação suave de scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });

      // Fechar menu mobile se estiver aberto
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    }
  });
});
