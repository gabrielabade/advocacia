
    // Função para lidar com o menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
      });
    }

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

      dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // Remover a classe ativa de todos os dots
        dots.forEach(d => d.classList.remove('active'));

        // Adicionar a classe ativa ao dot clicado
        dot.classList.add('active');

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
      });
      });
    }

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
